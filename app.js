const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// --- KONEKSI DATABASE ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'furniture_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('✅ Database Terkoneksi...');
});

// --- MIDDLEWARE ---
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// --- RUMUS RUPIAH (BARU) ---
// Ini fungsi global, bisa dipanggil di semua file EJS
app.locals.formatRupiah = (angka) => {
    // Memaksa angka menjadi format Indonesia (ada titiknya)
    return "Rp " + Number(angka).toLocaleString('id-ID');
};

// --- ROUTE 1: HOME ---
app.get('/', (req, res) => {
    const sql = `SELECT p.id, p.name, p.price, p.image, s.quantity 
                 FROM products p 
                 JOIN stocks s ON p.id = s.product_id`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('index', { products: results });
    });
});

// --- ROUTE 2: PROSES BELI ---
app.post('/buy', (req, res) => {
    const { product_id, customer_name, source } = req.body;

    db.query("SELECT quantity FROM stocks WHERE product_id = ?", [product_id], (err, result) => {
        if (err) throw err;
        
        if (result.length > 0 && result[0].quantity > 0) {
            db.query("UPDATE stocks SET quantity = quantity - 1 WHERE product_id = ?", [product_id], (err) => {
                if (err) throw err;
                db.query("INSERT INTO purchases (product_id, customer_name) VALUES (?, ?)", [product_id, customer_name], (err) => {
                    if (err) throw err;
                    if (source === 'admin') {
                        res.redirect('/admin');
                    } else {
                        res.redirect('/');
                    }
                });
            });
        } else {
            res.send("<h1>Stock Habis!</h1><a href='/'>Kembali</a>");
        }
    });
});

// --- ROUTE 3: ADMIN PAGE ---
app.get('/admin', (req, res) => {
    const sqlPurchases = `SELECT pur.id, pur.customer_name, pur.purchase_date, pur.status, p.name 
                          FROM purchases pur
                          JOIN products p ON pur.product_id = p.id
                          ORDER BY pur.id DESC`;

    const sqlProducts = `SELECT p.id, p.name, p.price, s.quantity 
                         FROM products p 
                         JOIN stocks s ON p.id = s.product_id`;

    db.query(sqlPurchases, (err, purchasesResult) => {
        if (err) throw err;
        db.query(sqlProducts, (err, productsResult) => {
            if (err) throw err;
            res.render('admin', { 
                purchases: purchasesResult, 
                products: productsResult 
            });
        });
    });
});

// --- ROUTE 4: CANCEL ---
app.post('/cancel/:id', (req, res) => {
    const purchaseId = req.params.id;
    db.query("SELECT product_id FROM purchases WHERE id = ?", [purchaseId], (err, result) => {
        if (err) throw err;
        const productId = result[0].product_id;
        db.query("UPDATE purchases SET status = 'cancelled' WHERE id = ?", [purchaseId], (err) => {
            if (err) throw err;
            db.query("UPDATE stocks SET quantity = quantity + 1 WHERE product_id = ?", [productId], (err) => {
                if (err) throw err;
                res.redirect('/admin');
            });
        });
    });
});

app.listen(3000, () => {
    console.log('🚀 Server berjalan di http://localhost:3000');
});