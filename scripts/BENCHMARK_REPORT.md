# Benchmark Hasil Evaluasi Database: In-Memory vs SQLite untuk FindMyPKL

Tanggal Pengujian: 10/9/2026, 14.43.19
Platform: Node.js v22.19.0 (win32 x64)
Mesin Database: `node:sqlite` (Native Node.js built-in DatabaseSync)

---

## 1. Ringkasan Eksekutif

FindMyPKL saat ini menggunakan store berbasis array in-memory (`server/store.js`). Meskipun cepat di memori, pendekatan ini memiliki kelemahan kritis: **seluruh data pendaftaran siswa, lamaran PKL, dan ulasan hilang seketika saat server direstart**.

Benchmark ini membandingkan 3 pendekatan:
1. **In-Memory Store (Current):** Pure JavaScript Heap Objects/Arrays.
2. **SQLite In-Memory (`:memory:`):** SQLite engine berjalan di RAM via `node:sqlite`.
3. **SQLite On-Disk (WAL Mode):** SQLite engine tersimpan di file fisik disk dengan **Write-Ahead Logging (WAL)** & `synchronous = NORMAL`.
4. **SQLite On-Disk (Standard DELETE):** SQLite tanpa WAL sebagai baseline disk biasa.

---

## 2. Hasil Pengujian Kinerja

### Test 1: Primary Key Read Lookup (`getJobById`)
Menguji pencarian 1 data lowongan berdasarkan ID acak (10.000 iterasi).

| Storage Engine | Throughput (ops/sec) | Avg Latency | p50 (Median) | p95 | p99 |
|---|---|---|---|---|---|
| **In-Memory Store** | 50.258 ops/s | 0.020 ms | 0.005 ms | 0.038 ms | 0.233 ms |
| **SQLite In-Memory** | 53.056 ops/s | 0.019 ms | 0.013 ms | 0.030 ms | 0.126 ms |
| **SQLite Disk (WAL)** | **51.030 ops/s** | **0.020 ms** | **0.017 ms** | **0.030 ms** | **0.092 ms** |

> *Catatan: SQLite Disk dengan WAL cache sangat kencang (0.020 ms / 51.030 ops/s), jauh melebihi throughput HTTP server Node.js (~3.000 req/s).*

---

### Test 2: Multi-Filter & Text Search Query (Katalog Lowongan)
Pencarian katalog dengan kombinasi filter Jurusan (RPL, TAV, TITL, TKRO), Kota, Tipe Kerja, dan teks kata kunci (2.000 iterasi).

| Storage Engine | Throughput (ops/sec) | Avg Latency | p50 (Median) | p95 | p99 |
|---|---|---|---|---|---|
| **In-Memory Store** | 2.860 ops/s | 0.350 ms | 0.225 ms | 0.939 ms | 1.71 ms |
| **SQLite In-Memory** | 873 ops/s | 1.15 ms | 0.861 ms | 2.79 ms | 4.08 ms |
| **SQLite Disk (WAL)** | 983 ops/s | 1.02 ms | 0.776 ms | 2.34 ms | 3.34 ms |

---

### Test 3: Single Record Write (`addApplication`)
Menguji penulisan 1 lamaran baru oleh siswa (1.000 iterasi penulisan transaksional).

| Storage Engine | Throughput (writes/s) | Avg Latency | p50 | p95 | p99 |
|---|---|---|---|---|---|
| **In-Memory Store** | 299.267 ops/s | 0.003 ms | 0.003 ms | 0.004 ms | 0.013 ms |
| **SQLite In-Memory** | 62.932 ops/s | 0.016 ms | 0.009 ms | 0.030 ms | 0.132 ms |
| **SQLite Disk (WAL)** | **7.354 ops/s** | **0.136 ms** | **0.075 ms** | **0.276 ms** | **0.904 ms** |
| SQLite Disk (Standard DELETE) | 154 ops/s | 6.48 ms | 5.69 ms | 9.54 ms | 22.12 ms |

