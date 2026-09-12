 // ==========================================================================
// FIND MY PKL - CATALOG & MARKETPLACE MODULE
// Marketplace Listing, Filters, Job Cards, Pagination, Apply Modal Flow
// ==========================================================================

window.App = window.App || {};
Object.assign(window.App, {
  getCompanyBadgeMeta(job) {
    const name = (job.company_nama || '').toLowerCase();
    const initials = (job.logo_initials || '').toUpperCase();

    if (name.includes('telkom') || initials === 'TLKM' || initials === 'TLK') {
      return { text: 'TLKM', bg: '#FEE2E2', color: '#DC2626' };
    }
    if (name.includes('kreatif digital') || initials === 'KD') {
      return { text: 'KD', bg: '#FFEDD5', color: '#EA580C' };
    }
    if (name.includes('astra') || initials === 'ASTRA') {
      return { text: 'ASTRA', bg: '#DBEAFE', color: '#2563EB' };
    }
    if (name.includes('glow') || initials === 'GD') {
      return { text: 'GD', bg: '#F3E8FF', color: '#9333EA' };
    }
    if (name.includes('solusi data') || initials === 'SDI') {
      return { text: 'SDI', bg: '#CFFAFE', color: '#0891B2' };
    }
    if (name.includes('ruang media') || initials === 'RMK') {
      return { text: 'RMK', bg: '#FCE7F3', color: '#DB2777' };
    }
    if (name.includes('dirgantara') || initials === 'PTDI') {
      return { text: 'PTDI', bg: '#E0F2FE', color: '#0284C7' };
    }
    if (name.includes('goto') || initials === 'GOTO') {
      return { text: 'GOTO', bg: '#DCFCE7', color: '#16A34A' };
    }
    if (name.includes('mandiri') || initials === 'BMRI') {
      return { text: 'BMRI', bg: '#DBEAFE', color: '#1E3A8A' };
    }
    if (name.includes('kumata') || initials === 'KMT') {
      return { text: 'KMT', bg: '#EDE9FE', color: '#7C3AED' };
    }
    if (name.includes('paragon') || initials === 'PTI') {
      return { text: 'PTI', bg: '#CCFBF1', color: '#0F766E' };
    }
    if (name.includes('len') || initials === 'LEN') {
      return { text: 'LEN', bg: '#E0E7FF', color: '#4338CA' };
    }
    return { text: initials || 'PKL', bg: '#F1F5F9', color: '#475569' };
  },

  getJobMajorCode(job) {
    if (job.major_code) {
      const mc = String(job.major_code).toUpperCase().trim();
      if (['RPL', 'TAV', 'TITL', 'TKRO'].includes(mc)) return mc;
      if (mc === 'DKV') return 'TAV';
      if (mc === 'TKJ' || mc === 'AKL') return 'TITL';
    }
    const t = (job.jurusan_target || '') + ' ' + (job.judul || '') + ' ' + (job.deskripsi || '');
    if (/RPL|Perangkat Lunak|Software|Frontend|Backend|Web|Programmer/i.test(t)) return 'RPL';
    if (/TAV|Audio Video|Audio|Video|Broadcasting|Elektronika|Multimedia|Animasi|DKV/i.test(t)) return 'TAV';
    if (/TITL|Tenaga Listrik|Instalasi Listrik|Ketenagalistrikan|Panel Surya|Listrik|TKJ|AKL/i.test(t)) return 'TITL';
    if (/TKRO|Otomotif|Mekanik|Kendaraan|Mesin/i.test(t)) return 'TKRO';
    return 'RPL';
  },

  isJobPaid(job) {
    if (!job) return false;
    if (job.is_paid !== undefined) return Boolean(job.is_paid);
    const s = String(job.uang_saku || '').toLowerCase().trim();
    if (!s || s === 'unpaid' || s.includes('tidak') || s.includes('tanpa') || s === '-' || s === '0') {
      return false;
    }
    return true;
  },

  getJobAllowanceDisplay(job) {
    return this.isJobPaid(job) ? 'Paid' : 'Unpaid';
  },

  async renderSiswaKatalog(container) {
    await this.renderMarketplaceCatalog(container, true);
  },

  async renderMarketplaceCatalog(container, isSiswaMode = false) {
    const jobs = await API.getJobs();
    const isSiswaLoggedIn = this.currentRole === 'SISWA' && Boolean(this.currentStudent);
    const student = isSiswaLoggedIn ? this.currentStudent : null;
    const isVerified = student && student.status_verifikasi === 'Terverifikasi';

    // State for filtering & pagination (Clean default: all jobs visible, no pre-applied filters)
    let searchTags = [];
    let selectedLocation = 'Semua';
    let selectedJurusan = 'Semua';
    let selectedSistem = 'Semua';
    let selectedSort = 'rekomendasi';
    let currentPage = 1;
    const pageSize = 6;

    if (this.initialCatalogSearch) {
      if (this.initialCatalogSearch.keyword) {
        searchTags = [this.initialCatalogSearch.keyword];
      } else {
        searchTags = [];
      }
      if (this.initialCatalogSearch.jurusan && this.initialCatalogSearch.jurusan !== 'Semua') {
        selectedJurusan = this.initialCatalogSearch.jurusan;
      }
      if (this.initialCatalogSearch.kota && this.initialCatalogSearch.kota !== 'Semua') {
        selectedLocation = this.initialCatalogSearch.kota;
      }
      this.initialCatalogSearch = null;
    }

    // Checked sets for left sidebar filters
    let checkedJurusan = new Set();
    let checkedSistem = new Set();
    let checkedTunjangan = new Set();
    let checkedDurasi = new Set();

    const countRpl = jobs.filter(j => this.getJobMajorCode(j) === 'RPL').length;
    const countTav = jobs.filter(j => this.getJobMajorCode(j) === 'TAV').length;
    const countTitl = jobs.filter(j => this.getJobMajorCode(j) === 'TITL').length;
    const countTkro = jobs.filter(j => this.getJobMajorCode(j) === 'TKRO').length;

    let warningBanner = '';
    if (student && student.status_verifikasi !== 'Terverifikasi') {
      if (student.status_verifikasi === 'Menunggu Verifikasi') {
        warningBanner = `
          <div class="account-state-banner state-pending" style="margin-bottom: 24px;">
            <div class="state-top-row">
              <div class="state-badge-label">
                <span class="pulse-dot" style="background:#f59e0b;"></span>
                <span>STATUS AKUN: MENUNGGU VERIFIKASI</span>
              </div>
              <span style="font-size: 12px; color: #92400e; font-weight: 700;">Dalam Antrean HUBIN</span>
            </div>
            <h4 class="state-headline" style="font-size: 17px; margin: 4px 0 6px;">
              "Data kamu sedang diperiksa oleh HUBIN."
            </h4>
            <p class="state-desc" style="font-size: 13px; margin-bottom: 8px;">
              Akun Anda saat ini sedang dalam proses pencocokan data Dapodik oleh Koordinator HUBIN. Anda dapat menjelajahi lowongan mitra, namun pengajuan lamaran dibuka setelah akun <strong>Terverifikasi</strong>.
            </p>
            <div style="font-size: 12px; color: #92400e; display: flex; align-items: center; gap: 6px;">
              <span>🔒 Mode Eksplorasi Terbuka &bull;</span>
              <a onclick="App.setTab('profil')" style="font-weight: 700; text-decoration: underline; cursor: pointer;">Pantau Status di Profil &rarr;</a>
            </div>
          </div>
        `;
      } else if (student.status_verifikasi === 'Perlu Perbaikan') {
        warningBanner = `
          <div class="account-state-banner state-revision" style="margin-bottom: 24px;">
            <div class="state-top-row">
              <div class="state-badge-label">
                <span>STATUS AKUN: PERLU PERBAIKAN</span>
              </div>
              <span style="font-size: 12px; color: #9a3412; font-weight: 700;">Tindakan Diperlukan</span>
            </div>
            <h4 class="state-headline" style="font-size: 17px; margin: 4px 0 6px;">
              "HUBIN meminta kamu memperbaiki beberapa data."
            </h4>
            <p class="state-desc" style="font-size: 13px; margin-bottom: 10px;">
              Catatan HUBIN: <strong>${student.catatan_verifikasi || 'Periksa nomor kontak dan tautan portofolio/CV Anda.'}</strong>
            </p>
            <button class="btn btn-primary btn-sm" style="background: #ea580c; border-color: #ea580c;" onclick="App.showStudentEditModal(${student.id})">
              Perbaiki Data Sekarang ✍
            </button>
          </div>
        `;
      } else if (student.status_verifikasi === 'Ditolak') {
        warningBanner = `
          <div class="account-state-banner state-rejected" style="margin-bottom: 24px;">
            <div class="state-top-row">
              <div class="state-badge-label">
                <span>STATUS AKUN: DITOLAK</span>
              </div>
              <span style="font-size: 12px; color: #991b1b; font-weight: 700;">Akses Ditangguhkan</span>
            </div>
            <h4 class="state-headline" style="font-size: 17px; margin: 4px 0 6px;">
              "Verifikasi Akun Ditolak oleh HUBIN"
            </h4>
            <p class="state-desc" style="font-size: 13px; margin-bottom: 6px;">
              Alasan: <strong>${student.catatan_verifikasi || 'NISN tidak terdaftar dalam Dapodik.'}</strong>
            </p>
            <p style="font-size: 12px; color: #7f1d1d; margin: 0;">
              Silakan hubungi ruang BKK/HUBIN sekolah dengan membawa Kartu Pelajar untuk konfirmasi.
            </p>
          </div>
        `;
      }
    }

    // Top Public Navbar HTML
    const topNavHtml = this.getTopNavHtml('katalog');

    container.innerHTML = `
      <div class="mkt-page-wrapper">
        ${topNavHtml}

        ${warningBanner ? `
          <div style="max-width: 1280px; margin: 0 auto; padding: 20px 24px 0;">
            ${warningBanner}
          </div>
        ` : ''}

        <!-- 1. TOP FILTER BAR (PILL CONTAINER) -->
        <div class="mkt-search-pill-container">
          <div class="mkt-search-pill">
            <div class="mkt-search-seg mkt-search-seg-tags">
              <span class="mkt-seg-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <div id="mkt-tags-list" style="display: flex; align-items: center; gap: 6px; flex-wrap: nowrap;">
                <!-- Tag chips rendered here -->
              </div>
              <input type="text" id="mkt-input-keyword" class="mkt-search-input" placeholder="Tambah kata kunci..." />
            </div>

            <div class="mkt-seg-divider"></div>

            <div class="mkt-search-seg" style="max-width: 220px;">
              <span class="mkt-seg-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <select id="mkt-select-location" class="mkt-search-select">
                <option value="Semua" ${selectedLocation === 'Semua' ? 'selected' : ''}>Semua Kota</option>
                <option value="Bekasi" ${selectedLocation === 'Bekasi' ? 'selected' : ''}>Kota Bekasi & Cikarang</option>
                <option value="Jakarta" ${selectedLocation === 'Jakarta' ? 'selected' : ''}>DKI Jakarta</option>
                <option value="Bandung" ${selectedLocation === 'Bandung' ? 'selected' : ''}>Bandung, Jawa Barat</option>
                <option value="Malang" ${selectedLocation === 'Malang' ? 'selected' : ''}>Malang & Surabaya, Jatim</option>
                <option value="Yogyakarta" ${selectedLocation === 'Yogyakarta' ? 'selected' : ''}>Yogyakarta, DIY</option>
              </select>
            </div>

            <div class="mkt-seg-divider"></div>

            <div class="mkt-search-seg" style="max-width: 200px;">
              <span class="mkt-seg-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </span>
              <select id="mkt-select-jurusan" class="mkt-search-select">
                <option value="Semua" ${selectedJurusan === 'Semua' ? 'selected' : ''}>Semua Jurusan</option>
                <option value="RPL" ${selectedJurusan === 'RPL' ? 'selected' : ''}>Rekayasa Perangkat Lunak (RPL)</option>
                <option value="TAV" ${selectedJurusan === 'TAV' ? 'selected' : ''}>Teknik Audio Video (TAV)</option>
                <option value="TITL" ${selectedJurusan === 'TITL' ? 'selected' : ''}>Teknik Instalasi Tenaga Listrik (TITL)</option>
                <option value="TKRO" ${selectedJurusan === 'TKRO' ? 'selected' : ''}>Teknik Kendaraan Ringan Otomotif (TKRO)</option>
              </select>
            </div>

            <div class="mkt-seg-divider"></div>

            <div class="mkt-search-seg" style="max-width: 170px;">
              <span class="mkt-seg-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </span>
              <select id="mkt-select-sistem" class="mkt-search-select">
                <option value="Semua" ${selectedSistem === 'Semua' ? 'selected' : ''}>Semua Sistem</option>
                <option value="WFO" ${selectedSistem === 'WFO' ? 'selected' : ''}>On-site kantor</option>
                <option value="Hybrid" ${selectedSistem === 'Hybrid' ? 'selected' : ''}>Hybrid schedule</option>
                <option value="WFH" ${selectedSistem === 'WFH' ? 'selected' : ''}>WFH (Remote)</option>
              </select>
            </div>

            <button type="button" id="mkt-btn-search" class="btn-mkt-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Cari
            </button>
          </div>
        </div>

        <!-- 2. MAIN 2-COLUMN LAYOUT -->
        <div class="mkt-layout-container">

          <!-- LEFT SIDEBAR -->
          <aside class="mkt-sidebar-left">
            <!-- Widget Notifikasi PKL -->
            <div class="mkt-widget-notif">
              <div class="mkt-notif-icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              </div>
              <h4>Buat Notifikasi PKL</h4>
              <p>Dapatkan info lowongan PKL sesuai jurusan langsung lewat WhatsApp/Email sekolah.</p>
              <input type="text" id="mkt-notif-keyword" class="mkt-notif-input" placeholder="Ketik kata kunci/jurusan..." />
              <button type="button" class="btn-mkt-notif" id="btn-activate-notif">Aktifkan Notifikasi</button>
            </div>

            <!-- Filter Categories -->
            <div class="mkt-filter-card">
              <!-- Jurusan SMK -->
              <div class="mkt-filter-section">
                <div class="mkt-filter-header">
                  <h5>JURUSAN SMK</h5>
                  <button type="button" class="mkt-reset-link" id="btn-reset-jurusan">Reset</button>
                </div>
                <div class="mkt-checkbox-list">
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-jurusan" value="RPL" />
                      <span>Rekayasa Perangkat Lunak (RPL)</span>
                    </div>
                    <span class="mkt-count-badge" id="badge-count-rpl">${countRpl}</span>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-jurusan" value="TAV" />
                      <span>Teknik Audio Video (TAV)</span>
                    </div>
                    <span class="mkt-count-badge" id="badge-count-tav">${countTav}</span>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-jurusan" value="TITL" />
                      <span>Teknik Instalasi Tenaga Listrik (TITL)</span>
                    </div>
                    <span class="mkt-count-badge" id="badge-count-titl">${countTitl}</span>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-jurusan" value="TKRO" />
                      <span>Teknik Kendaraan Ringan Otomotif (TKRO)</span>
                    </div>
                    <span class="mkt-count-badge" id="badge-count-tkro">${countTkro}</span>
                  </label>
                </div>
              </div>

              <!-- Sistem Kerja PKL -->
              <div class="mkt-filter-section">
                <div class="mkt-filter-header">
                  <h5>SISTEM KERJA PKL</h5>
                </div>
                <div class="mkt-checkbox-list">
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-sistem" value="WFO" />
                      <span>Full-time PKL (On-site)</span>
                    </div>
                    <span class="mkt-count-badge">30</span>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-sistem" value="Hybrid" />
                      <span>Hybrid (Kantor + Remote)</span>
                    </div>
                    <span class="mkt-count-badge">14</span>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-sistem" value="WFH" />
                      <span>WFH (Full Remote)</span>
                    </div>
                    <span class="mkt-count-badge">4</span>
                  </label>
                </div>
              </div>

              <!-- Tipe Kompensasi & Fasilitas -->
              <div class="mkt-filter-section">
                <div class="mkt-filter-header">
                  <h5>TIPE KOMPENSASI</h5>
                </div>
                <div class="mkt-checkbox-list">
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-tunjangan" value="paid" />
                      <span>Paid Internship</span>
                    </div>
                    <span class="mkt-count-badge">33</span>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-tunjangan" value="unpaid" />
                      <span>Unpaid Internship</span>
                    </div>
                    <span class="mkt-count-badge">15</span>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-tunjangan" value="sertifikat" />
                      <span>Sertifikat Industri Resmi</span>
                    </div>
                    <span class="mkt-count-badge">48</span>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-tunjangan" value="laptop" />
                      <span>Fasilitas Laptop / PC</span>
                    </div>
                    <span class="mkt-count-badge">15</span>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-tunjangan" value="makan" />
                      <span>Makan Siang Gratis</span>
                    </div>
                    <span class="mkt-count-badge">19</span>
                  </label>
                </div>
              </div>

              <!-- Durasi Waktu PKL -->
              <div class="mkt-filter-section">
                <div class="mkt-filter-header">
                  <h5>DURASI WAKTU PKL</h5>
                </div>
                <div class="mkt-checkbox-list">
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-durasi" value="3" />
                      <span>3 Bulan (1 Semester Pendek)</span>
                    </div>
                    <span class="mkt-count-badge">16</span>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-durasi" value="6" />
                      <span>6 Bulan (1 Semester Penuh)</span>
                    </div>
                    <span class="mkt-count-badge">32</span>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-durasi" value="12" />
                      <span>1 Tahun (SMK 4 Tahun)</span>
                    </div>
                    <span class="mkt-count-badge">5</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <!-- RIGHT CONTENT: CATALOG LISTINGS -->
          <main class="mkt-content-right">
            <!-- Mobile Filter & Sort Bar (< 860px) -->
            <div class="mkt-mobile-filter-bar">
              <button type="button" class="btn-mkt-filter-mobile" onclick="App.openMobileFilterSheet()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                <span>Filter Kategori</span>
                <span class="filter-count-badge" id="mkt-mobile-filter-count">5</span>
              </button>
              <div class="mkt-mobile-sort-wrap">
                <select id="mkt-mobile-sort-dropdown" class="mkt-mobile-sort-select" onchange="App.handleMobileSortChange(this.value)">
                  <option value="rekomendasi">Paling Sesuai</option>
                  <option value="terbaru">Terbaru</option>
                  <option value="paid_first">Paid Internship Dahulu</option>
                  <option value="kuota">Kuota Terbanyak</option>
                </select>
              </div>
            </div>

            <!-- Stats & Sort Bar -->
            <div class="mkt-top-stats-bar">
              <div class="mkt-stats-title">
                <h3>Menampilkan <span id="mkt-count-highlight" style="font-weight: 800; color: #059669;">${jobs.length}</span> Tempat PKL Terbuka</h3>
                <p>Daftar lowongan PKL terverifikasi dari mitra industri nasional & multinasional</p>
              </div>

              <div class="mkt-sort-box">
                <label for="mkt-sort-dropdown">Urutkan:</label>
                <select id="mkt-sort-dropdown" class="mkt-sort-select">
                  <option value="rekomendasi">Paling Sesuai + Rekomendasi</option>
                  <option value="terbaru">Terbaru</option>
                  <option value="paid_first">Paid Internship Terlebih Dahulu</option>
                  <option value="kuota">Kuota Terbanyak</option>
                </select>
              </div>
            </div>

            <!-- Cards Grid (2 Columns on Standard Desktop, 1 Column on Mobile) -->
            <div id="mkt-jobs-grid" class="mkt-cards-grid">
              <!-- Rendered dynamically -->
            </div>

            <!-- Pagination Bar -->
            <div id="mkt-pagination-row" class="mkt-pagination-row">
              <div class="mkt-pagination-text" id="mkt-pagination-info">
                Menampilkan 1 sampai ${Math.min(pageSize, jobs.length)} dari ${jobs.length} lowongan tempat PKL
              </div>
              <div class="mkt-pagination-controls" id="mkt-pagination-buttons">
                <!-- Pagination buttons -->
              </div>
            </div>
          </main>
        </div>

        <!-- 3. DUAL CTA PROMOTION CARDS (Only for guest / public visitors, hidden when student is logged in searching for jobs) -->
        ${(!isSiswaLoggedIn) ? `
        <div class="mkt-dual-cta-wrap">
          <div class="dual-cta-grid">
            <div class="cta-box-light">
              <div>
                <div class="cta-card-header">
                  <div class="cta-card-icon cta-card-icon-emerald">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                  </div>
                  <h3>Kelola Data PKL Sekolah Lebih Praktis</h3>
                </div>
                <p>Pantau kehadiran, validasi jurnal harian siswa dengan tanda tangan digital, serta kirim surat pengantar resmi ke ratusan mitra industri tanpa ribet cetak kertas.</p>
              </div>
              <div class="cta-actions-group">
                <button type="button" class="btn-cta-green" onclick="App.setRole('LOGIN', 'hubin')">
                  Masuk Portal HUBIN &rarr;
                </button>
              </div>
            </div>

            <div class="cta-box-dark">
              <div>
                <div class="cta-card-header">
                  <div class="cta-card-icon cta-card-icon-dark">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                  </div>
                  <h3>Dapatkan Talenta SMK Terbaik Sesuai Kebutuhan</h3>
                </div>
                <p>Pasang lowongan magang gratis, seleksi portofolio siswa bersertifikat kompetensi keahlian, dan bangun talent pool muda berkualitas sejak bangku sekolah.</p>
              </div>
              <div class="cta-actions-group">
                <button type="button" class="btn-cta-dark-outline" onclick="App.showPartnerInfoModal()">
                  Daftar Sebagai Mitra Industri &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
        ` : ''}

        <!-- MOBILE FILTER SHEET OVERLAY (< 860px) -->
        <div id="mkt-mobile-filter-sheet-overlay" class="mkt-mobile-filter-sheet-overlay" onclick="App.closeMobileFilterSheet()">
          <div class="mkt-mobile-filter-sheet" onclick="event.stopPropagation()">
            <div class="mkt-filter-sheet-header">
              <div style="font-weight: 800; font-size: 16px; color: #0F172A; display: flex; align-items: center; gap: 8px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                Filter Tempat PKL
              </div>
              <button type="button" class="mobile-drawer-close" onclick="App.closeMobileFilterSheet()">&times;</button>
            </div>
            <div class="mkt-filter-sheet-body">
              <!-- Jurusan SMK -->
              <div>
                <div style="font-size: 11px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">JURUSAN SMK</div>
                <div class="mkt-checkbox-list">
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-jurusan-mob" value="RPL" />
                      <span>Rekayasa Perangkat Lunak (RPL)</span>
                    </div>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-jurusan-mob" value="TAV" />
                      <span>Teknik Audio Video (TAV)</span>
                    </div>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-jurusan-mob" value="TITL" />
                      <span>Teknik Instalasi Tenaga Listrik (TITL)</span>
                    </div>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-jurusan-mob" value="TKRO" />
                      <span>Teknik Kendaraan Ringan Otomotif (TKRO)</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Sistem Kerja PKL -->
              <div>
                <div style="font-size: 11px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">SISTEM KERJA PKL</div>
                <div class="mkt-checkbox-list">
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-sistem-mob" value="WFO" />
                      <span>On-site kantor penuh</span>
                    </div>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-sistem-mob" value="Hybrid" />
                      <span>Hybrid schedule</span>
                    </div>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-sistem-mob" value="WFH" />
                      <span>WFH / Remote fleksibel</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Tipe Kompensasi & Benefit -->
              <div>
                <div style="font-size: 11px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">TIPE KOMPENSASI & BENEFIT</div>
                <div class="mkt-checkbox-list">
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-tunjangan-mob" value="paid" />
                      <span>Paid Internship</span>
                    </div>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-tunjangan-mob" value="unpaid" />
                      <span>Unpaid Internship</span>
                    </div>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-tunjangan-mob" value="sertifikat" />
                      <span>Sertifikat Industri Resmi</span>
                    </div>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-tunjangan-mob" value="laptop" />
                      <span>Fasilitas Laptop / PC</span>
                    </div>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-tunjangan-mob" value="makan" />
                      <span>Makan Siang Gratis</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Durasi Waktu PKL -->
              <div>
                <div style="font-size: 11px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">DURASI WAKTU PKL</div>
                <div class="mkt-checkbox-list">
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-durasi-mob" value="3" />
                      <span>3 Bulan (1 Semester Pendek)</span>
                    </div>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-durasi-mob" value="6" />
                      <span>6 Bulan (1 Semester Penuh)</span>
                    </div>
                  </label>
                  <label class="mkt-checkbox-item">
                    <div class="mkt-checkbox-left">
                      <input type="checkbox" class="cb-filter-durasi-mob" value="12" />
                      <span>1 Tahun (SMK 4 Tahun)</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div class="mkt-filter-sheet-footer">
              <button type="button" class="btn btn-secondary" style="flex: 1; justify-content: center;" onclick="App.resetMobileFilters()">Reset</button>
              <button type="button" class="btn btn-primary" style="flex: 2; justify-content: center; background: #059669; border-color: #059669;" onclick="App.applyMobileFilterSheet()">Terapkan Filter</button>
            </div>
          </div>
        </div>

        <!-- 4. DARK FOOTER -->
        <footer class="dark-portal-footer" style="margin-top: 60px;">
          <div class="footer-inner-dark">
            <div class="footer-dark-top-grid">
              <div class="footer-brand-col">
                <h4><span style="font-size: 20px;">🎓</span> Find My <span>PKL</span></h4>
                <p>Platform digital resmi penelusuran dan pengelolaan PKL khusus siswa-siswi SMK Taruna Bangsa Kota Bekasi.</p>
                <p style="margin-top: 10px; font-size: 12px; color: #94a3b8;">
                  Platform Aktif Semester Ganjil & Genap &bull; BKK & HUBIN
                </p>
              </div>

              <div class="footer-dark-col">
                <h5>JURUSAN POPULER</h5>
                <ul class="footer-dark-links">
                  <li><a onclick="App.quickFilterMajor('RPL')">Rekayasa Perangkat Lunak (RPL)</a></li>
                  <li><a onclick="App.quickFilterMajor('TAV')">Teknik Audio Video (TAV)</a></li>
                  <li><a onclick="App.quickFilterMajor('TITL')">Teknik Instalasi Tenaga Listrik (TITL)</a></li>
                  <li><a onclick="App.quickFilterMajor('TKRO')">Teknik Kendaraan Ringan Otomotif (TKRO)</a></li>
                </ul>
              </div>

              <div class="footer-dark-col">
                <h5>KOTA TERAKTIF</h5>
                <ul class="footer-dark-links">
                  <li><a>Malang Raya</a></li>
                  <li><a>Surabaya & Sidoarjo</a></li>
                  <li><a>Jakarta Selatan & Pusat</a></li>
                  <li><a>Bandung Kota</a></li>
                  <li><a>Kota Bekasi & Sekitarnya</a></li>
                </ul>
              </div>

              <div class="footer-dark-col">
                <h5>HUBUNGI KAMI & LAYANAN HUBIN</h5>
                <div class="footer-contact-info">
                  <p>✉️ <a href="mailto:info@smktarunabangsa.sch.id">info@smktarunabangsa.sch.id</a></p>
                  <p>📞 +62 21 8895-1234 / WhatsApp Hubin Center</p>
                  <p>🏢 Gedung BKK & Hubungan Industri SMK Taruna Bangsa Kota Bekasi, Jawa Barat</p>
                </div>
              </div>
            </div>

            <div class="footer-dark-bottom">
              <div>&copy; 2026 FindMyPKL / PKL Hub SMK. Hak Cipta Dilindungi Undang-Undang.</div>
              <div style="display: flex; gap: 16px;">
                <a style="color: #64748b; font-size: 12px; cursor: pointer;">Ketentuan Layanan</a>
                <a style="color: #64748b; font-size: 12px; cursor: pointer;">Kebijakan Privasi</a>
                <a style="color: #64748b; font-size: 12px; cursor: pointer;">Panduan Bimbingan PKL</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    `;

    // Render keyword tag chips
    const renderTags = () => {
      const listEl = document.getElementById('mkt-tags-list');
      if (!listEl) return;
      listEl.innerHTML = searchTags.map((tag, idx) => `
        <span class="mkt-tag-pill">
          ${tag}
          <button type="button" onclick="App.removeSearchTag(${idx})">&times;</button>
        </span>
      `).join('');
    };

    App.removeSearchTag = (idx) => {
      searchTags.splice(idx, 1);
      renderTags();
      applyFiltersAndRender();
    };

    const addTagInput = document.getElementById('mkt-input-keyword');
    if (addTagInput) {
      addTagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const val = addTagInput.value.trim();
          if (val && !searchTags.includes(val)) {
            searchTags.push(val);
            addTagInput.value = '';
            renderTags();
            applyFiltersAndRender();
          }
        }
      });
    }

    // Filter execution
    const applyFiltersAndRender = () => {
      // Gather checked boxes
      checkedJurusan = new Set(Array.from(document.querySelectorAll('.cb-filter-jurusan:checked')).map(el => el.value));
      checkedSistem = new Set(Array.from(document.querySelectorAll('.cb-filter-sistem:checked')).map(el => el.value));
      checkedTunjangan = new Set(Array.from(document.querySelectorAll('.cb-filter-tunjangan:checked')).map(el => el.value));
      checkedDurasi = new Set(Array.from(document.querySelectorAll('.cb-filter-durasi:checked')).map(el => Number(el.value)));

      const locVal = document.getElementById('mkt-select-location')?.value || 'Semua';
      const jurVal = document.getElementById('mkt-select-jurusan')?.value || 'Semua';
      const sysVal = document.getElementById('mkt-select-sistem')?.value || 'Semua';
      const sortVal = document.getElementById('mkt-sort-dropdown')?.value || 'rekomendasi';

      let filtered = jobs.filter(j => {
        // Tag keywords match
        if (searchTags.length > 0) {
          const haystack = `${j.judul} ${j.company_nama} ${j.deskripsi} ${j.jurusan_target} ${j.tags ? j.tags.join(' ') : ''}`.toLowerCase();
          const matchAnyTag = searchTags.some(tag => haystack.includes(tag.toLowerCase()));
          if (!matchAnyTag) return false;
        }

        // Location dropdown
        if (locVal !== 'Semua') {
          if (!(j.lokasi_kota || '').toLowerCase().includes(locVal.toLowerCase())) return false;
        }

        // Jurusan dropdown
        if (jurVal !== 'Semua') {
          const majorCode = App.getJobMajorCode(j) || '';
          const targetStr = (j.jurusan_target || '') + ' ' + majorCode;
          if (!targetStr.toLowerCase().includes(jurVal.toLowerCase())) return false;
        }

        // Sistem dropdown
        if (sysVal !== 'Semua') {
          const sysStr = `${j.tipe_kerja} ${j.work_schedule}`.toLowerCase();
          if (!sysStr.includes(sysVal.toLowerCase())) return false;
        }

        // Checkbox Jurusan
        if (checkedJurusan.size > 0) {
          const major = App.getJobMajorCode(j);
          const targetStr = (j.jurusan_target || '') + ' ' + major;
          let match = false;
          for (const c of checkedJurusan) {
            if (targetStr.toLowerCase().includes(c.toLowerCase())) {
              match = true; break;
            }
          }
          if (!match) return false;
        }

        // Checkbox Sistem
        if (checkedSistem.size > 0) {
          let match = false;
          for (const s of checkedSistem) {
            if ((j.tipe_kerja || '').toLowerCase().includes(s.toLowerCase()) || (j.work_schedule || '').toLowerCase().includes(s.toLowerCase())) {
              match = true; break;
            }
          }
          if (!match) return false;
        }

        // Checkbox Tunjangan & Kompensasi
        if (checkedTunjangan.size > 0) {
          const isPaid = App.isJobPaid(j);
          const benef = (j.benefit || '') + ' ' + (j.uang_saku || '');

          const wantsPaid = checkedTunjangan.has('paid');
          const wantsUnpaid = checkedTunjangan.has('unpaid');
          if (wantsPaid && !wantsUnpaid && !isPaid) return false;
          if (wantsUnpaid && !wantsPaid && isPaid) return false;

          if (checkedTunjangan.has('sertifikat') && !/sertifikat/i.test(benef)) return false;
          if (checkedTunjangan.has('laptop') && !/laptop/i.test(benef)) return false;
          if (checkedTunjangan.has('makan') && !/makan/i.test(benef)) return false;
        }

        // Checkbox Durasi
        if (checkedDurasi.size > 0) {
          if (!checkedDurasi.has(j.durasi_bulan)) return false;
        }

        return true;
      });

      // Sort
      if (sortVal === 'terbaru') {
        filtered.sort((a, b) => b.id - a.id);
      } else if (sortVal === 'kuota') {
        filtered.sort((a, b) => (b.kuota - b.kuota_terisi) - (a.kuota - a.kuota_terisi));
      } else if (sortVal === 'paid_first' || sortVal === 'uang_saku') {
        filtered.sort((a, b) => {
          const aPaid = App.isJobPaid(a) ? 1 : 0;
          const bPaid = App.isJobPaid(b) ? 1 : 0;
          if (bPaid !== aPaid) return bPaid - aPaid;
          return b.id - a.id;
        });
      } else {
        // Rekomendasi
        if (student && student.jurusan) {
          const studMajor = student.jurusan.toLowerCase();
          filtered.sort((a, b) => {
            const aMatch = (a.jurusan_target || '').toLowerCase().includes(studMajor);
            const bMatch = (b.jurusan_target || '').toLowerCase().includes(studMajor);
            return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
          });
        }
      }
      const totalCount = filtered.length;

      // Update total counter
      const countEl = document.getElementById('mkt-count-highlight');
      if (countEl) countEl.textContent = totalCount;

      // Update active mobile filter count badge
      let activeFilterCount = searchTags.length + checkedJurusan.size + checkedSistem.size + checkedTunjangan.size + checkedDurasi.size;
      if (locVal !== 'Semua') activeFilterCount++;
      if (jurVal !== 'Semua') activeFilterCount++;
      if (sysVal !== 'Semua') activeFilterCount++;
      const mobBadge = document.getElementById('mkt-mobile-filter-count');
      if (mobBadge) {
        mobBadge.textContent = activeFilterCount;
        mobBadge.style.display = activeFilterCount > 0 ? 'inline-block' : 'none';
      }

      // Pagination slice
      const totalPages = Math.ceil(totalCount / pageSize) || 1;
      if (currentPage > totalPages) currentPage = 1;
      const start = (currentPage - 1) * pageSize;
      const pageSlice = filtered.slice(start, start + pageSize);

      const gridEl = document.getElementById('mkt-jobs-grid');
      if (!gridEl) return;

      if (filtered.length === 0) {
        gridEl.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #ffffff; border-radius: 18px; border: 1px solid #e2e8f0;">
            <div style="font-size: 38px; margin-bottom: 12px;">🔍</div>
            <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">Tidak Ada Lowongan yang Sesuai</h4>
            <p style="font-size: 13px; color: #64748b; max-width: 440px; margin: 0 auto 16px;">
              Coba hapus beberapa kata kunci filter atau klik tombol <strong>Reset</strong> pada kategori jurusan di bilah samping.
            </p>
            <button class="btn btn-primary btn-sm" onclick="App.resetAllCatalogFilters()">Tampilkan Semua Lowongan</button>
          </div>
        `;
      } else {
        gridEl.innerHTML = pageSlice.map(j => {
          const isSaved = App.bookmarkedJobs && App.bookmarkedJobs.has(j.id);
          return (window.renderPklJobCard || App.renderJobCard)(j, {
            className: 'mkt-job-card pkl-job-card',
            isBookmarked: isSaved,
            actionText: 'Daftar PKL',
            actionCallback: `App.handleDaftarPklClick(${j.id})`
          });
        }).join('');

      }

      // Update pagination info & controls
      const pagInfo = document.getElementById('mkt-pagination-info');
      if (pagInfo) {
        pagInfo.textContent = filtered.length > 0 
          ? `Menampilkan ${start + 1} sampai ${Math.min(start + pageSize, totalCount)} dari ${totalCount} lowongan tempat PKL`
          : 'Menampilkan 0 lowongan';
      }

      const pagBtns = document.getElementById('mkt-pagination-buttons');
      if (pagBtns) {
        let btnsHtml = `
          <button type="button" class="mkt-page-btn ${currentPage === 1 ? 'disabled' : ''}" ${currentPage === 1 ? 'disabled' : ''} onclick="App.changeCatalogPage(${currentPage - 1})">
            Sebelumnya
          </button>
        `;
        for (let p = 1; p <= totalPages; p++) {
          if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
            btnsHtml += `
              <button type="button" class="mkt-page-btn ${currentPage === p ? 'active' : ''}" onclick="App.changeCatalogPage(${p})">
                ${p}
              </button>
            `;
          } else if (p === currentPage - 2 || p === currentPage + 2) {
            btnsHtml += `<span style="padding: 0 4px; color: #94a3b8;">...</span>`;
          }
        }
        btnsHtml += `
          <button type="button" class="mkt-page-btn ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : ''} onclick="App.changeCatalogPage(${currentPage + 1})">
            Selanjutnya
          </button>
        `;
        pagBtns.innerHTML = btnsHtml;
      }

      if (typeof window !== 'undefined' && window.lenis) {
        try { window.lenis.resize(); } catch (e) {}
      }
    };

    App.changeCatalogPage = (page) => {
      currentPage = page;
      applyFiltersAndRender();
      if (typeof window !== 'undefined' && window.lenis) {
        try {
          window.lenis.resize();
          window.lenis.scrollTo(180, { duration: 0.5 });
        } catch (e) {
          const grid = document.getElementById('mkt-jobs-grid');
          if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        const grid = document.getElementById('mkt-jobs-grid');
        if (grid) {
          grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 180, behavior: 'smooth' });
        }
      }
    };

    App.resetAllCatalogFilters = () => {
      searchTags = [];
      document.querySelectorAll('.cb-filter-jurusan, .cb-filter-sistem, .cb-filter-tunjangan, .cb-filter-durasi').forEach(cb => cb.checked = false);
      const locEl = document.getElementById('mkt-select-location');
      if (locEl) locEl.value = 'Semua';
      const jurEl = document.getElementById('mkt-select-jurusan');
      if (jurEl) jurEl.value = 'Semua';
      const sysEl = document.getElementById('mkt-select-sistem');
      if (sysEl) sysEl.value = 'Semua';
      const sortEl = document.getElementById('mkt-sort-dropdown');
      if (sortEl) sortEl.value = 'rekomendasi';
      const mobSortEl = document.getElementById('mkt-mobile-sort-dropdown');
      if (mobSortEl) mobSortEl.value = 'rekomendasi';
      renderTags();
      currentPage = 1;
      applyFiltersAndRender();
      if (typeof window !== 'undefined' && window.lenis) {
        try { window.lenis.resize(); } catch (e) {}
      }
    };

    App.openMobileFilterSheet = () => {
      document.querySelectorAll('.cb-filter-jurusan').forEach(cb => {
        const mob = document.querySelector(`.cb-filter-jurusan-mob[value="${cb.value}"]`);
        if (mob) mob.checked = cb.checked;
      });
      document.querySelectorAll('.cb-filter-sistem').forEach(cb => {
        const mob = document.querySelector(`.cb-filter-sistem-mob[value="${cb.value}"]`);
        if (mob) mob.checked = cb.checked;
      });
      document.querySelectorAll('.cb-filter-tunjangan').forEach(cb => {
        const mob = document.querySelector(`.cb-filter-tunjangan-mob[value="${cb.value}"]`);
        if (mob) mob.checked = cb.checked;
      });
      document.querySelectorAll('.cb-filter-durasi').forEach(cb => {
        const mob = document.querySelector(`.cb-filter-durasi-mob[value="${cb.value}"]`);
        if (mob) mob.checked = cb.checked;
      });
      const sheet = document.getElementById('mkt-mobile-filter-sheet-overlay');
      if (sheet) sheet.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    App.closeMobileFilterSheet = () => {
      const sheet = document.getElementById('mkt-mobile-filter-sheet-overlay');
      if (sheet) sheet.classList.remove('active');
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        try { window.lenis.start(); window.lenis.resize(); } catch (e) {}
      }
    };

    App.resetMobileFilters = () => {
      document.querySelectorAll('.cb-filter-jurusan-mob, .cb-filter-sistem-mob, .cb-filter-tunjangan-mob, .cb-filter-durasi-mob').forEach(cb => cb.checked = false);
      App.applyMobileFilterSheet();
    };

    App.applyMobileFilterSheet = () => {
      document.querySelectorAll('.cb-filter-jurusan-mob').forEach(mob => {
        const desk = document.querySelector(`.cb-filter-jurusan[value="${mob.value}"]`);
        if (desk) desk.checked = mob.checked;
      });
      document.querySelectorAll('.cb-filter-sistem-mob').forEach(mob => {
        const desk = document.querySelector(`.cb-filter-sistem[value="${mob.value}"]`);
        if (desk) desk.checked = mob.checked;
      });
      document.querySelectorAll('.cb-filter-tunjangan-mob').forEach(mob => {
        const desk = document.querySelector(`.cb-filter-tunjangan[value="${mob.value}"]`);
        if (desk) desk.checked = mob.checked;
      });
      document.querySelectorAll('.cb-filter-durasi-mob').forEach(mob => {
        const desk = document.querySelector(`.cb-filter-durasi[value="${mob.value}"]`);
        if (desk) desk.checked = mob.checked;
      });
      App.closeMobileFilterSheet();
      currentPage = 1;
      applyFiltersAndRender();
    };

    App.handleMobileSortChange = (val) => {
      const deskSort = document.getElementById('mkt-sort-dropdown');
      if (deskSort) deskSort.value = val;
      currentPage = 1;
      applyFiltersAndRender();
    };

    App.filterOnlyBookmarked = () => {
      if (App.bookmarkedJobs.size === 0) {
        Toast.show('Belum Ada Favorit', 'Anda belum menyimpan lowongan apa pun. Klik ikon simpan pada kartu lowongan untuk menyimpan ke favorit.', 'info');
        return;
      }
      Toast.show('Favorit Saya', `Menampilkan ${App.bookmarkedJobs.size} lowongan yang telah Anda simpan.`, 'success');
      applyFiltersAndRender();
    };

    // Event listeners
    renderTags();

    document.getElementById('mkt-btn-search').addEventListener('click', () => {
      currentPage = 1;
      applyFiltersAndRender();
    });

    document.getElementById('mkt-select-location').addEventListener('change', () => {
      currentPage = 1;
      applyFiltersAndRender();
    });

    document.getElementById('mkt-select-jurusan').addEventListener('change', () => {
      currentPage = 1;
      applyFiltersAndRender();
    });

    document.getElementById('mkt-select-sistem').addEventListener('change', () => {
      currentPage = 1;
      applyFiltersAndRender();
    });

    document.getElementById('mkt-sort-dropdown').addEventListener('change', (e) => {
      const mobSort = document.getElementById('mkt-mobile-sort-dropdown');
      if (mobSort) mobSort.value = e.target.value;
      currentPage = 1;
      applyFiltersAndRender();
    });

    document.querySelectorAll('.cb-filter-jurusan, .cb-filter-sistem, .cb-filter-tunjangan, .cb-filter-durasi').forEach(cb => {
      cb.addEventListener('change', () => {
        currentPage = 1;
        applyFiltersAndRender();
      });
    });

    const resetJurBtn = document.getElementById('btn-reset-jurusan');
    if (resetJurBtn) {
      resetJurBtn.addEventListener('click', () => {
        document.querySelectorAll('.cb-filter-jurusan').forEach(cb => cb.checked = false);
        currentPage = 1;
        applyFiltersAndRender();
      });
    }

    const notifBtn = document.getElementById('btn-activate-notif');
    if (notifBtn) {
      notifBtn.addEventListener('click', () => {
        const kw = (document.getElementById('mkt-notif-keyword').value || '').trim();
        Toast.show('Notifikasi PKL Aktif!', `Info lowongan ${kw ? `"${kw}"` : 'sesuai jurusan'} akan dikirimkan otomatis ke kontak Anda saat ada kuota baru dibuka.`, 'success');
      });
    }

    // Initial render
    applyFiltersAndRender();
  },

  showPartnerInfoModal() {
    const html = `
      <form id="form-partner-inquiry" onsubmit="App.handlePartnerSubmit(event)">
        <div style="background: linear-gradient(135deg, #064e3b 0%, #065f46 100%); color: #ffffff; border-radius: 14px; padding: 20px; margin-bottom: 20px;">
          <p style="font-size: 13px; color: #a7f3d0; margin: 0; line-height: 1.5;">
            Bergabunglah bersama 13+ mitra industri terkemuka. Dapatkan talenta muda siap kerja dengan keahlian Rekayasa Perangkat Lunak (RPL), Teknik Audio Video (TAV), Teknik Instalasi Tenaga Listrik (TITL), dan Teknik Kendaraan Ringan Otomotif (TKRO).
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 14px;">
          <div class="form-group">
            <label class="form-label">Nama Perusahaan / Institusi *</label>
            <input type="text" id="partner-company-nama" class="form-input" required placeholder="Contoh: PT Teknologi Nusantara" />
          </div>

          <div class="form-group">
            <label class="form-label">Bidang Industri / Sektor *</label>
            <select id="partner-industri" class="form-select" required>
              <option value="Teknologi Informasi & Software">Teknologi Informasi & Software</option>
              <option value="Desain Kreatif & Multimedia">Desain Kreatif & Multimedia</option>
              <option value="Manufaktur & Otomotif">Manufaktur & Otomotif</option>
              <option value="Perbankan & Keuangan">Perbankan & Keuangan</option>
              <option value="Telekomunikasi & Jaringan">Telekomunikasi & Jaringan</option>
              <option value="Lainnya">Sektor Industri Lainnya</option>
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 14px;">
          <div class="form-group">
            <label class="form-label">Nama PIC / Kontak Person *</label>
            <input type="text" id="partner-pic-nama" class="form-input" required placeholder="Nama lengkap PIC HRD/Divisi" />
          </div>

          <div class="form-group">
            <label class="form-label">Jabatan PIC *</label>
            <input type="text" id="partner-pic-jabatan" class="form-input" required placeholder="Contoh: HR Manager / Lead Tech" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 14px;">
          <div class="form-group">
            <label class="form-label">Email Resmi Perusahaan *</label>
            <input type="email" id="partner-email" class="form-input" required placeholder="recruitment@perusahaan.com" />
          </div>

          <div class="form-group">
            <label class="form-label">Nomor WhatsApp PIC *</label>
            <input type="tel" id="partner-phone" class="form-input" required placeholder="Contoh: 081234567890" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 14px;">
          <div class="form-group">
            <label class="form-label">Kota / Lokasi Kantor *</label>
            <input type="text" id="partner-kota" class="form-input" required placeholder="Contoh: Kota Bekasi / DKI Jakarta" />
          </div>

          <div class="form-group">
            <label class="form-label">Kebutuhan Kuota Siswa PKL *</label>
            <select id="partner-kuota" class="form-select" required>
              <option value="2-4">2 - 4 Siswa (Tim Kecil)</option>
              <option value="5-10" selected>5 - 10 Siswa (Batch Reguler)</option>
              <option value="11-20">11 - 20 Siswa (Batch Besar)</option>
              <option value=">20">> 20 Siswa (Program Kelas Industri)</option>
            </select>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 18px;">
          <label class="form-label">Catatan / Posisi Magang yang Dibutuhkan</label>
          <textarea id="partner-catatan" class="form-textarea" rows="3" placeholder="Sebutkan posisi yang dibuka (misal: Junior Web Developer, UI Designer, IT Support) dan jadwal pelaksanaan PKL..."></textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" class="btn btn-secondary" onclick="Modal.close()">Tutup</button>
          <button type="submit" class="btn btn-primary" style="padding: 10px 22px; font-weight: 700; background: #059669; border-color: #059669;">
            Kirim Pengajuan Kemitraan &rarr;
          </button>
        </div>
      </form>
    `;
    Modal.open(html, 'Pendaftaran Mitra Industri (DUDI)', 'lg');
  },

  handlePartnerSubmit(e) {
    e.preventDefault();
    const namaComp = document.getElementById('partner-company-nama').value.trim();
    const picNama = document.getElementById('partner-pic-nama').value.trim();
    Modal.close();
    Toast.show(
      'Pengajuan Kemitraan Diterima!',
      `Terima kasih ${picNama}. Formulir pengajuan kemitraan untuk "${namaComp}" telah tercatat di sistem Find My PKL. Tim BKK & HUBIN SMK Taruna Bangsa akan menghubungi nomor WhatsApp Anda dalam 1x24 jam kerja.`,
      'success'
    );
  },

  async handleDaftarPklClick(jobId) {
    const job = await API.getJobById(jobId);
    const student = this.currentStudent;

    // 1. If not logged in as student / guest mode
    if (!student || this.currentRole !== 'SISWA') {
      const html = `
        <div style="text-align: center; padding: 10px 0;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 26px;">
            🔒
          </div>
          <h4 style="font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">
            Pendaftaran Siswa Diperlukan
          </h4>
          <p style="font-size: 13.5px; color: #64748b; line-height: 1.6; max-width: 440px; margin: 0 auto 18px;">
            Untuk dapat mengajukan permohonan PKL ke mitra <strong>${job ? job.company_nama : 'Industri'}</strong>, kamu harus terdaftar sebagai siswa SMK dan akun telah diverifikasi oleh tim HUBIN.
          </p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: left; margin-bottom: 20px;">
            <div style="font-weight: 700; font-size: 12.5px; color: #334155; margin-bottom: 4px;">Lowongan yang Dituju:</div>
            <div style="font-size: 14px; font-weight: 800; color: #0f172a;">${job ? job.judul : 'Lowongan PKL'}</div>
            <div style="font-size: 12px; color: #64748b;">${job ? job.company_nama : ''} &bull; ${job ? job.lokasi_kota : ''}</div>
          </div>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn btn-primary" onclick="Modal.close(); App.setRole('REGISTER');">
              Daftar Akun Siswa Baru
            </button>
            <button class="btn btn-secondary" onclick="Modal.close(); App.setRole('LOGIN');">
              Sudah Punya Akun? Masuk
            </button>
          </div>
        </div>
      `;
      Modal.open(html, 'Pendaftaran Siswa Diperlukan', 'md');
      return;
    }

    // 2. Account State: MENUNGGU VERIFIKASI
    if (student.status_verifikasi === 'Menunggu Verifikasi') {
      const html = `
        <div style="text-align: center; padding: 10px 0;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: #fef3c7; color: #d97706; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; font-size: 26px;">
            ⏳
          </div>
          <span class="badge badge-amber" style="font-size: 11px; padding: 4px 10px; margin-bottom: 8px;">
            STATUS: MENUNGGU VERIFIKASI
          </span>
          <h4 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 8px 0 6px;">
            "Data kamu sedang diperiksa oleh HUBIN."
          </h4>
          <p style="font-size: 13.5px; color: #64748b; line-height: 1.6; max-width: 440px; margin: 0 auto 18px;">
            Pendaftaran akun kamu atas nama <strong>${student.nama}</strong> (${student.kelas} &bull; NISN: ${student.nisn}) sedang ditinjau dan divalidasi oleh Koordinator HUBIN. Setelah disetujui, kamu dapat langsung mengirimkan lamaran ke <strong>${job ? job.company_nama : 'mitra'}</strong>.
          </p>
          <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 12px 16px; text-align: left; margin-bottom: 20px; font-size: 12.5px; color: #92400e;">
            <strong>ℹ Info untuk Siswa:</strong> Verifikasi HUBIN memerlukan pencocokan data buku induk Dapodik sekolah. Pastikan data kontak WhatsApp kamu aktif.
          </div>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn btn-secondary" onclick="Modal.close();">
              Tutup
            </button>
            <button class="btn btn-primary" onclick="Modal.close(); App.setTab('profil');">
              Lihat Detail di Profil Saya &rarr;
            </button>
          </div>
        </div>
      `;
      Modal.open(html, 'Status Akun: Menunggu Verifikasi', 'md');
      return;
    }

    // 3. Account State: PERLU PERBAIKAN
    if (student.status_verifikasi === 'Perlu Perbaikan') {
      const html = `
        <div style="text-align: center; padding: 10px 0;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: #ffedd5; color: #ea580c; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; font-size: 26px;">
            ✍
          </div>
          <span class="badge badge-amber" style="font-size: 11px; padding: 4px 10px; margin-bottom: 8px;">
            STATUS: PERLU PERBAIKAN
          </span>
          <h4 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 8px 0 6px;">
            "HUBIN meminta kamu memperbaiki beberapa data."
          </h4>
          <p style="font-size: 13.5px; color: #64748b; line-height: 1.6; max-width: 440px; margin: 0 auto 16px;">
            Terdapat data pendaftaran yang perlu dilengkapi atau dikoreksi sebelum kamu dapat mengajukan lamaran PKL.
          </p>
          <div style="background: #fff7ed; border: 1.5px solid #fed7aa; border-radius: 12px; padding: 14px; text-align: left; margin-bottom: 20px;">
            <div style="font-size: 12px; font-weight: 700; color: #9a3412; margin-bottom: 4px;">Catatan dari Koordinator HUBIN:</div>
            <div style="font-size: 13.5px; color: #7c2d12; font-weight: 600; line-height: 1.5;">
              "${student.catatan_verifikasi || 'Periksa kembali nomor kontak WhatsApp dan tautan berkas CV Anda.'}"
            </div>
          </div>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn btn-secondary" onclick="Modal.close();">Tutup</button>
            <button class="btn btn-primary" style="background: #ea580c; border-color: #ea580c;" onclick="Modal.close(); App.showStudentEditModal(${student.id});">
              Perbaiki Data Sekarang ✍
            </button>
          </div>
        </div>
      `;
      Modal.open(html, 'Perbaikan Data Siswa Diperlukan', 'md');
      return;
    }

    // 4. Account State: DITOLAK
    if (student.status_verifikasi === 'Ditolak') {
      const html = `
        <div style="text-align: center; padding: 10px 0;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: #ffe4e6; color: #e11d48; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; font-size: 26px;">
            ⛔
          </div>
          <span class="badge badge-rose" style="font-size: 11px; padding: 4px 10px; margin-bottom: 8px;">
            STATUS: DITOLAK
          </span>
          <h4 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 8px 0 6px;">
            "Verifikasi Akun Ditolak oleh HUBIN"
          </h4>
          <div style="background: #fff1f2; border: 1.5px solid #fecdd3; border-radius: 12px; padding: 14px; text-align: left; margin: 16px 0 20px;">
            <div style="font-size: 12px; font-weight: 700; color: #9f1239; margin-bottom: 4px;">Alasan Penolakan:</div>
            <div style="font-size: 13.5px; color: #881337; font-weight: 600; line-height: 1.5;">
              "${student.catatan_verifikasi || 'NISN tidak terdaftar dalam Dapodik resmi SMK Taruna Bangsa Kota Bekasi.'}"
            </div>
          </div>
          <p style="font-size: 12.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px;">
            Silakan bawa Kartu Pelajar Anda dan hubungi ruang BKK/HUBIN sekolah secara langsung untuk konfirmasi data Dapodik.
          </p>
          <button class="btn btn-secondary" onclick="Modal.close();">Tutup</button>
        </div>
      `;
      Modal.open(html, 'Verifikasi Akun Ditolak', 'md');
      return;
    }

    // 5. Account State: TERVERIFIKASI -> Open full application modal
    await this.showJobDetailModal(jobId);
  },

  async showCompanyDetailModalByName(companyName) {
    if (typeof App.showCompanyDetailModal === 'function') {
      const cleanName = String(companyName).replace(/PT|CV|Persero|Tbk/gi, '').trim().toLowerCase();
      const companies = await API.getCompanies();
      const found = companies.find(c => {
        const cn = c.nama.toLowerCase();
        return cn.includes(cleanName) || cleanName.includes(c.nama.replace(/PT|CV|Persero|Tbk/gi, '').trim().toLowerCase());
      }) || companies[0];

      if (found) {
        await App.showCompanyDetailModal(found.id);
        return;
      }
    }
    App.showToast(`Profil ${companyName} sedang disiapkan.`, 'info');
  },

  async showJobDetailModal(jobId) {
    const job = await API.getJobById(jobId);
    this.activeLokerModalJob = job;

    this.activeLokerUserApplication = null;
    this.activeLokerCooldown = null;
    if (this.currentStudent && this.currentRole === 'SISWA') {
      try {
        const [apps, cooldown] = await Promise.all([
          API.getApplications({ student_id: this.currentStudent.id }),
          API.getStudentApplicationCooldown(this.currentStudent.id).catch(() => null)
        ]);
        const existing = (apps || []).find(a => Number(a.job_id) === Number(jobId));
        if (existing) {
          this.activeLokerUserApplication = existing;
        }
        this.activeLokerCooldown = cooldown;
      } catch (e) {
        console.warn('Could not check existing application or cooldown:', e);
      }
    }

    this.renderLokerModalStep(jobId, 1);
  },

  renderLokerModalStep(jobId, step = 1) {
    const job = this.activeLokerModalJob || {};
    const isSiswaLoggedIn = this.currentRole === 'SISWA' && Boolean(this.currentStudent);
    const student = isSiswaLoggedIn ? this.currentStudent : null;
    const isVerified = student && student.status_verifikasi === 'Terverifikasi';
    const isPublic = !isSiswaLoggedIn || !student;
    const isPaid = this.isJobPaid(job);
    const userApp = this.activeLokerUserApplication || null;
    const isApplied = Boolean(userApp);
    const cooldown = this.activeLokerCooldown || null;
    const isCooldownActive = Boolean(cooldown && !cooldown.can_apply && !isApplied);

    // Helpers
    const companyName = job.company_nama || 'PT Media Kreatif Nusantara';
    const cleanCity = (job.lokasi_kota || 'Kota Malang').split(',')[0].replace(/Kota\s*/i, 'Kota ').trim();
    const industryBidang = job.company_bidang || 'Teknologi & Media Digital';
    const rawWebsite = job.website || 'https://www.mediakreatif.co.id';
    const displayWebsite = rawWebsite.replace(/^https?:\/\//i, '');
    const cleanAddress = job.company_alamat || 'Jl. Soekarno Hatta No. 45, Lowokwaru, Kota Malang';
    const companyDescription = job.company_deskripsi || job.deskripsi || 'Perusahaan konsultan teknologi dan media kreatif yang fokus pada pengembangan aplikasi web, branding digital, dan produksi konten.';

    // Initials badge
    let logoInitials = job.logo_initials || '';
    if (!logoInitials && job.company_nama) {
      const words = job.company_nama.replace(/PT|CV|Persero|Tbk/gi, '').trim().split(/\s+/);
      logoInitials = words.map(w => w[0]).join('').slice(0, 3).toUpperCase();
    }
    if (!logoInitials) logoInitials = 'MKN';

    // Majors
    const majorChips = [];
    const targetStr = (job.jurusan_target || '') + ' ' + (job.judul || '') + ' ' + (job.major_code || '');
    if (/RPL|Perangkat Lunak|Software|Web|Frontend|Backend/i.test(targetStr)) majorChips.push('RPL');
    if (/TAV|Audio Video|Audio|Video|Broadcasting|Elektronika|Multimedia|Animasi|DKV/i.test(targetStr)) majorChips.push('TAV');
    if (/TITL|Tenaga Listrik|Instalasi Listrik|Ketenagalistrikan|Panel Surya|Listrik|TKJ|AKL/i.test(targetStr)) majorChips.push('TITL');
    if (/TKRO|Otomotif|Mekanik|Kendaraan|Mesin/i.test(targetStr)) majorChips.push('TKRO');
    if (majorChips.length === 0) majorChips.push(App.getJobMajorCode(job));

    const majorBadgesHtml = majorChips.map(m => `<span class="loker-major-badge">${m}</span>`).join('');

    // Work schedule & dress code
    const workDays = 'Senin – Jumat';
    const workHours = (job.work_schedule && job.work_schedule.includes('WIB')) ? job.work_schedule : '08.00 – 17.00 WIB';
    const uniformPrimary = 'Bebas Rapi / Praktik';
    const uniformSecondary = 'Sopan & Berkerah';

    // Tasks list matching reference mockup
    let tasksList = [];
    if (job.kualifikasi && job.kualifikasi.includes('\n')) {
      tasksList = job.kualifikasi.split('\n').map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(Boolean);
    }
    if (tasksList.length < 2) {
      if (/RPL|Web|Frontend|Backend|Software/i.test(targetStr)) {
        tasksList = [
          'Slicing desain UI dari Figma ke komponen Next.js & Tailwind CSS',
          'Membuat & mengintegrasikan REST API Backend',
          'Kolaborasi manajemen kode menggunakan Git & GitHub',
          'Pengujian (testing), debugging, dan dokumentasi fitur web'
        ];
      } else if (/TAV|Audio Video|Audio|Video|Broadcasting|Elektronika|Multimedia|Animasi|DKV/i.test(targetStr)) {
        tasksList = [
          'Pengoperasian kamera broadcast, audio mixer, dan perangkat sound system',
          'Editing konten audio video, mixing suara, dan color grading',
          'Pemeliharaan & kalibrasi perangkat audio visual dan display studio',
          'Pengujian kualitas sinyal audio dan transmisi siaran digital'
        ];
      } else if (/TITL|Tenaga Listrik|Instalasi Listrik|Ketenagalistrikan|Panel Surya|Listrik/i.test(targetStr)) {
        tasksList = [
          'Pemasangan instalasi penerangan dan tenaga listrik standar PUIL',
          'Perakitan, wiring, dan pemeliharaan panel daya distribusi listrik',
          'Pengukuran parameter tegangan, arus, dan pengujian tahanan isolasi',
          'Pemeriksaan sistem proteksi kelistrikan, genset, dan panel surya'
        ];
      } else if (/Otomotif|TKRO|TBSM/i.test(targetStr)) {
        tasksList = [
          'Praktik langsung servis berkala dan tune-up mesin standar industri',
          'Pengecekan sistem injeksi EFI/PGM-FI dan kelistrikan kendaraan',
          'Inspeksi keselamatan rem, suspensi, dan penggantian oli berkala',
          'Penerapan budaya kerja 5R dan SOP keselamatan bengkel resmi'
        ];
      } else {
        tasksList = [
          'Pemeriksaan kepatuhan SOP teknik dan kelayakan operasional peralatan',
          'Pencatatan logbook pemeliharaan dan pelaporan berkala ke pembimbing industri',
          'Pengoperasian instrumen pengujian kejuruan terstandarisasi',
          'Penerapan keselamatan dan kesehatan kerja (K3) industri'
        ];
      }
    }

    const tasksListHtml = tasksList.map(t => `
      <li class="loker-tasks-item">
        <span class="loker-tasks-dot"></span>
        <span>${t}</span>
      </li>
    `).join('');

    let stepHtml = '';

    if (step === 1) {
      // STEP 1: Detail & Kualifikasi (Matching media_1789012197437.png)
      stepHtml = `
        <div class="modal-loker-container job-detail-container">
          <!-- 1. Stepper Header -->
          <div class="modal-loker-stepper">
            <div class="modal-loker-stepper-nav">
              <div class="loker-step-item active">
                <span class="loker-step-badge">1</span>
                <span class="loker-step-text">Detail &amp; Kualifikasi</span>
              </div>
              <span class="loker-step-sep"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
              <div class="loker-step-item">
                <span class="loker-step-badge">2</span>
                <span class="loker-step-text">Selesai</span>
              </div>
            </div>
            <button type="button" class="btn-modal-loker-close" onclick="Modal.close()" aria-label="Tutup modal">&times;</button>
          </div>

          <!-- 2. Scrollable Body -->
          <div class="modal-loker-body job-detail-left-col">
            ${isApplied ? `
              <!-- Status Lamaran Telah Diajukan Banner -->
              <div style="background: #ECFDF5; border: 1.5px solid #A7F3D0; border-radius: 12px; padding: 12px 16px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 20px;">✅</span>
                  <div>
                    <div style="font-size: 13px; font-weight: 700; color: #065F46;">Anda Sudah Mengajukan Lamaran ke Posisi Ini</div>
                    <div style="font-size: 12px; color: #047857;">Status: <strong>${userApp.status}</strong> &bull; Diajukan pada: ${userApp.tanggal_daftar || 'Hari ini'}</div>
                  </div>
                </div>
                <button type="button" class="btn btn-sm btn-primary" style="background: #059669; border: none; font-size: 12px;" onclick="Modal.close(); App.setRole('SISWA', 'lamaran');">
                  Lihat Status &rarr;
                </button>
              </div>
            ` : isCooldownActive ? `
              <!-- Cooldown / Placement Status Banner -->
              ${(cooldown.status_type === 'active_placement' || cooldown.status_type === 'accepted') ? `
                <div style="background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 12px; padding: 14px 16px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 22px;">🏢</span>
                    <div>
                      <div style="font-size: 13.5px; font-weight: 700; color: #166534; margin-bottom: 2px;">
                        ${cooldown.status_type === 'active_placement' ? 'Penempatan PKL Sedang Aktif' : 'Lamaran PKL Sudah Diterima'}
                      </div>
                      <div style="font-size: 12.5px; color: #15803D; line-height: 1.4;">
                        Anda telah diterima dan terdaftar di <strong>${cooldown.last_company_nama}</strong>. Sesuai aturan BKK/HUBIN, siswa yang sudah memiliki tempat PKL tidak diperkenankan melamar ke perusahaan lain.
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-sm btn-primary" style="background: #16A34A; border: none; font-size: 12px;" onclick="Modal.close(); App.setRole('SISWA', '${cooldown.status_type === 'active_placement' ? 'penempatan' : 'lamaran'}');">
                    Lihat ${cooldown.status_type === 'active_placement' ? 'Penempatan' : 'Lamaran'} &rarr;
                  </button>
                </div>
              ` : cooldown.status_type === 'pending_active' ? `
                <div style="background: #FFFBEB; border: 1.5px solid #FCD34D; border-radius: 12px; padding: 14px 16px; margin-bottom: 16px; display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
                  <div style="display: flex; align-items: flex-start; gap: 12px; flex: 1;">
                    <span style="font-size: 22px; line-height: 1;">⏳</span>
                    <div>
                      <div style="font-size: 13.5px; font-weight: 700; color: #92400E; margin-bottom: 4px;">
                        Batas Lamaran: 1 Siswa 1 Perusahaan / Minggu
                      </div>
                      <div style="font-size: 12.5px; color: #B45309; line-height: 1.5;">
                        Sesuai kebijakan BKK &amp; HUBIN, Anda hanya dapat melamar ke <strong>1 perusahaan dalam 1 minggu</strong>. Saat ini berkas lamaran Anda di <strong>${cooldown.last_company_nama}</strong> (${cooldown.last_job_judul || 'Mitra PKL'}) sedang dalam proses verifikasi &amp; seleksi.
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-sm btn-secondary" style="font-size: 12px; white-space: nowrap;" onclick="Modal.close(); App.setRole('SISWA', 'lamaran');">
                    Pantau Status &rarr;
                  </button>
                </div>
              ` : `
                <div style="background: #FFFBEB; border: 1.5px solid #FCD34D; border-radius: 12px; padding: 14px 16px; margin-bottom: 16px; display: flex; align-items: flex-start; gap: 12px;">
                  <span style="font-size: 22px; line-height: 1;">⏳</span>
                  <div style="flex: 1;">
                    <div style="font-size: 13.5px; font-weight: 700; color: #92400E; margin-bottom: 4px;">
                      Batas Lamaran Mingguan (1 Siswa 1 Perusahaan / Minggu)
                    </div>
                    <div style="font-size: 12.5px; color: #B45309; line-height: 1.5;">
                      Berdasarkan kebijakan BKK &amp; HUBIN, Anda hanya dapat melamar ke <strong>1 perusahaan dalam 1 minggu</strong>. Anda telah mengajukan lamaran ke <strong>${cooldown.last_company_nama}</strong> (${cooldown.last_job_judul || 'Mitra PKL'}) pada ${cooldown.last_applied_date_formatted || 'minggu ini'}.
                    </div>
                    <div style="margin-top: 8px; font-size: 12px; font-weight: 700; color: #78350F; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span>🗓 Anda dapat melamar lowongan baru dalam:</span>
                      <span class="badge badge-amber" style="font-weight: 800; font-size: 12px; padding: 3px 10px;">${cooldown.days_remaining} Hari Lagi (Mulai ${cooldown.next_eligible_date_formatted})</span>
                    </div>
                  </div>
                </div>
              `}
            ` : ''}

            <!-- Sub-tracker -->
            <div class="modal-loker-subtracker">
              <span class="subtracker-label" style="font-size: 13px; font-weight: 600; color: #64748B;">Informasi &amp; Syarat Penempatan</span>
            </div>

            <!-- Company Header -->
            <div class="modal-loker-company-card">
              <div class="loker-logo-badge" onclick="App.showCompanyDetailModalByName('${companyName.replace(/'/g, "\\'")}')" style="cursor: pointer;" title="Klik untuk lihat profil lengkap perusahaan">
                ${logoInitials}
              </div>
              <div class="loker-company-details">
                <div class="loker-company-title-row">
                  <span class="loker-company-name" onclick="App.showCompanyDetailModalByName('${companyName.replace(/'/g, "\\'")}')" style="cursor: pointer;" title="Klik untuk lihat profil lengkap perusahaan">${companyName}</span>
                  <span class="badge-kota-pill">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    ${cleanCity}
                  </span>
                  <button type="button" class="btn-loker-view-company" onclick="App.showCompanyDetailModalByName('${companyName.replace(/'/g, "\\'")}')" title="Lihat profil lengkap dan legalitas perusahaan mitra ini">
                    Profil Perusahaan ↗
                  </button>
                </div>
                <div class="loker-company-industry">
                  <span>Industri: ${industryBidang}</span> &bull; 
                  <a href="${rawWebsite}" target="_blank" rel="noreferrer">${displayWebsite}</a>
                </div>
                <div class="loker-company-address">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>${cleanAddress}</span>
                </div>
              </div>
            </div>

            <!-- Description Box -->
            <div class="modal-loker-desc-box">
              ${companyDescription}
            </div>

            <!-- 3 Info Cards Grid -->
            <div class="modal-loker-info-grid job-detail-grid">
              <!-- Card 1: Jurusan Diterima -->
              <div class="loker-info-box">
                <div class="loker-info-label">Jurusan Diterima</div>
                <div class="loker-major-chips">
                  ${majorBadgesHtml}
                </div>
              </div>

              <!-- Card 2: Jam Kerja -->
              <div class="loker-info-box">
                <div class="loker-info-label">JAM KERJA</div>
                <div class="loker-info-primary">${workDays}</div>
                <div class="loker-info-sub">${workHours}</div>
              </div>

              <!-- Card 3: Pakaian / Seragam -->
              <div class="loker-info-box">
                <div class="loker-info-label">PAKAIAN / SERAGAM</div>
                <div class="loker-info-primary">${uniformPrimary}</div>
                <div class="loker-info-sub">${uniformSecondary}</div>
              </div>
            </div>

            <!-- Detail Pekerjaan Tasks Card -->
            <div class="modal-loker-tasks-card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                <span style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">POSISI MAGANG / ROLE</span>
                <span style="font-size: 11.5px; font-weight: 600; color: #2563EB; background: #EFF6FF; border: 1px solid #BFDBFE; padding: 2px 10px; border-radius: 6px;">Departemen Engineering</span>
              </div>
              <h3 style="font-size: 17px; font-weight: 800; color: #0F172A; margin: 0 0 12px; display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                ${job.judul} <span style="font-size: 13.5px; font-weight: 500; color: #64748B;">(${job.tipe_kerja || 'Magang'})</span>
              </h3>
              <div style="height: 1px; background: #F1F5F9; margin-bottom: 12px;"></div>
              <div class="loker-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                </svg>
                <span>DETAIL PEKERJAAN</span>
              </div>
              <ul class="loker-tasks-list">
                ${tasksListHtml}
              </ul>
            </div>

            <!-- Review / Rating Card (Modern Mockup Design) -->
            ${renderModernReviewCard({
              student_nama: 'Arga Kurniawan',
              alumni_label: `Alumni ${(job.jurusan || 'RPL').match(/RPL|TAV|TITL|TKRO/i)?.[0] || 'RPL'} 2025`,
              company_nama: job.company_nama || 'Mitra Industri DUDI',
              posisi: job.judul || 'Frontend Web Developer',
              completion_period: 'Selesai Nov 2025',
              rating: 4.5,
              review_text: 'Supervisor sangat membimbing dan aktif memberi arahan harian. Suasana kantor kondusif untuk siswa PKL, serta tugas yang diberikan terstruktur.',
              avatar_url: '/images/avatars/arga-kurniawan.png'
            }, { showUpvote: false, showProsCons: false })}
          </div>

          <!-- 3. Footer Bar -->
          <div class="modal-loker-footer">
            <button type="button" class="btn-loker-ghost" onclick="Modal.close()">
              ${isApplied ? 'Tutup' : 'Batal'}
            </button>
            ${isApplied ? `
              <button type="button" class="btn-loker-primary" style="background: #059669;" onclick="Modal.close(); App.setRole('SISWA', 'lamaran');">
                Lihat Status Lamaran Saya &rarr;
              </button>
            ` : isCooldownActive ? `
              <button type="button" class="btn-loker-primary" style="background: #94A3B8; cursor: not-allowed; opacity: 0.85;" disabled title="${(cooldown && cooldown.message) || '1 siswa hanya boleh melamar 1 perusahaan dalam 1 minggu'}">
                ${(cooldown.status_type === 'active_placement' || cooldown.status_type === 'accepted') ? '✓ Sudah Diterima PKL' : cooldown.status_type === 'pending_active' ? '⏳ Lamaran Sedang Diproses' : `⏳ Batas Mingguan (${cooldown.days_remaining} Hari Lagi)`}
              </button>
            ` : isPublic ? `
              <button type="button" class="btn-loker-primary" onclick="App.handleDaftarPklClick(${job.id})">
                Masuk untuk Melamar &rarr;
              </button>
            ` : !isVerified ? `
              <button type="button" class="btn-loker-primary" onclick="App.handleDaftarPklClick(${job.id})">
                Kirim Pengajuan Lamaran &rarr;
              </button>
            ` : `
              <button type="button" class="btn-loker-primary" onclick="App.executeApplyLoker(${job.id})">
                Kirim Pengajuan Lamaran &rarr;
              </button>
            `}
          </div>
        </div>
      `;
    } else {
      // STEP 2 / Selesai: Bukti Pengajuan Berhasil Terkirim
      stepHtml = `
        <div class="modal-loker-container job-detail-container">
          <!-- Stepper Header -->
          <div class="modal-loker-stepper">
            <div class="modal-loker-stepper-nav">
              <div class="loker-step-item completed" onclick="App.renderLokerModalStep(${job.id}, 1)">
                <span class="loker-step-badge">✓</span>
                <span class="loker-step-text">Detail &amp; Kualifikasi</span>
              </div>
              <span class="loker-step-sep"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
              <div class="loker-step-item active">
                <span class="loker-step-badge">✓</span>
                <span class="loker-step-text">Selesai</span>
              </div>
            </div>
            <button type="button" class="btn-modal-loker-close" onclick="Modal.close()" aria-label="Tutup modal">&times;</button>
          </div>

          <!-- Body -->
          <div class="modal-loker-body">
            <div class="modal-loker-success-card">
              <div class="loker-success-icon-circle">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 style="font-size: 19px; font-weight: 800; color: #0F172A; margin-bottom: 8px;">Pengajuan Lamaran Berhasil Terkirim!</h3>
              <p style="font-size: 13.5px; color: #64748B; max-width: 480px; margin: 0 auto 20px; line-height: 1.6;">
                Berkas pengajuan PKL Anda untuk lowongan <strong>${job.judul}</strong> di <strong>${job.company_nama}</strong> telah berhasil disimpan ke database HUBIN SMK Taruna Bangsa.
              </p>

              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 16px; max-width: 460px; margin: 0 auto 10px; text-align: left;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 12.5px;">
                  <span style="color: #64748B;">Status Pengajuan:</span>
                  <span class="badge badge-amber" style="font-weight: 700;">Menunggu Verifikasi HUBIN</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12.5px;">
                  <span style="color: #64748B;">Tanggal Diajukan:</span>
                  <span style="color: #0F172A; font-weight: 600;">Hari ini, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-loker-footer">
            <button type="button" class="btn-loker-ghost" onclick="Modal.close()">
              Tutup
            </button>
            <button type="button" class="btn-loker-primary" style="background: #059669;" onclick="Modal.close(); App.setRole('SISWA', 'lamaran');">
              Lihat Status Lamaran Saya &rarr;
            </button>
          </div>
        </div>
      `;
    }

    Modal.open(stepHtml, null, 'loker', { hideHeader: true });
    if (typeof window !== 'undefined' && window.lenis) {
      try { window.lenis.resize(); } catch (e) {}
    }
  },

  async executeApplyLoker(jobId) {
    if (this.isSubmittingApply) return;

    if (!this.currentStudent || this.currentRole !== 'SISWA') {
      Modal.close();
      this.setRole('LOGIN');
      return;
    }

    const student = this.currentStudent;
    if (student.status_verifikasi !== 'Terverifikasi') {
      Modal.close();
      await this.handleDaftarPklClick(jobId);
      return;
    }

    // Aturan 1 siswa hanya boleh melamar 1 perusahaan dalam 1 minggu
    if (this.activeLokerCooldown && !this.activeLokerCooldown.can_apply) {
      const cd = this.activeLokerCooldown;
      Toast.show(
        'Batas Lamaran',
        cd.message || `1 siswa hanya diperbolehkan melamar 1 perusahaan dalam 1 minggu. Anda telah melamar ke ${cd.last_company_nama}. Silakan tunggu ${cd.days_remaining} hari lagi.`,
        'warning'
      );
      return;
    }

    let portofolio_url = (document.getElementById('apply-portofolio-input')?.value || student.cv_url || '').trim();
    if (portofolio_url && !/^https?:\/\//i.test(portofolio_url)) {
      portofolio_url = 'https://' + portofolio_url;
    }
    const domAlasan = (document.getElementById('apply-alasan-input')?.value || '').trim();
    const alasan_melamar = domAlasan || 'Pengajuan langsung melalui katalog lowongan terverifikasi FindMyPKL.';

    // Double submit prevention & loading state
    this.isSubmittingApply = true;
    const submitBtn = document.querySelector('.modal-loker-footer .btn-loker-primary');
    const origBtnHtml = submitBtn ? submitBtn.innerHTML : 'Kirim Pengajuan Lamaran &rarr;';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.75';
      submitBtn.style.cursor = 'not-allowed';
      submitBtn.innerHTML = `
        <span style="display: inline-flex; align-items: center; gap: 8px;">
          <svg style="animation: spin 1s linear infinite;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          Mengirim Pengajuan...
        </span>
      `;
    }

    try {
      const newApp = await API.submitApplication({
        student_id: student.id,
        job_id: jobId,
        portofolio_url,
        alasan_melamar
      });

      this.activeLokerUserApplication = newApp || {
        job_id: Number(jobId),
        status: 'Menunggu Verifikasi HUBIN',
        tanggal_daftar: new Date().toISOString().split('T')[0]
      };

      // Set cooldown 7 hari
      const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
      const nextDate = new Date(Date.now() + ONE_WEEK_MS);
      this.activeLokerCooldown = {
        can_apply: false,
        days_remaining: 7,
        hours_remaining: 168,
        last_company_nama: (this.activeLokerModalJob && this.activeLokerModalJob.company_nama) || 'Mitra Industri',
        last_job_judul: (this.activeLokerModalJob && this.activeLokerModalJob.judul) || 'Lowongan PKL',
        last_applied_date_formatted: 'Hari ini',
        next_eligible_date_formatted: nextDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      };

      Toast.show('Lamaran Berhasil Diajukan', 'Berkas telah masuk ke antrean persetujuan HUBIN.', 'success');
      this.renderLokerModalStep(jobId, 2);
    } catch (err) {
      Toast.show('Gagal Mengajukan Lamaran', err.message, 'error');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
        submitBtn.innerHTML = origBtnHtml;
      }
    } finally {
      this.isSubmittingApply = false;
    }
  },

  async handleApplyJob(jobId) {
    await this.executeApplyLoker(jobId);
  }
});
