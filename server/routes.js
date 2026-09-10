const express = require('express');
const router = express.Router();
const store = require('./store');

// --- 1. HEALTH & DATA STATUS (STANDALONE DUMMY MODE) ---
router.get('/health', (req, res) => {
  try {
    const stats = store.getStats();
    res.json({
      status: 'ok',
      mode: 'standalone_dummy',
      database: {
        engine: 'Penyimpanan Data Mock Standalone (In-Memory)',
        version: 'v1.0.0-dummy',
        serverTime: new Date().toISOString(),
        host: 'Local Memory Store'
      },
      counts: stats
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Reset data dummy ke kondisi awal
router.post('/reset', (req, res) => {
  try {
    store.reset();
    res.json({ success: true, message: 'Data dummy berhasil direset ke kondisi awal', counts: store.getStats() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 2. STUDENTS (SISWA) ---
router.get('/students', (req, res) => {
  try {
    const rows = store.getStudents(req.query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/students/:id', (req, res) => {
  try {
    const student = store.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Siswa tidak ditemukan' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/students', (req, res) => {
  try {
    const { nisn, nama, email, jurusan, kelas, no_hp, password, cv_url } = req.body;
    if (!nisn || !nama || !email || !jurusan || !kelas) {
      return res.status(400).json({ error: 'Lengkapi seluruh data wajib (NISN, Nama, Email, Jurusan, Kelas)' });
    }
    const newStudent = store.addStudent({ nisn, nama, email, jurusan, kelas, no_hp, password, cv_url });
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/students/:id', (req, res) => {
  try {
    const updated = store.updateStudent(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/students/:id/verify', (req, res) => {
  try {
    const { status_verifikasi, catatan_verifikasi } = req.body;
    if (!['Terverifikasi', 'Ditolak', 'Menunggu Verifikasi', 'Perlu Perbaikan'].includes(status_verifikasi)) {
      return res.status(400).json({ error: 'Status verifikasi tidak valid' });
    }
    const updated = store.verifyStudent(req.params.id, { status_verifikasi, catatan_verifikasi });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 3. COMPANIES (MITRA DUDI) ---
router.get('/companies', (req, res) => {
  try {
    const rows = store.getCompanies(req.query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/companies/:id', (req, res) => {
  try {
    const company = store.getCompanyById(req.params.id);
    if (!company) return res.status(404).json({ error: 'Perusahaan tidak ditemukan' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/companies', (req, res) => {
  try {
    const { nama, bidang, kota, alamat, pic_nama, pic_kontak } = req.body;
    if (!nama || !bidang || !kota || !alamat || !pic_nama || !pic_kontak) {
      return res.status(400).json({ error: 'Lengkapi data wajib perusahaan' });
    }
    const newComp = store.addCompany(req.body);
    res.status(201).json(newComp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/companies/:id', (req, res) => {
  try {
    const updated = store.updateCompany(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 4. JOBS (LOWONGAN PKL) ---
router.get('/jobs', (req, res) => {
  try {
    const rows = store.getJobs(req.query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/jobs/:id', (req, res) => {
  try {
    const job = store.getJobById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Lowongan tidak ditemukan' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/jobs', (req, res) => {
  try {
    const { company_id, judul, jurusan_target, deskripsi, kualifikasi } = req.body;
    if (!company_id || !judul || !jurusan_target || !deskripsi || !kualifikasi) {
      return res.status(400).json({ error: 'Lengkapi data wajib lowongan PKL' });
    }
    const newJob = store.addJob(req.body);
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/jobs/:id', (req, res) => {
  try {
    const updated = store.updateJob(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/jobs/:id', (req, res) => {
  try {
    store.deleteJob(req.params.id);
    res.json({ success: true, message: 'Lowongan berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 5. APPLICATIONS (LAMARAN PKL) ---
router.get('/applications', (req, res) => {
  try {
    const rows = store.getApplications(req.query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/applications', (req, res) => {
  try {
    const { student_id, job_id, portofolio_url, alasan_melamar } = req.body;
    if (!student_id || !job_id) {
      return res.status(400).json({ error: 'ID Siswa dan ID Lowongan wajib disertakan' });
    }
    const newApp = store.addApplication({ student_id, job_id, portofolio_url, alasan_melamar });
    res.status(201).json(newApp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/applications/:id/status', (req, res) => {
  try {
    const updated = store.updateApplicationStatus(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 6. PLACEMENTS (PENEMPATAN AKTIF & ALUMNI) ---
router.get('/placements', (req, res) => {
  try {
    const rows = store.getPlacements(req.query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/placements/:id/complete', (req, res) => {
  try {
    const updated = store.completePlacement(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 7. LOGBOOKS (JURNAL HARIAN) ---
router.get('/placements/:id/logbooks', (req, res) => {
  try {
    const rows = store.getLogbooksByPlacementId(req.params.id);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/placements/:id/logbooks', (req, res) => {
  try {
    const { tanggal, judul_kegiatan, deskripsi_kegiatan, kendala } = req.body;
    if (!tanggal || !judul_kegiatan || !deskripsi_kegiatan) {
      return res.status(400).json({ error: 'Tanggal, judul, dan deskripsi kegiatan wajib diisi' });
    }
    const newLog = store.addLogbook(req.params.id, { tanggal, judul_kegiatan, deskripsi_kegiatan, kendala });
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/logbooks/:id/status', (req, res) => {
  try {
    const updated = store.updateLogbookStatus(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 8. HISTORICAL ALUMNI TRACKER ---
router.get('/alumni', (req, res) => {
  try {
    const rows = store.getAlumni(req.query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 9. REVIEWS (ULASAN TEMPAT PKL SISWA & ALUMNI) ---
router.get('/reviews', (req, res) => {
  try {
    const rows = store.getReviews(req.query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/reviews', (req, res) => {
  try {
    const { company_id, rating, review_text } = req.body;
    if (!company_id || !rating || !review_text) {
      return res.status(400).json({ error: 'Perusahaan, rating bintang, dan isi ulasan wajib diisi.' });
    }
    const newReview = store.addReview(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/reviews/:id/upvote', (req, res) => {
  try {
    const updated = store.upvoteReview(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 10. FAVORITES / BOOKMARKS (LOGIN VALIDATED) ---
router.get('/favorites', (req, res) => {
  try {
    const studentId = req.headers['x-student-id'] || req.query.student_id;
    if (!studentId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Login yuk untuk menambahkan tempat PKL favoritmu!'
      });
    }
    const student = store.getStudentById(studentId);
    if (!student) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Login yuk untuk menambahkan tempat PKL favoritmu!'
      });
    }
    const favJobIds = store.getFavorites(studentId);
    res.json({ success: true, student_id: Number(studentId), favorites: favJobIds });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/favorites/toggle', (req, res) => {
  try {
    const studentId = req.headers['x-student-id'] || req.body.student_id;
    const targetJobId = req.body.job_id || req.body.jobId;
    if (!studentId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Login yuk untuk menambahkan tempat PKL favoritmu!'
      });
    }
    const student = store.getStudentById(studentId);
    if (!student) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Login yuk untuk menambahkan tempat PKL favoritmu!'
      });
    }
    if (!targetJobId) {
      return res.status(400).json({ error: 'job_id wajib disertakan' });
    }
    const result = store.toggleFavorite(studentId, targetJobId);
    res.json({
      success: true,
      student_id: Number(studentId),
      job_id: Number(targetJobId),
      is_favorited: result.is_favorited,
      favorites: result.favorites,
      message: result.is_favorited ? 'Lowongan berhasil disimpan ke favorit' : 'Lowongan dihapus dari favorit'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
