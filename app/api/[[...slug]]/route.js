import { NextResponse } from 'next/server';
const store = require('../../../server/store');

// Helper to extract query parameters
function getQueryParams(request) {
  const { searchParams } = new URL(request.url);
  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
}

// GET Handler
export async function GET(request, { params }) {
  try {
    const slug = params?.slug || [];
    const query = getQueryParams(request);
    const resource = slug[0];
    const id = slug[1];
    const subResource = slug[2];

    // GET /api/health
    if (resource === 'health') {
      const stats = store.getStats();
      return NextResponse.json({
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
    }

    // GET /api/students & GET /api/students/:id
    if (resource === 'students') {
      if (id) {
        if (subResource === 'print-status') {
          return NextResponse.json(store.getStudentPrintStatus(id, query.type || 'surat'));
        }
        const student = store.getStudentById(id);
        if (!student) return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 });
        return NextResponse.json(student);
      }
      const rows = store.getStudents(query);
      return NextResponse.json(rows);
    }

    // GET /api/companies & GET /api/companies/:id
    if (resource === 'companies') {
      if (id) {
        const company = store.getCompanyById(id);
        if (!company) return NextResponse.json({ error: 'Perusahaan tidak ditemukan' }, { status: 404 });
        return NextResponse.json(company);
      }
      const rows = store.getCompanies(query);
      return NextResponse.json(rows);
    }

    // GET /api/jobs & GET /api/jobs/:id
    if (resource === 'jobs') {
      if (id) {
        const job = store.getJobById(id);
        if (!job) return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 });
        return NextResponse.json(job);
      }
      const rows = store.getJobs(query);
      return NextResponse.json(rows);
    }

    // GET /api/applications
    if (resource === 'applications') {
      const rows = store.getApplications(query);
      return NextResponse.json(rows);
    }

    // GET /api/placements & GET /api/placements/:id/logbooks
    if (resource === 'placements') {
      if (id && subResource === 'logbooks') {
        const rows = store.getLogbooksByPlacementId(id);
        return NextResponse.json(rows);
      }
      const rows = store.getPlacements(query);
      return NextResponse.json(rows);
    }

    // GET /api/alumni
    if (resource === 'alumni') {
      const rows = store.getAlumni(query);
      return NextResponse.json(rows);
    }

    // GET /api/reviews
    if (resource === 'reviews') {
      const rows = store.getReviews(query);
      return NextResponse.json(rows);
    }

    // GET /api/favorites
    if (resource === 'favorites') {
      const studentId = request.headers.get('x-student-id') || query.student_id;
      if (!studentId) {
        return NextResponse.json({
          success: false,
          error: 'Unauthorized',
          message: 'Login yuk untuk menambahkan tempat PKL favoritmu!'
        }, { status: 401 });
      }
      const student = store.getStudentById(studentId);
      if (!student) {
        return NextResponse.json({
          success: false,
          error: 'Unauthorized',
          message: 'Login yuk untuk menambahkan tempat PKL favoritmu!'
        }, { status: 401 });
      }
      const favJobIds = store.getFavorites(studentId);
      return NextResponse.json({ success: true, student_id: Number(studentId), favorites: favJobIds });
    }

    // GET /api/classes & GET /api/classes/:id
    if (resource === 'classes') {
      if (id) {
        const cls = store.getClassById(id);
        if (!cls) return NextResponse.json({ error: 'Kelas tidak ditemukan' }, { status: 404 });
        return NextResponse.json(cls);
      }
      const rows = store.getClasses(query);
      return NextResponse.json(rows);
    }

    return NextResponse.json({ error: 'Endpoint tidak ditemukan' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST Handler
export async function POST(request, { params }) {
  try {
    const slug = params?.slug || [];
    const resource = slug[0];
    const id = slug[1];
    const subResource = slug[2];

    let body = {};
    try {
      body = await request.json();
    } catch (e) {
      body = {};
    }

    // POST /api/reset
    if (resource === 'reset') {
      store.reset();
      return NextResponse.json({
        success: true,
        message: 'Data dummy berhasil direset ke kondisi awal',
        counts: store.getStats()
      });
    }

    // POST /api/students & POST /api/students/:id/print-log
    if (resource === 'students') {
      if (id && subResource === 'print-log') {
        const result = store.recordStudentPrint(id, body);
        return NextResponse.json(result, { status: 201 });
      }
      const { nisn, nama, email, jurusan, kelas, no_hp, password, cv_url } = body;
      if (!nisn || !nama || !email || !jurusan || !kelas) {
        return NextResponse.json({ error: 'Lengkapi seluruh data wajib (NISN, Nama, Email, Jurusan, Kelas)' }, { status: 400 });
      }
      const newStudent = store.addStudent({ nisn, nama, email, jurusan, kelas, no_hp, password, cv_url });
      return NextResponse.json(newStudent, { status: 201 });
    }

    // POST /api/companies
    if (resource === 'companies') {
      const { nama, bidang, kota, alamat, pic_nama, pic_kontak } = body;
      if (!nama || !bidang || !kota || !alamat || !pic_nama || !pic_kontak) {
        return NextResponse.json({ error: 'Lengkapi data wajib perusahaan' }, { status: 400 });
      }
      const newComp = store.addCompany(body);
      return NextResponse.json(newComp, { status: 201 });
    }

    // POST /api/jobs
    if (resource === 'jobs') {
      const { company_id, judul, jurusan_target, deskripsi, kualifikasi } = body;
      if (!company_id || !judul || !jurusan_target || !deskripsi || !kualifikasi) {
        return NextResponse.json({ error: 'Lengkapi data wajib lowongan PKL' }, { status: 400 });
      }
      const newJob = store.addJob(body);
      return NextResponse.json(newJob, { status: 201 });
    }

    // POST /api/applications
    if (resource === 'applications') {
      const { student_id, job_id, portofolio_url, alasan_melamar } = body;
      if (!student_id || !job_id) {
        return NextResponse.json({ error: 'ID Siswa dan ID Lowongan wajib disertakan' }, { status: 400 });
      }
      const newApp = store.addApplication({ student_id, job_id, portofolio_url, alasan_melamar });
      return NextResponse.json(newApp, { status: 201 });
    }

    // POST /api/placements/:id/logbooks
    if (resource === 'placements' && id && subResource === 'logbooks') {
      const { tanggal, judul_kegiatan, deskripsi_kegiatan, kendala } = body;
      if (!tanggal || !judul_kegiatan || !deskripsi_kegiatan) {
        return NextResponse.json({ error: 'Tanggal, judul, dan deskripsi kegiatan wajib diisi' }, { status: 400 });
      }
      const newLog = store.addLogbook(id, { tanggal, judul_kegiatan, deskripsi_kegiatan, kendala });
      return NextResponse.json(newLog, { status: 201 });
    }

    // POST /api/reviews/:id/upvote
    if (resource === 'reviews' && id && subResource === 'upvote') {
      const updated = store.upvoteReview(id);
      return NextResponse.json(updated);
    }

    // POST /api/reviews
    if (resource === 'reviews') {
      const { company_id, rating, review_text } = body;
      if (!company_id || !rating || !review_text) {
        return NextResponse.json({ error: 'Perusahaan, rating bintang, dan isi ulasan wajib diisi.' }, { status: 400 });
      }
      const newReview = store.addReview(body);
      return NextResponse.json(newReview, { status: 201 });
    }

    // POST /api/favorites/toggle
    if (resource === 'favorites' && id === 'toggle') {
      const studentId = request.headers.get('x-student-id') || body.student_id;
      const targetJobId = body.job_id || body.jobId;
      if (!studentId) {
        return NextResponse.json({
          success: false,
          error: 'Unauthorized',
          message: 'Login yuk untuk menambahkan tempat PKL favoritmu!'
        }, { status: 401 });
      }
      const student = store.getStudentById(studentId);
      if (!student) {
        return NextResponse.json({
          success: false,
          error: 'Unauthorized',
          message: 'Login yuk untuk menambahkan tempat PKL favoritmu!'
        }, { status: 401 });
      }
      if (!targetJobId) {
        return NextResponse.json({ error: 'job_id wajib disertakan' }, { status: 400 });
      }
      const result = store.toggleFavorite(studentId, targetJobId);
      return NextResponse.json({
        success: true,
        student_id: Number(studentId),
        job_id: Number(targetJobId),
        is_favorited: result.is_favorited,
        favorites: result.favorites,
        message: result.is_favorited ? 'Lowongan berhasil disimpan ke favorit' : 'Lowongan dihapus dari favorit'
      });
    }

    return NextResponse.json({ error: 'Endpoint tidak ditemukan' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT Handler
export async function PUT(request, { params }) {
  try {
    const slug = params?.slug || [];
    const resource = slug[0];
    const id = slug[1];
    const subResource = slug[2];

    let body = {};
    try {
      body = await request.json();
    } catch (e) {
      body = {};
    }

    // PUT /api/students/:id/verify
    if (resource === 'students' && id && subResource === 'verify') {
      const { status_verifikasi, catatan_verifikasi } = body;
      if (!['Terverifikasi', 'Ditolak', 'Menunggu Verifikasi', 'Perlu Perbaikan'].includes(status_verifikasi)) {
        return NextResponse.json({ error: 'Status verifikasi tidak valid' }, { status: 400 });
      }
      const updated = store.verifyStudent(id, { status_verifikasi, catatan_verifikasi });
      return NextResponse.json(updated);
    }

    // PUT /api/students/:id
    if (resource === 'students' && id) {
      const updated = store.updateStudent(id, body);
      return NextResponse.json(updated);
    }

    // PUT /api/companies/:id
    if (resource === 'companies' && id) {
      const updated = store.updateCompany(id, body);
      return NextResponse.json(updated);
    }

    // PUT /api/jobs/:id
    if (resource === 'jobs' && id) {
      const updated = store.updateJob(id, body);
      return NextResponse.json(updated);
    }

    // PUT /api/applications/:id/status
    if (resource === 'applications' && id && subResource === 'status') {
      const updated = store.updateApplicationStatus(id, body);
      return NextResponse.json(updated);
    }

    // PUT /api/placements/:id/complete
    if (resource === 'placements' && id && subResource === 'complete') {
      const updated = store.completePlacement(id, body);
      return NextResponse.json(updated);
    }

    // PUT /api/logbooks/:id/status
    if (resource === 'logbooks' && id && subResource === 'status') {
      const updated = store.updateLogbookStatus(id, body);
      return NextResponse.json(updated);
    }

    return NextResponse.json({ error: 'Endpoint tidak ditemukan' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE Handler
export async function DELETE(request, { params }) {
  try {
    const slug = params?.slug || [];
    const resource = slug[0];
    const id = slug[1];

    // DELETE /api/jobs/:id
    if (resource === 'jobs' && id) {
      store.deleteJob(id);
      return NextResponse.json({ success: true, message: 'Lowongan berhasil dihapus' });
    }

    return NextResponse.json({ error: 'Endpoint tidak ditemukan' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
