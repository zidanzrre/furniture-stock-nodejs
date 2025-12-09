# 🪑 Furniture Store Management System

Aplikasi web sederhana untuk manajemen inventaris dan penjualan toko furniture. Dibangun menggunakan **Node.js**, **Express**, dan **MySQL**.

Project ini dibuat untuk mensimulasikan proses bisnis sederhana: pembelian oleh customer (online), input kasir (offline), manajemen stok otomatis, dan dashboard admin.

## 🚀 Fitur Utama

### 👤 Halaman Customer (User)
* **Katalog Produk:** Menampilkan daftar furniture lengkap dengan gambar dan harga.
* **Cek Stok Real-time:** Menampilkan sisa stok yang tersedia di gudang.
* **Pembelian:** Form sederhana untuk melakukan pemesanan.
* **Format Rupiah:** Harga ditampilkan dalam format mata uang Indonesia (Rp).
* **Validasi Stok:** Tombol beli otomatis non-aktif jika stok habis.

### 🔒 Halaman Admin
* **Dashboard Transaksi:** Melihat riwayat pembelian yang masuk secara lengkap.
* **Input Manual (Kasir):** Admin bisa menginput pembelian secara manual (untuk pembeli offline) dengan dropdown produk yang dinamis.
* **Cancel Order:** Fitur membatalkan pesanan. **Stok akan otomatis kembali (refund)** ke database jika pesanan dibatalkan.
* **Status Indikator:** Penanda visual untuk transaksi sukses atau batal.

## 🛠️ Teknologi yang Digunakan

* **Backend:** Node.js, Express.js
* **Frontend:** EJS (Templating Engine), Bootstrap 5 (CSS Framework)
* **Database:** MySQL
* **Tools:** VS Code, XAMPP, Git

## 📦 Cara Install & Menjalankan (Localhost)

1.  **Clone Repository:**
    ```bash
    git clone [https://github.com/zidanzrre/furniture-stock-nodejs.git](https://github.com/zidanzrre/furniture-stock-nodejs.git)
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Database:**
    * Import file `furniture_db.sql` ke phpMyAdmin.
    * Sesuaikan konfigurasi database di `app.js` jika perlu.
4.  **Jalankan Server:**
    ```bash
    node app.js
    ```
5.  **Akses Aplikasi:**
    * User: `http://localhost:3000`
    * Admin: `http://localhost:3000/admin`

---
Untuk dokumentasi teknis yang lebih detail, silakan baca [DOCUMENTATION.md](DOCUMENTATION.md).