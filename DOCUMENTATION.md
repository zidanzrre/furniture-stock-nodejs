# 📂 Dokumentasi Teknis & Panduan Penggunaan

Dokumen ini berisi penjelasan mendalam mengenai struktur file dan panduan operasional aplikasi **Furniture Store Management System**.

---

## A. Daftar & Fungsi File

Berikut adalah penjelasan fungsi dari setiap file utama dalam proyek ini:

| Nama File/Folder | Fungsi & Deskripsi |
| :--- | :--- |
| **`app.js`** | **File Server Utama (Backend).** Mengatur koneksi database MySQL, routing halaman, dan logika bisnis (seperti pengurangan stok saat pembelian dan pengembalian stok saat cancel). |
| **`views/index.ejs`** | **Frontend User.** Halaman antarmuka untuk pembeli. Berisi kode HTML & EJS untuk menampilkan katalog produk dan modal pembelian. |
| **`views/admin.ejs`** | **Frontend Admin.** Halaman dashboard kasir. Berisi tabel riwayat transaksi, tombol cancel order, dan form input manual. |
| **`public/images/`** | **Aset Statis.** Folder penyimpanan gambar produk furniture (format .jpg) yang dapat diakses publik oleh browser. |
| **`furniture_db.sql`** | **Backup Database.** File SQL untuk merestore struktur tabel (`products`, `stocks`, `purchases`) dan data dummy awal. |
| **`package.json`** | **Manifest Node.js.** Mencatat daftar library yang digunakan project ini (`express`, `mysql2`, `ejs`, `body-parser`). |

---

## B. Panduan Penggunaan (User Manual)

### 1. Halaman Pembeli (User Interface)
* **Akses:** Buka `http://localhost:3000`
* **Melihat Produk:** Katalog akan tampil otomatis. Harga sudah diformat ke Rupiah (misal: Rp 2.500.000).
* **Membeli Barang:**
  1. Pilih barang yang diinginkan.
  2. Isi nama Anda pada kolom input di bawah gambar produk.
  3. Klik tombol **"Beli"**.
  4. *Note:* Jika stok habis, tombol akan berubah menjadi abu-abu dan tidak bisa diklik.

### 2. Halaman Admin (Dashboard)
* **Akses:** Klik tombol "Login Admin" atau buka `http://localhost:3000/admin`
* **Melihat Data:** Tabel transaksi akan menampilkan data pembeli terbaru di urutan paling atas.
* **Input Transaksi Manual (Kasir):**
  1. Pada form bagian atas, pilih produk dari dropdown (Dropdown menampilkan nama barang beserta sisa stok).
  2. Masukkan nama pembeli.
  3. Klik **"Proses"**. Stok akan berkurang otomatis.
* **Membatalkan Pesanan (Cancel):**
  1. Cari transaksi yang ingin dibatalkan di tabel.
  2. Klik tombol merah **"Cancel Order"**.
  3. Status akan berubah jadi "Dibatalkan" dan stok barang akan **otomatis bertambah (+1)**.

---

## C. Troubleshooting

Jika mengalami kendala saat menjalankan aplikasi:

1. **Database Error:** Pastikan XAMPP (MySQL) sudah dinyalakan dan nama database di `app.js` sesuai dengan di phpMyAdmin (`furniture_db`).
2. **Gambar Tidak Muncul:** Pastikan nama file gambar di folder `public/images` sama persis dengan nama file yang tercatat di tabel `products` database (termasuk huruf besar/kecil).
3. **Port In Use:** Jika terminal error karena port 3000 terpakai, ganti `app.listen(3000)` di `app.js` menjadi angka lain, misalnya `3001`.