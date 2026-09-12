// ==========================================================================
// FIND MY PKL - GENERATOR & DOKUMEN SURAT PRAKRIN RESMI
// SMK Taruna Bangsa Kota Bekasi
// Mengintegrasikan Master Data 28 Kelas, Kop Surat Dinas & Format Cetak A4
// ==========================================================================

window.App = window.App || {};

// Master Data 28 Kelas SMK Taruna Bangsa (Local Fallback & Reference)
const SURAT_CLASS_DATA = [
  // ===== RPL (12 Kelas) =====
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

  // ===== TKR (12 Kelas) =====
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

  // ===== TAV (2 Kelas) =====
  { id: 25, jurusan: 'TAV', nama_kelas: 'TAV 11 A', wali_kelas: 'Yanuar Setiawan', pembina: 'Dwi Nugroho', kaprodi: 'Ing. Ridho Santoso' },
  { id: 26, jurusan: 'TAV', nama_kelas: 'TAV 12 A', wali_kelas: 'Yusuf Rahman', pembina: 'Dwi Nugroho', kaprodi: 'Ing. Ridho Santoso' },

  // ===== TITL (2 Kelas) =====
  { id: 27, jurusan: 'TITL', nama_kelas: 'TITL 11 A', wali_kelas: 'Zahra Putri', pembina: 'Eddy Hermanto', kaprodi: 'M. Tarwiyanto' },
  { id: 28, jurusan: 'TITL', nama_kelas: 'TITL 12 A', wali_kelas: 'Aziz Nurmadhi', pembina: 'Eddy Hermanto', kaprodi: 'M. Tarwiyanto' }
];

