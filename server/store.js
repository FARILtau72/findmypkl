// ==========================================================================
// FIND MY PKL - IN-MEMORY STANDALONE DATA STORE
// Menggantikan koneksi database eksternal dengan data dummy mandiri.
// Seluruh fitur (Siswa, HUBIN, CRUD, Verifikasi, Logbook, dll) tetap bekerja 100%.
// ==========================================================================

function getInitialData() {
  const companies = [
    {
      id: 1,
      nama: 'PT Telkom Indonesia (Persero) Tbk',
      bidang: 'Telekomunikasi & Jaringan Digital',
      kategori_entitas: 'BUMN (Badan Usaha Milik Negara) & Tbk',
      tahun_berdiri: 1965,
      ukuran_karyawan: '25.000+ Karyawan',
      kota: 'Jakarta Pusat',
      alamat: 'Telkom Landmark Tower, Jl. Gatot Subroto No. 52, Jakarta Pusat',
      website: 'https://telkom.co.id',
      email_resmi: 'internship.hubin@telkom.co.id',
      pic_nama: 'Budi Santoso, S.T.',
      pic_kontak: '0811-2345-6789',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-TLK/2025/081',
      periode_mou: '2023 – 2026 (Diperpanjang Otomatis)',
      rating_dudi: 4.9,
      total_alumni_smk: 48,
      jurusan_prioritas: ['RPL', 'TITL'],
      jam_kerja: 'Senin – Jumat (08.00 – 17.00 WIB)',
      aturan_pakaian: 'Senin-Rabu: Seragam Praktik SMK / Kamis-Jumat: Kemeja Smart Casual',
      visi: 'Menjadi digital telco pilihan utama untuk memajukan kedaulatan dan masyarakat digital Indonesia.',
      misi: [
        'Mempercepat pembangunan infrastruktur dan platform digital cerdas nasional.',
        'Mengembangkan talenta vokasi muda unggul berstandar global melalui program kemitraan DUDI.',
        'Mengorkestrasi ekosistem digital demi memberikan nilai terbaik bagi bangsa.'
      ],
      budaya_kerja: [
        'AKHLAK (Amanah, Kompeten, Harmonis, Loyal, Adaptif, Kolaboratif)',
        'Digital First Mindset & Continuous Experimentation',
        'Budaya K3 Industri Telekomunikasi & Nol Insiden Kerja',
        'Mentorship Terstruktur 1-on-1 bersama Senior Principal Engineer'
      ],
      fasilitas_magang: [
        'Uang Saku Bulanan Kompetitif (Paid Internship)',
        'Workstation PC / Laptop Dedicated & Akses Lab Fiber Optic',
        'Makan Siang & Akses Kafetaria Karyawan Gratis',
        'Sertifikat Kompetensi Industri Resmi Bertaraf Nasional (BNSP & Telkom DigiSkills)',
        'Akses Penuh Akun Pembelajaran Digital Learning Center Telkom CorpU',
        'Ruang Rekreasi, Gym Center & Ruang Ibadah Representatif'
      ],
      tahapan_seleksi: [
        '1. Pengajuan Berkas NISN & Surat Pengantar Resmi BKK SMK Taruna Bangsa',
        '2. Tes Logika Pemrograman / Uji Kompetensi Dasar Jaringan Komputer',
        '3. Review Portofolio Git / Mini Project Teknis',
        '4. Onboarding, Safety Briefing K3 & Pembagian Mentor Divisi'
      ],
      logo_url: '/images/logos/telkom.svg',
      logo_initials: 'TLK',
      logo_color: '#E11D48',
      deskripsi: 'BUMN telekomunikasi terdepan di Indonesia penyedia layanan digital connectivity, platform cloud, dan smart services nasional yang telah menjadi mitra strategis SMK Taruna Bangsa.',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      nama: 'PT GoTo Gojek Tokopedia Tbk',
      bidang: 'Teknologi Informasi & E-Commerce',
      kategori_entitas: 'Tech Unicorn & Perusahaan Publik Tbk',
      tahun_berdiri: 2010,
      ukuran_karyawan: '5.000+ Karyawan',
      kota: 'Jakarta Selatan',
      alamat: 'Pasaraya Blok M Gedung B, Jl. Iskandarsyah II No. 2, Jakarta Selatan',
      website: 'https://gotocompany.com',
      email_resmi: 'early-careers@gotocompany.com',
      pic_nama: 'Maya Puspita, M.Kom.',
      pic_kontak: '0812-9876-5432',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-GOTO/2025/112',
      periode_mou: '2024 – 2027 (Kemitraan Vokasi Aktif)',
      rating_dudi: 4.8,
      total_alumni_smk: 36,
      jurusan_prioritas: ['RPL'],
      jam_kerja: 'Senin – Jumat (09.00 – 18.00 WIB / Flexible Hybrid)',
      aturan_pakaian: 'Casual Rapi, Bebas & Sopan (Tech Company Style)',
      visi: 'Mendorong kemajuan ekosistem ekonomi digital inklusif bagi seluruh masyarakat Indonesia.',
      misi: [
        'Membuka potensi talenta muda melalui inovasi teknologi on-demand dan e-commerce mutakhir.',
        'Mendukung vokasi SMK agar siap bersaing di industri teknologi kelas dunia.'
      ],
      budaya_kerja: [
        'Fast-Paced Agile Sprint & Scrum Ceremonies',
        'Radical Candor, Peer Code Review & Clean Architecture',
        'User Empathy & Data-Driven Decision Making',
        'Inklusif, Terbuka & Ramah bagi Siswa Magang Pemula'
      ],
      fasilitas_magang: [
        'Uang Saku Bulanan (Paid Tech Internship)',
        'Unit MacBook Pro / Laptop High-End untuk Praktik Harian',
        'Voucher Makan Siang GoFood & Diskon Ekosistem GoTo',
        'Sertifikat Magang Resmi Ditandatangani VP of Engineering',
        'Bimbingan Langsung Software Engineer & Tech Lead',
        'Akses Free Flow Kopi, Snack & Game Room Kantor Blok M'
      ],
      tahapan_seleksi: [
        '1. Sinkronisasi Akun NISN Siswa Terverifikasi di Portal FindMyPKL',
        '2. Coding Challenge / Review Repositori GitHub Siswa',
        '3. Technical Chat Bersama Software Engineer Mentor',
        '4. Penandatanganan NDA & Pembagian Akun Email Perusahaan'
      ],
      logo_url: '/images/logos/goto.svg',
      logo_initials: 'GOTO',
      logo_color: '#00AA13',
      deskripsi: 'Ekosistem digital terintegrasi terbesar di Indonesia yang menaungi layanan on-demand Gojek, e-commerce Tokopedia, dan GoTo Financial dengan rekayasa perangkat lunak berskala masif.',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      nama: 'PT Astra Honda Motor (AHM)',
      bidang: 'Otomotif & Manufaktur Presisi',
      kategori_entitas: 'Joint Venture Multinasional (Astra & Honda)',
      tahun_berdiri: 1971,
      ukuran_karyawan: '20.000+ Karyawan',
      kota: 'Bekasi',
      alamat: 'Kawasan Industri MM2100, Cikarang Barat, Bekasi, Jawa Barat',
      website: 'https://astra-honda.com',
      email_resmi: 'vokasi.bkk@astra-honda.com',
      pic_nama: 'Ir. Hendra Kusuma',
      pic_kontak: '0813-4567-8901',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-AHM/2024/045',
      periode_mou: '2022 – 2026 (Kelas Industri Resmi)',
      rating_dudi: 5.0,
      total_alumni_smk: 72,
      jurusan_prioritas: ['TKRO', 'TITL'],
      jam_kerja: 'Senin – Jumat (07.30 – 16.30 WIB / Sistem Shift Bengkel)',
      aturan_pakaian: 'Seragam Wearpack Praktik Otomotif Resmi & Safety Shoes K3',
      visi: 'Memimpin pasar sepeda motor di Indonesia dengan produk berkualitas tinggi berteknologi ramah lingkungan.',
      misi: [
        'Menciptakan solusi mobilitas masyarakat dengan teknologi otomotif terkini.',
        'Membangun standar kompetensi teknisi sepeda motor terunggul melalui kemitraan SMK rujukan.'
      ],
      budaya_kerja: [
        'Filosofi 5R (Ringkas, Rapi, Resik, Rawat, Rajin)',
        'Disiplin Waktu Presisi Tinggi & Kaizen (Perbaikan Tiada Henti)',
        'Standar Keselamatan Kerja K3 Terketat (Zero Accident Priority)',
        'Etika Bengkel Resmi AHASS & Keramahan Pelayanan Prima'
      ],
      fasilitas_magang: [
        'Uang Saku Harian & Insentif Kehadiran Penuh',
        'Set Perlengkapan APD Lengkap (Wearpack, Kacamata Safety, Sepatu Safety)',
        'Makan Siang Sehat Standar Gizi Pabrik / Bengkel Resmi',
        'Sertifikat Kompetensi Otomotif AHASS Resmi (Level Teknisi Muda)',
        'Akses Diagnostic Tool Honda HIDS & Scanner Injeksi PGM-FI Terbaru',
        'Peluang Jalur Cepat Rekrutmen Karyawan Tetap Pasca Kelulusan SMK'
      ],
      tahapan_seleksi: [
        '1. Rekomendasi Resmi BKK & Nilai Rapor Praktik Kejuruan TKRO/TITL',
        '2. Uji Fisik Dasar, Ketelitian & Tes Teori Sistem Kendaraan',
        '3. Simulasi Praktik Engine Tune-up & Troubleshooting Kelistrikan',
        '4. Medical Check-Up Singkat & Induksi Keselamatan Pabrik'
      ],
      logo_url: '/images/logos/ahm.svg',
      logo_initials: 'AHM',
      logo_color: '#DC2626',
      deskripsi: 'Pelopor industri sepeda motor di Indonesia dengan fasilitas manufaktur presisi modern dan jaringan bengkel resmi AHASS terbesar, mitra kelas industri unggulan SMK Taruna Bangsa Bekasi.',
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      nama: 'PT Bank Mandiri (Persero) Tbk',
      bidang: 'Perbankan & Layanan Keuangan',
      kategori_entitas: 'BUMN Perbankan Terbesar di Indonesia',
      tahun_berdiri: 1998,
      ukuran_karyawan: '35.000+ Karyawan',
      kota: 'Jakarta Pusat',
      alamat: 'Plaza Mandiri, Jl. Jend. Gatot Subroto Kav. 36-38, Jakarta Pusat',
      website: 'https://bankmandiri.co.id',
      email_resmi: 'it.internship@bankmandiri.co.id',
      pic_nama: 'Dewi Anggraini, S.E., Ak.',
      pic_kontak: '0815-6789-0123',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-MDR/2025/019',
      periode_mou: '2023 – 2026 (Program Magang BUMN)',
      rating_dudi: 4.8,
      total_alumni_smk: 29,
      jurusan_prioritas: ['RPL', 'TITL'],
      jam_kerja: 'Senin – Jumat (08.00 – 17.00 WIB)',
      aturan_pakaian: 'Kemeja Formal Berdasi / Blazer Kerja Sopan Perbankan',
      visi: 'Menjadi mitra finansial dan penyedia solusi teknologi perbankan digital pilihan utama bangsa.',
      misi: [
        'Menyediakan layanan perbankan digital Livin & Kopra by Mandiri yang andal dan aman.',
        'Mendorong generasi muda vokasi menjadi talenta digital perbankan yang berintegritas tinggi.'
      ],
      budaya_kerja: [
        'Integritas Tanpa Kompromi & Kerahasiaan Data Nasabah',
        'Ketelitian Tinggi dalam Tata Kelola Transaksi Finansial',
        'Keamanan Jaringan & Standar ISO Keamanan Sistem Perbankan',
        'Kolaborasi Profesional Lintas Departemen IT & Operasional'
      ],
      fasilitas_magang: [
        'Uang Saku Magang Bulanan Standar BUMN Resmi',
        'Akses Fasilitas IT Banking Operations & Server Data Room',
        'Tunjangan Makan & Akses Mandiri Club Lounge Karyawan',
        'Sertifikat Resmi Magang BUMN Bank Mandiri Corporate Secretary',
        'Pelatihan Literasi Keuangan & Security Banking Awareness',
        'Lingkungan Kantor Representatif Plaza Mandiri Gatot Subroto'
      ],
      tahapan_seleksi: [
        '1. Validasi NISN & Riwayat Disiplin Akademik SMK Taruna Bangsa',
        '2. Tes Kemampuan Dasar Numerik & Logika Database SQL',
        '3. Wawancara Integritas & Kesiapan Sikap Kerja Finansial',
        '4. Penandatanganan Pakta Integritas & Kerahasiaan Data Perbankan'
      ],
      logo_url: '/images/logos/mandiri.svg',
      logo_initials: 'BMRI',
      logo_color: '#1E3A8A',
      deskripsi: 'Salah satu bank BUMN terbesar di Indonesia dengan transformasi digital perbankan terdepan (Livin & Kopra) yang memberikan pembelajaran teknologi sistem enterprise nyata bagi siswa magang.',
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      nama: 'Kumata Animation Studio',
      bidang: 'Industri Kreatif & Animasi',
      kategori_entitas: 'Studio Animasi & IP Kreatif Mandiri',
      tahun_berdiri: 2006,
      ukuran_karyawan: '150-300 Karyawan',
      kota: 'Bandung',
      alamat: 'Jl. Ranggamalela No. 8, Dago, Bandung, Jawa Barat',
      website: 'https://kumatastudio.com',
      email_resmi: 'production@kumatastudio.com',
      pic_nama: 'Rian Pratama, S.Sn.',
      pic_kontak: '0817-1234-5678',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-KUM/2025/033',
      periode_mou: '2024 – 2027 (Kemitraan Industri Animasi)',
      rating_dudi: 4.9,
      total_alumni_smk: 31,
      jurusan_prioritas: ['TAV'],
      jam_kerja: 'Senin – Jumat (09.00 – 18.00 WIB)',
      aturan_pakaian: 'Casual Kreatif, Bebas Rapi & Nyaman untuk Berkarya',
      visi: 'Menciptakan karya intellectual property animasi kelas dunia dari talenta kreatif terbaik Indonesia.',
      misi: [
        'Memproduksi serial animasi berkualitas sinematik untuk platform lokal dan global.',
        'Menggembleng siswa SMK jurusan audio video menjadi artis animasi dan audio mixer profesional.'
      ],
      budaya_kerja: [
        'Kreativitas Tanpa Batas & Detail Visual Presisi',
        'Storytelling Kuat didukung Kualitas Tata Suara Terbaik',
        'Suasana Studio Hangat, Terbuka & Kolaboratif',
        'Mentorship Langsung oleh Sutradara & Animator Senior'
      ],
      fasilitas_magang: [
        'Uang Saku Magang Proyek Animasi Bulanan',
        'Drawing Pen Display Tablet (Wacom / Huion) & PC Workstation Render',
        'Akses Software Produksi Industri (ToonBoom, Blender, Adobe Premiere)',
        'Sertifikat Produksi IP Animasi Komersial',
        'Free Flow Camilan Sehat, Kopi Bandung & Area Santai Dago',
        'Portofolio Karya yang Diakui di Kredit Tayangan Resmi'
      ],
      tahapan_seleksi: [
        '1. Pengajuan Surat BKK & Link Showreel / Portofolio Gambar Siswa',
        '2. Art & Animation Test Singkat (Motion Test / Audio Dubbing)',
        '3. Review Hasil Karya Bersama Art Director',
        '4. Onboarding & Pengenalan Pipeline Studio Kumata'
      ],
      logo_url: '/images/logos/kumata.svg',
      logo_initials: 'KMT',
      logo_color: '#8B5CF6',
      deskripsi: 'Studio animasi independen Indonesia pemenang berbagai penghargaan bergengsi yang memproduksi serial animasi, efek visual, dan tata suara sinematik bersama talenta muda vokasi.',
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      nama: 'PT Dirgantara Indonesia (Persero)',
      bidang: 'Dirgantara & Rekayasa Mesin',
      kategori_entitas: 'BUMN Industri Pertahanan & Aerostruktur DEFEND ID',
      tahun_berdiri: 1976,
      ukuran_karyawan: '4.000+ Karyawan',
      kota: 'Bandung',
      alamat: 'Jl. Pajajaran No. 154, Bandung, Jawa Barat',
      website: 'https://indonesian-aerospace.com',
      email_resmi: 'diklat.vokasi@indonesian-aerospace.com',
      pic_nama: 'Dodi Firmansyah, S.T.',
      pic_kontak: '0818-8765-4321',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-PTDI/2024/090',
      periode_mou: '2023 – 2026 (MoU Industri Kedirgantaraan)',
      rating_dudi: 5.0,
      total_alumni_smk: 54,
      jurusan_prioritas: ['TITL', 'TKRO'],
      jam_kerja: 'Senin – Jumat (07.00 – 16.00 WIB)',
      aturan_pakaian: 'Seragam Khusus Hangar PTDI, Rompi Visibilitas & Safety Shoes K3',
      visi: 'Menjadi industri kedirgantaraan terkemuka di pasar regional Asia Pasifik dengan mengutamakan kemandirian bangsa.',
      misi: [
        'Memproduksi pesawat terbang dan komponen aerostruktur berstandar aviasi internasional.',
        'Membangun generasi teknisi muda kelistrikan dan mesin dengan disiplin kedirgantaraan tingkat tinggi.'
      ],
      budaya_kerja: [
        'Aviation Safety First (Nol Toleransi terhadap Kesalahan Teknis)',
        'Disiplin Prosedural Manual Maintenance Standar Militer/Sipil',
        'Integritas Tinggi dalam Pencatatan Logbook Komponen Pesawat',
        'Kerjasama Tim Terstruktur di Kawasan Hanggar Perakitan'
      ],
      fasilitas_magang: [
        'Uang Saku Magang BUMN Dirgantara',
        'Akses Masuk Area Hanggar Pesawat CN-235 & N-219',
        'Makan Siang di Kantin Pusat Hanggar PTDI Bandung',
        'Sertifikat Pengalaman Perakitan & Kelistrikan Pesawat Resmi',
        'Pelatihan Standar Keselamatan Kerja Aviasi (Airworthiness Briefing)',
        'Kartu Akses Identitas Khusus Kawasan Terbatas Dirgantara'
      ],
      tahapan_seleksi: [
        '1. Seleksi Administrasi NISN & Rekomendasi Nilai Kelistrikan/Mesin',
        '2. Tes Fisik, Kebugaran & Tes Buta Warna (Wajib Bidang Aviasi)',
        '3. Wawancara Pemahaman Dasar Rangkaian Panel & Mekanikal Pesawat',
        '4. Security Clearance & Sumpah Kerahasiaan Industri Pertahanan'
      ],
      logo_url: '/images/logos/ptdi.svg',
      logo_initials: 'PTDI',
      logo_color: '#0284C7',
      deskripsi: 'Industri pesawat terbang kebanggaan nasional Indonesia yang merakit pesawat komersial, pesawat patroli maritim, dan komponen aerostruktur global dengan fasilitas hanggar manufaktur canggih.',
      created_at: new Date().toISOString()
    },
    {
      id: 7,
      nama: 'Paragon Technology and Innovation (Wardah Group)',
      bidang: 'Manufaktur Kosmetik & FMCG',
      kategori_entitas: 'Perusahaan FMCG Kosmetik Nasional No. 1',
      tahun_berdiri: 1985,
      ukuran_karyawan: '10.000+ Karyawan',
      kota: 'Tangerang',
      alamat: 'Kawasan Industri Jatake, Jl. Industri IV Blok AF No. 8, Tangerang, Banten',
      website: 'https://paragon-innovation.com',
      email_resmi: 'vokasi.csr@paragon-innovation.com',
      pic_nama: 'Fitri Handayani, S.Farm.',
      pic_kontak: '0819-2345-6780',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-PTI/2025/062',
      periode_mou: '2024 – 2027 (Kemitraan Vokasi Unggulan)',
      rating_dudi: 4.9,
      total_alumni_smk: 41,
      jurusan_prioritas: ['TITL', 'TKRO'],
      jam_kerja: 'Senin – Jumat (08.00 – 17.00 WIB)',
      aturan_pakaian: 'Jas Lab Bersih / Wearpack Manufaktur & Sepatu Safety Higienis',
      visi: 'Menjadi perusahaan yang berkomitmen untuk memiliki pengelolaan terbaik dan berkembang berkelanjutan bersama masyarakat.',
      misi: [
        'Memproduksi produk perawatan diri halal berkualitas tinggi standar global.',
        'Memberdayakan generasi muda vokasi dengan nilai ketuhanan, kekeluargaan, dan keteladanan.'
      ],
      budaya_kerja: [
        'Paragonian Core Values (Ketuhanan, Keteladanan, Kekeluargaan, Tanggung Jawab, Belajar Terus-menerus)',
        'Standar Higienitas Lab CPKB (Cara Pembuatan Kosmetika yang Baik)',
        'Otomasi Mesin Pengemasan & Pemeliharaan Panel Daya Pabrik',
        'Kepedulian Sosial & Lingkungan Kerja yang Sangat Sehat'
      ],
      fasilitas_magang: [
        'Uang Saku Bulanan Kompetitif + Paket Produk Perawatan Diri Bulanan',
        'Makan Siang Catering Sehat Bersertifikat Halal MUI',
        'Peralatan APD Lab Lengkap & Steril',
        'Sertifikat Kompetensi Pemeliharaan Mesin Manufaktur & Listrik Industri',
        'Akses Perpustakaan & Ruang Training Center Paragon Edukasi',
        'Peluang Ikatan Kerja Karyawan bagi Siswa Berprestasi'
      ],
      tahapan_seleksi: [
        '1. Pengajuan Surat Resmi BKK & Nilai Rapor Semester 1-4',
        '2. Tes Sikap Kerja, Ketelitian Logika & Psikotes Ringan',
        '3. Wawancara Budaya Perusahaan & Penempatan Unit Pabrik/Gudang',
        '4. Pengenalan Standar Sterilisasi Ruang Pabrik & Onboarding'
      ],
      logo_url: '/images/logos/paragon.svg',
      logo_initials: 'PTI',
      logo_color: '#0D9488',
      deskripsi: 'Perusahaan manufaktur kosmetik nasional terbesar yang menaungi brand kenamaan Wardah, Make Over, Emina, dan Kahf dengan standar lab modern dan otomatisasi industri berkelanjutan.',
      created_at: new Date().toISOString()
    },
    {
      id: 8,
      nama: 'PT Len Industri (Persero)',
      bidang: 'Elektronika Pertahanan & Sistem Kendali',
      kategori_entitas: 'Holding BUMN Industri Pertahanan DEFEND ID',
      tahun_berdiri: 1991,
      ukuran_karyawan: '3.000+ Karyawan',
      kota: 'Bandung',
      alamat: 'Jl. Soekarno Hatta No. 542, Bandung, Jawa Barat',
      website: 'https://len.co.id',
      email_resmi: 'sdm.pkl@len.co.id',
      pic_nama: 'Agus Setiawan, M.T.',
      pic_kontak: '0811-9876-1234',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-LEN/2024/104',
      periode_mou: '2023 – 2026 (MoU Sistem Kendali & Kereta Api)',
      rating_dudi: 4.8,
      total_alumni_smk: 44,
      jurusan_prioritas: ['TAV', 'TITL'],
      jam_kerja: 'Senin – Jumat (07.30 – 16.30 WIB)',
      aturan_pakaian: 'Seragam Praktik Wearpack Elektronika & Antistatik ESD Strap',
      visi: 'Menjadi penyedia solusi sistem elektronika terintegrasi kelas dunia terpercaya di bidang pertahanan dan energi.',
      misi: [
        'Mengembangkan teknologi persinyalan kereta api, sistem radar, dan panel surya nasional.',
        'Mendidik siswa kejuruan elektronika dan kelistrikan menguasai perakitan sistem kendali canggih.'
      ],
      budaya_kerja: [
        'Presisi Komponen Elektronika Mikro & Pengujian Ketat',
        'Standar Keselamatan ESD (Electrostatic Discharge Protection)',
        'Riset Sistem Kendali Terotomasi Tanpa Hambatan',
        'Nilai AKHLAK BUMN & Kebanggaan atas Karya Kemandirian Bangsa'
      ],
      fasilitas_magang: [
        'Uang Saku Bulanan Program Magang Bersertifikat BUMN',
        'Akses Lab Perakitan PCB, Osiloskop Digital & Ruang Kalibrasi',
        'Makan Siang di Resto Perusahaan PT Len Industri',
        'Sertifikat Kompetensi Sistem Elektronika & Instrumentasi Resmi',
        'Bimbingan Langsung oleh Tenaga Ahli Riset Elektronika Nasional',
        'Kunjungan Lapangan ke Jalur Persinyalan Kereta Cepat / LRT'
      ],
      tahapan_seleksi: [
        '1. Seleksi Berkas NISN & Rekomendasi Guru Pembimbing Kejuruan TAV/TITL',
        '2. Tes Teori Rangkaian Listrik AC/DC & Pembacaan Skema Elektronika',
        '3. Uji Praktik Solder Presisi & Pengukuran Multitester/Osiloskop',
        '4. Briefing Pengamanan Objek Vital Nasional & Induksi K3'
      ],
      logo_url: '/images/logos/len.svg',
      logo_initials: 'LEN',
      logo_color: '#3B82F6',
      deskripsi: 'Induk holding industri pertahanan DEFEND ID yang menguasai teknologi persinyalan perkeretaapian nasional, pembangkit listrik tenaga surya (PLTS), dan sistem navigasi kendali pertahanan udara.',
      created_at: new Date().toISOString()
    },
    {
      id: 9,
      nama: 'CV Kreatif Digital',
      bidang: 'Desain Komunikasi Visual & Agensi Kreatif',
      kategori_entitas: 'Creative Agency & Multiplatform Production House',
      tahun_berdiri: 2016,
      ukuran_karyawan: '50-100 Karyawan',
      kota: 'Surabaya',
      alamat: 'Jl. Pemuda No. 88, Surabaya, Jawa Timur',
      website: 'https://kreatifdigital.id',
      email_resmi: 'talent@kreatifdigital.id',
      pic_nama: 'Aditya Pratama, S.Ds.',
      pic_kontak: '0812-7788-9900',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-KD/2025/119',
      periode_mou: '2024 – 2027 (Kemitraan Studio Kreatif)',
      rating_dudi: 4.7,
      total_alumni_smk: 22,
      jurusan_prioritas: ['RPL', 'TAV'],
      jam_kerja: 'Senin – Jumat (09.00 – 17.30 WIB)',
      aturan_pakaian: 'Casual Creative, Kaus Kerah Sopan & Nyaman',
      visi: 'Membantu transformasi merek bisnis di Indonesia melalui solusi desain visual dan rekayasa web interaktif.',
      misi: [
        'Menciptakan identitas visual dan platform website berdaya pikat tinggi bagi puluhan korporasi.',
        'Membimbing siswa SMK menguasai alur kerja agensi digital dari riset hingga peluncuran aset.'
      ],
      budaya_kerja: [
        'Eksplorasi Desain Berani & Komposisi Warna Harmonis',
        'Kolaborasi Cepat antara UI/UX Designer & Frontend Developer',
        'Disiplin Tenggat Waktu (Deadlines) & Kepuasan Klien Korporasi',
        'Suasana Kerja Santai, Terbuka & Penuh Brainstorming Seru'
      ],
      fasilitas_magang: [
        'Uang Saku Bulanan Proyek Klien Agensi',
        'Monitor Dual Display Full HD & Workstation Desain',
        'Lisensi Resmi Adobe Creative Cloud & Figma Organization',
        'Sertifikat Portofolio Agensi Digital Resmi dengan Uraian Proyek',
        'Free Flow Kopi Espresso, Minuman Dingin & Snack Bar Harian',
        'Koleksi Buku Referensi Desain Global & Kursus Desain Premium'
      ],
      tahapan_seleksi: [
        '1. Pengajuan Akun NISN & Link Portofolio Desain / Karya Web Siswa',
        '2. Mini Design Challenge (Pembuatan Banner Promo / Slicing Landing Page)',
        '3. Diskusi Ide Kreatif & Wawancara Antusiasme Belajar',
        '4. Penugasan Mentor Pendamping & Pembagian Proyek Nyata'
      ],
      logo_url: '/images/logos/kreatif-digital.svg',
      logo_initials: 'KD',
      logo_color: '#F97316',
      deskripsi: 'Agensi branding, produksi video promosi, dan antarmuka web interaktif yang menangani puluhan klien perusahaan skala nasional dengan proses kerja terstruktur.',
      created_at: new Date().toISOString()
    },
    {
      id: 10,
      nama: 'PT Astra International Tbk',
      bidang: 'Konglomerasi Otomotif & Infrastruktur Digital',
      kategori_entitas: 'Konglomerasi Bisnis Terbesar di Bursa Efek Indonesia',
      tahun_berdiri: 1957,
      ukuran_karyawan: '180.000+ Karyawan di Seluruh Grup',
      kota: 'Jakarta Utara',
      alamat: 'Menara Astra Lt. 15, Jl. Jend. Sudirman Kav. 5-6, Jakarta Pusat',
      website: 'https://astra.co.id',
      email_resmi: 'vokasi.indonesia@astra.co.id',
      pic_nama: 'Bambang Irawan, M.B.A.',
      pic_kontak: '0813-1122-3344',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-ASTRA/2024/201',
      periode_mou: '2023 – 2026 (Program Link & Match Vokasi Astra)',
      rating_dudi: 5.0,
      total_alumni_smk: 65,
      jurusan_prioritas: ['TKRO', 'RPL'],
      jam_kerja: 'Senin – Jumat (08.00 – 17.00 WIB)',
      aturan_pakaian: 'Senin-Kamis: Formal Bisnis / Jumat: Batik Nusantara',
      visi: 'Menjadi salah satu perusahaan dengan pengelolaan terbaik di Asia Pasifik dengan penekanan pada pertumbuhan berkelanjutan.',
      misi: [
        'Sejahtera bersama bangsa dengan memberikan nilai terbaik kepada para pemangku kepentingan.',
        'Menjadi pelopor pengembangan pendidikan vokasi SMK di seluruh pelosok Indonesia.'
      ],
      budaya_kerja: [
        'Catur Dharma Astra (Bermanfaat bagi Bangsa, Pelayanan Terbaik, Saling Menghargai, Mencapai yang Terbaik)',
        'Etika Bisnis Tingkat Tinggi & Standar Mutu Kelas Dunia',
        'Penerapan Kaizen & Manajemen Mutu Terpadu',
        'Disiplin, Profesionalisme & Kepedulian terhadap Masa Depan Siswa'
      ],
      fasilitas_magang: [
        'Uang Saku Standar Grup Astra + Tunjangan Transportasi Harian',
        'Akses Kantor Megah Menara Astra Sudirman & Laboratorium Inovasi',
        'Makan Siang Buffet di Cafeteria Menara Astra',
        'Sertifikat Magang Prestisius PT Astra International Tbk',
        'Sesi Mentorship Eksklusif bersama Pimpinan Divisi Astra',
        'Prioritas Khusus Rekrutmen Jalur Vokasi Grup Astra (Auto2000, AHM, Astra Otoparts)'
      ],
      tahapan_seleksi: [
        '1. Seleksi Ketat Rapor BKK & Tes Potensi Akademik Vokasi',
        '2. Uji Psikotes Komprehensif Karakter Kerja Astra',
        '3. Wawancara Panel HRD & User Manager Divisi',
        '4. Onboarding Nasional Pengenalan Catur Dharma & Budaya Astra'
      ],
      logo_url: '/images/logos/astra.svg',
      logo_initials: 'ASTRA',
      logo_color: '#2563EB',
      deskripsi: 'Salah satu grup usaha terbesar di Indonesia dengan portofolio terkemuka di bidang otomotif, jasa keuangan, dan teknologi informasi yang memiliki program pembinaan SMK rujukan nasional.',
      created_at: new Date().toISOString()
    },
    {
      id: 11,
      nama: 'Glow Design Studio',
      bidang: 'Motion Graphics, Video & Ilustrasi Digital',
      kategori_entitas: 'Boutique Animation & Visual Production Studio',
      tahun_berdiri: 2018,
      ukuran_karyawan: '40-80 Karyawan',
      kota: 'Yogyakarta',
      alamat: 'Jl. Kaliurang Km 7, Sleman, D.I. Yogyakarta',
      website: 'https://glowdesign.studio',
      email_resmi: 'hello@glowdesign.studio',
      pic_nama: 'Annisa Rahmawati, M.Sn.',
      pic_kontak: '0819-5566-7788',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-GDS/2025/088',
      periode_mou: '2024 – 2027 (Kemitraan Industri Kreatif Jogja)',
      rating_dudi: 4.8,
      total_alumni_smk: 26,
      jurusan_prioritas: ['TAV'],
      jam_kerja: 'Senin – Jumat (09.00 – 17.00 WIB)',
      aturan_pakaian: 'Casual Nyaman, Sopan & Bersepatu',
      visi: 'Menghadirkan narasi visual animasi dan motion design berkelas bagi brand global dari jantung budaya Yogyakarta.',
      misi: [
        'Menghasilkan karya animasi komersial dan visual branding dengan standar estetika sinematik.',
        'Membentuk talenta audio video SMK agar mahir memadukan visual motion dengan sound design yang memukau.'
      ],
      budaya_kerja: [
        'Sense of Design & Kepekaan Irama Audio Visual',
        'Kolaborasi Terbuka tanpa Hierarki yang Kaku',
        'Apresiasi Tinggi terhadap Ide & Eksperimen Visual Unik',
        'Pemberian Feedback Membangun secara Berkala untuk Portofolio Siswa'
      ],
      fasilitas_magang: [
        'Uang Saku Magang Proyek Animasi Digital Bulanan',
        'PC Spesifikasi Tinggi (GPU RTX 4070, RAM 64GB) & Pen Display',
        'Akses Software Lengkap (After Effects, DaVinci Resolve Studio, Cinema 4D)',
        'Sertifikat Portofolio Motion & Video Editor Berstandar Agensi Internasional',
        'Suasana Studio Teduh Asri Jogja, Snack Bar Gratis & Tempat Rehat Luas',
        'Peluang Menjadi Artis Kontrak Lepas (Freelance) Pasca Magang'
      ],
      tahapan_seleksi: [
        '1. Pengajuan NISN Siswa & Portofolio Karya Video/Animasi/Ilustrasi',
        '2. Review Portofolio & Tes Kerapihan Timeline Editing Video',
        '3. Wawancara Santai Eksplorasi Selera Seni & Software yang Dikuasai',
        '4. Onboarding, Pengenalan Tim Kreatif & Penerimaan Proyek Latihan'
      ],
      logo_url: '/images/logos/glow-design.svg',
      logo_initials: 'GD',
      logo_color: '#A855F7',
      deskripsi: 'Studio animasi butik di Yogyakarta yang memproduksi motion graphic komersial, visual branding, dan efek tata suara dengan portofolio klien agensi dalam maupun luar negeri.',
      created_at: new Date().toISOString()
    },
    {
      id: 12,
      nama: 'PT Solusi Data Indonesia',
      bidang: 'Software House & Cloud Enterprise Solutions',
      kategori_entitas: 'Penyedia Solusi Teknologi Enterprise & Cloud',
      tahun_berdiri: 2015,
      ukuran_karyawan: '200-400 Karyawan',
      kota: 'Bandung',
      alamat: 'Dago Cyber Hub Lt. 4, Jl. Ir. H. Juanda No. 120, Bandung, Jawa Barat',
      website: 'https://solusidata.co.id',
      email_resmi: 'career-intern@solusidata.co.id',
      pic_nama: 'Rizky Firmansyah, S.Kom.',
      pic_kontak: '0821-4455-6677',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-SDI/2025/074',
      periode_mou: '2023 – 2026 (Kerjasama Rekayasa Perangkat Lunak)',
      rating_dudi: 4.9,
      total_alumni_smk: 38,
      jurusan_prioritas: ['RPL', 'TITL'],
      jam_kerja: 'Senin – Jumat (08.30 – 17.30 WIB / Fleksibel)',
      aturan_pakaian: 'Smart Casual Rapi (Kemeja/Polo Shirt)',
      visi: 'Menjadi akselerator transformasi digital perusahaan terdepan melalui arsitektur cloud dan rekayasa data modern.',
      misi: [
        'Membangun sistem informasi enterprise berkinerja tinggi yang aman, skalabel, dan efisien.',
        'Membimbing siswa SMK rekayasa perangkat lunak menguasai standar backend API dan DevOps nyata.'
      ],
      budaya_kerja: [
        'Clean Code, Test-Driven Development (TDD) & Dokumentasi Rapi',
        'DevOps Automation, CI/CD Pipeline & Monitoring Sistem Real-Time',
        'Kultur Berbagi Ilmu (Tech Sharing Biweekly) & Mentorship Terbuka',
        'Disiplin Manajemen Repositori Git & Keamanan Informasi'
      ],
      fasilitas_magang: [
        'Uang Saku Bulanan Paid Developer Internship',
        'Laptop Kerja dengan Setup Linux / macOS Lengkap',
        'Akun Cloud Sandbox Gratis (AWS / Google Cloud / Docker Environment)',
        'Sertifikat Resmi Software Engineer Internship dengan Nilai Kompetensi Riil',
        'Free Flow Kopi Berkualitas, Snack & Makan Siang Hari Kerja',
        'Akses Perpustakaan O\'Reilly & Kursus Arsitektur Software Online'
      ],
      tahapan_seleksi: [
        '1. Pengajuan Formulir BKK & Link Akun GitHub Siswa',
        '2. Tes Logika Backend & Pemrograman REST API Sederhana (Node.js/Express)',
        '3. Diskusi Pemecahan Masalah Bersama Senior Backend Lead',
        '4. Onboarding, Konfigurasi Git & Setup Lingkungan Praktik Kerja'
      ],
      logo_url: '/images/logos/solusi-data.svg',
      logo_initials: 'SDI',
      logo_color: '#06B6D4',
      deskripsi: 'Pengembang infrastruktur sistem informasi enterprise, REST API performa tinggi, dan analitik big data modern yang menjadi tempat tempaan unggul siswa rekayasa perangkat lunak.',
      created_at: new Date().toISOString()
    },
    {
      id: 13,
      nama: 'Ruang Media Kreatif',
      bidang: 'Digital Marketing & Social Media Production',
      kategori_entitas: 'Digital Agency & Rumah Produksi Konten Kreatif',
      tahun_berdiri: 2019,
      ukuran_karyawan: '50-120 Karyawan',
      kota: 'Malang',
      alamat: 'Jl. Ijen Boulevard No. 45, Malang, Jawa Timur',
      website: 'https://ruangmediakreatif.com',
      email_resmi: 'halo@ruangmediakreatif.com',
      pic_nama: 'Dimas Wicaksono, S.I.Kom.',
      pic_kontak: '0818-9900-1122',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-RMK/2025/096',
      periode_mou: '2024 – 2027 (Kemitraan Industri Media Digital)',
      rating_dudi: 4.8,
      total_alumni_smk: 24,
      jurusan_prioritas: ['TAV', 'RPL'],
      jam_kerja: 'Senin – Jumat (09.00 – 17.00 WIB)',
      aturan_pakaian: 'Casual Sopan & Nyaman untuk Produksi Lapangan/Studio',
      visi: 'Membantu brand bertumbuh secara viral dan otentik melalui visual konten kreatif yang bernilai tinggi.',
      misi: [
        'Memproduksi video sinematik vertikal (Reels, TikTok, Shorts) dan kampanye digital multiplatform.',
        'Membekali siswa kejuruan audio video dengan keterampilan kamera dan editing video kekinian.'
      ],
      budaya_kerja: [
        'Responsif terhadap Tren Viral & Pola Konsumsi Audiens',
        'Eksplorasi Sudut Pandang Kamera & Pencahayaan Studio Inovatif',
        'Proses Produksi Cepat, Tangkas & Mengedepankan Kualitas Tata Suara',
        'Kekeluargaan yang Erat & Kebersamaan Tim Produksi yang Dinamis'
      ],
      fasilitas_magang: [
        'Uang Saku Magang Produksi Konten Bulanan',
        'Akses Kamera Mirrorless Sony Alpha, Lensa Sinema & Rig Gimbal',
        'Studio Syuting Khusus dengan Tata Lampu RGB & Audio Lavalier Wireless',
        'Sertifikat Resmi Content Creator & Video Editor Industri Kreatif',
        'Makan Siang & Tunjangan Konsumsi saat Syuting di Luar Studio',
        'Portofolio Video Komersial Nyata yang Ditonton Ratusan Ribu Audiens'
      ],
      tahapan_seleksi: [
        '1. Pengajuan Surat BKK & Tautan Portofolio Video / Akun Kreator Siswa',
        '2. Uji Coba Pengambilan Gambar & Editing Video 30 Detik',
        '3. Wawancara Pemahaman Tren Media Sosial & Kerjasama Tim',
        '4. Onboarding, Pengenalan Peralatan Studio & Pembagian Jadwal Syuting'
      ],
      logo_url: '/images/logos/ruang-media.svg',
      logo_initials: 'RMK',
      logo_color: '#EC4899',
      deskripsi: 'Creative house media sosial yang memproduksi konten video komersial, kampanye digital multiplatform, dan visual kreatif dengan studio produksi lengkap di kota Malang.',
      created_at: new Date().toISOString()
    }
  ];

  const students = [
    {
      id: 1,
      nisn: '0061829101',
      nama: 'Ahmad Fauzi',
      email: 'ahmad.fauzi@siswa.smk.belajar.id',
      jurusan: 'Rekayasa Perangkat Lunak (RPL)',
      jurusan_short: 'RPL',
      kelas: 'XII RPL 1',
      sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      no_hp: '0812-8877-6655',
      cv_url: 'https://drive.google.com/file/d/ahmad-fauzi-cv/view',
      status_verifikasi: 'Terverifikasi',
      catatan_verifikasi: 'Data NISN dan Rapor semester 1-4 telah divalidasi oleh HUBIN.',
      created_at: new Date(Date.now() - 86400000 * 30).toISOString()
    },
    {
      id: 2,
      nisn: '0061829102',
      nama: 'Siti Rahma Azzahra',
      email: 'siti.rahma@siswa.smk.belajar.id',
      jurusan: 'Teknik Audio Video (TAV)',
      jurusan_short: 'TAV',
      kelas: 'XII TAV 1',
      sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      no_hp: '0813-7766-5544',
      cv_url: 'https://drive.google.com/file/d/siti-rahma-cv/view',
      status_verifikasi: 'Menunggu Verifikasi',
      catatan_verifikasi: 'Menunggu pengecekan kelengkapan surat izin orang tua dan nilai rapor.',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: 3,
      nisn: '0061829103',
      nama: 'Farhan Pratama',
      email: 'farhan.pratama@siswa.smk.belajar.id',
      jurusan: 'Teknik Instalasi Tenaga Listrik (TITL)',
      jurusan_short: 'TITL',
      kelas: 'XII TITL 1',
      sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      no_hp: '0815-5544-3322',
      cv_url: 'https://drive.google.com/file/d/farhan-titl-porto/view',
      status_verifikasi: 'Terverifikasi',
      catatan_verifikasi: 'Portofolio perakitan instalasi listrik dan keselamatan kerja PUIL lengkap.',
      created_at: new Date(Date.now() - 86400000 * 25).toISOString()
    },
    {
      id: 4,
      nisn: '0061829104',
      nama: 'Bayu Nugroho',
      email: 'bayu.nugroho@siswa.smk.belajar.id',
      jurusan: 'Teknik Kendaraan Ringan Otomotif (TKRO)',
      jurusan_short: 'TKRO',
      kelas: 'XII TKRO 1',
      sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      no_hp: '0817-4433-2211',
      cv_url: 'https://drive.google.com/file/d/bayu-nugroho-cv/view',
      status_verifikasi: 'Terverifikasi',
      catatan_verifikasi: 'Sertifikasi K3 Otomotif valid.',
      created_at: new Date(Date.now() - 86400000 * 20).toISOString()
    },
    {
      id: 5,
      nisn: '0061829105',
      nama: 'Nurul Indah Permata',
      email: 'nurul.indah@siswa.smk.belajar.id',
      jurusan: 'Teknik Instalasi Tenaga Listrik (TITL)',
      jurusan_short: 'TITL',
      kelas: 'XII TITL 2',
      sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      no_hp: '0818-3322-1100',
      cv_url: 'https://drive.google.com/file/d/nurul-indah-cv/view',
      status_verifikasi: 'Terverifikasi',
      catatan_verifikasi: 'Sertifikat kompetensi kelistrikan terlampir.',
      created_at: new Date(Date.now() - 86400000 * 18).toISOString()
    },
    {
      id: 6,
      nisn: '0061829106',
      nama: 'Reza Aditya Putra',
      email: 'reza.aditya@smktarunabangsa.sch.id',
      jurusan: 'Rekayasa Perangkat Lunak (RPL)',
      jurusan_short: 'RPL',
      kelas: 'XI RPL 1',
      sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      no_hp: '0819-2211-0099',
      cv_url: 'https://github.com/reza-aditya',
      status_verifikasi: 'Perlu Perbaikan',
      catatan_verifikasi: 'HUBIN meminta kamu memperbaiki beberapa data: Nomor WhatsApp tidak dapat dihubungi dan tautan berkas CV/Portofolio belum dapat diakses. Mohon perbarui kontak dan berkas Anda.',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 7,
      nisn: '0061829107',
      nama: 'Clara Anindya',
      email: 'clara.anindya@siswa.smk.belajar.id',
      jurusan: 'Teknik Audio Video (TAV)',
      jurusan_short: 'TAV',
      kelas: 'XII TAV 2',
      sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      no_hp: '0821-1100-9988',
      cv_url: 'https://drive.google.com/file/d/clara-tav-porto/view',
      status_verifikasi: 'Ditolak',
      catatan_verifikasi: 'NISN tidak cocok dengan database Dapodik SMK Taruna Bangsa Kota Bekasi. Harap hubungi BKK/HUBIN sekolah.',
      created_at: new Date(Date.now() - 86400000 * 10).toISOString()
    },
    {
      id: 8,
      nisn: '0061829108',
      nama: 'Suhayel A. Nazim',
      email: 'suhayel.nazim@siswa.smk.belajar.id',
      jurusan: 'Rekayasa Perangkat Lunak (RPL)',
      jurusan_short: 'RPL',
      kelas: 'XI RPL 1',
      sekolah: 'SMKN 4 Malang',
      no_hp: '0812-3344-5566',
      cv_url: 'https://github.com/suhayel-nazim',
      status_verifikasi: 'Terverifikasi',
      catatan_verifikasi: 'Data pendaftaran dan verifikasi kejuruan telah disahkan oleh Koordinator HUBIN.',
      created_at: new Date(Date.now() - 86400000 * 20).toISOString()
    }
  ];

    const jobs = [
    // Page 1: 6 Showcase Mockup Jobs (Matching media_1788955152048.png)
    {
      id: 9,
      company_id: 1, // Telkom
      judul: 'Frontend Web Developer',
      jurusan_target: 'Rekayasa Perangkat Lunak (RPL)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Malang, Jawa Timur',
      kuota: 6,
      kuota_terisi: 2,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '2 hari lalu',
      major_code: 'RPL',
      badge_color: 'green',
      tags: ['Full-time PKL', 'Hybrid schedule'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Fasilitas Laptop'],
      deskripsi: 'Membangun antarmuka web interaktif menggunakan Vue.js/React, integrasi REST API, dan optimalisasi performa portal digital TelkomGroup.',
      kualifikasi: 'Siswa SMK jurusan RPL, menguasai HTML, CSS, JavaScript, dasar Git, serta memiliki portofolio web sederhana.',
      benefit: 'Uang saku bulanan Rp 1.5 - 2.5 jt, sertifikat resmi industri, bimbingan mentor senior engineer.',
      status: 'Buka',
      deadline: '2026-10-30',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 10,
      company_id: 9, // CV Kreatif Digital
      judul: 'UI/UX & Multimedia Creator',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFH',
      work_schedule: 'Flexible schedule',
      lokasi_kota: 'Surabaya, Jawa Timur',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '4 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['Remote / WFH', 'Flexible schedule'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Merancang wireframe, user flow, visual mockup aplikasi mobile/web menggunakan Figma, serta desain aset media sosial agensi.',
      kualifikasi: 'Siswa SMK jurusan DKV/Multimedia, menguasai Figma dan Adobe Illustrator/Photoshop, kreatif dan melek tren visual digital.',
      benefit: 'Uang saku Rp 1.2 - 1.8 jt/bln, jam kerja fleksibel WFH, akses aset premium Envato/Freepik.',
      status: 'Buka',
      deadline: '2026-10-28',
      created_at: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
      id: 11,
      company_id: 10, // Astra International
      judul: 'Teknisi Instalasi Tenaga Listrik & IT Hardware',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Jakarta Utara, DKI',
      kuota: 5,
      kuota_terisi: 2,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '1 minggu lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Maintenance hardware kantor, instalasi LAN/WLAN, troubleshooting sistem operasi Windows/Linux, serta asistensi helpdesk karyawan Astra.',
      kualifikasi: 'Siswa SMK jurusan TKJ, memahami perakitan PC, crimping kabel UTP, konfigurasi MikroTik dasar, komunikatif dan sigap.',
      benefit: 'Uang saku Rp 1.8 - 2.8 jt/bln, makan siang katering gratis, seragam dinas Astra, sertifikat pengalaman korporasi Astra.',
      status: 'Buka',
      deadline: '2026-11-05',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: 12,
      company_id: 11, // Glow Design Studio
      judul: 'Motion & Audio Video Creator',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFH',
      work_schedule: 'Flexible schedule',
      lokasi_kota: 'Yogyakarta, DIY',
      kuota: 3,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '5 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['WFH / Remote', 'Flexible schedule'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Membuat animasi 2D, motion grafis untuk iklan produk, editing video pendek reels/TikTok, serta rendering animasi komersial.',
      kualifikasi: 'Siswa SMK DKV/Multimedia/Animasi, menguasai Adobe After Effects dan Premiere Pro, memiliki portofolio video showreel.',
      benefit: 'Uang saku bulanan, kerja full remote, sertifikat resmi studio kreatif.',
      status: 'Buka',
      deadline: '2026-10-25',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: 13,
      company_id: 12, // Solusi Data Indonesia
      judul: 'Junior Backend & API Developer',
      jurusan_target: 'Rekayasa Perangkat Lunak (RPL)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '1 hari lalu',
      major_code: 'RPL',
      badge_color: 'green',
      tags: ['Full-time PKL', 'Hybrid schedule'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Fasilitas Laptop'],
      deskripsi: 'Mengembangkan endpoint API menggunakan Node.js/PHP Laravel, pengelolaan basis data relational, serta dokumentasi API Postman.',
      kualifikasi: 'Siswa SMK RPL, menguasai dasar database SQL/MySQL, pemahaman RESTful API, logika algoritma baik.',
      benefit: 'Uang saku Rp 1.6 - 2.4 jt/bln, mentoring intensif tech lead, peminjaman laptop kerja.',
      status: 'Buka',
      deadline: '2026-11-10',
      created_at: new Date(Date.now() - 86400000 * 1).toISOString()
    },
    {
      id: 14,
      company_id: 13, // Ruang Media Kreatif
      judul: 'Broadcast Video & Content Production',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Malang, Jawa Timur',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '3 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['Full-time PKL', 'On-site kantor'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Merencanakan konten mingguan brand, shooting konten video pendek, copy-writing caption, dan analisis insight engagement media sosial.',
      kualifikasi: 'Siswa SMK aktif, percaya diri di depan kamera, update tren media sosial terkini, mampu menggunakan CapCut/Canva/Photoshop.',
      benefit: 'Uang saku bulanan, sertifikat agensi digital, makan siang gratis saat shooting, bonus performa konten viral.',
      status: 'Buka',
      deadline: '2026-10-22',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },

    // Page 2: Jobs 15 - 20
    {
      id: 15,
      company_id: 2, // GoTo
      judul: 'Junior React & Web Frontend Engineer',
      jurusan_target: 'Rekayasa Perangkat Lunak (RPL)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Jakarta Selatan, DKI',
      kuota: 5,
      kuota_terisi: 2,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '4 hari lalu',
      major_code: 'RPL',
      badge_color: 'green',
      tags: ['Full-time PKL', 'Fasilitas Laptop'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Fasilitas Laptop'],
      deskripsi: 'Mengembangkan komponen UI React.js pada web seller Tokopedia dan portal merchant GoBiz bersama tim engineering GoTo.',
      kualifikasi: 'Siswa SMK jurusan RPL, menguasai HTML5, CSS3, ES6 JavaScript, familiar dengan Git/GitHub.',
      benefit: 'Uang saku bulanan Rp 1.8 - 2.6 jt, peminjaman laptop ThinkPad, sertifikat magang resmi GoTo.',
      status: 'Buka',
      deadline: '2026-11-15',
      created_at: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
      id: 16,
      company_id: 3, // AHM
      judul: 'Teknisi Perakitan Presisi & Robotika Otomotif',
      jurusan_target: 'Teknik Kendaraan Ringan (TKRO), TBSM',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Bekasi, Jawa Barat',
      kuota: 6,
      kuota_terisi: 2,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '5 hari lalu',
      major_code: 'TKRO',
      badge_color: 'red',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Praktik langsung perakitan sistem injeksi PGM-FI, tune-up berkala, inspeksi rem ABS, dan pengawasan lini robotika pabrik AHM Cikarang.',
      kualifikasi: 'Jurusan TKRO/TBSM, nilai praktik kejuruan minimal 80, sehat jasmani, taat SOP 5R.',
      benefit: 'Uang saku, seragam teknisi safety Astra, makan siang katering gratis, sertifikat AHASS resmi.',
      status: 'Buka',
      deadline: '2026-11-20',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: 17,
      company_id: 4, // Bank Mandiri
      judul: 'Teknisi Instalasi Panel Listrik Gedung',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Jakarta Pusat, DKI',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '6 hari lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['On-site kantor', 'Sertifikat Resmi'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Membantu rekonsiliasi data transaksi harian cabang, pengarsipan berkas legal debitur, dan pengoperasian spreadsheet akuntansi.',
      kualifikasi: 'Siswa SMK jurusan AKL, menguasai Excel (VLOOKUP, PivotTable), rapi dan berintegritas.',
      benefit: 'Uang saku bulanan, sertifikat PKL resmi dari Bank Mandiri Corporate Secretary, pelatihan perbankan digital.',
      status: 'Buka',
      deadline: '2026-11-12',
      created_at: new Date(Date.now() - 86400000 * 6).toISOString()
    },
    {
      id: 18,
      company_id: 5, // Kumata Studio
      judul: '2D Animator & Digital Audio Visual Artist',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '3 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['Hybrid schedule', 'Fasilitas Tablet'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Fasilitas Laptop'],
      deskripsi: 'Membuat animasi in-between, background art, dan asset prop untuk serial animasi televisi anak di studio Kumata.',
      kualifikasi: 'Siswa SMK jurusan DKV/Multimedia/Animasi, menguasai Adobe Photoshop atau Clip Studio Paint, memiliki portofolio gambar.',
      benefit: 'Credit title serial animasi, bimbingan langsung art director, uang saku bulanan.',
      status: 'Buka',
      deadline: '2026-11-08',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 19,
      company_id: 6, // PTDI
      judul: 'CAD Drafter & Aircraft Component Inspector',
      jurusan_target: 'Teknik Kendaraan Ringan (TKRO), Pemesinan',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 3,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '1 minggu lalu',
      major_code: 'TKRO',
      badge_color: 'red',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Membantu pemodelan komponen aerostruktur pesawat N219 menggunakan CAD 3D, inspeksi toleransi logam presisi, kalibrasi alat ukur.',
      kualifikasi: 'Memahami dasar CAD/AutoCAD/SolidWorks, mampu membaca gambar teknik ISO, disiplin tinggi.',
      benefit: 'Pengalaman berharga di industri pesawat terbang nasional, sertifikat resmi PTDI, ID Card BUMN.',
      status: 'Buka',
      deadline: '2026-11-18',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: 20,
      company_id: 7, // Paragon
      judul: 'Broadcast & Creative Video Editor',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Tangerang, Banten',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '5 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['On-site kantor', 'Paket Produk'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Merancang visual display booth kecantikan Wardah/Make Over di modern trade dan materi banner promosi e-commerce.',
      kualifikasi: 'Siswa SMK DKV, terampil Adobe Illustrator & Photoshop, memahami komposisi warna dan tata letak retail visual.',
      benefit: 'Uang saku bulanan, sertifikat magang resmi Paragon Group, goodie bag produk Wardah/Kahf.',
      status: 'Buka',
      deadline: '2026-11-14',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },

    // Page 3: Jobs 21 - 26
    {
      id: 21,
      company_id: 8, // Len Industri
      judul: 'Teknisi IoT & Sistem Sinyal Listrik Kereta Api',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '6 hari lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['On-site kantor', 'Holding BUMN'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Pemasangan modul IoT sensor, wiring kabel transmisi interlocking sinyal perkeretaapian PT KAI, dan testing PCB kontrol.',
      kualifikasi: 'Siswa SMK jurusan TKJ/Elektronika, memahami konsep jaringan kabel data, rangkaian PCB, cermat dan disiplin.',
      benefit: 'Sertifikat industri dari holding DEFEND ID, uang saku dan seragam teknisi Len.',
      status: 'Buka',
      deadline: '2026-11-22',
      created_at: new Date(Date.now() - 86400000 * 6).toISOString()
    },
    {
      id: 22,
      company_id: 1, // Telkom
      judul: 'Teknisi Daya & Kelistrikan Data Center',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Surabaya, Jawa Timur',
      kuota: 4,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '2 hari lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['Hybrid schedule', 'Fasilitas Laptop'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Fasilitas Laptop'],
      deskripsi: 'Monitoring server data center Telkom Cloud, konfigurasi Linux Debian/Ubuntu server, automasi backup, dan DNS management.',
      kualifikasi: 'Siswa SMK TKJ, memahami CLI Linux, dasar virtualization/Docker, dan protokol jaringan TCP/IP.',
      benefit: 'Uang saku bulanan, sertifikat resmi Telkom Corp University, akses lab cloud computing.',
      status: 'Buka',
      deadline: '2026-11-16',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 23,
      company_id: 9, // CV Kreatif Digital
      judul: 'Fullstack Web Developer Intern',
      jurusan_target: 'Rekayasa Perangkat Lunak (RPL)',
      tipe_kerja: 'WFH',
      work_schedule: 'Flexible schedule',
      lokasi_kota: 'Malang, Jawa Timur',
      kuota: 3,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '3 hari lalu',
      major_code: 'RPL',
      badge_color: 'green',
      tags: ['Remote / WFH', 'Flexible schedule'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Membangun website CMS klien menggunakan Laravel/Node.js dan Tailwind CSS, integrasi payment gateway Midtrans.',
      kualifikasi: 'Siswa SMK RPL, menguasai PHP/JS, MySQL, dasar framework modern, mandiri dan komunikatif.',
      benefit: 'Uang saku Rp 1.4 - 2.2 jt, full WFH bebas domisili, sertifikat proyek klien agensi.',
      status: 'Buka',
      deadline: '2026-11-09',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 24,
      company_id: 11, // Glow Design Studio
      judul: '3D Asset & Visual Modeler',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFH',
      work_schedule: 'Flexible schedule',
      lokasi_kota: 'Yogyakarta, DIY',
      kuota: 3,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '4 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['WFH / Remote', 'Flexible schedule'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Membuat model 3D low-poly dan high-poly untuk game mobile, texturing, dan rendering scene produk menggunakan Blender 3D.',
      kualifikasi: 'Siswa SMK jurusan DKV/Multimedia/Animasi, menguasai Blender 3D, memahami topology dan UV unwrapping.',
      benefit: 'Uang saku bulanan, portofolio game komersial, bimbingan 3D supervisor profesional.',
      status: 'Buka',
      deadline: '2026-11-19',
      created_at: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
      id: 25,
      company_id: 12, // Solusi Data Indonesia
      judul: 'Mobile Flutter & Android App Developer',
      jurusan_target: 'Rekayasa Perangkat Lunak (RPL)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '1 hari lalu',
      major_code: 'RPL',
      badge_color: 'green',
      tags: ['Full-time PKL', 'Fasilitas Laptop'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Fasilitas Laptop'],
      deskripsi: 'Mengembangkan aplikasi mobile berbasis Flutter (Android/iOS) untuk modul logistik dan absensi QR code klien korporat.',
      kualifikasi: 'Siswa SMK RPL, menguasai dasar bahasa Dart/Flutter, pemahaman state management Provider/Bloc, logika kuat.',
      benefit: 'Uang saku Rp 1.7 - 2.6 jt/bln, peminjaman laptop kerja, mentoring intensif mobile lead.',
      status: 'Buka',
      deadline: '2026-11-25',
      created_at: new Date(Date.now() - 86400000 * 1).toISOString()
    },
    {
      id: 26,
      company_id: 13, // Ruang Media Kreatif
      judul: 'Videographer & Audio Mixing Editor',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Surabaya, Jawa Timur',
      kuota: 3,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '5 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Shooting video company profile, podcast studio, color grading, dan audio mixing menggunakan Premiere Pro & DaVinci Resolve.',
      kualifikasi: 'Siswa SMK DKV/Multimedia, memahami dasar kamera mirrorless/DSLR, audio mic lavalier, dan lighting dasar.',
      benefit: 'Uang saku, makan siang gratis saat shooting, sertifikat resmi agensi media.',
      status: 'Buka',
      deadline: '2026-11-17',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },

    // Page 4: Jobs 27 - 32
    {
      id: 27,
      company_id: 10, // Astra International
      judul: 'Otomasi Industri & Sistem Kelistrikan Pabrik',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Jakarta Pusat, DKI',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '2 hari lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Menganalisis log firewall Fortinet, vulnerability scanning sistem internal, serta edukasi cyber hygiene karyawan Astra.',
      kualifikasi: 'Siswa SMK TKJ/RPL yang memiliki ketertarikan tinggi pada info-sec, dasar Wireshark, dan ethical hacking.',
      benefit: 'Uang saku kompetitif, makan siang katering Astra, sertifikat pengalaman korporat bergengsi.',
      status: 'Buka',
      deadline: '2026-11-28',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 28,
      company_id: 2, // GoTo
      judul: 'QA Mobile App Automation Tester',
      jurusan_target: 'Rekayasa Perangkat Lunak (RPL)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Jakarta Selatan, DKI',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '3 hari lalu',
      major_code: 'RPL',
      badge_color: 'green',
      tags: ['Hybrid schedule', 'Fasilitas Laptop'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Fasilitas Laptop'],
      deskripsi: 'Menulis script automation test menggunakan Cypress/Appium pada alur pemesanan GoFood dan checkout Tokopedia.',
      kualifikasi: 'Siswa SMK RPL, menguasai JavaScript dasar, teliti dan detail dalam mengamati error log aplikasi.',
      benefit: 'Uang saku Rp 1.8 - 2.5 jt, laptop kerja MacBook, sertifikat magang resmi GoTo Academy.',
      status: 'Buka',
      deadline: '2026-11-21',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 29,
      company_id: 4, // Bank Mandiri
      judul: 'Teknisi Distribusi Tenaga Listrik & Panel Trafo',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Bekasi, Jawa Barat',
      kuota: 4,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '5 hari lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['On-site kantor', 'Sertifikat Resmi'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Verifikasi dokumen pembukaan rekening merchant Mandiri EDC, pencatatan arus kas operasional kantor cabang Bekasi.',
      kualifikasi: 'Siswa SMK AKL, menguasai Excel, berkepribadian santun, cermat dan teliti.',
      benefit: 'Uang saku bulanan, sertifikat PKL resmi Bank Mandiri, lingkungan kerja perbankan BUMN.',
      status: 'Buka',
      deadline: '2026-11-15',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: 30,
      company_id: 3, // AHM
      judul: 'Mekanik Servis Berkala & Diagnosa Mesin Injeksi',
      jurusan_target: 'Teknik Kendaraan Ringan (TKRO), TBSM',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Bekasi, Jawa Barat',
      kuota: 5,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '4 hari lalu',
      major_code: 'TKRO',
      badge_color: 'red',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Mengoperasikan Honda Diagnostic System (HDS) untuk membaca sensor ECU, servis CVT, penggantian kampas rem dan pelumas resmi AHM.',
      kualifikasi: 'Siswa SMK jurusan TKRO/TBSM, memiliki kemauan belajar servis mekanik modern.',
      benefit: 'Seragam kerja bengkel resmi AHASS, makan siang gratis, sertifikat teknisi Honda.',
      status: 'Buka',
      deadline: '2026-11-24',
      created_at: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
      id: 31,
      company_id: 5, // Kumata Studio
      judul: 'Storyboard & Audio Visual Development',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFH',
      work_schedule: 'Flexible schedule',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 3,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '6 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['WFH / Remote', 'Flexible schedule'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Menggambar visual storyboard adegan film animasi, merancang sinematografi kamera, pose dinamis karakter.',
      kualifikasi: 'Siswa SMK DKV/Animasi, memahami prinsip dasar animasi 12 principles, storytelling visual baik.',
      benefit: 'Uang saku, sertifikat industri animasi, karya tayang di platform streaming.',
      status: 'Buka',
      deadline: '2026-11-11',
      created_at: new Date(Date.now() - 86400000 * 6).toISOString()
    },
    {
      id: 32,
      company_id: 7, // Paragon
      judul: 'Teknisi Instrumentasi Listrik & Kontrol QC',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Tangerang, Banten',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '1 minggu lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['On-site kantor', 'Paket Produk'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Dokumentasi batch record pengolahan kosmetik, audit kepatuhan CPKB, dan analisis data stabilitas formula produk.',
      kualifikasi: 'Siswa SMK aktif, teliti, menguasai pengarsipan data spreadsheet dan laporan operasional.',
      benefit: 'Uang saku bulanan, sertifikat CPKB awareness, paket produk perawatan wajah.',
      status: 'Buka',
      deadline: '2026-11-13',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },

    // Page 5: Jobs 33 - 38
    {
      id: 33,
      company_id: 1, // Telkom
      judul: 'Teknisi Jaringan Fiber Optik & Transmisi Sinyal',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Malang, Jawa Timur',
      kuota: 5,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '2 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Praktik splicing kabel serat optik di Optical Distribution Point (ODP), pengukuran redaman OTDR, dan aktivasi IndiHome.',
      kualifikasi: 'Siswa SMK TKJ, memahami kabel FO, teliti menyambung kabel kaca mikron, siap kerja tim lapangan.',
      benefit: 'Uang saku bulanan, uang makan/transport, sertifikat sertifikasi teknisi Telkom Akses.',
      status: 'Buka',
      deadline: '2026-11-26',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 34,
      company_id: 12, // Solusi Data Indonesia
      judul: 'Database Administrator & SQL Data Analyst',
      jurusan_target: 'Rekayasa Perangkat Lunak (RPL)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 4,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '3 hari lalu',
      major_code: 'RPL',
      badge_color: 'green',
      tags: ['Hybrid schedule', 'Fasilitas Laptop'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Fasilitas Laptop'],
      deskripsi: 'Merancang query PostgreSQL/MySQL untuk dashboard laporan analitik data penjualan, automasi ETL cron job data.',
      kualifikasi: 'Siswa SMK RPL, menguasai query SQL (JOIN, GROUP BY, Indexing), logika analitis tajam.',
      benefit: 'Uang saku Rp 1.6 - 2.4 jt, fasilitas laptop, sertifikat portfolio database engineer.',
      status: 'Buka',
      deadline: '2026-11-20',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 35,
      company_id: 9, // CV Kreatif Digital
      judul: 'Scriptwriter & Audio Podcast Creator',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFH',
      work_schedule: 'Flexible schedule',
      lokasi_kota: 'Surabaya, Jawa Timur',
      kuota: 3,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '5 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['Remote / WFH', 'Flexible schedule'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Menulis naskah konten edukasi Instagram, caption promosi TikTok, dan riset kata kunci SEO artikel blog brand.',
      kualifikasi: 'Siswa SMK aktif, suka menulis dan merangkai kata persuasif, up-to-date budaya pop digital.',
      benefit: 'Uang saku bulanan, fleksibel full WFH, portofolio digital copywriter.',
      status: 'Buka',
      deadline: '2026-11-15',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: 36,
      company_id: 11, // Glow Design Studio
      judul: 'Digital Audio Visual & UI Motion Specialist',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFH',
      work_schedule: 'Flexible schedule',
      lokasi_kota: 'Yogyakarta, DIY',
      kuota: 3,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '4 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['WFH / Remote', 'Flexible schedule'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Menyusun token warna, tipografi, komponen tombol, dan autolayout Figma untuk design system aplikasi mobile modern.',
      kualifikasi: 'Siswa SMK DKV, mahir fitur AutoLayout, Components & Variants di Figma.',
      benefit: 'Uang saku bulanan, sertifikat UI designer, showcase portofolio Dribbble/Behance.',
      status: 'Buka',
      deadline: '2026-11-18',
      created_at: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
      id: 37,
      company_id: 8, // Len Industri
      judul: 'Asisten Perakitan Solar Cell & Panel Tenaga Listrik Surya',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '1 minggu lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['On-site kantor', 'Holding BUMN'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Inspeksi sel fotovoltaik surya, pengujian tegangan open-circuit multimeter digital, dan soldering rangkaian inverter.',
      kualifikasi: 'Siswa SMK TKJ/Elektronika, memahami alat ukur kelistrikan, teliti dan patuh keselamatan kerja K3.',
      benefit: 'Uang saku bulanan, sertifikat resmi Len Industri DEFEND ID, seragam teknisi lab.',
      status: 'Buka',
      deadline: '2026-11-23',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: 38,
      company_id: 13, // Ruang Media Kreatif
      judul: 'Creative Video & Digital Media Creator',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Malang, Jawa Timur',
      kuota: 3,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '3 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Merancang layout materi iklan billboard LED kota, flyer promosi, dan packaging merchandise brand ternama.',
      kualifikasi: 'Siswa SMK DKV, menguasai Illustrator & Photoshop, memahami format warna cetak CMYK dan resolusi DPI.',
      benefit: 'Uang saku bulanan, makan siang gratis di studio, sertifikat desainer grafis.',
      status: 'Buka',
      deadline: '2026-11-12',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },

    // Page 6: Jobs 39 - 44
    {
      id: 39,
      company_id: 2, // GoTo
      judul: 'Associate Product Operations & User Flow Intern',
      jurusan_target: 'Rekayasa Perangkat Lunak (RPL)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Jakarta Selatan, DKI',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '2 hari lalu',
      major_code: 'RPL',
      badge_color: 'green',
      tags: ['Hybrid schedule', 'Fasilitas Laptop'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Fasilitas Laptop'],
      deskripsi: 'Membantu Product Manager menganalisis funnel registrasi mitra driver Gojek, validasi dokumen KYC, dan user journey mapping.',
      kualifikasi: 'Siswa SMK RPL/DKV, memiliki analytical thinking baik, terbiasa memakai Google Sheets/Docs.',
      benefit: 'Uang saku Rp 1.8 - 2.7 jt, laptop MacBook, sertifikat magang ekosistem digital terkemuka.',
      status: 'Buka',
      deadline: '2026-11-27',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 40,
      company_id: 10, // Astra International
      judul: 'Automotive Technical Training & Workshop Assistant',
      jurusan_target: 'Teknik Kendaraan Ringan (TKRO), TBSM',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Jakarta Utara, DKI',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '5 hari lalu',
      major_code: 'TKRO',
      badge_color: 'red',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Menyiapkan mesin peraga training otomotif di Astra Training Center, simulasi perbaikan transmisi otomatis, dan inventaris toolkit.',
      kualifikasi: 'Siswa SMK TKRO, bermotivasi tinggi, memahami komponen engine dasar mobil, disiplin.',
      benefit: 'Uang saku bulanan, makan siang katering Astra, sertifikat pengalaman korporasi Astra International.',
      status: 'Buka',
      deadline: '2026-11-22',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: 41,
      company_id: 4, // Bank Mandiri
      judul: 'Pemeliharaan Instalasi Kelistrikan Gedung & Genset',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Surabaya, Jawa Timur',
      kuota: 3,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '4 hari lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['On-site kantor', 'Sertifikat Resmi'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Penyusunan rekapitulasi bukti potong PPh 23/21, rekonsiliasi kas kecil cabang Surabaya, pencatatan jurnal umum.',
      kualifikasi: 'Siswa SMK AKL, menguasai dasar perpajakan dan akuntansi jurnal, rapi dan teliti.',
      benefit: 'Uang saku bulanan, sertifikat PKL resmi dari Bank Mandiri Kanwil Jawa Timur.',
      status: 'Buka',
      deadline: '2026-11-19',
      created_at: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
      id: 42,
      company_id: 6, // PTDI
      judul: 'Teknisi Kalibrasi Alat Ukur Presisi Pesawat',
      jurusan_target: 'Teknik Kendaraan Ringan (TKRO), Pemesinan',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 3,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '6 hari lalu',
      major_code: 'TKRO',
      badge_color: 'red',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Kalibrasi mikrometer sekrup, dial gauge, torque wrench standar penerbangan militer dan komersial PTDI.',
      kualifikasi: 'Siswa SMK TKRO/Pemesinan, terbiasa membaca alat ukur presisi skala 0.01mm, berintegritas tinggi.',
      benefit: 'Sertifikat resmi industri kedirgantaraan PTDI, makan siang disediakan, pengalaman berharga.',
      status: 'Buka',
      deadline: '2026-11-25',
      created_at: new Date(Date.now() - 86400000 * 6).toISOString()
    },
    {
      id: 43,
      company_id: 1, // Telkom
      judul: 'Teknisi Audio Video & Transmisi Siaran',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '3 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Menerima tiket gangguan internet korporat, monitoring status link routing BGP, dan koordinasi eskalasi teknisi lapangan.',
      kualifikasi: 'Siswa SMK TKJ, memahami konsep ping, traceroute, IP routing, komunikatif dan solutif.',
      benefit: 'Uang saku bulanan, sertifikat resmi industri dari Telkom Group, bimbingan senior engineer.',
      status: 'Buka',
      deadline: '2026-11-20',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 44,
      company_id: 5, // Kumata Studio
      judul: '3D Lighting, Audio Rendering & Compositing Intern',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 3,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '5 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['Hybrid schedule', 'Fasilitas Laptop'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Fasilitas Laptop'],
      deskripsi: 'Pengaturan tata cahaya adegan animasi 3D, rendering pass di Blender/Maya, dan compositing akhir di After Effects.',
      kualifikasi: 'Siswa SMK DKV/Animasi, memiliki pemahaman mood pencahayaan sinematik dan compositing visual.',
      benefit: 'Credit title di produksi animasi nasional, akses workstation studio Kumata, uang saku.',
      status: 'Buka',
      deadline: '2026-11-16',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },

    // Page 7: Jobs 45 - 50 (including original IDs 1 & 2 for backwards compatibility)
    {
      id: 45,
      company_id: 12, // Solusi Data Indonesia
      judul: 'WordPress & Modern CMS Web Administrator',
      jurusan_target: 'Rekayasa Perangkat Lunak (RPL)',
      tipe_kerja: 'WFH',
      work_schedule: 'Flexible schedule',
      lokasi_kota: 'Jakarta Pusat, DKI',
      kuota: 3,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '2 hari lalu',
      major_code: 'RPL',
      badge_color: 'green',
      tags: ['Remote / WFH', 'Flexible schedule'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Mengelola theme, plugin, caching, dan keamanan portal berita klien korporat berbasis WordPress & WooCommerce.',
      kualifikasi: 'Siswa SMK RPL, menguasai HTML, CSS, dasar PHP, dan pengoperasian dashboard CMS.',
      benefit: 'Uang saku bulanan, jam kerja fleksibel WFH, sertifikat resmi webmaster.',
      status: 'Buka',
      deadline: '2026-11-24',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 46,
      company_id: 9, // CV Kreatif Digital
      judul: 'Motion Graphic & Video Audio Production',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'WFH',
      work_schedule: 'Flexible schedule',
      lokasi_kota: 'Surabaya, Jawa Timur',
      kuota: 3,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '4 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['Remote / WFH', 'Flexible schedule'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Membuat animasi transisi, teks bergerak (kinetic typography), dan visual effects iklan promosi produk UMKM.',
      kualifikasi: 'Siswa SMK DKV, terampil Adobe After Effects & Premiere Pro, kreatif dan teliti.',
      benefit: 'Uang saku bulanan, bebas kerja remote di rumah, portofolio iklan video komersial.',
      status: 'Buka',
      deadline: '2026-11-17',
      created_at: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
      id: 47,
      company_id: 3, // AHM
      judul: 'Pemeriksa Kualitas Suku Cadang Honda Genuine Parts',
      jurusan_target: 'Teknik Kendaraan Ringan (TKRO), Pemesinan',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Bekasi, Jawa Barat',
      kuota: 4,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '3 hari lalu',
      major_code: 'TKRO',
      badge_color: 'red',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Pengujian ketahanan material kampas rem, piston, dan rantai transmisi motor Honda di laboratorium QC pabrik AHM Cikarang.',
      kualifikasi: 'Siswa SMK jurusan TKRO/Pemesinan, disiplin standar manufaktur Jepang, berfisik prima.',
      benefit: 'Uang saku bulanan, makan siang katering gratis, seragam dinas safety AHM.',
      status: 'Buka',
      deadline: '2026-11-26',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 48,
      company_id: 7, // Paragon
      judul: 'Teknisi Audio Akustik & Sound System Studio',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Tangerang, Banten',
      kuota: 3,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '5 hari lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['Hybrid schedule', 'Paket Produk'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Merancang pola jaring-jaring kemasan box skincare, visual label botol kosmetik ramah lingkungan, dan mock-up 3D produk.',
      kualifikasi: 'Siswa SMK DKV, menguasai Adobe Illustrator (Dieline Packaging) dan Photoshop.',
      benefit: 'Uang saku bulanan, paket kosmetik gratis, sertifikat kemitraan Paragon Group.',
      status: 'Buka',
      deadline: '2026-11-21',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: 1,
      company_id: 1, // Telkom
      judul: 'Teknisi Instalasi Tenaga Listrik & Gardu Distribusi',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Jakarta Pusat, DKI',
      kuota: 4,
      kuota_terisi: 2,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '1 minggu lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Membantu tim Network Operations Center (NOC) pemeliharaan perangkat fiber optic, konfigurasi switch/router TelkomGroup.',
      kualifikasi: 'Siswa SMK aktif jurusan TKJ, memahami konsep IP Subnetting, dasar routing switching Cisco/MikroTik.',
      benefit: 'Uang saku bulanan, sertifikat resmi industri Telkom Corp University, pendampingan mentor senior.',
      status: 'Buka',
      deadline: '2026-10-15',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: 2,
      company_id: 2, // GoTo
      judul: 'Junior Frontend Web & Mobile App Tester',
      jurusan_target: 'Rekayasa Perangkat Lunak (RPL)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Jakarta Selatan, DKI',
      kuota: 3,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '1 minggu lalu',
      major_code: 'RPL',
      badge_color: 'green',
      tags: ['Hybrid schedule', 'Fasilitas Laptop'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Fasilitas Laptop'],
      deskripsi: 'Terlibat langsung bersama Product Engineer Tokopedia & Gojek dalam pengujian fitur antarmuka web, penulisan test case manual.',
      kualifikasi: 'Memahami dasar HTML, CSS, JavaScript, teliti dalam menemukan bug visual antarmuka.',
      benefit: 'Uang saku kompetitif, peminjaman laptop kerja, sertifikat magang GoTo Academy.',
      status: 'Buka',
      deadline: '2026-10-30',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },

    // Page 8: Jobs 3 - 8 (Completes 48 jobs total, backwards-compatible with applications 3 & 4)
    {
      id: 3,
      company_id: 3, // AHM
      judul: 'Teknisi Mekanik Motor & Quality Control AHASS',
      jurusan_target: 'Teknik Kendaraan Ringan (TKRO), TBSM',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Bekasi, Jawa Barat',
      kuota: 5,
      kuota_terisi: 3,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '1 minggu lalu',
      major_code: 'TKRO',
      badge_color: 'red',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Praktik langsung perakitan sistem injeksi PGM-FI, tune-up berkala, inspeksi rem ABS bersama instruktur Honda Astra.',
      kualifikasi: 'Jurusan TKRO/TBSM, nilai praktik kejuruan minimal 80, sehat jasmani dan taat SOP 5R.',
      benefit: 'Seragam kerja bengkel resmi, toolkit mekanik lengkap, makan siang gratis, sertifikat AHASS.',
      status: 'Buka',
      deadline: '2026-10-20',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: 4,
      company_id: 4, // Bank Mandiri
      judul: 'Teknisi Panel Listrik Tenaga Surya & Genset Kantor',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Jakarta Pusat, DKI',
      kuota: 3,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '1 minggu lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['On-site kantor', 'Sertifikat Resmi'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Membantu rekonsiliasi data transaksi harian cabang, pengarsipan berkas legal debitur, dan verifikasi rekening aplikasi Livin.',
      kualifikasi: 'Menguasai Microsoft Excel (VLOOKUP, PivotTable), memiliki ketelitian tinggi dalam angka.',
      benefit: 'Uang saku bulanan, sertifikat PKL resmi dari Bank Mandiri Corporate Secretary.',
      status: 'Buka',
      deadline: '2026-10-10',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: 5,
      company_id: 5, // Kumata Studio
      judul: '2D Digital Illustrator & Audio Visual Artist',
      jurusan_target: 'Teknik Audio Video (TAV)',
      tipe_kerja: 'Hybrid',
      work_schedule: 'Hybrid schedule',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 3,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '1 minggu lalu',
      major_code: 'TAV',
      badge_color: 'purple',
      tags: ['Hybrid schedule', 'Fasilitas Tablet'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Fasilitas Laptop'],
      deskripsi: 'Membuat aset background lingkungan, color keying, asset prop 2D serial animasi anak bersama Art Director.',
      kualifikasi: 'Memiliki portofolio karya gambar digital, menguasai Adobe Photoshop/Clip Studio Paint.',
      benefit: 'Credit title di serial animasi nasional, mentoring animator profesional Kumata.',
      status: 'Buka',
      deadline: '2026-10-05',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: 6,
      company_id: 6, // PTDI
      judul: 'Drafter CAD & Pemeliharaan Komponen Aerostruktur Pesawat',
      jurusan_target: 'Teknik Kendaraan Ringan (TKRO), Pemesinan',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 2,
      kuota_terisi: 1,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '1 minggu lalu',
      major_code: 'TKRO',
      badge_color: 'red',
      tags: ['On-site kantor', 'Makan siang free'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi', 'Makan Siang Gratis'],
      deskripsi: 'Membantu pembacaan dan pemodelan gambar teknik pesawat N219 menggunakan CAD 3D, inspeksi toleransi dimensi komponen logam.',
      kualifikasi: 'Memahami dasar CAD/AutoCAD/SolidWorks, mampu membaca gambar teknik ISO, disiplin tinggi.',
      benefit: 'Pengalaman di industri pesawat terbang nasional, sertifikat resmi PTDI, ID Card BUMN.',
      status: 'Buka',
      deadline: '2026-10-25',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: 7,
      company_id: 7, // Paragon
      judul: 'Pemeliharaan Kelistrikan Pabrik & Otomasi Manufaktur',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Tangerang, Banten',
      kuota: 2,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Paid',
      waktu_rilis: '1 minggu lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['On-site kantor', 'Paket Produk'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Pengujian fisikokimia sampel produk lotion, sabun, dan makeup, pencatatan batch record standar CPKB BPOM.',
      kualifikasi: 'Siswa SMK aktif, terbiasa dengan alat laboratorium dan timbangan analitik, higienis tinggi.',
      benefit: 'Uang saku bulanan, sertifikat CPKB awareness, goodie bag produk bulanan.',
      status: 'Buka',
      deadline: '2026-10-18',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: 8,
      company_id: 8, // Len Industri
      judul: 'Asisten Perakitan Panel Surya & Instalasi Tenaga Listrik',
      jurusan_target: 'Teknik Instalasi Tenaga Listrik (TITL)',
      tipe_kerja: 'WFO',
      work_schedule: 'On-site kantor',
      lokasi_kota: 'Bandung, Jawa Barat',
      kuota: 2,
      kuota_terisi: 0,
      durasi_bulan: 6,
      uang_saku: 'Unpaid',
      waktu_rilis: '1 minggu lalu',
      major_code: 'TITL',
      badge_color: 'amber',
      tags: ['On-site kantor', 'Holding BUMN'],
      perks: ['Uang Saku Industri', 'Sertifikat Resmi'],
      deskripsi: 'Membantu proses soldering komponen SMD papan PCB sistem sinyal perkeretaapian dan pengujian daya sel surya fotovoltaik.',
      kualifikasi: 'Mampu menyolder rapi, memahami skema elektronika dasar, taat prosedur ESD.',
      benefit: 'Sertifikat magang holding DEFEND ID, pengalaman perakitan militer & perkeretaapian, uang saku.',
      status: 'Buka',
      deadline: '2026-11-01',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    }
  ];

  const applications = [
    {
      id: 1,
      student_id: 1, // Ahmad Fauzi
      job_id: 2, // GoTo
      tanggal_daftar: '2026-08-10',
      status: 'Diterima Perusahaan',
      catatan_hubin: 'Kualifikasi nilai kejuruan 92 sangat memadai. Surat pengantar No. 421.5/SMK-TB/HUBIN/VIII/2026 telah diterbitkan.',
      nomor_surat_pengantar: '421.5/SMK-TB/HUBIN/VIII/2026',
      catatan_perusahaan: 'Lolos wawancara teknis online. Selamat bergabung di tim Frontend Testing Tokopedia!',
      portofolio_url: 'https://github.com/ahmadfauzi-dev',
      alasan_melamar: 'Saya sangat ingin memperdalam ilmu pengujian software berskala jutaan pengguna dan berkontribusi langsung pada ekosistem digital Indonesia.',
      created_at: '2026-08-10T08:00:00.000Z'
    },
    {
      id: 2,
      student_id: 2, // Siti Rahma
      job_id: 1, // Telkom
      tanggal_daftar: '2026-09-01',
      status: 'Menunggu Verifikasi HUBIN',
      catatan_hubin: null,
      nomor_surat_pengantar: null,
      catatan_perusahaan: null,
      portofolio_url: 'https://drive.google.com/file/d/siti-cert/view',
      alasan_melamar: 'Ingin mengasah keterampilan praktis jaringan kabel optik dan konfigurasi router di perusahaan telekomunikasi terbesar Indonesia.',
      created_at: '2026-09-01T09:30:00.000Z'
    },
    {
      id: 3,
      student_id: 3, // Dimas Bagus
      job_id: 5, // Kumata
      tanggal_daftar: '2026-08-15',
      status: 'Diterima Perusahaan',
      catatan_hubin: 'Portofolio seni digital sangat kreatif dan sesuai standar industri animasi. Direkomendasikan penuh.',
      nomor_surat_pengantar: '421.5/SMK-TB/HUBIN/VIII/2028',
      catatan_perusahaan: 'Gaya gambar latar belakang sangat selaras dengan style serial animasi kami.',
      portofolio_url: 'https://behance.net/dimasbagusart',
      alasan_melamar: 'Cita-cita saya adalah menjadi visual artist serial animasi lokal yang mendunia bersama Kumata Studio.',
      created_at: '2026-08-15T10:15:00.000Z'
    },
    {
      id: 4,
      student_id: 4, // Bayu Nugroho
      job_id: 3, // AHM
      tanggal_daftar: '2026-08-18',
      status: 'Disetujui HUBIN',
      catatan_hubin: 'Berkas lengkap dan memenuhi syarat fisik. Berkas telah dikirimkan ke HRD PT Astra Honda Motor, menunggu konfirmasi jadwal wawancara.',
      nomor_surat_pengantar: '421.5/SMK-TB/HUBIN/VIII/2030',
      catatan_perusahaan: 'Menunggu jadwal tes fisik di bengkel AHASS Cikarang.',
      portofolio_url: 'https://drive.google.com/file/d/bayu-sertif/view',
      alasan_melamar: 'Ingin mendalami teknologi injeksi Honda PGM-FI terkini secara langsung di pusat bengkel resmi.',
      created_at: '2026-08-18T11:00:00.000Z'
    },
    {
      id: 5,
      student_id: 5, // Nurul Indah
      job_id: 4, // Bank Mandiri
      tanggal_daftar: '2026-08-20',
      status: 'Ditolak HUBIN',
      catatan_hubin: 'Kuota jurusan TITL untuk cabang ini telah penuh oleh rombel sebelumnya. Silakan ajukan ke mitra instalasi lain.',
      nomor_surat_pengantar: null,
      catatan_perusahaan: null,
      portofolio_url: 'https://drive.google.com/file/d/nurul-porto/view',
      alasan_melamar: 'Tertarik mendalami tata kelola sistem kelistrikan dan otomasi perkantoran.',
      created_at: '2026-08-20T13:45:00.000Z'
    }
  ];

  const placements = [
    {
      id: 1,
      student_id: 1, // Ahmad Fauzi (Aktif)
      company_id: 2, // GoTo
      job_id: 2,
      tanggal_mulai: '2026-08-15',
      tanggal_selesai: '2027-02-15',
      pembimbing_industri: 'Dimas Kurniawan (Senior QA Lead GoTo)',
      guru_pembimbing: 'Suhartono, S.Kom. (Guru Produktif RPL)',
      status: 'Aktif',
      nilai_industri: null,
      nilai_sekolah: null,
      sertifikat_no: null,
      catatan_evaluasi: 'Menunjukkan perkembangan pesat dalam menuliskan bug report dan pengujian UI.',
      created_at: '2026-08-15T09:00:00.000Z'
    },
    {
      id: 2,
      student_id: 3, // Dimas Bagus (Aktif)
      company_id: 5, // Kumata
      job_id: 5,
      tanggal_mulai: '2026-08-20',
      tanggal_selesai: '2027-02-20',
      pembimbing_industri: 'Rian Pratama (Art Director Kumata)',
      guru_pembimbing: 'Endang Sulastri, S.Pd. (Guru TAV)',
      status: 'Aktif',
      nilai_industri: null,
      nilai_sekolah: null,
      sertifikat_no: null,
      catatan_evaluasi: 'Aset visual yang dikerjakan sudah masuk tahap compositing episode 3.',
      created_at: '2026-08-20T10:00:00.000Z'
    },
    // Historical Alumni Placements (Selesai)
    {
      id: 3,
      student_id: 4, // Bayu Nugroho (Alumni historis angkatan 2025)
      company_id: 1, // Telkom
      job_id: 1,
      tanggal_mulai: '2025-07-01',
      tanggal_selesai: '2025-12-31',
      pembimbing_industri: 'Agung Wicaksono (Manager NOC Telkom)',
      guru_pembimbing: 'M. Ridwan, M.T. (Guru TITL)',
      status: 'Selesai',
      nilai_industri: 94,
      nilai_sekolah: 92,
      sertifikat_no: 'CERT/TLK-SMK/2025/1109',
      catatan_evaluasi: 'Sangat terampil dalam penyambungan splicing kabel fiber optik OTDR. Nilai A.',
      created_at: '2025-07-01T08:00:00.000Z'
    },
    {
      id: 4,
      student_id: 5, // Nurul Indah (Alumni historis)
      company_id: 4, // Bank Mandiri
      job_id: 4,
      tanggal_mulai: '2025-07-01',
      tanggal_selesai: '2025-12-31',
      pembimbing_industri: 'Dewi Anggraini (Head of Ops BMRI)',
      guru_pembimbing: 'Dra. Hj. Nurhayati (Guru TITL)',
      status: 'Selesai',
      nilai_industri: 96,
      nilai_sekolah: 95,
      sertifikat_no: 'CERT/BMRI-PKL/2025/084',
      catatan_evaluasi: 'Sangat teliti, tidak ada selisih kas rekonsiliasi selama bertugas. Diberikan sertifikat keunggulan.',
      created_at: '2025-07-01T08:00:00.000Z'
    }
  ];

  const logbooks = [
    {
      id: 1,
      placement_id: 1,
      tanggal: '2026-09-07',
      judul_kegiatan: 'Pengenalan Arsitektur Design System Tokopedia & Setup Environment',
      deskripsi_kegiatan: 'Mengikuti sesi orientasi bersama mentor tim Product Engineering. Mengunduh repository frontend testing, konfigurasi Node.js, dan memahami pedoman penulisan bug ticket di Jira.',
      kendala: 'Koneksi VPN kantor sempat lambat di pagi hari, sudah teratasi dengan konfigurasi DNS lokal.',
      status_verifikasi: 'Disetujui Pembimbing',
      created_at: '2026-09-07T16:00:00.000Z'
    },
    {
      id: 2,
      placement_id: 1,
      tanggal: '2026-09-08',
      judul_kegiatan: 'Manual Testing Alur Checkout Keranjang Belanja Mobile Web',
      deskripsi_kegiatan: 'Menjalankan skenario uji pembayaran dengan berbagai metode: GoPay, transfer virtual account, dan kartu kredit. Menemukan 1 glitch tombol checkout terpotong di layar iPhone SE.',
      kendala: 'Perlu verifikasi cross-browser di Safari iOS.',
      status_verifikasi: 'Disetujui Pembimbing',
      created_at: '2026-09-08T16:00:00.000Z'
    },
    {
      id: 3,
      placement_id: 1,
      tanggal: '2026-09-09',
      judul_kegiatan: 'Penyusunan Dokumentasi Test Case & Regresi Fitur Promo Voucher',
      deskripsi_kegiatan: 'Menuliskan 12 skenario pengujian voucher diskon flash sale. Melaporkan hasil evaluasi kepada Mentor Senior QA Lead.',
      kendala: 'Tidak ada kendala, kegiatan berjalan lancar.',
      status_verifikasi: 'Menunggu Review',
      created_at: '2026-09-09T14:00:00.000Z'
    }
  ];

  const reviews = [
    {
      id: 12,
      student_id: 11,
      student_nama: 'Arga Kurniawan',
      student_kelas: 'XII RPL 2',
      student_jurusan: 'Rekayasa Perangkat Lunak (RPL)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      alumni_label: 'Alumni RPL 2025',
      company_id: 9,
      company_nama: 'PT Media Kreatif Nusantara',
      posisi: 'Frontend Web Developer',
      completion_period: 'Selesai Nov 2025',
      rating: 4.0,
      ratings: { culture: 4.0, mentor: 4.5, allowance: 4.0, relevance: 4.5 },
      review_text: 'Supervisor ramah dan aktif memberi arahan harian. Suasana kantor kondusif untuk siswa PKL, serta tugas yang diberikan terstruktur.',
      pros: 'Supervisor komunikatif, arahan harian terarah, suasana kerja santai tapi produktif.',
      cons: 'Perlu disiplin tinggi dalam manajemen tugas sprint.',
      avatar_url: '/images/avatars/arga-kurniawan.png',
      helpful_count: 42,
      verified_pkl: true,
      created_at: '2025-11-20T10:00:00.000Z'
    },
    {
      id: 2,
      student_id: 4,
      student_nama: 'Bayu Nugroho',
      student_kelas: 'XII TKRO 1',
      student_jurusan: 'Teknik Kendaraan Ringan Otomotif (TKRO)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      alumni_label: 'Alumni TKRO 2025',
      company_id: 1,
      company_nama: 'PT Telkom Indonesia (Persero) Tbk',
      posisi: 'Frontend Web Developer & Jaringan Digital',
      completion_period: 'Selesai Agu 2025',
      rating: 5.0,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 5.0, relevance: 5.0 },
      review_text: 'Pengalaman magang 6 bulan di Telkom Indonesia sangat luar biasa! Kami diajari langsung oleh senior engineer tentang arsitektur jaringan skala nasional dan CI/CD pipeline modern. Mentor sangat sabar membimbing bahkan ketika kami masih canggung dengan Git workflow. Uang saku Rp 2.5 jt/bulan cair tepat waktu.',
      pros: 'Uang saku tepat waktu, mentor senior sangat membimbing, fasilitas laptop & VPN enterprise.',
      cons: 'Ritme sprint cukup cepat, harus rajin mencatat istilah teknis baru.',
      avatar_url: '/images/avatars/student-2.png',
      helpful_count: 38,
      verified_pkl: true,
      created_at: '2026-08-25T10:00:00.000Z'
    },
    {
      id: 3,
      student_id: 1,
      student_nama: 'Ahmad Fauzi',
      student_kelas: 'XII RPL 1',
      student_jurusan: 'Rekayasa Perangkat Lunak (RPL)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      alumni_label: 'Alumni RPL 2025',
      company_id: 2,
      company_nama: 'PT GoTo Gojek Tokopedia Tbk',
      posisi: 'QA & Frontend Testing Tokopedia',
      completion_period: 'Selesai Agu 2025',
      rating: 5.0,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 5.0, relevance: 5.0 },
      review_text: 'Lingkungan kerja di GoTo sangat inklusif dan ramah untuk siswa SMK. Kami tidak diperlakukan sekadar anak magang fotokopi, melainkan dilibatkan langsung menulis manual test cases untuk modul checkout Tokopedia. Belajar Jira, React, dan tools modern.',
      pros: 'Dapat pinjaman laptop MacBook, voucher GoFood tiap Jumat, budaya kerja egaliter tanpa senioritas.',
      cons: 'Komunikasi full via Slack dan Notion jadi butuh adaptasi dokumentasi yang rapi.',
      avatar_url: '/images/avatars/student-5.png',
      helpful_count: 45,
      verified_pkl: true,
      created_at: '2026-08-30T11:30:00.000Z'
    },
    {
      id: 4,
      student_id: 2,
      student_nama: 'Siti Rahma Azzahra',
      student_kelas: 'XII TAV 1',
      student_jurusan: 'Teknik Audio Video (TAV)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      alumni_label: 'Alumni TAV 2025',
      company_id: 9,
      company_nama: 'CV Kreatif Digital',
      posisi: 'UI/UX & Graphic Designer Intern',
      completion_period: 'Selesai Jul 2025',
      rating: 4.8,
      ratings: { culture: 5.0, mentor: 4.8, allowance: 4.5, relevance: 5.0 },
      review_text: 'Sangat menyenangkan untuk siswa yang ingin mendalami desain antarmuka digital dan creative agency. Klien-klien yang ditangani berskala nasional, sehingga portofolio saya setelah lulus langsung dilirik HRD.',
      pros: 'Jam kerja fleksibel (WFH friendly), akses akun Envato Elements & Figma Pro gratis.',
      cons: 'Revisi desain dari klien kadang mendadak di sore hari.',
      avatar_url: '/images/avatars/student-4.png',
      helpful_count: 27,
      verified_pkl: true,
      created_at: '2026-07-15T09:15:00.000Z'
    },
    {
      id: 5,
      student_id: 3,
      student_nama: 'Farhan Pratama',
      student_kelas: 'XII TITL 1',
      student_jurusan: 'Teknik Instalasi Tenaga Listrik (TITL)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      alumni_label: 'Alumni TITL 2025',
      company_id: 5,
      company_nama: 'Kumata Animation Studio',
      posisi: '2D Background Artist & Colorist',
      completion_period: 'Selesai Agu 2025',
      rating: 4.9,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 4.8, relevance: 5.0 },
      review_text: 'Bagi anak TAV dan Audio Visual, Kumata adalah tempat impian. Kita belajar standar pipeline produksi animasi dan editing video yang tayang di televisi internasional. Art Director selalu memberi feedback konstruktif setiap pagi saat daily standup.',
      pros: 'Display drawing pen tablet Wacom disediakan di studio, credit title di serial animasi resmi.',
      cons: 'Harus menjaga konsistensi color keying dan detail tinggi.',
      avatar_url: '/images/avatars/student-2.png',
      helpful_count: 31,
      verified_pkl: true,
      created_at: '2026-08-18T14:20:00.000Z'
    },
    {
      id: 6,
      student_id: 5,
      student_nama: 'Nurul Indah Permata',
      student_kelas: 'XII TITL 2',
      student_jurusan: 'Teknik Instalasi Tenaga Listrik (TITL)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      alumni_label: 'Alumni TITL 2025',
      company_id: 4,
      company_nama: 'PT Bank Mandiri (Persero) Tbk',
      posisi: 'Staf Administrasi Keuangan & Kliring Digital',
      completion_period: 'Selesai Jul 2025',
      rating: 4.8,
      ratings: { culture: 4.8, mentor: 5.0, allowance: 4.6, relevance: 5.0 },
      review_text: 'Selama 6 bulan di cabang Bank Mandiri, saya mengaplikasikan langsung rumus Excel tingkat lanjut, rekonsiliasi kas cabang, dan tata kelola arsip legal nasabah. Pembimbing sangat teliti dan selalu memotivasi kami untuk profesional.',
      pros: 'Sertifikat resmi bermaterai dari Bank Mandiri Corporate Secretary, uang saku stabil, lingkungan bank profesional.',
      cons: 'Standar ketelitian angka 100% tanpa toleransi selisih.',
      avatar_url: '/images/avatars/student-3.png',
      helpful_count: 22,
      verified_pkl: true,
      created_at: '2026-07-28T16:00:00.000Z'
    },
    {
      id: 7,
      student_id: 6,
      student_nama: 'Rizky Ramadhan',
      student_kelas: 'XII TKRO 1',
      student_jurusan: 'Teknik Kendaraan Ringan Otomotif (TKRO)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      alumni_label: 'Alumni TKRO 2025',
      company_id: 3,
      company_nama: 'PT Astra Honda Motor (AHM)',
      posisi: 'Teknisi Mekanik Motor & QC AHASS',
      completion_period: 'Selesai Agu 2025',
      rating: 4.9,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 4.8, relevance: 5.0 },
      review_text: 'Standar 5R Astra benar-benar membentuk kedisiplinan kerja saya. Praktik langsung servis motor injeksi PGM-FI dan overhaul mesin bersama instruktur bersertifikasi Astra Honda. Setelah magang langsung ditawari kontrak kerja!',
      pros: 'Makan siang katering gratis, toolkit mekanik lengkap, peluang rekrutmen kerja tinggi.',
      cons: 'Fisik harus prima karena berdiri dan bergerak aktif di area bengkel.',
      avatar_url: '/images/avatars/student-5.png',
      helpful_count: 34,
      verified_pkl: true,
      created_at: '2026-08-05T08:30:00.000Z'
    },
    {
      id: 8,
      student_id: 8,
      student_nama: 'Suhayel A. Nazim',
      student_kelas: 'XI RPL 1',
      student_jurusan: 'Rekayasa Perangkat Lunak (RPL)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      alumni_label: 'Alumni RPL 2025',
      company_id: 12,
      company_nama: 'PT Solusi Data Indonesia',
      posisi: 'Junior Backend & REST API Developer',
      completion_period: 'Selesai Sep 2025',
      rating: 5.0,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 5.0, relevance: 5.0 },
      review_text: 'Coding backend Laravel & Node.js yang selama ini cuma teori di sekolah, di sini bener-bener dipraktikkan untuk handle ratusan request per detik. Mentor tech lead meluangkan waktu 1 jam setiap hari untuk code review dan diskusi arsitektur API.',
      pros: 'Bimbingan 1-on-1 dengan Tech Lead, uang saku sangat kompetitif, kantor modern di Dago Cyber Hub.',
      cons: 'Perlu pemahaman logika basis data yang cukup kuat.',
      avatar_url: '/images/avatars/student-2.png',
      helpful_count: 19,
      verified_pkl: true,
      created_at: '2026-09-02T13:45:00.000Z'
    },
    {
      id: 9,
      student_id: 7,
      student_nama: 'Clara Anindya',
      student_kelas: 'XII TAV 2',
      student_jurusan: 'Teknik Audio Video (TAV)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      alumni_label: 'Alumni TAV 2025',
      company_id: 11,
      company_nama: 'Glow Design Studio',
      posisi: 'Motion Graphics & Reels Video Creator',
      completion_period: 'Selesai Sep 2025',
      rating: 4.8,
      ratings: { culture: 5.0, mentor: 4.8, allowance: 4.6, relevance: 5.0 },
      review_text: 'Kerja remote tapi komunikasi lancar banget lewat Discord. Bikin animasi reels dan bumper video untuk brand FMCG terkemuka. Hasil karya saya bisa langsung dipasang di portofolio Behance dan direspons sangat positif.',
      pros: 'Full remote WFH, jam kerja santai asal deadline terpenuhi, tim kreatif muda dan suportif.',
      cons: 'Render video butuh spesifikasi laptop yang cukup mumpuni.',
      avatar_url: '/images/avatars/student-4.png',
      helpful_count: 16,
      verified_pkl: true,
      created_at: '2026-09-04T15:10:00.000Z'
    },
    {
      id: 10,
      student_id: 9,
      student_nama: 'Farhan Putra Dirgantara',
      student_kelas: 'XII TKRO 2',
      student_jurusan: 'Teknik Kendaraan Ringan Otomotif (TKRO)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      alumni_label: 'Alumni TKRO 2025',
      company_id: 6,
      company_nama: 'PT Dirgantara Indonesia (Persero)',
      posisi: 'Drafter CAD & Pemeliharaan Aerostruktur',
      completion_period: 'Selesai Agu 2025',
      rating: 4.9,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 4.7, relevance: 5.0 },
      review_text: 'Bangga banget bisa magang di pabrik pesawat terbang PTDI Bandung. Membantu cek dimensi komponen aerostruktur pesawat N219. Disiplin keselamatan kerja nomor satu dan fasilitas laboratorium aerodinamika sangat megah.',
      pros: 'Pengalaman langka di industri kedirgantaraan, ID card BUMN resmi, sertifikat berharga tinggi.',
      cons: 'Lokasi hanggar sangat luas, perlu stamina prima.',
      avatar_url: '/images/avatars/student-5.png',
      helpful_count: 29,
      verified_pkl: true,
      created_at: '2026-08-12T10:00:00.000Z'
    },
    {
      id: 11,
      student_id: 10,
      student_nama: 'Anisa Putri Lestari',
      student_kelas: 'XII TITL 2',
      student_jurusan: 'Teknik Instalasi Tenaga Listrik (TITL)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      alumni_label: 'Alumni TITL 2025',
      company_id: 7,
      company_nama: 'Paragon Technology and Innovation (Wardah Group)',
      posisi: 'Quality Assurance Lab & Formulasi Kosmetik',
      completion_period: 'Selesai Agu 2025',
      rating: 4.8,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 4.8, relevance: 4.8 },
      review_text: 'Lingkungan kerja Paragon sangat kekeluargaan dan islami. Belajar uji viskositas, pH, dan uji kestabilan produk kosmetik Wardah & Make Over di lab berstandar internasional CPKB BPOM.',
      pros: 'Goodie bag produk bulanan, uang saku memuaskan, kultur kerja sangat positif.',
      cons: 'Harus mengenakan jas lab dan APD lengkap sepanjang hari.',
      avatar_url: '/images/avatars/student-3.png',
      helpful_count: 25,
      verified_pkl: true,
      created_at: '2026-08-20T11:00:00.000Z'
    }
  ];

  return {
    companies,
    students,
    jobs,
    applications,
    placements,
    logbooks,
    reviews,
    classes: CLASS_DATA
  };
}

const CLASS_DATA = [
  // ===== RPL (12 Kelas: 6 Kelas 11, 6 Kelas 12) =====
  { id: 1, jurusan: 'RPL', nama_kelas: 'RPL 11 A', wali_kelas: 'Budi Santoso', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
  { id: 2, jurusan: 'RPL', nama_kelas: 'RPL 11 B', wali_kelas: 'Siti Nurhaliza', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
  { id: 3, jurusan: 'RPL', nama_kelas: 'RPL 11 C', wali_kelas: 'Rini Dewi', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
  { id: 4, jurusan: 'RPL', nama_kelas: 'RPL 11 D', wali_kelas: 'Adi Suryanto', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
  { id: 5, jurusan: 'RPL', nama_kelas: 'RPL 11 E', wali_kelas: 'Eka Putra', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
  { id: 6, jurusan: 'RPL', nama_kelas: 'RPL 11 F', wali_kelas: 'Farah Amira', pembina: 'Ahmad Wijaya', kaprodi: 'Dr. Hendra Kusuma' },
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

class Store {
  constructor() {
    this.reset();
  }

  reset() {
    const data = getInitialData();
    this.companies = data.companies;
    this.students = data.students;
    this.jobs = data.jobs;
    this.applications = data.applications;
    this.placements = data.placements;
    this.logbooks = data.logbooks;
    this.reviews = data.reviews;
    this.favorites = {
      1: [9, 11]
    };
    this.printLogs = [];

    this.nextStudentId = Math.max(...this.students.map(s => s.id), 0) + 1;
    this.nextCompanyId = Math.max(...this.companies.map(c => c.id), 0) + 1;
    this.nextJobId = Math.max(...this.jobs.map(j => j.id), 0) + 1;
    this.nextAppId = Math.max(...this.applications.map(a => a.id), 0) + 1;
    this.nextPlacementId = Math.max(...this.placements.map(p => p.id), 0) + 1;
    this.nextLogbookId = Math.max(...this.logbooks.map(l => l.id), 0) + 1;
    this.nextReviewId = Math.max(...this.reviews.map(r => r.id), 0) + 1;
    this.classes = data.classes || CLASS_DATA;
  }

  // --- HEALTH & STATS ---
  getStats() {
    return {
      students_count: this.students.length,
      companies_count: this.companies.length,
      jobs_count: this.jobs.filter(j => j.status === 'Buka').length,
      applications_count: this.applications.length,
      active_placements_count: this.placements.filter(p => p.status === 'Aktif').length,
      alumni_count: this.placements.filter(p => p.status === 'Selesai').length,
      reviews_count: this.reviews.length,
      classes_count: this.classes.length
    };
  }

  // --- CLASSES (SMK TARUNA BANGSA) ---
  getClasses({ jurusan } = {}) {
    let list = [...this.classes];
    if (jurusan) {
      list = list.filter(c => c.jurusan.toUpperCase() === jurusan.toUpperCase());
    }
    return list;
  }

  getClassById(id) {
    return this.classes.find(c => c.id === Number(id)) || null;
  }

  // --- STUDENTS ---
  getStudents({ status, jurusan, search } = {}) {
    let list = [...this.students];
    if (status) {
      list = list.filter(s => s.status_verifikasi === status);
    }
    if (jurusan) {
      const q = jurusan.toLowerCase();
      list = list.filter(s => (s.jurusan || '').toLowerCase().includes(q));
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s =>
        (s.nama || '').toLowerCase().includes(q) ||
        (s.nisn || '').toLowerCase().includes(q) ||
        (s.email || '').toLowerCase().includes(q)
      );
    }
    return list;
  }

  getStudentById(id) {
    return this.students.find(s => s.id === Number(id)) || null;
  }

  addStudent({ nisn, nama, email, jurusan, kelas, no_hp, password, cv_url }) {
    const existing = this.students.find(s => s.nisn === nisn || s.email === email);
    if (existing) {
      throw new Error('NISN atau Email sudah terdaftar sebelumnya');
    }

    const newStudent = {
      id: this.nextStudentId++,
      nisn,
      nama,
      email,
      jurusan,
      kelas,
      no_hp: no_hp || '',
      password: password || '',
      cv_url: cv_url || '',
      status_verifikasi: 'Menunggu Verifikasi',
      catatan_verifikasi: 'Data kamu sedang diperiksa oleh HUBIN.',
      created_at: new Date().toISOString()
    };
    this.students.unshift(newStudent);
    return newStudent;
  }

  updateStudent(id, data) {
    const student = this.getStudentById(id);
    if (!student) throw new Error('Siswa tidak ditemukan');
    if (data.nama !== undefined) student.nama = data.nama;
    if (data.nisn !== undefined) student.nisn = data.nisn;
    if (data.email !== undefined) student.email = data.email;
    if (data.jurusan !== undefined) student.jurusan = data.jurusan;
    if (data.kelas !== undefined) student.kelas = data.kelas;
    if (data.no_hp !== undefined) student.no_hp = data.no_hp;
    if (data.cv_url !== undefined) student.cv_url = data.cv_url;
    if (data.password !== undefined) student.password = data.password;

    // If student was in 'Perlu Perbaikan', automatically resubmit to 'Menunggu Verifikasi'
    if (student.status_verifikasi === 'Perlu Perbaikan') {
      student.status_verifikasi = 'Menunggu Verifikasi';
      student.catatan_verifikasi = 'Perbaikan data telah diajukan kembali oleh siswa. Data kamu sedang diperiksa oleh HUBIN.';
    }
    return student;
  }

  verifyStudent(id, { status_verifikasi, catatan_verifikasi }) {
    const student = this.getStudentById(id);
    if (!student) throw new Error('Siswa tidak ditemukan');
    student.status_verifikasi = status_verifikasi;
    student.catatan_verifikasi = catatan_verifikasi || (status_verifikasi === 'Terverifikasi' ? 'Akun berhasil diverifikasi. Kamu sekarang dapat mencari dan mengajukan PKL.' : '');
    return student;
  }

  // --- COMPANIES ---
  getCompanies({ search, status_mou } = {}) {
    let list = this.companies.map(c => {
      const lowongan_aktif_count = this.jobs.filter(j => j.company_id === c.id && j.status === 'Buka').length;
      const siswa_aktif_count = this.placements.filter(p => p.company_id === c.id && p.status === 'Aktif').length;
      const alumni_count = this.placements.filter(p => p.company_id === c.id && p.status === 'Selesai').length;
      return {
        ...c,
        lowongan_aktif_count,
        siswa_aktif_count,
        alumni_count
      };
    });

    if (status_mou) {
      list = list.filter(c => c.status_mou === status_mou);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        (c.nama || '').toLowerCase().includes(q) ||
        (c.bidang || '').toLowerCase().includes(q) ||
        (c.kota || '').toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => a.id - b.id);
  }

  getCompanyById(id) {
    return this.companies.find(c => c.id === Number(id)) || null;
  }

  addCompany(data) {
    const words = data.nama.replace(/PT|CV|TBK|PERSERO|\(|\)|\./gi, '').trim().split(/\s+/);
    const logo_initials = words.slice(0, 3).map(w => w[0]).join('').toUpperCase() || 'MITRA';
    const colors = ['#1E40AF', '#059669', '#DC2626', '#8B5CF6', '#D97706', '#0284C7', '#0D9488'];
    const logo_color = colors[Math.floor(Math.random() * colors.length)];

    const newCompany = {
      id: this.nextCompanyId++,
      nama: data.nama,
      bidang: data.bidang,
      kota: data.kota,
      alamat: data.alamat,
      website: data.website || '',
      pic_nama: data.pic_nama,
      pic_kontak: data.pic_kontak,
      status_mou: data.status_mou || 'Aktif',
      no_mou: data.no_mou || `MOU/SMK/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      logo_url: data.logo_url || '/images/logos/default-company.svg',
      logo_initials,
      logo_color,
      deskripsi: data.deskripsi || '',
      created_at: new Date().toISOString()
    };
    this.companies.push(newCompany);
    return newCompany;
  }

  updateCompany(id, data) {
    const comp = this.getCompanyById(id);
    if (!comp) throw new Error('Perusahaan tidak ditemukan');
    Object.assign(comp, {
      nama: data.nama !== undefined ? data.nama : comp.nama,
      bidang: data.bidang !== undefined ? data.bidang : comp.bidang,
      kota: data.kota !== undefined ? data.kota : comp.kota,
      alamat: data.alamat !== undefined ? data.alamat : comp.alamat,
      website: data.website !== undefined ? data.website : comp.website,
      pic_nama: data.pic_nama !== undefined ? data.pic_nama : comp.pic_nama,
      pic_kontak: data.pic_kontak !== undefined ? data.pic_kontak : comp.pic_kontak,
      status_mou: data.status_mou !== undefined ? data.status_mou : comp.status_mou,
      no_mou: data.no_mou !== undefined ? data.no_mou : comp.no_mou,
      deskripsi: data.deskripsi !== undefined ? data.deskripsi : comp.deskripsi
    });
    return comp;
  }

  // --- JOBS ---
  getJobs({ search, jurusan, tipe_kerja, kota, status } = {}) {
    let list = this.jobs.map(j => {
      const c = this.getCompanyById(j.company_id) || {};
      return {
        ...j,
        company_nama: c.nama || 'Mitra Industri',
        company_bidang: c.bidang || '',
        company_alamat: c.alamat || '',
        company_website: c.website || '',
        logo_url: c.logo_url || '/images/logos/default-company.svg',
        logo_url: c.logo_url || '/images/logos/default-company.svg',
        logo_url: c.logo_url || '/images/logos/default-company.svg',
        logo_initials: c.logo_initials || 'PKL',
        logo_color: c.logo_color || '#1E40AF',
        status_mou: c.status_mou || 'Aktif',
        no_mou: c.no_mou || '',
        pic_nama: c.pic_nama || '',
        pic_kontak: c.pic_kontak || '',
        company_deskripsi: c.deskripsi || ''
      };
    });

    if (status) {
      list = list.filter(j => j.status === status);
    }
    if (tipe_kerja && tipe_kerja !== 'Semua') {
      list = list.filter(j => j.tipe_kerja === tipe_kerja);
    }
    if (kota && kota !== 'Semua') {
      const q = kota.toLowerCase();
      list = list.filter(j => (j.lokasi_kota || '').toLowerCase().includes(q));
    }
    if (jurusan && jurusan !== 'Semua') {
      const q = jurusan.toLowerCase();
      list = list.filter(j => (j.jurusan_target || '').toLowerCase().includes(q));
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(j =>
        (j.judul || '').toLowerCase().includes(q) ||
        (j.company_nama || '').toLowerCase().includes(q) ||
        (j.deskripsi || '').toLowerCase().includes(q) ||
        (j.kualifikasi || '').toLowerCase().includes(q)
      );
    }

    return list;
  }

  getJobById(id) {
    const j = this.jobs.find(x => x.id === Number(id));
    if (!j) return null;
    const c = this.getCompanyById(j.company_id) || {};
    return {
      ...j,
      company_nama: c.nama || 'Mitra Industri',
      company_bidang: c.bidang || '',
      company_alamat: c.alamat || '',
      company_website: c.website || '',
      logo_url: c.logo_url || '/images/logos/default-company.svg',
      logo_initials: c.logo_initials || 'PKL',
      logo_color: c.logo_color || '#1E40AF',
      status_mou: c.status_mou || 'Aktif',
      no_mou: c.no_mou || '',
      pic_nama: c.pic_nama || '',
      pic_kontak: c.pic_kontak || '',
      company_deskripsi: c.deskripsi || ''
    };
  }

  addJob(data) {
    const newJob = {
      id: this.nextJobId++,
      company_id: Number(data.company_id),
      judul: data.judul,
      jurusan_target: data.jurusan_target,
      tipe_kerja: data.tipe_kerja || 'WFO',
      lokasi_kota: data.lokasi_kota || 'Jakarta',
      kuota: Number(data.kuota) || 2,
      kuota_terisi: 0,
      durasi_bulan: Number(data.durasi_bulan) || 6,
      uang_saku: data.uang_saku || 'Ada',
      deskripsi: data.deskripsi,
      kualifikasi: data.kualifikasi,
      benefit: data.benefit || '',
      status: 'Buka',
      deadline: data.deadline || '2026-12-31',
      created_at: new Date().toISOString()
    };
    this.jobs.unshift(newJob);
    return this.getJobById(newJob.id);
  }

  updateJob(id, data) {
    const j = this.jobs.find(x => x.id === Number(id));
    if (!j) throw new Error('Lowongan tidak ditemukan');
    Object.assign(j, {
      judul: data.judul !== undefined ? data.judul : j.judul,
      jurusan_target: data.jurusan_target !== undefined ? data.jurusan_target : j.jurusan_target,
      tipe_kerja: data.tipe_kerja !== undefined ? data.tipe_kerja : j.tipe_kerja,
      lokasi_kota: data.lokasi_kota !== undefined ? data.lokasi_kota : j.lokasi_kota,
      kuota: data.kuota !== undefined ? Number(data.kuota) : j.kuota,
      durasi_bulan: data.durasi_bulan !== undefined ? Number(data.durasi_bulan) : j.durasi_bulan,
      uang_saku: data.uang_saku !== undefined ? data.uang_saku : j.uang_saku,
      deskripsi: data.deskripsi !== undefined ? data.deskripsi : j.deskripsi,
      kualifikasi: data.kualifikasi !== undefined ? data.kualifikasi : j.kualifikasi,
      benefit: data.benefit !== undefined ? data.benefit : j.benefit,
      status: data.status !== undefined ? data.status : j.status,
      deadline: data.deadline !== undefined ? data.deadline : j.deadline
    });
    return this.getJobById(id);
  }

  deleteJob(id) {
    const idx = this.jobs.findIndex(j => j.id === Number(id));
    if (idx === -1) throw new Error('Lowongan tidak ditemukan');
    this.jobs.splice(idx, 1);
    return true;
  }

  // --- APPLICATIONS ---
  getApplications({ student_id, status } = {}) {
    let list = this.applications.map(a => {
      const s = this.getStudentById(a.student_id) || {};
      const j = this.getJobById(a.job_id) || {};
      const c = this.getCompanyById(j.company_id) || {};
      return {
        ...a,
        student_nama: s.nama || 'Siswa',
        student_nisn: s.nisn || '',
        student_jurusan: s.jurusan || '',
        student_kelas: s.kelas || '',
        student_email: s.email || '',
        student_no_hp: s.no_hp || '',
        student_cv_url: s.cv_url || '',
        student_status_verifikasi: s.status_verifikasi || '',
        job_judul: j.judul || 'Posisi PKL',
        tipe_kerja: j.tipe_kerja || '',
        lokasi_kota: j.lokasi_kota || '',
        kuota: j.kuota || 0,
        kuota_terisi: j.kuota_terisi || 0,
        company_id: c.id,
        company_nama: c.nama || 'Mitra Industri',
        logo_initials: c.logo_initials || 'PKL',
        logo_color: c.logo_color || '#1E40AF',
        pic_nama: c.pic_nama || '',
        pic_kontak: c.pic_kontak || ''
      };
    });

    if (student_id) {
      list = list.filter(a => a.student_id === Number(student_id));
    }
    if (status) {
      list = list.filter(a => a.status === status);
    }
    return list.sort((a, b) => b.id - a.id);
  }

  getApplicationById(id) {
    const list = this.getApplications();
    return list.find(a => a.id === Number(id)) || null;
  }

  // Aturan BKK/HUBIN: 1 siswa hanya boleh melamar 1 perusahaan dalam 1 minggu (7 hari cooldown)
  getStudentApplicationCooldown(studentId) {
    const sId = Number(studentId);
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    const studentApps = (this.applications || [])
      .filter(a => a.student_id === sId)
      .map(a => {
        const t = new Date(a.created_at || a.tanggal_daftar).getTime();
        return { ...a, timestamp: t };
      })
      .sort((a, b) => b.timestamp - a.timestamp);

    if (studentApps.length === 0) {
      return {
        can_apply: true,
        last_applied_at: null,
        last_applied_date_formatted: null,
        next_eligible_date: null,
        next_eligible_date_formatted: null,
        days_remaining: 0,
        hours_remaining: 0,
        last_company_nama: null,
        last_job_judul: null,
        total_applications: 0
      };
    }

    const lastApp = studentApps[0];
    const diff = now - lastApp.timestamp;
    const canApply = diff >= ONE_WEEK_MS;
    const msRemaining = Math.max(0, ONE_WEEK_MS - diff);
    const daysRemaining = Math.ceil(msRemaining / (24 * 60 * 60 * 1000));
    const hoursRemaining = Math.ceil(msRemaining / (60 * 60 * 1000));
    const nextEligibleDate = new Date(lastApp.timestamp + ONE_WEEK_MS);

    const job = this.getJobById(lastApp.job_id);
    const comp = job ? this.getCompanyById(job.company_id) : null;
    const companyNama = (comp && comp.nama) || (job && job.company_nama) || 'Mitra Industri';

    return {
      can_apply: canApply,
      last_applied_at: lastApp.created_at || lastApp.tanggal_daftar,
      last_applied_date_formatted: new Date(lastApp.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      next_eligible_date: nextEligibleDate.toISOString(),
      next_eligible_date_formatted: nextEligibleDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      days_remaining: daysRemaining,
      hours_remaining: hoursRemaining,
      last_job_id: lastApp.job_id,
      last_job_judul: job ? job.judul : 'Lowongan PKL',
      last_company_nama: companyNama,
      total_applications: studentApps.length
    };
  }

  addApplication({ student_id, job_id, portofolio_url, alasan_melamar }) {
    const student = this.getStudentById(student_id);
    if (!student) throw new Error('Siswa tidak ditemukan');
    if (student.status_verifikasi !== 'Terverifikasi') {
      throw new Error('Akun Anda belum diverifikasi oleh HUBIN. Silakan tunggu verifikasi sebelum melamar PKL.');
    }

    const hasActivePlacement = this.placements.some(p => p.student_id === Number(student_id) && p.status === 'Aktif');
    if (hasActivePlacement) {
      throw new Error('Anda telah memiliki penempatan PKL aktif dan tidak dapat melamar lowongan baru.');
    }

    const existing = this.applications.find(a => a.student_id === Number(student_id) && a.job_id === Number(job_id));
    if (existing) {
      throw new Error(`Anda sudah pernah mengajukan lamaran untuk posisi ini (Status: ${existing.status}).`);
    }

    // Aturan BKK/HUBIN: 1 siswa hanya boleh melamar 1 perusahaan dalam 1 minggu
    const cooldown = this.getStudentApplicationCooldown(student_id);
    if (!cooldown.can_apply) {
      throw new Error(`Kebijakan BKK/HUBIN: 1 siswa hanya diperbolehkan melamar 1 perusahaan dalam 1 minggu. Anda telah melamar ke ${cooldown.last_company_nama} pada ${cooldown.last_applied_date_formatted}. Silakan tunggu ${cooldown.days_remaining} hari lagi (hingga ${cooldown.next_eligible_date_formatted}) untuk mengajukan lamaran baru.`);
    }

    const today = new Date().toISOString().split('T')[0];
    const newApp = {
      id: this.nextAppId++,
      student_id: Number(student_id),
      job_id: Number(job_id),
      tanggal_daftar: today,
      status: 'Menunggu Verifikasi HUBIN',
      catatan_hubin: null,
      nomor_surat_pengantar: null,
      catatan_perusahaan: null,
      portofolio_url: portofolio_url || student.cv_url || '',
      alasan_melamar: alasan_melamar || '',
      created_at: new Date().toISOString()
    };
    this.applications.unshift(newApp);
    return this.getApplicationById(newApp.id);
  }

  updateApplicationStatus(id, { status, catatan_hubin, nomor_surat_pengantar, catatan_perusahaan }) {
    const app = this.applications.find(a => a.id === Number(id));
    if (!app) throw new Error('Lamaran tidak ditemukan');

    const prevStatus = app.status;
    app.status = status;
    if (catatan_hubin !== undefined) app.catatan_hubin = catatan_hubin;
    if (nomor_surat_pengantar !== undefined) app.nomor_surat_pengantar = nomor_surat_pengantar;
    if (catatan_perusahaan !== undefined) app.catatan_perusahaan = catatan_perusahaan;

    // Auto-create placement if accepted by company
    if (status === 'Diterima Perusahaan' && prevStatus !== 'Diterima Perusahaan') {
      const job = this.getJobById(app.job_id);
      const companyId = job ? job.company_id : 1;
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth() + 1, 1).toISOString().split('T')[0];
      const endDate = new Date(today.getFullYear(), today.getMonth() + 7, 0).toISOString().split('T')[0];

      const existsPl = this.placements.some(p => p.student_id === app.student_id && p.status === 'Aktif');
      if (!existsPl) {
        this.placements.unshift({
          id: this.nextPlacementId++,
          student_id: app.student_id,
          company_id: companyId,
          job_id: app.job_id,
          tanggal_mulai: startDate,
          tanggal_selesai: endDate,
          pembimbing_industri: 'Pembimbing Lapangan DUDI',
          guru_pembimbing: 'Guru Pembimbing SMK Taruna Bangsa',
          status: 'Aktif',
          nilai_industri: null,
          nilai_sekolah: null,
          sertifikat_no: null,
          catatan_evaluasi: '',
          created_at: new Date().toISOString()
        });

        // Increment job filled quota
        const jobRaw = this.jobs.find(j => j.id === app.job_id);
        if (jobRaw) jobRaw.kuota_terisi = (jobRaw.kuota_terisi || 0) + 1;
      }
    }

    return this.getApplicationById(id);
  }

  // --- PLACEMENTS ---
  getPlacements({ status, student_id, company_id } = {}) {
    let list = this.placements.map(p => {
      const s = this.getStudentById(p.student_id) || {};
      const c = this.getCompanyById(p.company_id) || {};
      const j = this.getJobById(p.job_id) || {};
      const logbook_count = this.logbooks.filter(l => l.placement_id === p.id).length;
      return {
        ...p,
        student_nama: s.nama || 'Siswa',
        student_nisn: s.nisn || '',
        student_jurusan: s.jurusan || '',
        student_kelas: s.kelas || '',
        student_email: s.email || '',
        student_no_hp: s.no_hp || '',
        company_nama: c.nama || 'Mitra Industri',
        company_bidang: c.bidang || '',
        company_kota: c.kota || '',
        company_alamat: c.alamat || '',
        company_pic: c.pic_nama || '',
        company_kontak: c.pic_kontak || '',
        logo_initials: c.logo_initials || 'PKL',
        logo_color: c.logo_color || '#1E40AF',
        job_judul: j.judul || 'Posisi PKL',
        logbook_count
      };
    });

    if (status) {
      list = list.filter(p => p.status === status);
    }
    if (student_id) {
      list = list.filter(p => p.student_id === Number(student_id));
    }
    if (company_id) {
      list = list.filter(p => p.company_id === Number(company_id));
    }
    return list.sort((a, b) => b.id - a.id);
  }

  getPlacementById(id) {
    const list = this.getPlacements();
    return list.find(p => p.id === Number(id)) || null;
  }

  completePlacement(id, { nilai_industri, nilai_sekolah, catatan_evaluasi }) {
    const pl = this.placements.find(p => p.id === Number(id));
    if (!pl) throw new Error('Penempatan tidak ditemukan');
    const certNo = `CERT/PKL-${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
    pl.status = 'Selesai';
    pl.nilai_industri = Number(nilai_industri) || 90;
    pl.nilai_sekolah = Number(nilai_sekolah) || 90;
    pl.catatan_evaluasi = catatan_evaluasi || 'Menyelesaikan seluruh target kompetensi kejuruan dengan predikat Sangat Baik.';
    pl.sertifikat_no = certNo;
    return this.getPlacementById(id);
  }

  // --- LOGBOOKS ---
  getLogbooksByPlacementId(placementId) {
    return this.logbooks
      .filter(l => l.placement_id === Number(placementId))
      .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  }

  addLogbook(placementId, { tanggal, judul_kegiatan, deskripsi_kegiatan, kendala }) {
    const newLog = {
      id: this.nextLogbookId++,
      placement_id: Number(placementId),
      tanggal,
      judul_kegiatan,
      deskripsi_kegiatan,
      kendala: kendala || 'Tidak ada kendala',
      status_verifikasi: 'Menunggu Review',
      created_at: new Date().toISOString()
    };
    this.logbooks.unshift(newLog);
    return newLog;
  }

  updateLogbookStatus(id, { status_verifikasi }) {
    const log = this.logbooks.find(l => l.id === Number(id));
    if (!log) throw new Error('Logbook tidak ditemukan');
    log.status_verifikasi = status_verifikasi || 'Disetujui Pembimbing';
    return log;
  }

  // --- ALUMNI ---
  getAlumni({ company_id, search, tahun } = {}) {
    const completed = this.getPlacements({ status: 'Selesai' });
    let list = completed.map(p => ({
      placement_id: p.id,
      tanggal_mulai: p.tanggal_mulai,
      tanggal_selesai: p.tanggal_selesai,
      nilai_industri: p.nilai_industri,
      nilai_sekolah: p.nilai_sekolah,
      sertifikat_no: p.sertifikat_no,
      catatan_evaluasi: p.catatan_evaluasi,
      student_id: p.student_id,
      student_nama: p.student_nama,
      student_nisn: p.student_nisn,
      student_jurusan: p.student_jurusan,
      student_kelas: p.student_kelas,
      student_email: p.student_email,
      company_id: p.company_id,
      company_nama: p.company_nama,
      company_bidang: p.company_bidang,
      logo_initials: p.logo_initials,
      logo_color: p.logo_color,
      job_judul: p.job_judul
    }));

    if (company_id) {
      list = list.filter(a => a.company_id === Number(company_id));
    }
    if (tahun) {
      list = list.filter(a => (a.tanggal_selesai || '').startsWith(String(tahun)));
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        (a.student_nama || '').toLowerCase().includes(q) ||
        (a.student_nisn || '').toLowerCase().includes(q) ||
        (a.company_nama || '').toLowerCase().includes(q) ||
        (a.job_judul || '').toLowerCase().includes(q)
      );
    }
    return list;
  }

  // --- REVIEWS (ULASAN PERUSAHAAN MITRA) ---
  getReviews({ company_id, major, rating_min, search } = {}) {
    let list = [...this.reviews];

    if (company_id && company_id !== 'Semua') {
      list = list.filter(r => r.company_id === Number(company_id));
    }
    if (major && major !== 'Semua') {
      const q = major.toLowerCase();
      list = list.filter(r =>
        (r.student_jurusan || '').toLowerCase().includes(q) ||
        (r.posisi || '').toLowerCase().includes(q)
      );
    }
    if (rating_min) {
      list = list.filter(r => r.rating >= Number(rating_min));
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        (r.student_nama || '').toLowerCase().includes(q) ||
        (r.company_nama || '').toLowerCase().includes(q) ||
        (r.posisi || '').toLowerCase().includes(q) ||
        (r.review_text || '').toLowerCase().includes(q) ||
        (r.pros || '').toLowerCase().includes(q) ||
        (r.cons || '').toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => b.id - a.id);
  }

  addReview(data) {
    const comp = this.getCompanyById(data.company_id);
    const newRev = {
      id: this.nextReviewId++,
      student_id: data.student_id ? Number(data.student_id) : null,
      student_nama: data.student_nama || 'Siswa SMK Taruna Bangsa',
      student_kelas: data.student_kelas || 'XII RPL 1',
      student_jurusan: data.student_jurusan || 'Rekayasa Perangkat Lunak (RPL)',
      student_sekolah: data.student_sekolah || 'SMK Taruna Bangsa Kota Bekasi',
      company_id: Number(data.company_id),
      company_nama: comp ? comp.nama : (data.company_nama || 'Mitra Industri'),
      posisi: data.posisi || 'Siswa Praktik Kerja Lapangan (PKL)',
      alumni_label: data.alumni_label || `Alumni ${(data.student_jurusan || 'RPL').match(/RPL|TAV|TITL|TKRO/i)?.[0] || 'SMK'} ${new Date().getFullYear()}`,
      completion_period: data.completion_period || `Selesai ${new Date().toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}`,
      avatar_url: data.avatar_url || '/images/avatars/student-2.png',
      rating: Number(data.rating) || 5.0,
      ratings: {
        culture: Number(data.rating_culture) || Number(data.rating) || 5.0,
        mentor: Number(data.rating_mentor) || Number(data.rating) || 5.0,
        allowance: Number(data.rating_allowance) || Number(data.rating) || 5.0,
        relevance: Number(data.rating_relevance) || Number(data.rating) || 5.0
      },
      review_text: data.review_text || '',
      pros: data.pros || 'Pengalaman praktis bermanfaat.',
      cons: data.cons || 'Perlu adaptasi awal.',
      helpful_count: 0,
      verified_pkl: true,
      created_at: new Date().toISOString()
    };
    this.reviews.unshift(newRev);
    return newRev;
  }

  upvoteReview(id) {
    const rev = this.reviews.find(r => r.id === Number(id));
    if (!rev) throw new Error('Ulasan tidak ditemukan');
    rev.helpful_count = (rev.helpful_count || 0) + 1;
    return rev;
  }

  // --- FAVORITES (BOOKMARKS) ---
  getFavorites(studentId) {
    const sId = Number(studentId);
    if (!this.favorites) this.favorites = {};
    return this.favorites[sId] || [];
  }

  toggleFavorite(studentId, jobId) {
    const sId = Number(studentId);
    const jId = Number(jobId);
    if (!this.favorites) this.favorites = {};
    if (!this.favorites[sId]) this.favorites[sId] = [];

    const idx = this.favorites[sId].indexOf(jId);
    let isFavorited = false;
    if (idx >= 0) {
      this.favorites[sId].splice(idx, 1);
      isFavorited = false;
    } else {
      this.favorites[sId].push(jId);
      isFavorited = true;
    }
    return { is_favorited: isFavorited, favorites: [...this.favorites[sId]] };
  }

  // --- PRINT LOGS & RATE LIMIT (1 MINGGU 1X UNTUK SISWA) ---
  getStudentPrintStatus(studentId, type = 'surat') {
    const sId = Number(studentId);
    if (!this.printLogs) this.printLogs = [];
    const logs = this.printLogs.filter(l => l.student_id === sId && l.type === type);
    if (logs.length === 0) {
      return {
        can_print: true,
        last_printed_at: null,
        next_eligible_date: null,
        days_remaining: 0,
        hours_remaining: 0,
        total_prints: 0
      };
    }
    const lastLog = logs[logs.length - 1];
    const lastTime = new Date(lastLog.printed_at).getTime();
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    const diff = now - lastTime;
    const canPrint = diff >= ONE_WEEK_MS;
    const msRemaining = Math.max(0, ONE_WEEK_MS - diff);
    const daysRemaining = Math.ceil(msRemaining / (24 * 60 * 60 * 1000));
    const hoursRemaining = Math.ceil(msRemaining / (60 * 60 * 1000));
    const nextEligibleDate = new Date(lastTime + ONE_WEEK_MS).toISOString();

    return {
      can_print: canPrint,
      last_printed_at: lastLog.printed_at,
      next_eligible_date: nextEligibleDate,
      days_remaining: daysRemaining,
      hours_remaining: hoursRemaining,
      total_prints: logs.length
    };
  }

  recordStudentPrint(studentId, { type = 'surat', reference_id = null, document_name = '' } = {}) {
    const sId = Number(studentId);
    if (!this.printLogs) this.printLogs = [];
    const newLog = {
      id: this.printLogs.length + 1,
      student_id: sId,
      type,
      reference_id,
      document_name,
      printed_at: new Date().toISOString()
    };
    this.printLogs.push(newLog);
    return {
      success: true,
      log: newLog,
      status: this.getStudentPrintStatus(sId, type)
    };
  }
}

const store = new Store();
module.exports = store;

