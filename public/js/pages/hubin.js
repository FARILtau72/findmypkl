// ==========================================================================
// FIND MY PKL - PORTAL BKK/HUBIN ADMINISTRATOR MODULE
// Student Verification, Application Approval, Monitoring, Job & Company Management
// ==========================================================================

Object.assign(window.App, {
  async renderHubinDashboard(container) {
    const [students, companies, jobs, applications, placements] = await Promise.all([
      API.getStudents(),
      API.getCompanies(),
      API.getJobs(),
      API.getApplications(),
      API.getPlacements({ status: 'Aktif' })
    ]);

    const pendingStudents = students.filter(s => s.status_verifikasi === 'Menunggu Verifikasi');
    const pendingApps = applications.filter(a => a.status === 'Menunggu Verifikasi HUBIN');

    container.innerHTML = `
      <!-- Stats Metric Cards -->
      <div class="grid-4" style="margin-bottom: 28px;">
        <div class="stat-card">
          <div class="stat-info">
            <span>Siswa Terdaftar</span>
            <h3>${students.length}</h3>
            <p>${pendingStudents.length} butuh verifikasi</p>
          </div>
          <div class="stat-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <span>Sedang PKL Aktif</span>
            <h3>${placements.length}</h3>
            <p>Tersebar di mitra DUDI</p>
          </div>
          <div class="stat-icon emerald">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <span>Mitra DUDI Aktif</span>
            <h3>${companies.length}</h3>
            <p>Memiliki MoU Kerjasama</p>
          </div>
          <div class="stat-icon purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <span>Lamaran Perlu Review</span>
            <h3>${pendingApps.length}</h3>
            <p>Menunggu surat pengantar</p>
          </div>
          <div class="stat-icon amber">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
        </div>
      </div>

      ${pendingStudents.length > 0 ? `
        <div class="card" style="background-color: var(--amber-50); border-color: var(--amber-200); margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="color: var(--amber-600);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
            <div>
              <h4 style="font-size: 14px; font-weight: 700; color: var(--amber-900);">Ada ${pendingStudents.length} Siswa Baru Menunggu Verifikasi Akun</h4>
              <p style="font-size: 13px; color: var(--amber-800);">Siswa belum dapat melamar PKL sebelum diverifikasi NISN & jurusannya.</p>
            </div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="App.setTab('verifikasi')">Buka Verifikasi &rarr;</button>
        </div>
      ` : ''}

      <div class="grid-2">
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-size: 16px; font-weight: 700; color: var(--slate-900);">Lamaran Masuk Terbaru</h3>
            <button class="btn btn-ghost btn-sm" onclick="App.setTab('persetujuan')">Lihat Semua &rarr;</button>
          </div>
          <div class="table-responsive">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Siswa</th>
                  <th>Posisi PKL</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${applications.slice(0, 5).map(a => `
                  <tr>
                    <td>
                      <div style="font-weight: 600; color: var(--slate-900);">${a.student_nama}</div>
                      <div style="font-size: 12px; color: var(--slate-500);">${a.student_jurusan}</div>
                    </td>
                    <td>
                      <div style="font-weight: 500;">${a.job_judul}</div>
                      <div style="font-size: 12px; color: var(--slate-500);">${a.company_nama}</div>
                    </td>
                    <td>${renderBadge(a.status)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-size: 16px; font-weight: 700; color: var(--slate-900);">Siswa Sedang Magang Aktif</h3>
            <button class="btn btn-ghost btn-sm" onclick="App.setTab('monitoring')">Monitoring &rarr;</button>
          </div>
          <div class="table-responsive">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Siswa</th>
                  <th>Perusahaan Mitra</th>
                  <th>Periode</th>
                </tr>
              </thead>
              <tbody>
                ${placements.slice(0, 5).map(p => `
                  <tr>
                    <td>
                      <div style="font-weight: 600; color: var(--slate-900);">${p.student_nama}</div>
                      <div style="font-size: 12px; color: var(--slate-500);">${p.student_kelas}</div>
                    </td>
                    <td>
                      <div style="font-weight: 500;">${p.company_nama}</div>
                      <div style="font-size: 12px; color: var(--slate-500);">${p.job_judul}</div>
                    </td>
                    <td>
                      <span style="font-size: 12px; color: var(--slate-600);">${p.tanggal_mulai ? p.tanggal_mulai.substring(0,10) : ''} s.d. ${p.tanggal_selesai ? p.tanggal_selesai.substring(0,10) : ''}</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  async renderHubinVerifikasi(container) {
    const students = await API.getStudents();

    container.innerHTML = `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: var(--slate-900);">Antrean Verifikasi Akun Siswa</h3>
            <p style="font-size: 13px; color: var(--slate-500);">Validasi data pendaftaran siswa SMK Taruna Bangsa Kota Bekasi dengan database Dapodik sekolah.</p>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <label style="font-size: 12.5px; font-weight: 600; color: var(--slate-600);">Filter Status:</label>
            <select id="verifikasi-filter-status" class="form-select" style="font-size: 13px; min-width: 170px;">
              <option value="Semua">Semua Status (${students.length})</option>
              <option value="Menunggu Verifikasi" selected>Menunggu Verifikasi (${students.filter(s => s.status_verifikasi === 'Menunggu Verifikasi').length})</option>
              <option value="Perlu Perbaikan">Perlu Perbaikan (${students.filter(s => s.status_verifikasi === 'Perlu Perbaikan').length})</option>
              <option value="Terverifikasi">Terverifikasi (${students.filter(s => s.status_verifikasi === 'Terverifikasi').length})</option>
              <option value="Ditolak">Ditolak (${students.filter(s => s.status_verifikasi === 'Ditolak').length})</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>NISN</th>
                <th>Nama Siswa</th>
                <th>Jurusan & Rombel</th>
                <th>Kontak & WhatsApp</th>
                <th>Status Akun</th>
                <th style="text-align: right;">Aksi Verifikasi HUBIN</th>
              </tr>
            </thead>
            <tbody id="verifikasi-table-body">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>
    `;

    const populateTable = () => {
      const filter = document.getElementById('verifikasi-filter-status').value;
      const filtered = students.filter(s => filter === 'Semua' || s.status_verifikasi === filter);

      const tbody = document.getElementById('verifikasi-table-body');
      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" style="text-align: center; padding: 40px; color: var(--slate-500);">
              Tidak ada data siswa dengan status "${filter}".
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = filtered.map(s => `
        <tr>
          <td><code style="background-color: var(--slate-100); padding: 3px 6px; border-radius: 4px; font-size: 13px; font-weight: 700;">${s.nisn}</code></td>
          <td>
            <div style="font-weight: 700; color: var(--slate-900);">${s.nama}</div>
            <div style="font-size: 12px; color: var(--slate-500);">${s.email}</div>
          </td>
          <td>
            <div style="font-weight: 500;">${s.jurusan}</div>
            <div style="font-size: 12px; color: var(--slate-500);">${s.kelas}</div>
          </td>
          <td>
            <div style="font-size: 13px; font-weight: 600;">${s.no_hp || '-'}</div>
            ${s.cv_url ? `<a href="${s.cv_url}" target="_blank" style="font-size: 12px; text-decoration: underline; color: var(--primary-600);">Berkas CV / Link &rarr;</a>` : '<span style="font-size: 12px; color: var(--slate-400);">Belum upload CV</span>'}
          </td>
          <td>
            ${renderBadge(s.status_verifikasi)}
            ${s.catatan_verifikasi ? `<div style="font-size: 11px; color: var(--slate-500); margin-top: 4px; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${s.catatan_verifikasi}">${s.catatan_verifikasi}</div>` : ''}
          </td>
          <td style="text-align: right;">
            <div style="display: flex; gap: 6px; justify-content: flex-end; flex-wrap: wrap;">
              ${s.status_verifikasi !== 'Terverifikasi' ? `
                <button class="btn btn-success btn-sm" onclick="App.handleVerifyStudent(${s.id}, 'Terverifikasi')" title="Setujui dan aktifkan akun siswa">
                  Setujui
                </button>
              ` : ''}
              ${s.status_verifikasi !== 'Perlu Perbaikan' ? `
                <button class="btn btn-warning btn-sm" style="background: #f59e0b; border-color: #d97706; color: #fff;" onclick="App.showRequestRevisionModal(${s.id})" title="Minta siswa memperbaiki data">
                  Perbaikan
                </button>
              ` : ''}
              ${s.status_verifikasi !== 'Ditolak' ? `
                <button class="btn btn-outline-danger btn-sm" onclick="App.showRejectStudentModal(${s.id})" title="Tolak pendaftaran akun">
                  Tolak
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `).join('');
    };

    document.getElementById('verifikasi-filter-status').addEventListener('change', populateTable);
    populateTable();
  },

  async handleVerifyStudent(studentId, newStatus) {
    let defaultNote = 'Data NISN dan nilai rapor telah divalidasi oleh Koordinator HUBIN SMK Taruna Bangsa Kota Bekasi.';
    try {
      await API.verifyStudent(studentId, {
        status_verifikasi: newStatus,
        catatan_verifikasi: defaultNote
      });

      Toast.show('Akun Disetujui', 'Akun siswa berhasil diverifikasi! Siswa sekarang dapat melamar PKL.', 'success');
      this.allStudents = await API.getStudents();
      this.populateRoleSelect();
      this.renderContent();
    } catch (err) {
      Toast.show('Gagal Memperbarui Akun', err.message, 'error');
    }
  },

  showRequestRevisionModal(studentId) {
    const student = this.allStudents.find(s => s.id === studentId);
    if (!student) return;

    const contentHtml = `
      <div>
        <p style="font-size: 13.5px; color: var(--slate-600); margin-bottom: 14px;">
          Berikan catatan koreksi kepada <strong>${student.nama}</strong> (${student.kelas}). Status akun akan menjadi <strong>Perlu Perbaikan</strong> dan siswa akan diminta mengirimkan pembaruan data.
        </p>

        <div class="form-group" style="margin-bottom: 16px;">
          <label class="form-label" style="font-weight: 700;">Catatan Perbaikan dari HUBIN *</label>
          <textarea id="hubin-revision-note" class="form-textarea" rows="4" placeholder="Tuliskan data apa saja yang perlu diperbaiki oleh siswa...">Nomor WhatsApp tidak aktif dan tautan CV/portofolio tidak dapat diakses. Mohon perbarui dengan nomor aktif dan link Google Drive yang dapat diakses publik.</textarea>
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button class="btn btn-secondary" onclick="Modal.close()">Batal</button>
          <button class="btn btn-primary" style="background: #ea580c; border-color: #ea580c;" onclick="App.handleSaveRevisionRequest(${student.id})">
            Kirim Permintaan Perbaikan &rarr;
          </button>
        </div>
      </div>
    `;

    Modal.open(contentHtml, 'Minta Perbaikan Data Siswa');
  },

  async handleSaveRevisionRequest(studentId) {
    const note = document.getElementById('hubin-revision-note').value.trim();
    if (!note) {
      Toast.show('Perhatian', 'Mohon isi catatan perbaikan terlebih dahulu.', 'error');
      return;
    }

    try {
      await API.verifyStudent(studentId, {
        status_verifikasi: 'Perlu Perbaikan',
        catatan_verifikasi: note
      });

      Modal.close();
      Toast.show('Permintaan Terkirim', 'Status siswa diubah menjadi "Perlu Perbaikan". Siswa diminta mengupdate data.', 'success');
      this.allStudents = await API.getStudents();
      this.populateRoleSelect();
      this.renderContent();
    } catch (err) {
      Toast.show('Gagal Memperbarui Akun', err.message, 'error');
    }
  },

  showRejectStudentModal(studentId) {
    const student = this.allStudents.find(s => s.id === studentId);
    if (!student) return;

    const contentHtml = `
      <div>
        <p style="font-size: 13.5px; color: var(--slate-600); margin-bottom: 14px;">
          Tolak pendaftaran akun siswa <strong>${student.nama}</strong> (${student.kelas}).
        </p>

        <div class="form-group" style="margin-bottom: 16px;">
          <label class="form-label" style="font-weight: 700;">Alasan Penolakan Verifikasi *</label>
          <textarea id="hubin-reject-reason" class="form-textarea" rows="4" placeholder="Tuliskan alasan penolakan verifikasi...">NISN tidak terdaftar dalam buku induk Dapodik SMK Taruna Bangsa Kota Bekasi tahun ajaran 2025/2026.</textarea>
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button class="btn btn-secondary" onclick="Modal.close()">Batal</button>
          <button class="btn btn-outline-danger" onclick="App.handleSaveRejectStudent(${student.id})">
            Tolak Akun Siswa
          </button>
        </div>
      </div>
    `;

    Modal.open(contentHtml, 'Tolak Verifikasi Siswa');
  },

  async handleSaveRejectStudent(studentId) {
    const reason = document.getElementById('hubin-reject-reason').value.trim();
    if (!reason) {
      Toast.show('Perhatian', 'Mohon isi alasan penolakan.', 'error');
      return;
    }

    try {
      await API.verifyStudent(studentId, {
        status_verifikasi: 'Ditolak',
        catatan_verifikasi: reason
      });

      Modal.close();
      Toast.show('Pendaftaran Ditolak', 'Akun siswa telah disetel ke status "Ditolak".', 'info');
      this.allStudents = await API.getStudents();
      this.populateRoleSelect();
      this.renderContent();
    } catch (err) {
      Toast.show('Gagal Memperbarui Akun', err.message, 'error');
    }
  },

  async renderHubinPersetujuan(container) {
    const applications = await API.getApplications();

    container.innerHTML = `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: var(--slate-900);">Tinjauan & Persetujuan Lamaran PKL</h3>
            <p style="font-size: 13px; color: var(--slate-500);">Review permohonan siswa, terbitkan surat pengantar sekolah, dan koordinasikan dengan DUDI.</p>
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Siswa Pemohon</th>
                <th>Perusahaan & Posisi</th>
                <th>Tanggal Daftar</th>
                <th>Status Saat Ini</th>
                <th>Surat Pengantar</th>
                <th style="text-align: right;">Aksi HUBIN</th>
              </tr>
            </thead>
            <tbody>
              ${applications.map(app => `
                <tr>
                  <td>
                    <div style="font-weight: 700; color: var(--slate-900);">${app.student_nama}</div>
                    <div style="font-size: 12px; color: var(--slate-500);">${app.student_jurusan} (${app.student_kelas})</div>
                    ${app.portofolio_url ? `<a href="${app.portofolio_url}" target="_blank" style="font-size: 11px; text-decoration: underline;">Portofolio Siswa &rarr;</a>` : ''}
                  </td>
                  <td>
                    <div style="font-weight: 600; color: var(--slate-900);">${app.job_judul}</div>
                    <div style="font-size: 12px; color: var(--slate-600);">${app.company_nama} (${app.lokasi_kota})</div>
                  </td>
                  <td>${app.tanggal_daftar ? app.tanggal_daftar.substring(0,10) : ''}</td>
                  <td>${renderBadge(app.status)}</td>
                  <td>
                    ${app.nomor_surat_pengantar ? `<span style="font-size: 12px; font-weight: 600; color: var(--primary-700);">${app.nomor_surat_pengantar}</span>` : '<span style="font-size: 12px; color: var(--slate-400);">Belum terbit</span>'}
                  </td>
                  <td style="text-align: right;">
                    ${app.status === 'Menunggu Verifikasi HUBIN' ? `
                      <div style="display: flex; gap: 6px; justify-content: flex-end;">
                        <button class="btn btn-success btn-sm" onclick="App.showApproveModal(${app.id})">Setujui & Terbitkan</button>
                        <button class="btn btn-outline-danger btn-sm" onclick="App.handleRejectApp(${app.id})">Tolak</button>
                      </div>
                    ` : app.status === 'Disetujui HUBIN' ? `
                      <div style="display: flex; gap: 6px; justify-content: flex-end;">
                        <button class="btn btn-primary btn-sm" onclick="App.handleSimulateCompanyAccept(${app.id})">Mitra Menerima</button>
                        <button class="btn btn-outline-danger btn-sm" onclick="App.handleSimulateCompanyReject(${app.id})">Mitra Menolak</button>
                      </div>
                    ` : `
                      <span style="font-size: 12px; color: var(--slate-400); font-style: italic;">Selesai Diproses</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  showApproveModal(appId) {
    const defaultNo = `421.5/SMK-TB/HUBIN/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;
    const contentHtml = `
      <div>
        <div class="form-group">
          <label class="form-label">Nomor Surat Pengantar Resmi Sekolah</label>
          <input type="text" id="approve-no-surat" class="form-input" value="${defaultNo}" />
        </div>
        <div class="form-group">
          <label class="form-label">Catatan Rekomendasi untuk Mitra Industri</label>
          <textarea id="approve-catatan" class="form-textarea" rows="3">Kualifikasi kompetensi kejuruan siswa telah divalidasi dan dinyatakan sangat memenuhi syarat untuk menjalani program magang.</textarea>
        </div>
        <button class="btn btn-success" style="width: 100%;" onclick="App.handleConfirmApprove(${appId})">
          Setujui & Terbitkan Surat Pengantar
        </button>
      </div>
    `;

    Modal.open(contentHtml, 'Persetujuan Lamaran PKL');
  },

  async handleConfirmApprove(appId) {
    const nomor_surat_pengantar = document.getElementById('approve-no-surat').value;
    const catatan_hubin = document.getElementById('approve-catatan').value;

    try {
      await API.updateApplicationStatus(appId, {
        status: 'Disetujui HUBIN',
        nomor_surat_pengantar,
        catatan_hubin
      });

      Modal.close();
      Toast.show('Lamaran Disetujui', 'Surat pengantar diterbitkan dan berkas diteruskan ke Mitra DUDI.', 'success');
      this.renderContent();
    } catch (err) {
      Toast.show('Gagal Menyetujui', err.message, 'error');
    }
  },

  async handleRejectApp(appId) {
    const catatan = prompt('Masukkan alasan penolakan lamaran:', 'Kuota jurusan untuk mitra ini telah terpenuhi.');
    if (catatan === null) return;

    try {
      await API.updateApplicationStatus(appId, {
        status: 'Ditolak HUBIN',
        catatan_hubin: catatan
      });

      Toast.show('Lamaran Ditolak', 'Status telah diperbarui.', 'info');
      this.renderContent();
    } catch (err) {
      Toast.show('Gagal', err.message, 'error');
    }
  },

  async handleSimulateCompanyAccept(appId) {
    Dialog.confirm(
      'Konfirmasi Penerimaan dari Mitra DUDI',
      'Mitra Industri telah menyetujui siswa ini untuk memulai magang. Sistem akan otomatis membuat data Penempatan PKL Aktif di TiDB Cloud.',
      'Konfirmasi Siswa Diterima',
      async () => {
        try {
          await API.updateApplicationStatus(appId, {
            status: 'Diterima Perusahaan',
            catatan_perusahaan: 'Lolos proses seleksi internal DUDI. Selamat bergabung di tim!'
          });
          Toast.show('Siswa Resmi Diterima!', 'Penempatan PKL aktif telah dibuat otomatis.', 'success');
          this.renderContent();
        } catch (err) {
          Toast.show('Gagal', err.message, 'error');
        }
      }
    );
  },

  async handleSimulateCompanyReject(appId) {
    const alasan = prompt('Alasan perusahaan mitra menolak:', 'Kandidat lain memiliki kecocokan jadwal proyek yang lebih sesuai.');
    if (alasan === null) return;

    try {
      await API.updateApplicationStatus(appId, {
        status: 'Tidak Diterima Perusahaan',
        catatan_perusahaan: alasan
      });
      Toast.show('Status Diperbarui', 'Lamaran ditandai Tidak Diterima oleh Mitra.', 'info');
      this.renderContent();
    } catch (err) {
      Toast.show('Gagal', err.message, 'error');
    }
  },

  async renderHubinLowongan(container) {
    const jobs = await API.getJobs();

    container.innerHTML = `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: var(--slate-900);">Daftar Lowongan PKL SMK</h3>
            <p style="font-size: 13px; color: var(--slate-500);">Kelola kuota penerimaan siswa dari mitra industri rekanan.</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="App.showAddJobModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Tambah Lowongan Baru
          </button>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Judul Posisi PKL</th>
                <th>Perusahaan</th>
                <th>Target Kejuruan</th>
                <th>Tipe & Kota</th>
                <th>Kuota</th>
                <th>Status</th>
                <th style="text-align: right;">Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${jobs.map(j => `
                <tr>
                  <td>
                    <div style="font-weight: 700; color: var(--slate-900);">${j.judul}</div>
                    <div style="font-size: 12px; color: var(--slate-500);">Durasi: ${j.durasi_bulan} Bulan</div>
                  </td>
                  <td>${j.company_nama}</td>
                  <td><div style="max-width: 200px; font-size: 12px; color: var(--slate-700);">${j.jurusan_target}</div></td>
                  <td>${j.tipe_kerja} &bull; ${j.lokasi_kota}</td>
                  <td><strong>${j.kuota - j.kuota_terisi}</strong> / ${j.kuota}</td>
                  <td>${renderBadge(j.status)}</td>
                  <td style="text-align: right;">
                    <div style="display: flex; gap: 6px; justify-content: flex-end;">
                      <button class="btn btn-secondary btn-sm" onclick="App.showEditJobModal(${j.id})">Edit</button>
                      <button class="btn btn-outline-danger btn-sm" onclick="App.handleDeleteJob(${j.id})">Hapus</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  async showAddJobModal() {
    const companies = await API.getCompanies();
    const contentHtml = `
      <div>
        <div class="form-group">
          <label class="form-label">Pilih Perusahaan Mitra DUDI</label>
          <select id="new-job-company" class="form-select">
            ${companies.map(c => `<option value="${c.id}">${c.nama} (${c.kota})</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Judul Posisi PKL</label>
          <input type="text" id="new-job-judul" class="form-input" placeholder="Contoh: Junior Web Developer Intern" />
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Target Jurusan</label>
            <input type="text" id="new-job-jurusan" class="form-input" placeholder="Contoh: RPL, TKJ" />
          </div>
          <div class="form-group">
            <label class="form-label">Tipe Kerja</label>
            <select id="new-job-tipe" class="form-select">
              <option value="WFO">WFO (Di Kantor)</option>
              <option value="Hybrid">Hybrid</option>
              <option value="WFH">WFH (Remote)</option>
            </select>
          </div>
        </div>
        <div class="grid-3">
          <div class="form-group">
            <label class="form-label">Lokasi Kota</label>
            <input type="text" id="new-job-kota" class="form-input" value="Jakarta" />
          </div>
          <div class="form-group">
            <label class="form-label">Kuota Siswa</label>
            <input type="number" id="new-job-kuota" class="form-input" value="3" min="1" />
          </div>
          <div class="form-group">
            <label class="form-label">Durasi (Bulan)</label>
            <input type="number" id="new-job-durasi" class="form-input" value="6" min="3" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Uang Saku & Benefit</label>
          <input type="text" id="new-job-benefit" class="form-input" value="Ada (Uang Saku Rp 1.500.000 / bulan + Sertifikat)" />
        </div>
        <div class="form-group">
          <label class="form-label">Deskripsi Pekerjaan</label>
          <textarea id="new-job-deskripsi" class="form-textarea" rows="3" placeholder="Rincian kegiatan harian yang akan dipelajari siswa..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Kualifikasi Siswa</label>
          <textarea id="new-job-kualifikasi" class="form-textarea" rows="2" placeholder="Kemampuan dasar kejuruan yang diharapkan..."></textarea>
        </div>
        <button class="btn btn-primary" style="width: 100%;" onclick="App.handleSaveNewJob()">
          Simpan Lowongan ke TiDB Cloud
        </button>
      </div>
    `;

    Modal.open(contentHtml, 'Tambah Lowongan PKL Baru', 'lg');
  },

  async handleSaveNewJob() {
    const company_id = document.getElementById('new-job-company').value;
    const judul = document.getElementById('new-job-judul').value;
    const jurusan_target = document.getElementById('new-job-jurusan').value;
    const tipe_kerja = document.getElementById('new-job-tipe').value;
    const lokasi_kota = document.getElementById('new-job-kota').value;
    const kuota = parseInt(document.getElementById('new-job-kuota').value) || 2;
    const durasi_bulan = parseInt(document.getElementById('new-job-durasi').value) || 6;
    const uang_saku = document.getElementById('new-job-benefit').value;
    const deskripsi = document.getElementById('new-job-deskripsi').value;
    const kualifikasi = document.getElementById('new-job-kualifikasi').value;

    if (!judul || !jurusan_target || !deskripsi || !kualifikasi) {
      Toast.show('Perhatian', 'Mohon lengkapi judul, jurusan, deskripsi, dan kualifikasi', 'error');
      return;
    }

    try {
      await API.createJob({
        company_id, judul, jurusan_target, tipe_kerja, lokasi_kota, kuota, durasi_bulan, uang_saku, deskripsi, kualifikasi, benefit: uang_saku
      });

      Modal.close();
      Toast.show('Lowongan Dibuat', 'Lowongan PKL baru kini aktif dan dapat dilamar siswa.', 'success');
      this.cachedJobs = await API.getJobs();
      this.renderContent();
    } catch (err) {
      Toast.show('Gagal Menyimpan', err.message, 'error');
    }
  },

  async showEditJobModal(jobId) {
    const job = await API.getJobById(jobId);
    const contentHtml = `
      <div>
        <div class="form-group">
          <label class="form-label">Judul Posisi PKL</label>
          <input type="text" id="edit-job-judul" class="form-input" value="${job.judul}" />
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Target Jurusan</label>
            <input type="text" id="edit-job-jurusan" class="form-input" value="${job.jurusan_target}" />
          </div>
          <div class="form-group">
            <label class="form-label">Tipe Kerja</label>
            <select id="edit-job-tipe" class="form-select">
              <option value="WFO" ${job.tipe_kerja === 'WFO' ? 'selected' : ''}>WFO</option>
              <option value="Hybrid" ${job.tipe_kerja === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
              <option value="WFH" ${job.tipe_kerja === 'WFH' ? 'selected' : ''}>WFH</option>
            </select>
          </div>
        </div>
        <div class="grid-3">
          <div class="form-group">
            <label class="form-label">Kuota Siswa</label>
            <input type="number" id="edit-job-kuota" class="form-input" value="${job.kuota}" />
          </div>
          <div class="form-group">
            <label class="form-label">Status Lowongan</label>
            <select id="edit-job-status" class="form-select">
              <option value="Buka" ${job.status === 'Buka' ? 'selected' : ''}>Buka</option>
              <option value="Tutup" ${job.status === 'Tutup' ? 'selected' : ''}>Tutup</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Kota</label>
            <input type="text" id="edit-job-kota" class="form-input" value="${job.lokasi_kota}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Deskripsi Pekerjaan</label>
          <textarea id="edit-job-deskripsi" class="form-textarea" rows="3">${job.deskripsi}</textarea>
        </div>
        <button class="btn btn-primary" style="width: 100%;" onclick="App.handleUpdateJob(${job.id})">
          Perbarui Lowongan di TiDB Cloud
        </button>
      </div>
    `;

    Modal.open(contentHtml, 'Edit Lowongan PKL');
  },

  async handleUpdateJob(jobId) {
    const judul = document.getElementById('edit-job-judul').value;
    const jurusan_target = document.getElementById('edit-job-jurusan').value;
    const tipe_kerja = document.getElementById('edit-job-tipe').value;
    const kuota = parseInt(document.getElementById('edit-job-kuota').value);
    const status = document.getElementById('edit-job-status').value;
    const lokasi_kota = document.getElementById('edit-job-kota').value;
    const deskripsi = document.getElementById('edit-job-deskripsi').value;

    try {
      await API.updateJob(jobId, {
        judul, jurusan_target, tipe_kerja, kuota, status, lokasi_kota, deskripsi, durasi_bulan: 6, uang_saku: 'Ada', kualifikasi: deskripsi
      });
      Modal.close();
      Toast.show('Lowongan Diperbarui', 'Perubahan tersimpan di database.', 'success');
      this.cachedJobs = await API.getJobs();
      this.renderContent();
    } catch (err) {
      Toast.show('Gagal', err.message, 'error');
    }
  },

  async handleDeleteJob(jobId) {
    Dialog.confirm(
      'Hapus Lowongan PKL',
      'Apakah Anda yakin ingin menghapus lowongan ini dari sistem?',
      'Hapus Sekarang',
      async () => {
        try {
          await API.deleteJob(jobId);
          Toast.show('Lowongan Dihapus', 'Data telah dihapus dari TiDB Cloud.', 'info');
          this.cachedJobs = await API.getJobs();
          this.renderContent();
        } catch (err) {
          Toast.show('Gagal', err.message, 'error');
        }
      }
    );
  },

  async renderHubinMitra(container) {
    const companies = await API.getCompanies();

    container.innerHTML = `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: var(--slate-900);">Mitra Dunia Usaha & Industri (DUDI)</h3>
            <p style="font-size: 13px; color: var(--slate-500);">Perusahaan rekanan resmi tempat PKL siswa SMK Taruna Bangsa Kota Bekasi.</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="App.showAddCompanyModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Tambah Mitra Baru
          </button>
        </div>

        <div class="grid-3">
          ${companies.map(c => `
            <div class="card card-hoverable" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
                  <div class="company-badge-box" style="background: transparent; border: none; padding: 0;">
                    ${renderCompanyLogo(c, { size: 48 })}
                  </div>
                  <div>
                    <h4 style="font-size: 16px; font-weight: 700; color: var(--slate-900);">${c.nama}</h4>
                    <p style="font-size: 13px; color: var(--slate-500);">${c.bidang}</p>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--slate-600); margin-bottom: 16px;">
                  <div><strong>Alamat:</strong> ${c.alamat}</div>
                  <div><strong>PIC:</strong> ${c.pic_nama} (${c.pic_kontak})</div>
                  <div><strong>No. MoU:</strong> <code style="font-size: 11px;">${c.no_mou || 'Dalam Proses'}</code></div>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 12px;">
                <span class="badge badge-emerald">${c.status_mou}</span>
                <span style="font-size: 12px; font-weight: 600; color: var(--primary-700);">
                  ${c.siswa_aktif_count || 0} Siswa Magang
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  showAddCompanyModal() {
    const contentHtml = `
      <div>
        <div class="form-group">
          <label class="form-label">Nama Perusahaan / Industri</label>
          <input type="text" id="new-comp-nama" class="form-input" placeholder="Contoh: PT Shopee International Indonesia" />
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Bidang Industri</label>
            <input type="text" id="new-comp-bidang" class="form-input" placeholder="Contoh: E-Commerce & Logistik" />
          </div>
          <div class="form-group">
            <label class="form-label">Kota</label>
            <input type="text" id="new-comp-kota" class="form-input" value="Jakarta Selatan" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Alamat Kantor Lengkap</label>
          <textarea id="new-comp-alamat" class="form-textarea" rows="2" placeholder="Gedung, jalan, nomor..."></textarea>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Nama PIC Hubin Industri</label>
            <input type="text" id="new-comp-pic-nama" class="form-input" placeholder="Nama penanggung jawab" />
          </div>
          <div class="form-group">
            <label class="form-label">Nomor Kontak PIC / HR</label>
            <input type="text" id="new-comp-pic-kontak" class="form-input" placeholder="0812-xxxx-xxxx" />
          </div>
        </div>
        <button class="btn btn-primary" style="width: 100%;" onclick="App.handleSaveNewCompany()">
          Simpan Mitra Industri ke TiDB Cloud
        </button>
      </div>
    `;

    Modal.open(contentHtml, 'Tambah Mitra Industri Baru');
  },

  async handleSaveNewCompany() {
    const nama = document.getElementById('new-comp-nama').value;
    const bidang = document.getElementById('new-comp-bidang').value;
    const kota = document.getElementById('new-comp-kota').value;
    const alamat = document.getElementById('new-comp-alamat').value;
    const pic_nama = document.getElementById('new-comp-pic-nama').value;
    const pic_kontak = document.getElementById('new-comp-pic-kontak').value;

    if (!nama || !bidang || !kota || !alamat || !pic_nama || !pic_kontak) {
      Toast.show('Perhatian', 'Lengkapi seluruh field wajib mitra industri', 'error');
      return;
    }

    try {
      await API.addCompany({ nama, bidang, kota, alamat, pic_nama, pic_kontak });
      Modal.close();
      Toast.show('Mitra Baru Ditambahkan', 'Data mitra tersimpan di TiDB Cloud.', 'success');
      this.renderContent();
    } catch (err) {
      Toast.show('Gagal', err.message, 'error');
    }
  },

  async renderHubinMonitoring(container) {
    const placements = await API.getPlacements({ status: 'Aktif' });

    container.innerHTML = `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: var(--slate-900);">Monitoring Siswa PKL Aktif</h3>
            <p style="font-size: 13px; color: var(--slate-500);">Pantau keaktifan siswa magang, kelengkapan logbook, serta lakukan evaluasi kelulusan.</p>
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Siswa Magang</th>
                <th>Perusahaan Tempat PKL</th>
                <th>Periode Magang</th>
                <th>Pembimbing</th>
                <th>Logbook Terisi</th>
                <th style="text-align: right;">Aksi Evaluasi</th>
              </tr>
            </thead>
            <tbody>
              ${placements.map(p => `
                <tr>
                  <td>
                    <div style="font-weight: 700; color: var(--slate-900);">${p.student_nama}</div>
                    <div style="font-size: 12px; color: var(--slate-500);">${p.student_jurusan} (${p.student_kelas})</div>
                  </td>
                  <td>
                    <div style="font-weight: 600; color: var(--slate-900);">${p.company_nama}</div>
                    <div style="font-size: 12px; color: var(--slate-500);">${p.job_judul}</div>
                  </td>
                  <td>
                    <div style="font-size: 13px;">${p.tanggal_mulai ? p.tanggal_mulai.substring(0,10) : ''} s.d. ${p.tanggal_selesai ? p.tanggal_selesai.substring(0,10) : ''}</div>
                  </td>
                  <td>
                    <div style="font-size: 13px; font-weight: 500;">${p.pembimbing_industri}</div>
                    <div style="font-size: 11px; color: var(--slate-500);">Guru: ${p.guru_pembimbing}</div>
                  </td>
                  <td>
                    <span class="badge badge-blue">${p.logbook_count} Jurnal</span>
                  </td>
                  <td style="text-align: right;">
                    <button class="btn btn-success btn-sm" onclick="App.showCompleteModal(${p.id})">
                      Selesaikan & Beri Nilai
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  showCompleteModal(placementId) {
    const contentHtml = `
      <div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Nilai dari Mitra Industri (0 - 100)</label>
            <input type="number" id="eval-nilai-industri" class="form-input" value="92" min="0" max="100" />
          </div>
          <div class="form-group">
            <label class="form-label">Nilai dari Guru Sekolah (0 - 100)</label>
            <input type="number" id="eval-nilai-sekolah" class="form-input" value="90" min="0" max="100" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Catatan Evaluasi Kompetensi Siswa</label>
          <textarea id="eval-catatan" class="form-textarea" rows="3">Siswa menunjukkan integritas kerja tinggi, disiplin waktu, dan berhasil menyelesaikan seluruh target proyek magang dengan sangat baik.</textarea>
        </div>
        <button class="btn btn-primary" style="width: 100%;" onclick="App.handleConfirmComplete(${placementId})">
          Terbitkan Sertifikat & Pindahkan ke Arsip Alumni
        </button>
      </div>
    `;

    Modal.open(contentHtml, 'Evaluasi Kelulusan PKL Siswa');
  },

  async handleConfirmComplete(placementId) {
    const nilai_industri = parseInt(document.getElementById('eval-nilai-industri').value) || 90;
    const nilai_sekolah = parseInt(document.getElementById('eval-nilai-sekolah').value) || 90;
    const catatan_evaluasi = document.getElementById('eval-catatan').value;

    try {
      await API.completePlacement(placementId, { nilai_industri, nilai_sekolah, catatan_evaluasi });
      Modal.close();
      Toast.show('PKL Diselesaikan', 'Siswa telah berhasil lulus PKL dan datanya tercatat di arsip alumni!', 'success');
      this.setTab('alumni');
    } catch (err) {
      Toast.show('Gagal', err.message, 'error');
    }
  },

  async renderHubinAlumni(container) {
    const [companies, alumni] = await Promise.all([
      API.getCompanies(),
      API.getAlumni()
    ]);

    container.innerHTML = `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: var(--slate-900);">Pelacak Alumni PKL Per Perusahaan Mitra</h3>
            <p style="font-size: 13px; color: var(--slate-500);">Lihat mantan siswa yang telah sukses menyelesaikan PKL di perusahaan tertentu.</p>
          </div>
          <div style="display: flex; gap: 10px;">
            <select id="alumni-filter-company" class="form-select" style="min-width: 220px;">
              <option value="">Semua Perusahaan Mitra</option>
              ${companies.map(c => `<option value="${c.id}">${c.nama}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Nama Alumni</th>
                <th>Jurusan SMK</th>
                <th>Perusahaan PKL</th>
                <th>No. Sertifikat</th>
                <th>Nilai Rata-rata</th>
                <th>Evaluasi Kelulusan</th>
              </tr>
            </thead>
            <tbody id="alumni-table-body">
              <!-- Dynamically rendered -->
            </tbody>
          </table>
        </div>
      </div>
    `;

    const renderRows = (companyId) => {
      const filtered = companyId ? alumni.filter(a => String(a.company_id) === String(companyId)) : alumni;
      const tbody = document.getElementById('alumni-table-body');

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" style="text-align: center; padding: 40px; color: var(--slate-500);">
              Belum ada data alumni PKL yang tercatat untuk perusahaan ini.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = filtered.map(a => {
        const avgScore = Math.round(((a.nilai_industri || 0) + (a.nilai_sekolah || 0)) / 2);
        return `
          <tr>
            <td>
              <div style="font-weight: 700; color: var(--slate-900);">${a.student_nama}</div>
              <div style="font-size: 12px; color: var(--slate-500);">NISN: ${a.student_nisn}</div>
            </td>
            <td>${a.student_jurusan}</td>
            <td>
              <div style="font-weight: 600; color: var(--slate-900);">${a.company_nama}</div>
              <div style="font-size: 12px; color: var(--slate-500);">${a.job_judul}</div>
            </td>
            <td>
              <span class="badge badge-emerald" style="font-family: monospace; font-size: 11px;">
                ${a.sertifikat_no || 'CERT/PKL/2025'}
              </span>
            </td>
            <td>
              <strong style="font-size: 15px; color: var(--emerald-700);">${avgScore}</strong>
              <div style="font-size: 11px; color: var(--slate-500);">Ind: ${a.nilai_industri} | Sek: ${a.nilai_sekolah}</div>
            </td>
            <td>
              <div style="font-size: 13px; color: var(--slate-600); max-width: 250px;">
                "${a.catatan_evaluasi || 'Menyelesaikan program PKL dengan predikat Baik.'}"
              </div>
            </td>
          </tr>
        `;
      }).join('');
    };

    document.getElementById('alumni-filter-company').addEventListener('change', (e) => {
      renderRows(e.target.value);
    });

    renderRows('');
  }
});
