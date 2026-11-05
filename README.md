# PBO LKS — Portofolio Praktikum

- Nama : Wilham Dhani Prasetyo
- NIM : H1101251050
- Kelas: A

## Daftar Pertemuan
- [✓] Pertemuan 1 — Setup & Database
- [✓] Pertemuan 2 — Core OOP
- [✓] Pertemuan 3 — Framework & Routing
- [✓] Pertemuan 4 — Testing Backend
- [✓] Pertemuan 5 — CRUD Kategori
- [✓] Pertemuan 6 — Frontend
- [✓] Pertemuan 7 — Integrasi & Finalisasi

## Cara Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk menjalankan **REST API Perpustakaan** beserta frontend web secara lokal.

### Catatan Sebelum Memulai

- Pastikan PHP dan MySQL sudah terinstal dan dapat diakses melalui terminal.
- Pastikan layanan MySQL sedang berjalan sebelum menjalankan aplikasi.
- Pastikan port `8000` dan `3000` tidak sedang digunakan oleh aplikasi lain.
- Kedua terminal server harus tetap aktif selama aplikasi digunakan.
- Untuk menghentikan server, tekan `Ctrl + C` pada masing-masing terminal.

### 1. Persiapan Proyek

Clone repository atau download seluruh file proyek, kemudian ekstrak jika menggunakan ZIP.

Pastikan direktori proyek memiliki struktur seperti berikut:

```text
rest-api-perpustakaan/
├── database/
│   └── schema.sql
├── public/
├── frontend-perpustakaan/
├── .env.example
└── ...
```

### 2. Konfigurasi Environment

Salin file `.env.example` menjadi `.env` pada direktori utama proyek.

