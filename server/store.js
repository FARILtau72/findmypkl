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
      kota: 'Jakarta Pusat',
      alamat: 'Telkom Landmark Tower, Jl. Gatot Subroto No. 52, Jakarta',
      website: 'https://telkom.co.id',
      pic_nama: 'Budi Santoso, S.T.',
      pic_kontak: '0811-2345-6789',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-TLK/2025/081',
      logo_url: '/images/logos/telkom.svg',
      logo_initials: 'TLK',
      logo_color: '#E11D48',
      deskripsi: 'BUMN telekomunikasi terdepan di Indonesia penyedia layanan digital connectivity, platform, dan services nasional.',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      nama: 'PT GoTo Gojek Tokopedia Tbk',
      bidang: 'Teknologi Informasi & E-Commerce',
      kota: 'Jakarta Selatan',
      alamat: 'Pasaraya Blok M Gedung B, Jl. Iskandarsyah II No. 2, Jakarta Selatan',
      website: 'https://gotocompany.com',
      pic_nama: 'Maya Puspita, M.Kom.',
      pic_kontak: '0812-9876-5432',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-GOTO/2025/112',
      logo_url: '/images/logos/goto.svg',
      logo_initials: 'GOTO',
      logo_color: '#00AA13',
      deskripsi: 'Ekosistem digital terintegrasi terbesar di Indonesia yang menaungi layanan on-demand Gojek, e-commerce Tokopedia, dan GoTo Financial.',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      nama: 'PT Astra Honda Motor (AHM)',
      bidang: 'Otomotif & Manufaktur Presisi',
      kota: 'Bekasi',
      alamat: 'Kawasan Industri MM2100, Cikarang Barat, Bekasi, Jawa Barat',
      website: 'https://astra-honda.com',
      pic_nama: 'Ir. Hendra Kusuma',
      pic_kontak: '0813-4567-8901',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-AHM/2024/045',
      logo_url: '/images/logos/ahm.svg',
      logo_initials: 'AHM',
      logo_color: '#DC2626',
      deskripsi: 'Pelopor industri sepeda motor di Indonesia dengan fasilitas perakitan modern dan jaringan bengkel resmi AHASS terbesar.',
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      nama: 'PT Bank Mandiri (Persero) Tbk',
      bidang: 'Perbankan & Layanan Keuangan',
      kota: 'Jakarta Pusat',
      alamat: 'Plaza Mandiri, Jl. Jend. Gatot Subroto Kav. 36-38, Jakarta',
      website: 'https://bankmandiri.co.id',
      pic_nama: 'Dewi Anggraini, S.E., Ak.',
      pic_kontak: '0815-6789-0123',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-MDR/2025/019',
      logo_url: '/images/logos/mandiri.svg',
      logo_initials: 'BMRI',
      logo_color: '#1E3A8A',
      deskripsi: 'Salah satu bank terbesar di Indonesia yang melayani sektor ritel, korporasi, serta transformasi digital perbankan Livin by Mandiri.',
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      nama: 'Kumata Animation Studio',
      bidang: 'Industri Kreatif & Animasi',
      kota: 'Bandung',
      alamat: 'Jl. Ranggamalela No. 8, Dago, Bandung, Jawa Barat',
      website: 'https://kumatastudio.com',
      pic_nama: 'Rian Pratama, S.Sn.',
      pic_kontak: '0817-1234-5678',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-KUM/2025/033',
      logo_url: '/images/logos/kumata.svg',
      logo_initials: 'KMT',
      logo_color: '#8B5CF6',
      deskripsi: 'Studio animasi independen Indonesia pemenang berbagai penghargaan yang memproduksi serial IP, visual FX, dan aset animasi 2D/3D.',
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      nama: 'PT Dirgantara Indonesia (Persero)',
      bidang: 'Dirgantara & Rekayasa Mesin',
      kota: 'Bandung',
      alamat: 'Jl. Pajajaran No. 154, Bandung, Jawa Barat',
      website: 'https://indonesian-aerospace.com',
      pic_nama: 'Dodi Firmansyah, S.T.',
      pic_kontak: '0818-8765-4321',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-PTDI/2024/090',
      logo_url: '/images/logos/ptdi.svg',
      logo_initials: 'PTDI',
      logo_color: '#0284C7',
      deskripsi: 'Industri pesawat terbang kebanggaan nasional Indonesia yang memproduksi pesawat komersial, militer, dan komponen aerostruktur dunia.',
      created_at: new Date().toISOString()
    },
    {
      id: 7,
      nama: 'Paragon Technology and Innovation (Wardah Group)',
      bidang: 'Manufaktur Kosmetik & FMCG',
      kota: 'Tangerang',
      alamat: 'Kawasan Industri Jatake, Jl. Industri IV Blok AF No. 8, Tangerang',
      website: 'https://paragon-innovation.com',
      pic_nama: 'Fitri Handayani, S.Farm.',
      pic_kontak: '0819-2345-6780',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-PTI/2025/062',
      logo_url: '/images/logos/paragon.svg',
      logo_initials: 'PTI',
      logo_color: '#0D9488',
      deskripsi: 'Perusahaan manufaktur kosmetik nasional terbesar menaungi brand Wardah, Make Over, Emina, Kahf dengan standar lab modern.',
      created_at: new Date().toISOString()
    },
    {
      id: 8,
      nama: 'PT Len Industri (Persero)',
      bidang: 'Elektronika Pertahanan & Sistem Kendali',
      kota: 'Bandung',
      alamat: 'Jl. Soekarno Hatta No. 542, Bandung, Jawa Barat',
      website: 'https://len.co.id',
      pic_nama: 'Agus Setiawan, M.T.',
      pic_kontak: '0811-9876-1234',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-LEN/2024/104',
      logo_url: '/images/logos/len.svg',
      logo_initials: 'LEN',
      logo_color: '#3B82F6',
      deskripsi: 'Holding industri pertahanan DEFEND ID yang menguasai teknologi persinyalan kereta api, energi terbarukan, dan sistem navigasi.',
      created_at: new Date().toISOString()
    },
    {
      id: 9,
      nama: 'CV Kreatif Digital',
      bidang: 'Desain Komunikasi Visual & Agensi Kreatif',
      kota: 'Surabaya',
      alamat: 'Jl. Pemuda No. 88, Surabaya, Jawa Timur',
      website: 'https://kreatifdigital.id',
      pic_nama: 'Aditya Pratama, S.Ds.',
      pic_kontak: '0812-7788-9900',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-KD/2025/119',
      logo_url: '/images/logos/kreatif-digital.svg',
      logo_initials: 'KD',
      logo_color: '#F97316',
      deskripsi: 'Agensi branding, UI/UX design, dan multimedia interaktif yang menangani puluhan klien korporasi nasional.',
      created_at: new Date().toISOString()
    },
    {
      id: 10,
      nama: 'PT Astra International Tbk',
      bidang: 'Konglomerasi Otomotif & Infrastruktur Digital',
      kota: 'Jakarta Utara',
      alamat: 'Menara Astra, Jl. Jend. Sudirman Kav. 5-6, Jakarta',
      website: 'https://astra.co.id',
      pic_nama: 'Bambang Irawan, M.B.A.',
      pic_kontak: '0813-1122-3344',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-ASTRA/2024/201',
      logo_url: '/images/logos/astra.svg',
      logo_initials: 'ASTRA',
      logo_color: '#2563EB',
      deskripsi: 'Salah satu grup usaha terbesar di Indonesia dengan portofolio terkemuka di bidang otomotif, jasa keuangan, dan teknologi informasi.',
      created_at: new Date().toISOString()
    },
    {
      id: 11,
      nama: 'Glow Design Studio',
      bidang: 'Motion Graphics, Video & Ilustrasi Digital',
      kota: 'Yogyakarta',
      alamat: 'Jl. Kaliurang Km 7, Sleman, D.I. Yogyakarta',
      website: 'https://glowdesign.studio',
      pic_nama: 'Annisa Rahmawati, M.Sn.',
      pic_kontak: '0819-5566-7788',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-GDS/2025/088',
      logo_url: '/images/logos/glow-design.svg',
      logo_initials: 'GD',
      logo_color: '#A855F7',
      deskripsi: 'Studio produksi animasi, motion graphic komersial, dan visual branding dengan portofolio klien dalam dan luar negeri.',
      created_at: new Date().toISOString()
    },
    {
      id: 12,
      nama: 'PT Solusi Data Indonesia',
      bidang: 'Software House & Cloud Enterprise Solutions',
      kota: 'Bandung',
      alamat: 'Dago Cyber Hub Lt. 4, Jl. Ir. H. Juanda No. 120, Bandung',
      website: 'https://solusidata.co.id',
      pic_nama: 'Rizky Firmansyah, S.Kom.',
      pic_kontak: '0821-4455-6677',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-SDI/2025/074',
      logo_url: '/images/logos/solusi-data.svg',
      logo_initials: 'SDI',
      logo_color: '#06B6D4',
      deskripsi: 'Pengembang infrastruktur sistem informasi enterprise, REST API performa tinggi, dan analitik big data modern.',
      created_at: new Date().toISOString()
    },
    {
      id: 13,
      nama: 'Ruang Media Kreatif',
      bidang: 'Digital Marketing & Social Media Production',
      kota: 'Malang',
      alamat: 'Jl. Ijen Boulevard No. 45, Malang, Jawa Timur',
      website: 'https://ruangmediakreatif.com',
      pic_nama: 'Dimas Wicaksono, S.I.Kom.',
      pic_kontak: '0818-9900-1122',
      status_mou: 'Aktif',
      no_mou: 'MOU/SMK-RMK/2025/096',
      logo_url: '/images/logos/ruang-media.svg',
      logo_initials: 'RMK',
      logo_color: '#EC4899',
      deskripsi: 'Creative house media sosial yang memproduksi konten viral, video reels/TikTok, dan kampanye digital multiplatform.',
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
      id: 1,
      student_id: 4,
      student_nama: 'Bayu Nugroho',
      student_kelas: 'XII TKRO 1',
      student_jurusan: 'Teknik Kendaraan Ringan Otomotif (TKRO)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      company_id: 1,
      company_nama: 'PT Telkom Indonesia (Persero) Tbk',
      posisi: 'Frontend Web Developer & Jaringan Digital',
      rating: 5.0,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 5.0, relevance: 5.0 },
      review_text: 'Pengalaman magang 6 bulan di Telkom Indonesia sangat luar biasa! Kami diajari langsung oleh senior engineer tentang arsitektur jaringan skala nasional dan CI/CD pipeline modern. Mentor sangat sabar membimbing bahkan ketika kami masih canggung dengan Git workflow. Uang saku Rp 2.5 jt/bulan cair tepat waktu.',
      pros: 'Uang saku tepat waktu, mentor senior sangat membimbing, fasilitas laptop & VPN enterprise.',
      cons: 'Ritme sprint cukup cepat, harus rajin mencatat istilah teknis baru.',
      helpful_count: 38,
      verified_pkl: true,
      created_at: '2026-08-25T10:00:00.000Z'
    },
    {
      id: 2,
      student_id: 1,
      student_nama: 'Ahmad Fauzi',
      student_kelas: 'XII RPL 1',
      student_jurusan: 'Rekayasa Perangkat Lunak (RPL)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      company_id: 2,
      company_nama: 'PT GoTo Gojek Tokopedia Tbk',
      posisi: 'QA & Frontend Testing Tokopedia',
      rating: 5.0,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 5.0, relevance: 5.0 },
      review_text: 'Lingkungan kerja di GoTo sangat inklusif dan ramah untuk siswa SMK. Kami tidak diperlakukan sekadar anak magang fotokopi, melainkan dilibatkan langsung menulis manual test cases untuk modul checkout Tokopedia. Belajar Jira, React, dan tools modern.',
      pros: 'Dapat pinjaman laptop MacBook, voucher GoFood tiap Jumat, budaya kerja egaliter tanpa senioritas.',
      cons: 'Komunikasi full via Slack dan Notion jadi butuh adaptasi dokumentasi yang rapi.',
      helpful_count: 45,
      verified_pkl: true,
      created_at: '2026-08-30T11:30:00.000Z'
    },
    {
      id: 3,
      student_id: 2,
      student_nama: 'Siti Rahma Azzahra',
      student_kelas: 'XII TAV 1',
      student_jurusan: 'Teknik Audio Video (TAV)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      company_id: 9,
      company_nama: 'CV Kreatif Digital',
      posisi: 'UI/UX & Graphic Designer Intern',
      rating: 4.8,
      ratings: { culture: 5.0, mentor: 4.8, allowance: 4.5, relevance: 5.0 },
      review_text: 'Sangat menyenangkan untuk siswa yang ingin mendalami desain antarmuka digital dan creative agency. Klien-klien yang ditangani berskala nasional, sehingga portofolio saya setelah lulus langsung dilirik HRD.',
      pros: 'Jam kerja fleksibel (WFH friendly), akses akun Envato Elements & Figma Pro gratis.',
      cons: 'Revisi desain dari klien kadang mendadak di sore hari.',
      helpful_count: 27,
      verified_pkl: true,
      created_at: '2026-07-15T09:15:00.000Z'
    },
    {
      id: 4,
      student_id: 3,
      student_nama: 'Farhan Pratama',
      student_kelas: 'XII TITL 1',
      student_jurusan: 'Teknik Instalasi Tenaga Listrik (TITL)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      company_id: 5,
      company_nama: 'Kumata Animation Studio',
      posisi: '2D Background Artist & Colorist',
      rating: 4.9,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 4.8, relevance: 5.0 },
      review_text: 'Bagi anak TAV dan Audio Visual, Kumata adalah tempat impian. Kita belajar standar pipeline produksi animasi dan editing video yang tayang di televisi internasional. Art Director selalu memberi feedback konstruktif setiap pagi saat daily standup.',
      pros: 'Display drawing pen tablet Wacom disediakan di studio, credit title di serial animasi resmi.',
      cons: 'Harus menjaga konsistensi color keying dan detail tinggi.',
      helpful_count: 31,
      verified_pkl: true,
      created_at: '2026-08-18T14:20:00.000Z'
    },
    {
      id: 5,
      student_id: 5,
      student_nama: 'Nurul Indah Permata',
      student_kelas: 'XII TITL 2',
      student_jurusan: 'Teknik Instalasi Tenaga Listrik (TITL)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      company_id: 4,
      company_nama: 'PT Bank Mandiri (Persero) Tbk',
      posisi: 'Staf Administrasi Keuangan & Kliring Digital',
      rating: 4.8,
      ratings: { culture: 4.8, mentor: 5.0, allowance: 4.6, relevance: 5.0 },
      review_text: 'Selama 6 bulan di cabang Bank Mandiri, saya mengaplikasikan langsung rumus Excel tingkat lanjut, rekonsiliasi kas cabang, dan tata kelola arsip legal nasabah. Pembimbing sangat teliti dan selalu memotivasi kami untuk profesional.',
      pros: 'Sertifikat resmi bermaterai dari Bank Mandiri Corporate Secretary, uang saku stabil, lingkungan bank profesional.',
      cons: 'Standar ketelitian angka 100% tanpa toleransi selisih.',
      helpful_count: 22,
      verified_pkl: true,
      created_at: '2026-07-28T16:00:00.000Z'
    },
    {
      id: 6,
      student_id: 6,
      student_nama: 'Rizky Ramadhan',
      student_kelas: 'XII TKRO 1',
      student_jurusan: 'Teknik Kendaraan Ringan Otomotif (TKRO)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      company_id: 3,
      company_nama: 'PT Astra Honda Motor (AHM)',
      posisi: 'Teknisi Mekanik Motor & QC AHASS',
      rating: 4.9,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 4.8, relevance: 5.0 },
      review_text: 'Standar 5R Astra benar-benar membentuk kedisiplinan kerja saya. Praktik langsung servis motor injeksi PGM-FI dan overhaul mesin bersama instruktur bersertifikasi Astra Honda. Setelah magang langsung ditawari kontrak kerja!',
      pros: 'Makan siang katering gratis, toolkit mekanik lengkap, peluang rekrutmen kerja tinggi.',
      cons: 'Fisik harus prima karena berdiri dan bergerak aktif di area bengkel.',
      helpful_count: 34,
      verified_pkl: true,
      created_at: '2026-08-05T08:30:00.000Z'
    },
    {
      id: 7,
      student_id: 8,
      student_nama: 'Suhayel A. Nazim',
      student_kelas: 'XI RPL 1',
      student_jurusan: 'Rekayasa Perangkat Lunak (RPL)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      company_id: 12,
      company_nama: 'PT Solusi Data Indonesia',
      posisi: 'Junior Backend & REST API Developer',
      rating: 5.0,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 5.0, relevance: 5.0 },
      review_text: 'Coding backend Laravel & Node.js yang selama ini cuma teori di sekolah, di sini bener-bener dipraktikkan untuk handle ratusan request per detik. Mentor tech lead meluangkan waktu 1 jam setiap hari untuk code review dan diskusi arsitektur API.',
      pros: 'Bimbingan 1-on-1 dengan Tech Lead, uang saku sangat kompetitif, kantor modern di Dago Cyber Hub.',
      cons: 'Perlu pemahaman logika basis data yang cukup kuat.',
      helpful_count: 19,
      verified_pkl: true,
      created_at: '2026-09-02T13:45:00.000Z'
    },
    {
      id: 8,
      student_id: 7,
      student_nama: 'Clara Anindya',
      student_kelas: 'XII TAV 2',
      student_jurusan: 'Teknik Audio Video (TAV)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      company_id: 11,
      company_nama: 'Glow Design Studio',
      posisi: 'Motion Graphics & Reels Video Creator',
      rating: 4.8,
      ratings: { culture: 5.0, mentor: 4.8, allowance: 4.6, relevance: 5.0 },
      review_text: 'Kerja remote tapi komunikasi lancar banget lewat Discord. Bikin animasi reels dan bumper video untuk brand FMCG terkemuka. Hasil karya saya bisa langsung dipasang di portofolio Behance dan direspons sangat positif.',
      pros: 'Full remote WFH, jam kerja santai asal deadline terpenuhi, tim kreatif muda dan suportif.',
      cons: 'Render video butuh spesifikasi laptop yang cukup mumpuni.',
      helpful_count: 16,
      verified_pkl: true,
      created_at: '2026-09-04T15:10:00.000Z'
    },
    {
      id: 9,
      student_id: 9,
      student_nama: 'Farhan Putra Dirgantara',
      student_kelas: 'XII TKRO 2',
      student_jurusan: 'Teknik Kendaraan Ringan Otomotif (TKRO)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      company_id: 6,
      company_nama: 'PT Dirgantara Indonesia (Persero)',
      posisi: 'Drafter CAD & Pemeliharaan Aerostruktur',
      rating: 4.9,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 4.7, relevance: 5.0 },
      review_text: 'Bangga banget bisa magang di pabrik pesawat terbang PTDI Bandung. Membantu cek dimensi komponen aerostruktur pesawat N219. Disiplin keselamatan kerja nomor satu dan fasilitas laboratorium aerodinamika sangat megah.',
      pros: 'Pengalaman langka di industri kedirgantaraan, ID card BUMN resmi, sertifikat berharga tinggi.',
      cons: 'Lokasi hanggar sangat luas, perlu stamina prima.',
      helpful_count: 29,
      verified_pkl: true,
      created_at: '2026-08-12T10:00:00.000Z'
    },
    {
      id: 10,
      student_id: 10,
      student_nama: 'Anisa Putri Lestari',
      student_kelas: 'XII TITL 2',
      student_jurusan: 'Teknik Instalasi Tenaga Listrik (TITL)',
      student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
      company_id: 7,
      company_nama: 'Paragon Technology and Innovation (Wardah Group)',
      posisi: 'Quality Assurance Lab & Formulasi Kosmetik',
      rating: 4.8,
      ratings: { culture: 5.0, mentor: 5.0, allowance: 4.8, relevance: 4.8 },
      review_text: 'Lingkungan kerja Paragon sangat kekeluargaan dan islami. Belajar uji viskositas, pH, dan uji kestabilan produk kosmetik Wardah & Make Over di lab berstandar internasional CPKB BPOM.',
      pros: 'Goodie bag produk bulanan, uang saku memuaskan, kultur kerja sangat positif.',
      cons: 'Harus mengenakan jas lab dan APD lengkap sepanjang hari.',
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
    reviews
  };
}

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

    this.nextStudentId = Math.max(...this.students.map(s => s.id), 0) + 1;
    this.nextCompanyId = Math.max(...this.companies.map(c => c.id), 0) + 1;
    this.nextJobId = Math.max(...this.jobs.map(j => j.id), 0) + 1;
    this.nextAppId = Math.max(...this.applications.map(a => a.id), 0) + 1;
    this.nextPlacementId = Math.max(...this.placements.map(p => p.id), 0) + 1;
    this.nextLogbookId = Math.max(...this.logbooks.map(l => l.id), 0) + 1;
    this.nextReviewId = Math.max(...this.reviews.map(r => r.id), 0) + 1;
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
      reviews_count: this.reviews.length
    };
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
}

const store = new Store();
module.exports = store;

