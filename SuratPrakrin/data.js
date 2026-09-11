/**
 * Data Kelas & Pejabat SMK Taruna Bangsa Bekasi
 * Total 28 Kelas: RPL (12), TKR (12), TAV (2), TITL (2)
 * Pembina Kesiswaan: Per Jurusan
 */

const CLASS_DATA = [
    // ===== RPL (12 Kelas: 6 Kelas 11, 6 Kelas 12) =====
    { id: 1, jurusan: 'RPL', nama_kelas: 'RPL 11 A', wali_kelas: 'Budi Santoso', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
    { id: 2, jurusan: 'RPL', nama_kelas: 'RPL 11 B', wali_kelas: 'Siti Nurhaliza', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
    { id: 3, jurusan: 'RPL', nama_kelas: 'RPL 11 C', wali_kelas: 'Rini Dewi', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
    { id: 4, jurusan: 'RPL', nama_kelas: 'RPL 11 D', wali_kelas: 'Adi Suryanto', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
    { id: 5, jurusan: 'RPL', nama_kelas: 'RPL 11 E', wali_kelas: 'Eka Putra', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
    { id: 6, jurusan: 'RPL', nama_kelas: 'RPL 11 F', wali_kelas: 'Farah Amira', pembina: '', kaprodi: 'Dr. Hendra Kusuma' },
    { id: 7, jurusan: 'RPL', nama_kelas: 'RPL 12 A', wali_kelas: 'Gita Purnama', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
    { id: 8, jurusan: 'RPL', nama_kelas: 'RPL 12 B', wali_kelas: 'Haris Gunawan', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
    { id: 9, jurusan: 'RPL', nama_kelas: 'RPL 12 C', wali_kelas: 'Irma Kusuma', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
    { id: 10, jurusan: 'RPL', nama_kelas: 'RPL 12 D', wali_kelas: 'Joko Susilo', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
    { id: 11, jurusan: 'RPL', nama_kelas: 'RPL 12 E', wali_kelas: 'Kiki Mustika', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
    { id: 12, jurusan: 'RPL', nama_kelas: 'RPL 12 F', wali_kelas: 'Lina Sujatmi', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },

    // ===== TKR (12 Kelas: 6 Kelas 11, 6 Kelas 12) =====
    { id: 13, jurusan: 'TKR', nama_kelas: 'TKR 11 A', wali_kelas: 'Maman Suherman', pembina: 'Surya Prabowo', kaprodi: 'Ir. Bambang Raharjo' },
    { id: 14, jurusan: 'TKR', nama_kelas: 'TKR 11 B', wali_kelas: 'Nisa Rahma', pembina: 'Surya Prabowo', kaprodi: 'Ir. Bambang Raharjo' },
    { id: 15, jurusan: 'TKR', nama_kelas: 'TKR 11 C', wali_kelas: 'Oka Pratama', pembina: 'Surya Prabowo', kaprodi: 'Ir. Bambang Raharjo' },
    { id: 16, jurusan: 'TKR', nama_kelas: 'TKR 11 D', wali_kelas: 'Pramono Adi', pembina: 'Surya Prabowo', kaprodi: 'Ir. Bambang Raharjo' },
    { id: 17, jurusan: 'TKR', nama_kelas: 'TKR 11 E', wali_kelas: 'Quentin Mustafa', pembina: 'Surya Prabowo', kaprodi: 'Ir. Bambang Raharjo' },
    { id: 18, jurusan: 'TKR', nama_kelas: 'TKR 11 F', wali_kelas: 'Ricky Wijaya', pembina: 'Surya Prabowo', kaprodi: 'Ir. Bambang Raharjo' },
    { id: 19, jurusan: 'TKR', nama_kelas: 'TKR 12 A', wali_kelas: 'Sandi Rahman', pembina: 'Surya Prabowo', kaprodi: 'Ir. Bambang Raharjo' },
    { id: 20, jurusan: 'TKR', nama_kelas: 'TKR 12 B', wali_kelas: 'Tuti Sulistya', pembina: 'Surya Prabowo', kaprodi: 'Ir. Bambang Raharjo' },
    { id: 21, jurusan: 'TKR', nama_kelas: 'TKR 12 C', wali_kelas: 'Udin Sopardi', pembina: 'Surya Prabowo', kaprodi: 'Ir. Bambang Raharjo' },
    { id: 22, jurusan: 'TKR', nama_kelas: 'TKR 12 D', wali_kelas: 'Vina Setiawan', pembina: 'Surya Prabowo', kaprodi: 'Ir. Bambang Raharjo' },
    { id: 23, jurusan: 'TKR', nama_kelas: 'TKR 12 E', wali_kelas: 'Wahyu Prasetya', pembina: 'Surya Prabowo', kaprodi: 'Ir. Bambang Raharjo' },
    { id: 24, jurusan: 'TKR', nama_kelas: 'TKR 12 F', wali_kelas: 'Xena Kusuma', pembina: 'Surya Prabowo', kaprodi: 'Ir. Bambang Raharjo' },

    // ===== TAV (2 Kelas: 1 Kelas 11, 1 Kelas 12) =====
    { id: 25, jurusan: 'TAV', nama_kelas: 'TAV 11 A', wali_kelas: 'Yanuar Setiawan', pembina: 'Dwi Nugroho', kaprodi: 'Ing. Ridho Santoso' },
    { id: 26, jurusan: 'TAV', nama_kelas: 'TAV 12 A', wali_kelas: 'Yusuf Rahman', pembina: 'Dwi Nugroho', kaprodi: 'Ing. Ridho Santoso' },

    // ===== TITL (2 Kelas: 1 Kelas 11, 1 Kelas 12) =====
    { id: 27, jurusan: 'TITL', nama_kelas: 'TITL 11 A', wali_kelas: 'Zahra Putri', pembina: 'Eddy Hermanto', kaprodi: 'M. Tarwiyanto' },
    { id: 28, jurusan: 'TITL', nama_kelas: 'TITL 12 A', wali_kelas: 'Aziz Nurmadhi', pembina: 'Eddy Hermanto', kaprodi: 'M. Tarwiyanto' }
];