Kemudian, sesuaikan konfigurasi database di dalam file `.env` dengan pengaturan MySQL lokal yang digunakan.

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=perpustakaan
DB_USERNAME=[USERNAME]
DB_PASSWORD=[PASSWORD]
```

Ganti `[USERNAME]` dengan username MySQL yang digunakan. `[PASSWORD]` dengan password username yang digunakan.

### 3. Setup Database

Buka terminal pada direktori utama proyek (`rest-api-perpustakaan`), kemudian jalankan perintah berikut untuk mengimpor struktur database:

```bash
mysql -u [USERNAME] -p < database/schema.sql
```

Ganti `[USERNAME]` dengan username MySQL yang digunakan. Masukkan password MySQL ketika diminta.

Pastikan proses import database berhasil sebelum melanjutkan ke tahap berikutnya.

Berikut salah satu contoh verifikasi:

```bash
mysql -u [USERNAME] -p -e "USE perpustakaan; SELECT * FROM categories;"
```

Apabila proses import berhasil, maka isi tabel (`categories`) akan ditampilkan di terminal.

### 4. Menjalankan Backend Server

Buka **Terminal Pertama**, kemudian arahkan direktori kerja ke folder utama proyek:

```bash
cd rest-api-perpustakaan
```

Jalankan backend server menggunakan PHP Development Server:

```bash
php -S localhost:8000 -t public
```

Backend server akan berjalan pada alamat:

```text
http://localhost:8000
```

**Penting:** Biarkan terminal pertama tetap berjalan selama aplikasi digunakan karena terminal ini menjalankan backend REST API.

### 5. Menjalankan Frontend Server

Buka **Terminal Kedua**, kemudian arahkan direktori kerja ke folder frontend:

```bash
cd rest-api-perpustakaan/frontend-perpustakaan
```

Jalankan frontend server menggunakan PHP Development Server:

```bash
php -S localhost:3000
```

Frontend server akan berjalan pada alamat:

```text
http://localhost:3000
```

**Penting:** Biarkan terminal kedua tetap berjalan selama aplikasi digunakan karena terminal ini menjalankan frontend web.

### 6. Mengakses Aplikasi

Setelah backend dan frontend berhasil dijalankan, buka browser pilihan dan akses alamat berikut:

**http://localhost:3000**

Aplikasi perpustakaan kini dapat digunakan melalui antarmuka frontend web, termasuk fitur CRUD (*Create, Read, Update, Delete*) yang terintegrasi dengan REST API.

## Screenshot

### Langkah 1 ⁜ Cek Lingkungan Pengembangan
![Terminal](./pertemuan-01/langkah-01.png "Memastikan PHP 8+, Composer, dan MySQL sudah terinstal dan dapat dijalankan dari terminal.")

### Langkah 2 ⁜ Struktur Folder & Composer PSR-4
![Code Editor](./pertemuan-01/langkah-02.png "Membuat folder proyek & mengonfigurasi Composer dengan PSR-4 autoload.")

### Langkah 3 ⁜ Konfigurasi .env & Skema Database
![Terminal](./pertemuan-01/langkah-03.png "Membuat file konfigurasi .env dan menginisialisasi database MySQL dari skema.")

### Langkah 4 ⁜ Env Loader & Connection PDO
![Terminal](./pertemuan-01/langkah-04.png "Membuat class Env (loader .env) dan Connection (PDO Singleton) sesuai prinsip SRP.")

### Langkah 5 ⁜ Model, Interface & Repository Book
![Terminal](./pertemuan-01/langkah-05.png "Membuat Book (entity), BookRepositoryInterface (kontrak — prinsip DIP), dan MySQLBookRepository (implementasi konkret).")

### Langkah 6 ⁜ BookService — Logika Bisnis
![Terminal](./pertemuan-02/langkah-06.png "Membuat BookService yang berisi validasi & logika bisnis — terpisah dari HTTP dan SQL.")

### Langkah 7 ⁜ Core Framework: Request, Response, Router, Container
![Terminal](./pertemuan-02/langkah-07.png "Membuat 4 komponen inti framework mini: Request, Response, Router, dan Container (DI).")

### Langkah 8 ⁜ BookController & Front Controller
![Browser](./pertemuan-02/langkah-08.png "Membuat BookController sebagai pintu masuk HTTP dan public/index.php sebagai Front Controller (Composition Root).")

### Langkah 9 ⁜ Uji CRUD Buku dengan cURL
![Terminal](./pertemuan-02/langkah-09.png "Menguji seluruh endpoint CRUD Buku (GET, POST, PUT, DELETE) menggunakan cURL.")

### Langkah 10 ⁜ Uji Validasi & Error Handling
![Terminal](./pertemuan-03/langkah-10.png "Memastikan API mengembalikan status 404, 405, dan 422 dengan pesan yang jelas untuk input tidak valid.")

### Langkah 11 ⁜ Uji dengan Postman
![Rest API Client](./pertemuan-03/langkah-11.png "Menguji API menggunakan Postman sebagai bukti pengujian alternatif dari cURL.")

### Langkah 12 ⁜ Skrip Uji Otomatis
![Terminal](./pertemuan-04/langkah-12.png "Membuat skrip api_test.sh untuk menguji seluruh alur CRUD secara otomatis.")

### Langkah 13 ⁜ CRUD Kategori — Schema & Repository
![Terminal](./pertemuan-05/langkah-13.png "Menambah tabel categories + membuat Model, Interface, dan Repository untuk kategori (mengikuti pola Book).")

### Langkah 14 ⁜ CRUD Kategori — Service, Controller & Route
![Terminal](./pertemuan-05/langkah-14.png "Menambahkan CategoryService, CategoryController, dan mendaftarkan route kategori di index.php.")

### Langkah 15 ⁜ Uji CRUD Kategori
![Terminal](./pertemuan-05/langkah-15.png "Menguji seluruh operasi CRUD Kategori (POST, PUT, DELETE, validasi).")

### Langkah 16 ⁜ Aktifkan CORS di Backend
![Terminal](./pertemuan-06/langkah-16.png "Menambahkan header CORS agar frontend di port 3000 bisa mengakses backend di port 8000.")

### Langkah 17 ⁜ Setup Frontend & Konfigurasi API
![Browser](./pertemuan-06/langkah-17.png "Membuat folder frontend + file dasar (index.html, custom.css, config.js, api.js, utils.js).")

### Langkah 18 ⁜ Halaman Dashboard & Buku
![Browser](./pertemuan-06/langkah-18.png "Membuat dashboard.js, books.js, dan app.js (router) agar frontend terhubung ke API.")

### Langkah 19 ⁜ Halaman Kategori & Integrasi Penuh
![Browser](./pertemuan-07/langkah-19.png "Membuat categories.js, lalu jalankan backend + frontend bersamaan untuk uji end-to-end.")

### Langkah 20 ⁜ Finalisasi & Push Repository
![Browser](./pertemuan-07/langkah-20.png "Merapikan repository GitHub & menambahkan dokumentasi akhir (README, screenshot final).")