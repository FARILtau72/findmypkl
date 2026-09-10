# Benchmark Hasil Evaluasi Database: In-Memory vs SQLite untuk FindMyPKL

Tanggal Pengujian: 10/9/2026, 14.40.59
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
| **In-Memory Store** | 150.493 ops/s | 0.007 ms | 0.004 ms | 0.019 ms | 0.031 ms |
| **SQLite In-Memory** | 68.884 ops/s | 0.015 ms | 0.014 ms | 0.019 ms | 0.053 ms |
| **SQLite Disk (WAL)** | **41.366 ops/s** | **0.024 ms** | **0.024 ms** | **0.031 ms** | **0.100 ms** |

> *Catatan: SQLite Disk dengan WAL cache sangat kencang (0.024 ms / 41.366 ops/s), jauh melebihi throughput HTTP server Node.js (~3.000 req/s).*

---

### Test 2: Multi-Filter & Text Search Query (Katalog Lowongan)
Pencarian katalog dengan kombinasi filter Jurusan (RPL, TAV, TITL, TKRO), Kota, Tipe Kerja, dan teks kata kunci (2.000 iterasi).

| Storage Engine | Throughput (ops/sec) | Avg Latency | p50 (Median) | p95 | p99 |
|---|---|---|---|---|---|
| **In-Memory Store** | 2.601 ops/s | 0.384 ms | 0.240 ms | 1.09 ms | 2.00 ms |
| **SQLite In-Memory** | 406 ops/s | 2.46 ms | 1.76 ms | 5.59 ms | 10.23 ms |
| **SQLite Disk (WAL)** | 385 ops/s | 2.60 ms | 1.71 ms | 7.01 ms | 12.25 ms |

---

### Test 3: Single Record Write (`addApplication`)
Menguji penulisan 1 lamaran baru oleh siswa (1.000 iterasi penulisan transaksional).

| Storage Engine | Throughput (writes/s) | Avg Latency | p50 | p95 | p99 |
|---|---|---|---|---|---|
| **In-Memory Store** | 139.478 ops/s | 0.007 ms | 0.004 ms | 0.007 ms | 0.053 ms |
| **SQLite In-Memory** | 33.725 ops/s | 0.030 ms | 0.012 ms | 0.117 ms | 0.268 ms |
| **SQLite Disk (WAL)** | **4.467 ops/s** | **0.224 ms** | **0.148 ms** | **0.466 ms** | **1.09 ms** |
| SQLite Disk (Standard DELETE) | 151 ops/s | 6.63 ms | 6.36 ms | 9.45 ms | 13.01 ms |

> *Penting: WAL Mode 29.6x lebih cepat dibanding SQLite DELETE standar pada penulisan disk.*

---

### Test 4: Batch Bulk Insert Transaction (5.000 Records)
Menguji seeding massal 5.000 data dalam satu transaksi ACID.

| Storage Engine | Total Waktu | Kecepatan Baris | Rata-rata per Baris |
|---|---|---|---|
| **In-Memory Store** | 1.64 ms | 3.044.696 rows/s | 0.33 µs |
| **SQLite In-Memory** | 138.40 ms | 36.127 rows/s | 0.028 ms |
| **SQLite Disk (WAL)** | **109.86 ms** | **45.511 rows/s** | **0.022 ms** |

---

### Test 5: Relational 4-Table JOIN (Dashboard HUBIN)
Mengambil daftar lamaran dengan relasi JOIN ke Siswa, Lowongan, dan Perusahaan Mitra (1.000 iterasi).

| Storage Engine | Throughput (ops/sec) | Avg Latency | p50 | p95 |
|---|---|---|---|---|
| **In-Memory Store** | 4.088 ops/s | 0.245 ms | 0.178 ms | 0.573 ms |
| **SQLite In-Memory** | 205 ops/s | 4.88 ms | 4.34 ms | 9.67 ms |
| **SQLite Disk (WAL)** | 284 ops/s | 3.52 ms | 3.09 ms | 5.82 ms |

---

### Test 6: Analisis Skalabilitas Ukuran Dataset (O(N) vs O(log N))
Pencarian ID pada skala dataset 100 hingga 10.000 baris.

| Ukuran Dataset | In-Memory Array Avg (ops/s) | SQLite B-Tree Index Avg (ops/s) | Perbandingan |
|---|---|---|---|
| **100 Baris** | 0.88 µs (1.131.510/s) | 0.017 ms (57.885/s) | 20.00x Array |
| **500 Baris** | 0.002 ms (666.389/s) | 0.014 ms (69.485/s) | 10.00x Array |
| **1.000 Baris** | 0.003 ms (293.809/s) | 0.021 ms (48.146/s) | 6.25x Array |
| **5.000 Baris** | 0.010 ms (98.195/s) | 0.015 ms (68.148/s) | 1.45x Array |
| **10.000 Baris** | 0.023 ms (44.075/s) | 0.016 ms (62.068/s) | 1.41x Lebih Cepat (SQLite) |

---

## 3. Ukuran Penyimpanan & Memori

- **Total Records di DB Uji:** 7.048 baris data lowongan
- **Ukuran File Fisik SQLite di Disk:** 4863.56 KB (4980288 bytes)
- **Node.js Heap Memory Digunakan:** 33.66 MB
- **Node.js RSS:** 152.37 MB

---

## 4. Kesimpulan & Rekomendasi Arsitektur

1. **Jaminan Persistensi:** SQLite disk memastikan setiap pendaftaran siswa, lamaran PKL, dan ulasan industri tersimpan secara permanen dan tahan banting saat server mati atau reboot.
2. **Kinerja yang Sangat Memadai:** Throughput read (41.366 ops/s) dan write (4.467 writes/s) SQLite WAL berada di atas batas kapasitas server HTTP aplikasi sekolah/kampus.
3. **Zero Setup Dependency:** Karena Node.js v22+ sudah menyediakan `node:sqlite` secara bawaan (*native built-in*), instalasi tidak membutuhkan `npm install` paket eksternal besar atau compiler visual C++.
4. **Strategi Migrasi:** Disarankan menerapkan **Repository/Adapter Pattern** agar API `server/store.js` tetap memiliki fungsi yang sama persis (`getJobs`, `addApplication`, dll) sehingga seluruh rute Express tidak perlu dirombak sama sekali.