> *Penting: WAL Mode 47.8x lebih cepat dibanding SQLite DELETE standar pada penulisan disk.*

---

### Test 4: Batch Bulk Insert Transaction (5.000 Records)
Menguji seeding massal 5.000 data dalam satu transaksi ACID.

| Storage Engine | Total Waktu | Kecepatan Baris | Rata-rata per Baris |
|---|---|---|---|
| **In-Memory Store** | 3.95 ms | 1.265.054 rows/s | 0.79 µs |
| **SQLite In-Memory** | 458.78 ms | 10.898 rows/s | 0.092 ms |
| **SQLite Disk (WAL)** | **200.01 ms** | **24.999 rows/s** | **0.040 ms** |

---

### Test 5: Relational 4-Table JOIN (Dashboard HUBIN)
Mengambil daftar lamaran dengan relasi JOIN ke Siswa, Lowongan, dan Perusahaan Mitra (1.000 iterasi).

| Storage Engine | Throughput (ops/sec) | Avg Latency | p50 | p95 |
|---|---|---|---|---|
| **In-Memory Store** | 3.758 ops/s | 0.266 ms | 0.166 ms | 0.489 ms |
| **SQLite In-Memory** | 167 ops/s | 5.97 ms | 5.27 ms | 10.29 ms |
| **SQLite Disk (WAL)** | 131 ops/s | 7.62 ms | 6.28 ms | 16.10 ms |

---

### Test 6: Analisis Skalabilitas Ukuran Dataset (O(N) vs O(log N))
Pencarian ID pada skala dataset 100 hingga 10.000 baris.

| Ukuran Dataset | In-Memory Array Avg (ops/s) | SQLite B-Tree Index Avg (ops/s) | Perbandingan |
|---|---|---|---|
| **100 Baris** | 0.70 µs (1.434.823/s) | 0.015 ms (64.774/s) | 20.00x Array |
| **500 Baris** | 0.002 ms (535.949/s) | 0.018 ms (54.621/s) | 10.00x Array |
| **1.000 Baris** | 0.003 ms (354.513/s) | 0.017 ms (57.570/s) | 6.25x Array |
| **5.000 Baris** | 0.014 ms (70.206/s) | 0.022 ms (46.172/s) | 1.52x Array |
| **10.000 Baris** | 0.059 ms (17.071/s) | 0.036 ms (27.514/s) | 1.61x Lebih Cepat (SQLite) |

---

## 3. Ukuran Penyimpanan & Memori

- **Total Records di DB Uji:** 7.048 baris data lowongan
- **Ukuran File Fisik SQLite di Disk:** 4863.56 KB (4980288 bytes)
- **Node.js Heap Memory Digunakan:** 33.93 MB
- **Node.js RSS:** 142.25 MB

---

## 4. Kesimpulan & Rekomendasi Arsitektur

1. **Jaminan Persistensi:** SQLite disk memastikan setiap pendaftaran siswa, lamaran PKL, dan ulasan industri tersimpan secara permanen dan tahan banting saat server mati atau reboot.
2. **Kinerja yang Sangat Memadai:** Throughput read (51.030 ops/s) dan write (7.354 writes/s) SQLite WAL berada di atas batas kapasitas server HTTP aplikasi sekolah/kampus.
3. **Zero Setup Dependency:** Karena Node.js v22+ sudah menyediakan `node:sqlite` secara bawaan (*native built-in*), instalasi tidak membutuhkan `npm install` paket eksternal besar atau compiler visual C++.
4. **Strategi Migrasi:** Disarankan menerapkan **Repository/Adapter Pattern** agar API `server/store.js` tetap memiliki fungsi yang sama persis (`getJobs`, `addApplication`, dll) sehingga seluruh rute Express tidak perlu dirombak sama sekali.