Object.assign(window.App, {
  suratState: {
    noSurat: '042/SMK-TB/HUBIN/2026',
    tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    jurusanUtama: 'RPL',
    kelasUtama: 7, // RPL 12 A
    perusahaan: 'PT Telkom Indonesia (Persero) Tbk',
    alamatPerusahaan: 'Telkom Landmark Tower, Jl. Gatot Subroto No. 52, Jakarta Pusat',
    students: [
      { nama: 'Ahmad Fauzi', nis: '202301048', telp: '0812-3456-7890' },
      { nama: 'Budi Santoso', nis: '202301049', telp: '0813-4567-8901' },
      { nama: '', nis: '', telp: '' },
      { nama: '', nis: '', telp: '' }
    ]
  },

  async getMasterClasses() {
    try {
      if (typeof API !== 'undefined' && API.getClasses) {
        const remote = await API.getClasses();
        if (Array.isArray(remote) && remote.length > 0) return remote;
      }
    } catch (e) {
      console.warn('Using local fallback for CLASS_DATA:', e);
    }
    return SURAT_CLASS_DATA;
  },

  findClassMeta(classList, classIdOrName, jurusan = '') {
    if (!classList || classList.length === 0) classList = SURAT_CLASS_DATA;
    
    // Check by ID
    if (typeof classIdOrName === 'number' || !isNaN(Number(classIdOrName))) {
      const match = classList.find(c => c.id === Number(classIdOrName));
      if (match) return match;
    }

    // Check by Name (e.g. "XII RPL 1" -> "RPL 12 A")
    const str = String(classIdOrName || '').toUpperCase();
    let found = classList.find(c => c.nama_kelas.toUpperCase() === str);
    if (found) return found;

    // Fuzzy matching
    if (str.includes('RPL') || jurusan.includes('RPL')) {
      return classList.find(c => c.jurusan === 'RPL' && (str.includes('12') || str.includes('XII'))) || classList[6] || classList[0];
    }
    if (str.includes('TKR') || jurusan.includes('TKR')) {
      return classList.find(c => c.jurusan === 'TKR') || classList[12];
    }
    if (str.includes('TAV') || jurusan.includes('TAV')) {
      return classList.find(c => c.jurusan === 'TAV') || classList[24];
    }
    if (str.includes('TITL') || jurusan.includes('TITL')) {
      return classList.find(c => c.jurusan === 'TITL') || classList[26];
    }

    return classList[0];
  },

  // Generates pure A4 printable HTML for any given state
  generatePaperA4Html(state, classMeta) {
    const cls = classMeta || {};
    const students = (state.students && state.students.length > 0)
      ? state.students
      : [{ nama: '', nis: '', telp: '' }, { nama: '', nis: '', telp: '' }, { nama: '', nis: '', telp: '' }, { nama: '', nis: '', telp: '' }];

    // Pad or cap between 4 to 6 rows for uniform formal presentation
    const displayStudents = [...students];
    while (displayStudents.length < 4) {
      displayStudents.push({ nama: '', nis: '', telp: '' });
    }

    return `
      <div class="paper-sheet-a4 font-paper" id="printable-a4-sheet">
        <!-- KOP SURAT RESMI -->
        <div class="kop-surat-header">
          <div class="kop-surat-logo">
            <img src="/images/logotb2.png" alt="Logo SMK Taruna Bangsa" />
          </div>
          <div class="kop-surat-text">
            <h3>YAYASAN PENDIDIKAN NASIONAL TARUNA BANGSA</h3>
            <h1>SMK TARUNA BANGSA, KOTA BEKASI</h1>
            <p>Jl. Lingkar Utara Kaliabang Tengah Bekasi Utara • Telp: (021) 8895-1234</p>
          </div>
        </div>

        <!-- Garis Pembatas Ganda -->
        <div class="kop-surat-line-thick"></div>
        <div class="kop-surat-line-thin"></div>

        <!-- Judul Dokumen & Kotak Nomor Surat -->
        <div class="surat-title-meta">
          <h2>FORMAT PENGAJUAN PRAKRIN</h2>
          <div class="surat-meta-box">
            <div class="surat-meta-row">
              <div class="surat-meta-label">No Surat</div>
              <div class="surat-meta-value">: <strong>${state.noSurat || '........................'}</strong></div>
            </div>
            <div class="surat-meta-row">
              <div class="surat-meta-label">Tanggal Pengajuan</div>
              <div class="surat-meta-value">: <strong>${state.tanggal || '........................'}</strong></div>
            </div>
          </div>
        </div>

        <!-- Tabel Daftar Siswa Pemohon -->
        <table class="surat-table">
          <thead>
            <tr>
              <th style="width: 38px;">No</th>
              <th>Nama Lengkap Siswa</th>
              <th style="width: 110px;">NIS / NISN</th>
              <th style="width: 120px;">No Telepon</th>
              <th style="width: 90px;">Kelas</th>
            </tr>
          </thead>
          <tbody>
            ${displayStudents.map((s, idx) => {
              const hasData = Boolean(s.nama || s.nis);
              return `
                <tr style="height: 30px;">
                  <td style="text-align: center;">${idx + 1}</td>
                  <td style="font-weight: ${hasData ? '700' : 'normal'}; padding-left: 10px;">${s.nama || ''}</td>
                  <td style="text-align: center;">${s.nis || ''}</td>
                  <td style="text-align: center;">${s.telp || ''}</td>
                  <td style="text-align: center; font-weight: 700;">${hasData ? (cls.nama_kelas || state.jurusanUtama || '') : ''}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <!-- Kotak Data Perusahaan Mitra -->
        <div class="surat-company-box">
          <div class="surat-company-header">Nama Perusahaan (DUDI / Mitra Industri)</div>
          <div class="surat-company-content" style="font-weight: 700; font-size: 13.5px;">
            ${state.perusahaan || '....................................................................................................'}
          </div>

          <div class="surat-company-header">Alamat Lengkap Perusahaan</div>
          <div class="surat-company-content" style="min-height: 48px; line-height: 1.4;">
            ${state.alamatPerusahaan || '....................................................................................................'}
          </div>
        </div>

        <!-- Tabel Catatan Pembina Kesiswaan & Wali Kelas -->
        <table class="surat-table" style="margin-bottom: 8px;">
          <thead>
            <tr>
              <th style="width: 50%; text-align: left;">Catatan Pembina Kesiswaan:</th>
              <th style="width: 50%; text-align: left;">Catatan Wali Kelas:</th>
            </tr>
          </thead>
          <tbody>
            ${displayStudents.map((s, idx) => `
              <tr style="height: 24px;">
                <td>${idx + 1}.</td>
                <td>${idx + 1}.</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Tiga Kolom Tanda Tangan Resmi -->
        <table class="surat-signature-table">
          <tbody>
            <tr>
              <td class="surat-sig-header">
                <div>Pembina Kesiswaan,</div>
              </td>
              <td class="surat-sig-header">
                <div>Wali Kelas,</div>
              </td>
              <td class="surat-sig-header">
                <div>Kepala Program Keahlian,</div>
              </td>
            </tr>
            <tr>
              <td class="surat-sig-footer">
                <div class="surat-sig-line">${cls.pembina || '........................................'}</div>
              </td>
              <td class="surat-sig-footer">
                <div class="surat-sig-line">${cls.wali_kelas || '........................................'}</div>
              </td>
              <td class="surat-sig-footer">
                <div class="surat-sig-line">${cls.kaprodi || '........................................'}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  },

  // Interactive 2-Column Generator Page for HUBIN Portal
  async renderSuratPrakerinPage(container) {
    const classList = await this.getMasterClasses();
    const jurusans = [...new Set(classList.map(c => c.jurusan))].sort();

    const render = () => {
      const cls = this.findClassMeta(classList, this.suratState.kelasUtama, this.suratState.jurusanUtama);

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;" class="no-print">
          <div>
            <h2 style="font-size: 22px; font-weight: 800; color: var(--slate-900);">Generator Surat Pengajuan PRAKRIN</h2>
            <p style="font-size: 13.5px; color: var(--slate-500); margin-top: 4px;">
              Format resmi pengajuan Praktik Kerja Industri berstandar dokumen dinas A4 SMK Taruna Bangsa Kota Bekasi.
            </p>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button class="btn btn-secondary" onclick="App.resetSuratForm()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Reset Data
            </button>
            <button class="btn btn-primary" onclick="window.print()" style="box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Simpan &amp; Cetak Dokumen A4
            </button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 380px 1fr; gap: 24px; align-items: flex-start;">
          <!-- LEFT: FORM CONTROLS (Hidden on Print) -->
          <div class="no-print" style="display: flex; flex-direction: column; gap: 20px;">
            <!-- CARD 1: KELAS & PEJABAT -->
            <div class="card" style="padding: 20px;">
              <h3 style="font-size: 15px; font-weight: 700; color: var(--slate-900); margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--primary-600);">⚙️</span> Pengaturan Kelas &amp; Pejabat
              </h3>

              <div class="form-group" style="margin-bottom: 12px;">
                <label class="form-label" style="font-size: 12.5px;">Pilih Jurusan Keahlian</label>
                <select id="surat-jurusan" class="form-select" style="font-size: 13px;">
                  ${jurusans.map(j => `<option value="${j}" ${j === this.suratState.jurusanUtama ? 'selected' : ''}>${j}</option>`).join('')}
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label" style="font-size: 12.5px;">Pilih Rombongan Belajar / Kelas</label>
                <select id="surat-kelas" class="form-select" style="font-size: 13px;">
                  ${classList
                    .filter(c => c.jurusan === this.suratState.jurusanUtama)
                    .map(c => `<option value="${c.id}" ${c.id === Number(this.suratState.kelasUtama) ? 'selected' : ''}>${c.nama_kelas}</option>`)
                    .join('')}
                </select>
              </div>

              <!-- Pejabat Info Box -->
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-sm); padding: 12px; font-size: 12px; line-height: 1.5; color: #166534;">
                <div><strong>Wali Kelas:</strong> ${cls.wali_kelas || '-'}</div>
                <div><strong>Kaprodi:</strong> ${cls.kaprodi || '-'}</div>
                <div><strong>Pembina Kesiswaan:</strong> ${cls.pembina || '-'}</div>
              </div>
            </div>

            <!-- CARD 2: DETAIL SURAT & PERUSAHAAN -->
            <div class="card" style="padding: 20px;">
              <h3 style="font-size: 15px; font-weight: 700; color: var(--slate-900); margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--primary-600);">🏢</span> Detail Surat &amp; Perusahaan
              </h3>

              <div class="form-group" style="margin-bottom: 12px;">
                <label class="form-label" style="font-size: 12.5px;">Nomor Surat Pengajuan</label>
                <input type="text" id="surat-nomor" class="form-input" style="font-size: 13px;" value="${this.suratState.noSurat}" />
              </div>

              <div class="form-group" style="margin-bottom: 12px;">
                <label class="form-label" style="font-size: 12.5px;">Tanggal Pengajuan</label>
                <input type="text" id="surat-tanggal" class="form-input" style="font-size: 13px;" value="${this.suratState.tanggal}" />
              </div>

              <div class="form-group" style="margin-bottom: 12px;">
                <label class="form-label" style="font-size: 12.5px;">Nama Perusahaan (PT / Mitra DUDI)</label>
                <input type="text" id="surat-perusahaan" class="form-input" style="font-size: 13px;" value="${this.suratState.perusahaan}" />
              </div>

              <div class="form-group" style="margin-bottom: 4px;">
                <label class="form-label" style="font-size: 12.5px;">Alamat Lengkap Perusahaan</label>
                <textarea id="surat-alamat" class="form-textarea" rows="3" style="font-size: 13px;">${this.suratState.alamatPerusahaan}</textarea>
              </div>
            </div>

            <!-- CARD 3: DATA SISWA PEMOHON -->
            <div class="card" style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h3 style="font-size: 15px; font-weight: 700; color: var(--slate-900); display: flex; align-items: center; gap: 8px;">
                  <span style="color: var(--primary-600);">👥</span> Siswa Pemohon (Maks 6)
                </h3>
                ${this.suratState.students.length < 6 ? `
                  <button class="btn btn-secondary btn-sm" onclick="App.addSuratStudent()" style="font-size: 11px; padding: 4px 8px;">
                    + Tambah Siswa
                  </button>
                ` : ''}
              </div>

              <div style="display: flex; flex-direction: column; gap: 10px;" id="surat-student-inputs">
                ${this.suratState.students.map((st, idx) => `
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 10px; position: relative;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <span style="font-size: 11px; font-weight: 700; color: var(--slate-500);">Siswa #${idx + 1}</span>
                      ${this.suratState.students.length > 1 ? `
                        <button onclick="App.removeSuratStudent(${idx})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 12px;" title="Hapus baris ini">
                          ✕
                        </button>
                      ` : ''}
                    </div>
                    <input type="text" placeholder="Nama Lengkap Siswa" value="${st.nama}" data-idx="${idx}" data-key="nama" class="form-input surat-student-field" style="font-size: 12.5px; padding: 6px 8px; margin-bottom: 6px;" />
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                      <input type="text" placeholder="NIS / NISN" value="${st.nis}" data-idx="${idx}" data-key="nis" class="form-input surat-student-field" style="font-size: 12px; padding: 6px 8px;" />
                      <input type="text" placeholder="No Telepon" value="${st.telp}" data-idx="${idx}" data-key="telp" class="form-input surat-student-field" style="font-size: 12px; padding: 6px 8px;" />
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- RIGHT: LIVE A4 PAPER PREVIEW -->
          <div class="paper-preview-container">
            ${this.generatePaperA4Html(this.suratState, cls)}
          </div>
        </div>
      `;

      // Attach Live Event Listeners
      const updatePreview = () => {
        const previewContainer = container.querySelector('.paper-preview-container');
        if (previewContainer) {
          const currentCls = this.findClassMeta(classList, this.suratState.kelasUtama, this.suratState.jurusanUtama);
          previewContainer.innerHTML = this.generatePaperA4Html(this.suratState, currentCls);
        }
      };

      const bindInput = (id, key) => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener('input', (e) => {
            this.suratState[key] = e.target.value;
            updatePreview();
          });
        }
      };

      bindInput('surat-nomor', 'noSurat');
      bindInput('surat-tanggal', 'tanggal');
      bindInput('surat-perusahaan', 'perusahaan');
      bindInput('surat-alamat', 'alamatPerusahaan');

      const jurEl = document.getElementById('surat-jurusan');
      if (jurEl) {
        jurEl.addEventListener('change', (e) => {
          this.suratState.jurusanUtama = e.target.value;
          const firstInJur = classList.find(c => c.jurusan === e.target.value);
          if (firstInJur) this.suratState.kelasUtama = firstInJur.id;
          render();
        });
      }

      const kelEl = document.getElementById('surat-kelas');
      if (kelEl) {
        kelEl.addEventListener('change', (e) => {
          this.suratState.kelasUtama = Number(e.target.value);
          render();
        });
      }

      container.querySelectorAll('.surat-student-field').forEach(input => {
        input.addEventListener('input', (e) => {
          const idx = Number(e.target.dataset.idx);
          const key = e.target.dataset.key;
          if (this.suratState.students[idx]) {
            this.suratState.students[idx][key] = e.target.value;
            updatePreview();
          }
        });
      });
    };

    render();
  },

  addSuratStudent() {
    if (this.suratState.students.length < 6) {
      this.suratState.students.push({ nama: '', nis: '', telp: '' });
      this.render();
    } else {
      Toast.show('Maksimal Siswa', 'Batas maksimal pengajuan adalah 6 siswa per lembar dokumen.', 'info');
    }
  },

  removeSuratStudent(idx) {
    if (this.suratState.students.length > 1) {
      this.suratState.students.splice(idx, 1);
      this.render();
    }
  },

  resetSuratForm() {
    if (confirm('Kosongkan formulir dan kembalikan data surat ke pengaturan awal?')) {
      this.suratState = {
        noSurat: `042/SMK-TB/HUBIN/${new Date().getFullYear()}`,
        tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        jurusanUtama: 'RPL',
        kelasUtama: 7,
        perusahaan: '',
        alamatPerusahaan: '',
        students: [
          { nama: '', nis: '', telp: '' },
          { nama: '', nis: '', telp: '' },
          { nama: '', nis: '', telp: '' },
          { nama: '', nis: '', telp: '' }
        ]
      };
      this.render();
    }
  },

  // --- STUDENT RATE-LIMIT (1 MINGGU 1X) HELPERS ---
  getStudentPrintStatus(studentId, docType = 'surat') {
    if (this.currentRole === 'HUBIN') {
      return { canPrint: true, isHubin: true, daysLeft: 0, hoursLeft: 0, lastPrintedAt: null };
    }

    const sId = studentId || (this.currentStudent ? this.currentStudent.id : null);
    if (!sId) {
      return { canPrint: true, isHubin: false, daysLeft: 0, hoursLeft: 0, lastPrintedAt: null };
    }

    try {
      const storageKey = `findmypkl_print_${sId}`;
      const raw = localStorage.getItem(storageKey);
      const data = raw ? JSON.parse(raw) : {};
      const record = data[docType];

      if (!record || !record.lastPrintedAt) {
        return {
          canPrint: true,
          lastPrintedAt: null,
          nextEligibleDate: null,
          daysLeft: 0,
          hoursLeft: 0,
          isHubin: false
        };
      }

      const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
      const lastTime = new Date(record.lastPrintedAt).getTime();
      const diff = Date.now() - lastTime;
      const canPrint = diff >= ONE_WEEK_MS;
      const msRemaining = Math.max(0, ONE_WEEK_MS - diff);
      const daysLeft = Math.ceil(msRemaining / (24 * 60 * 60 * 1000));
      const hoursLeft = Math.ceil(msRemaining / (60 * 60 * 1000));
      const nextEligibleDate = new Date(lastTime + ONE_WEEK_MS);

      return {
        canPrint,
        lastPrintedAt: record.lastPrintedAt,
        nextEligibleDate,
        daysLeft,
        hoursLeft,
        isHubin: false
      };
    } catch (e) {
      console.warn('Error checking print status:', e);
      return { canPrint: true, isHubin: false, daysLeft: 0, hoursLeft: 0 };
    }
  },

  async recordStudentPrint(studentId, docType = 'surat', referenceId = null, docName = '') {
    if (this.currentRole === 'HUBIN') return;

    const sId = studentId || (this.currentStudent ? this.currentStudent.id : null);
    if (!sId) return;

    try {
      const storageKey = `findmypkl_print_${sId}`;
      const raw = localStorage.getItem(storageKey);
      const data = raw ? JSON.parse(raw) : {};
      data[docType] = {
        lastPrintedAt: new Date().toISOString(),
        referenceId,
        docName,
        totalPrints: ((data[docType] && data[docType].totalPrints) || 0) + 1
      };
      localStorage.setItem(storageKey, JSON.stringify(data));

      if (typeof API !== 'undefined' && API.recordStudentPrint) {
        API.recordStudentPrint(sId, {
          type: docType,
          reference_id: referenceId,
          document_name: docName
        }).catch(err => console.warn('Could not sync print log to server:', err));
      }
    } catch (e) {
      console.warn('Error recording student print:', e);
    }
  },

  async executeSuratPrint(appId) {
    const isStudent = this.currentRole === 'SISWA' && this.currentStudent;
    if (isStudent) {
      const status = this.getStudentPrintStatus(this.currentStudent.id, 'surat');
      if (!status.canPrint) {
        Toast.show(
          'Batas Cetak Mingguan',
          `Siswa hanya dapat mencetak dokumen resmi 1x dalam 1 minggu. Sisa waktu: ${status.daysLeft} hari lagi.`,
          'warning'
        );
        return;
      }

      await this.recordStudentPrint(this.currentStudent.id, 'surat', appId, 'Surat Pengajuan PRAKRIN A4');
      window.print();
      Toast.show(
        'Dokumen Diproses',
        'Surat berhasil dicetak. Sesuai ketentuan, kuota cetak berikutnya tersedia dalam 7 hari.',
        'success'
      );
      if (this.renderContent) this.renderContent();
      const app = (this.cachedStudentApplications || []).find(a => a.id === appId);
      if (app) this.openSuratPrakerinModal(app);
    } else {
      window.print();
    }
  },

  // Modal Fast Preview for specific application (HUBIN & Siswa Portals)
  async openSuratPrakerinModal(app) {
    if (!app) return;
    const classList = await this.getMasterClasses();
    const classMeta = this.findClassMeta(classList, app.student_kelas, app.student_jurusan);

    const isStudent = this.currentRole === 'SISWA' && this.currentStudent;
    const printStatus = this.getStudentPrintStatus(isStudent ? this.currentStudent.id : null, 'surat');

    const docState = {
      noSurat: app.nomor_surat_pengantar || `421.5/SMK-TB/HUBIN/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      tanggal: new Date(app.tanggal_daftar || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      jurusanUtama: classMeta.jurusan || 'RPL',
      kelasUtama: classMeta.id,
      perusahaan: app.company_nama || 'Mitra Industri SMK',
      alamatPerusahaan: app.company_alamat || `${app.lokasi_kota || 'Bekasi'}, Jawa Barat`,
      students: [
        {
          nama: app.student_nama || 'Siswa Pemohon',
          nis: app.student_nisn || '202301048',
          telp: app.student_no_hp || '0812-3456-7890'
        }
      ]
    };

    const paperHtml = this.generatePaperA4Html(docState, classMeta);

    const modalHtml = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;" class="no-print">
          <div>
            <div style="font-weight: 700; font-size: 15px; color: var(--slate-900);">Surat Format Pengajuan PRAKRIN Resmi</div>
            <div style="font-size: 12.5px; color: var(--slate-500);">Dokumen resmi penugasan magang diterbitkan BKK &amp; HUBIN SMK Taruna Bangsa Kota Bekasi.</div>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            ${printStatus.canPrint ? `
              <button class="btn btn-primary" onclick="App.executeSuratPrint(${app.id})" style="padding: 7px 14px; font-size: 13px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                Cetak / Simpan PDF (A4)
              </button>
            ` : `
              <button class="btn btn-secondary" disabled style="opacity: 0.65; cursor: not-allowed; padding: 7px 14px; font-size: 13px;" title="Batas cetak 1x seminggu. Tersedia dalam ${printStatus.daysLeft} hari lagi">
                ⏳ Cooldown (${printStatus.daysLeft} Hari Lagi)
              </button>
            `}
          </div>
        </div>

        ${(!printStatus.canPrint && isStudent) ? `
          <div class="print-cooldown-alert no-print">
            <strong>⏳ Cooldown Cetak Surat Siswa Aktif:</strong><br>
            Dokumen resmi ini telah Anda cetak pada <strong>${new Date(printStatus.lastPrintedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB</strong>.<br>
            Sesuai ketentuan BKK &amp; HUBIN SMK Taruna Bangsa, pencetakan fisik berulang dibatasi <strong>1 minggu 1 kali</strong> untuk mencegah duplikasi surat fisik. Pencetakan fisik berikutnya tersedia dalam <strong>${printStatus.daysLeft} hari lagi (${printStatus.nextEligibleDate ? printStatus.nextEligibleDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''})</strong>. Anda tetap dapat membaca pratinjau dokumen di layar ini.
          </div>
        ` : ''}

        <div class="paper-preview-container" style="max-height: 70vh; overflow-y: auto;">
          ${paperHtml}
        </div>
      </div>
    `;

    Modal.open(modalHtml, 'Dokumen Pengajuan PRAKRIN A4', 'xl');
  },

  // Weekly Logbook Rekapitulasi A4 Generator
  generateLogbookWeeklyA4Html(placement, logbooks, student) {
    const st = student || this.currentStudent || {};
    const p = placement || {};
    const logs = (logbooks && logbooks.length > 0) ? logbooks.slice(0, 6) : [];

    const displayLogs = [...logs];
    const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
    while (displayLogs.length < 5) {
      displayLogs.push({
        tanggal: '',
        judul_kegiatan: '',
        deskripsi_kegiatan: '',
        kendala: '',
        status_verifikasi: ''
      });
    }

    const todayDateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    return `
      <div class="paper-sheet-a4 font-paper" id="printable-logbook-sheet">
        <!-- KOP SURAT RESMI -->
        <div class="kop-surat-header">
          <div class="kop-surat-logo">
            <img src="/images/logotb2.png" alt="Logo SMK Taruna Bangsa" />
          </div>
          <div class="kop-surat-text">
            <h3>YAYASAN PENDIDIKAN NASIONAL TARUNA BANGSA</h3>
            <h1>SMK TARUNA BANGSA, KOTA BEKASI</h1>
            <p>Jl. Lingkar Utara Kaliabang Tengah Bekasi Utara • Telp: (021) 8895-1234</p>
          </div>
        </div>

        <!-- Garis Pembatas Ganda -->
        <div class="kop-surat-line-thick"></div>
        <div class="kop-surat-line-thin"></div>

        <!-- Judul Dokumen -->
        <div style="text-align: center; margin-bottom: 14px;">
          <h2 style="font-size: 15px; font-weight: 800; text-transform: uppercase; margin: 0; text-decoration: underline;">
            LEMBAR REKAPITULASI JURNAL &amp; LOGBOOK MINGGUAN PKL
          </h2>
          <div style="font-size: 12px; margin-top: 3px;">Periode Pelaksanaan Praktik Kerja Lapangan (PRAKRIN)</div>
        </div>

        <!-- Identitas Siswa & Penempatan -->
        <div class="logbook-print-meta">
          <div class="logbook-meta-item">
            <div class="logbook-meta-label">Nama Siswa</div>
            <div class="logbook-meta-val">: <strong>${st.nama || p.student_nama || 'Ahmad Fauzi'}</strong></div>
          </div>
          <div class="logbook-meta-item">
            <div class="logbook-meta-label">Tempat PKL (DUDI)</div>
            <div class="logbook-meta-val">: <strong>${p.company_nama || 'PT Mitra Industri'}</strong></div>
          </div>
          <div class="logbook-meta-item">
            <div class="logbook-meta-label">NISN / Kelas</div>
            <div class="logbook-meta-val">: ${st.nisn || '202301048'} / ${st.kelas || 'XII RPL 1'}</div>
          </div>
          <div class="logbook-meta-item">
            <div class="logbook-meta-label">Pembimbing DUDI</div>
            <div class="logbook-meta-val">: ${p.pembimbing_industri || 'Pembimbing Lapangan'}</div>
          </div>
          <div class="logbook-meta-item">
            <div class="logbook-meta-label">Kompetensi Keahlian</div>
            <div class="logbook-meta-val">: ${st.jurusan || 'Rekayasa Perangkat Lunak'}</div>
          </div>
          <div class="logbook-meta-item">
            <div class="logbook-meta-label">Guru Pembimbing</div>
            <div class="logbook-meta-val">: ${p.guru_pembimbing || 'Koordinator Kejuruan'}</div>
          </div>
        </div>

        <!-- Tabel Logbook Mingguan (Min 1 Minggu 1x Cetak) -->
        <table class="surat-table" style="margin-bottom: 16px;">
          <thead>
            <tr>
              <th style="width: 32px;">No</th>
              <th style="width: 105px;">Hari / Tanggal</th>
              <th>Uraian Kegiatan / Pekerjaan Praktik</th>
              <th style="width: 130px;">Kendala &amp; Hasil</th>
              <th style="width: 65px;">Paraf DUDI</th>
            </tr>
          </thead>
          <tbody>
            ${displayLogs.map((lg, idx) => {
              const dayLabel = daysOfWeek[idx] || `Hari ke-${idx + 1}`;
              const tglStr = lg.tanggal ? lg.tanggal.substring(0, 10) : '';
              return `
                <tr style="height: 38px;">
                  <td style="text-align: center; vertical-align: middle;">${idx + 1}</td>
                  <td style="font-size: 11.5px; vertical-align: middle;">
                    <strong>${dayLabel}</strong><br>
                    <span style="color: #334155;">${tglStr}</span>
                  </td>
                  <td style="vertical-align: top; padding: 6px 8px;">
                    <div style="font-weight: 700; font-size: 12px; margin-bottom: 2px;">${lg.judul_kegiatan || ''}</div>
                    <div style="font-size: 11.5px; line-height: 1.35; color: #1e293b;">${lg.deskripsi_kegiatan || ''}</div>
                  </td>
                  <td style="font-size: 11px; vertical-align: top; padding: 6px 8px;">
                    ${lg.kendala || (lg.judul_kegiatan ? 'Terlaksana dengan baik' : '')}
                  </td>
                  <td style="text-align: center; vertical-align: middle;">
                    ${lg.judul_kegiatan ? '<div style="font-size: 10px; color: #64748b; border-bottom: 1px dotted #94a3b8; padding-bottom: 18px;">[ Paraf ]</div>' : ''}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <div style="font-size: 11.5px; margin-bottom: 16px; font-style: italic; color: #334155;">
          * Catatan: Lembar rekapitulasi logbook ini dicetak minimal 1 minggu 1 kali untuk diserahkan dan ditandatangani oleh Pembimbing Industri DUDI serta Guru Pembimbing SMK Taruna Bangsa.
        </div>

        <!-- Area Tanda Tangan 3 Kolom -->
        <table class="surat-signature-table">
          <tbody>
            <tr>
              <td class="surat-sig-header">
                <div>Mengetahui,</div>
                <div><strong>Pembimbing Industri (DUDI)</strong></div>
              </td>
              <td class="surat-sig-header">
                <div>Bekasi, ${todayDateStr}</div>
                <div><strong>Siswa Praktikan,</strong></div>
              </td>
              <td class="surat-sig-header">
                <div>Menyetujui,</div>
                <div><strong>Guru Pembimbing SMK</strong></div>
              </td>
            </tr>
            <tr>
              <td class="surat-sig-footer">
                <div class="surat-sig-line">${p.pembimbing_industri || '........................................'}</div>
                <div style="font-size: 10.5px; font-weight: normal; color: #475569;">NIP / ID Karyawan DUDI</div>
              </td>
              <td class="surat-sig-footer">
                <div class="surat-sig-line">${st.nama || p.student_nama || '........................................'}</div>
                <div style="font-size: 10.5px; font-weight: normal; color: #475569;">NISN: ${st.nisn || '....................'}</div>
              </td>
              <td class="surat-sig-footer">
                <div class="surat-sig-line">${p.guru_pembimbing || '........................................'}</div>
                <div style="font-size: 10.5px; font-weight: normal; color: #475569;">NIP Guru Pembimbing</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  },

  async openLogbookWeeklyPrintModal(placementId) {
    const student = this.currentStudent;
    if (!student) return;

    let placement = null;
    let logbooks = [];
    try {
      const placements = await API.getPlacements({ student_id: student.id, status: 'Aktif' });
      placement = placements.find(p => p.id === Number(placementId)) || placements[0];
      if (placement) {
        logbooks = await API.getLogbooks(placement.id);
      }
    } catch (e) {
      console.warn('Error fetching logbooks for print:', e);
    }

    if (!placement) {
      Toast.show('Perhatian', 'Data penempatan PKL aktif tidak ditemukan.', 'warning');
      return;
    }

    const printStatus = this.getStudentPrintStatus(student.id, 'logbook');
    const paperHtml = this.generateLogbookWeeklyA4Html(placement, logbooks, student);

    const modalHtml = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <!-- Header Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;" class="no-print">
          <div>
            <div style="font-weight: 700; font-size: 15px; color: var(--slate-900);">Lembar Rekapitulasi Logbook Mingguan (A4)</div>
            <div style="font-size: 12.5px; color: var(--slate-500);">Format resmi jurnal mingguan PKL SMK Taruna Bangsa Kota Bekasi (Aturan: Min. 1 Minggu 1x Cetak).</div>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            ${printStatus.canPrint ? `
              <button class="btn btn-primary" onclick="App.executeLogbookPrint(${placement.id})" style="padding: 7px 14px; font-size: 13px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                Cetak Lembar Logbook (A4)
              </button>
            ` : `
              <button class="btn btn-secondary" disabled style="opacity: 0.65; cursor: not-allowed; padding: 7px 14px; font-size: 13px;" title="Batas cetak 1x seminggu. Tersedia dalam ${printStatus.daysLeft} hari lagi">
                ⏳ Cooldown (${printStatus.daysLeft} Hari Lagi)
              </button>
            `}
          </div>
        </div>

        ${!printStatus.canPrint ? `
          <div class="print-cooldown-alert no-print">
            <strong>⏳ Cooldown Cetak Logbook Mingguan Aktif:</strong><br>
            Anda telah mencetak Lembar Rekapitulasi Logbook pada <strong>${new Date(printStatus.lastPrintedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB</strong>.<br>
            Sesuai jadwal sekolah, lembar rekapitulasi dicetak <strong>1 minggu 1 kali</strong> untuk evaluasi berkala. Kuota cetak berikutnya dibuka kembali dalam <strong>${printStatus.daysLeft} hari lagi (${printStatus.nextEligibleDate ? printStatus.nextEligibleDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''})</strong>. Anda tetap dapat membaca jurnal di layar ini.
          </div>
        ` : ''}

        <div class="paper-preview-container" style="max-height: 70vh; overflow-y: auto;">
          ${paperHtml}
        </div>
      </div>
    `;

    Modal.open(modalHtml, 'Lembar Logbook Mingguan PKL A4', 'xl');
  },

  async executeLogbookPrint(placementId) {
    const isStudent = this.currentRole === 'SISWA' && this.currentStudent;
    if (isStudent) {
      const status = this.getStudentPrintStatus(this.currentStudent.id, 'logbook');
      if (!status.canPrint) {
        Toast.show(
          'Batas Cetak Mingguan',
          `Rekap logbook hanya dapat dicetak 1x dalam 1 minggu. Sisa waktu: ${status.daysLeft} hari lagi.`,
          'warning'
        );
        return;
      }

      await this.recordStudentPrint(this.currentStudent.id, 'logbook', placementId, 'Rekapitulasi Logbook Mingguan PKL');
      window.print();
      Toast.show(
        'Logbook Diproses',
        'Lembar logbook berhasil dicetak. Kuota cetak berikutnya tersedia dalam 7 hari.',
        'success'
      );
      if (this.renderContent) this.renderContent();
      this.openLogbookWeeklyPrintModal(placementId);
    } else {
      window.print();
    }
  }
});
