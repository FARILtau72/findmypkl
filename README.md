# Find My PKL

Prototipe web responsif berbahasa Indonesia untuk penemuan dan pengelolaan PKL SMK. Dibangun dengan HTML, CSS, dan JavaScript tanpa proses build.

## Menjalankan

Buka `dist/index.html`, atau jalankan `python -m http.server 8080 --directory dist` lalu buka http://localhost:8080.

## Mencoba alur lengkap

1. Pilih **Panduan PKL → Coba daftar siswa baru**, isi identitas contoh.
2. Ganti **Demo: HUBIN**, buka **Verifikasi siswa**, verifikasi akun baru.
3. Kembali ke **Demo: Siswa**, cari lowongan, buka detail, kirim pengajuan.
4. Di HUBIN, buka **Pengajuan siswa**, setujui pengajuan; kemudian catat diterima atau tidak lolos perusahaan.
5. Klik **Mulai PKL**, isi tanggal dan pembimbing. Di **Monitoring PKL**, catat perkembangan, lalu selesaikan PKL.
6. Penempatan selesai tampil di **Riwayat PKL**; filter berdasarkan perusahaan juga tersedia dari halaman mitra.

## Fitur

- Beranda siswa, pencarian, filter jurusan/lokasi/sistem kerja, urutan, pagination, simpan lowongan, detail perusahaan.
- Pendaftaran demo, verifikasi HUBIN, pengajuan dengan motivasi, status dan alasan keputusan.
- Dashboard HUBIN, pengelolaan lowongan dan mitra, monitoring dan riwayat penempatan.
- Dialog konfirmasi, validasi formulir, notifikasi, empty state, loading pencarian, responsif dan reduced motion.
- Pengajuan ganda diblokir; siswa tanpa verifikasi tidak dapat mengajukan; satu PKL aktif per siswa. Lowongan/mitra yang memiliki relasi dilindungi dari penghapusan.

## Batas prototipe

Data perusahaan, siswa, periode, dan lowongan adalah simulasi, bukan tawaran PKL nyata. Penyimpanan menggunakan localStorage (`findmypkl-v1`) pada browser yang sama. Pergantian peran adalah kontrol demo, bukan autentikasi atau otorisasi aman. Tidak ada backend, sinkronisasi antarperangkat, pengiriman email, unggah dokumen, maupun integrasi perusahaan.

Untuk produksi diperlukan autentikasi, otorisasi di server, database, validasi server, audit log, serta proses operasional sekolah. Jangan memasukkan data siswa sungguhan ke demo. Hapus key localStorage untuk mengembalikan data contoh.

## Struktur

- `dist/index.html`: dokumen utama
- `dist/style.css`: sistem desain dan responsivitas
- `dist/app.js`: tampilan, data simulasi, dan alur interaktif

Verifikasi: pemeriksaan sintaks JavaScript, keberadaan aset lokal, dan smoke test render seluruh halaman. Pengujian visual browser belum dilakukan.
