// ==========================================================================
// FIND MY PKL - MITRA INDUSTRI (DUDI) MODULE
// Company Directory, Industry Sectors, Partner Profile Modal
// ==========================================================================

Object.assign(window.App, {
  async renderMitraIndustriPage(container) {
    const companies = await API.getCompanies();
    const jobs = await API.getJobs();

    let selectedSector = 'Semua';
    let selectedCity = 'Semua';
    let searchQuery = '';

    const sectors = [
      'Semua',
      'Teknologi & IT',
      'Otomotif & Manufaktur',
      'Perbankan & Keuangan',
      'Media Kreatif & Animasi',
      'Dirgantara & Elektronika',
      'FMCG & Farmasi'
    ];

    const cities = ['Semua', 'Bekasi', 'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Tangerang', 'Malang'];

    const getSectorMatch = (comp, sector) => {
      if (sector === 'Semua') return true;
      const b = (comp.bidang || '').toLowerCase();
      if (sector === 'Teknologi & IT') return /telekomunikasi|teknologi|software|cloud|data|it/i.test(b);
      if (sector === 'Otomotif & Manufaktur') return /otomotif|manufaktur|mesin|honda/i.test(b);
      if (sector === 'Perbankan & Keuangan') return /perbankan|keuangan|bank/i.test(b);
      if (sector === 'Media Kreatif & Animasi') return /kreatif|animasi|desain|media|visual/i.test(b);
      if (sector === 'Dirgantara & Elektronika') return /dirgantara|elektronika|pesawat|pertahanan/i.test(b);
      if (sector === 'FMCG & Farmasi') return /kosmetik|fmcg|farmasi|wardah/i.test(b);
      return true;
    };

    container.innerHTML = `
      <div class="mitra-page-wrapper">
        ${this.getTopNavHtml('mitra')}

        <!-- 1. HERO SECTION -->
        <section class="page-hero-section">
          <div class="page-hero-inner">
            <div class="page-hero-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>Kemitraan Resmi DUDI & Link-and-Match</span>
            </div>
            <h1 class="page-hero-title">
              Mitra Industri Resmi & <span>Jaringan Dunia Kerja</span>
            </h1>
            <p class="page-hero-desc">
              Daftar perusahaan BUMN, korporasi multinasional, dan studio kreatif bereputasi yang telah menandatangani Nota Kesepahaman (MoU) resmi dengan SMK Taruna Bangsa Kota Bekasi untuk penjaminan mutu PKL serta prioritas rekrutmen kerja.
            </p>

            <div class="page-stats-row">
              <div class="page-stat-chip">
                <span>🏢</span> <strong>500+</strong> Mitra Industri
              </div>
              <div class="page-stat-chip">
                <span>📜</span> <strong>100%</strong> MoU Resmi Terdaftar
              </div>
              <div class="page-stat-chip">
                <span>💼</span> <strong>95%</strong> Penyerapan Lulusan
              </div>
              <div class="page-stat-chip">
                <span>⭐</span> Terakreditasi BKK Kemendikbud
              </div>
            </div>
          </div>
        </section>

        <!-- 2. MAIN CONTENT -->
        <div class="page-body-container">
          <!-- Filter Toolbar -->
          <div class="mitra-filter-bar">
            <div class="mitra-filter-top-row">
              <div class="mitra-search-input-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" id="mitra-input-search" placeholder="Cari nama perusahaan, bidang industri, atau kontak..." />
              </div>
              <select id="mitra-select-city" class="mitra-city-select">
                <option value="Semua">📍 Semua Kota</option>
                ${cities.filter(c => c !== 'Semua').map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>

            <!-- Sector Pills -->
            <div class="mitra-sector-pills" id="mitra-sector-pills-row">
              ${sectors.map((s, idx) => `
                <button type="button" class="mitra-sector-btn ${idx === 0 ? 'active' : ''}" data-sector="${s}">
                  ${s}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Cards Grid -->
          <div class="mitra-cards-grid" id="mitra-cards-grid-body">
            <!-- Rendered dynamically -->
          </div>

          <!-- 3. PARTNER INVITATION BANNER -->
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; border-radius: 20px; padding: 36px 32px; margin-top: 50px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div style="max-width: 650px;">
              <span class="page-hero-badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; margin-bottom: 8px;">
                UNTUK PERUSAHAAN & MITRA DUDI
              </span>
              <h3 style="font-size: 22px; font-weight: 800; margin-bottom: 8px; color: #ffffff;">
                Perusahaan Anda Ingin Menjadi Mitra Industri SMK Kami?
              </h3>
              <p style="font-size: 13.5px; color: #94a3b8; line-height: 1.6; margin: 0;">
                Buka penempatan magang bagi talenta muda bersertifikat kejuruan SMK Taruna Bangsa Kota Bekasi. Bebas biaya administrasi, penandatanganan MoU resmi cepat, dan dibimbing oleh koordinator HUBIN.
              </p>
            </div>
            <button type="button" class="btn btn-primary" onclick="App.showPartnerInfoModal()" style="padding: 12px 24px; font-weight: 700; border-radius: 12px;">
              Ajukan Kerja Sama MoU &rarr;
            </button>
          </div>
        </div>

        <!-- 4. FOOTER -->
        ${this.getPortalFooterHtml()}
      </div>
    `;

    const renderFilteredCompanies = () => {
      const grid = document.getElementById('mitra-cards-grid-body');
      if (!grid) return;

      const q = searchQuery.toLowerCase().trim();
      const filtered = companies.filter(c => {
        // Sector filter
        if (!getSectorMatch(c, selectedSector)) return false;

        // City filter
        if (selectedCity !== 'Semua' && !((c.kota || '').toLowerCase().includes(selectedCity.toLowerCase()))) {
          return false;
        }

        // Search query
        if (q) {
          const haystack = `${c.nama} ${c.bidang} ${c.kota} ${c.alamat} ${c.no_mou} ${c.deskripsi}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }

        return true;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1;">
            <div style="font-size: 32px; margin-bottom: 12px;">🔍</div>
            <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">Tidak Ada Mitra Industri yang Sesuai</h4>
            <p style="font-size: 13px; color: #64748b;">Cobalah kata kunci lain atau reset filter sektor dan kota.</p>
            <button class="btn btn-secondary btn-sm" style="margin-top: 12px;" onclick="App.resetMitraFilter()">Reset Filter</button>
          </div>
        `;
        return;
      }

      grid.innerHTML = filtered.map(c => {
        const compJobs = jobs.filter(j => j.company_id === c.id);
        const openJobsCount = compJobs.length;
        const logoColor = c.logo_color || '#1e40af';
        const initials = c.logo_initials || c.nama.split(' ').map(w => w[0]).slice(0, 3).join('').toUpperCase();

        return `
          <div class="mitra-card-item">
            <div>
              <div class="mitra-card-top">
                <div class="mitra-avatar-box" style="background: transparent; border: none; padding: 0; display: flex; align-items: center; justify-content: center;">
                  ${renderCompanyLogo(c, { size: 50 })}
                </div>
                <div class="mitra-title-meta">
                  <h3 class="mitra-card-name">${c.nama}</h3>
                  <div class="mitra-card-sector">
                    🏢 ${c.bidang} &bull; 📍 ${c.kota}
                  </div>
                </div>
              </div>

              <div class="mitra-card-mou-row">
                <span>No. MoU: <code>${c.no_mou || 'MOU/SMK-TB/RESMI'}</code></span>
                <span class="badge badge-emerald">✓ ${c.status_mou || 'Aktif'}</span>
              </div>

              <!-- Priority Majors & Star Rating Row -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin: 8px 0; gap: 8px; flex-wrap: wrap;">
                <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                  ${(c.jurusan_prioritas || ['RPL']).map(m => `<span class="mkt-major-chip ${m.toLowerCase()}" style="font-size: 10.5px; padding: 1px 7px;">${m}</span>`).join('')}
                </div>
                <div style="display: inline-flex; align-items: center; gap: 4px; font-size: 11.5px; font-weight: 700; color: #D97706; background: #FEF3C7; padding: 2px 8px; border-radius: 6px;">
                  ⭐ ${c.rating_dudi || 4.9} <span style="font-size: 10px; font-weight: 500; color: #92400E;">(${c.total_alumni_smk || 30}+ Alumni)</span>
                </div>
              </div>

              <p class="mitra-card-desc">
                ${c.deskripsi || 'Mitra industri terdaftar untuk penempatan magang siswa SMK dengan pembimbing lapangan bersertifikat.'}
              </p>

              <div style="margin-bottom: 14px;">
                <span class="badge ${openJobsCount > 0 ? 'badge-blue' : 'badge-slate'}" style="font-size: 11px; padding: 4px 10px;">
                  💼 ${openJobsCount > 0 ? `${openJobsCount} Lowongan PKL Dibuka` : 'Kemitraan Aktif'}
                </span>
              </div>
            </div>

            <div class="mitra-card-footer-actions">
              <button type="button" class="btn-mitra-view-jobs" onclick="App.viewCompanyJobs(${c.id}, '${c.nama.replace(/'/g, "\\'")}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Lihat Lowongan (${openJobsCount})
              </button>
              <button type="button" class="btn-mitra-profile" onclick="App.showCompanyDetailModal(${c.id})">
                Detail Profil &rarr;
              </button>
            </div>
          </div>
        `;
      }).join('');
    };

    // Event listeners
    const searchInput = document.getElementById('mitra-input-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderFilteredCompanies();
      });
    }

    const citySelect = document.getElementById('mitra-select-city');
    if (citySelect) {
      citySelect.addEventListener('change', (e) => {
        selectedCity = e.target.value;
        renderFilteredCompanies();
      });
    }

    const sectorBtns = document.querySelectorAll('.mitra-sector-btn');
    sectorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sectorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSector = btn.getAttribute('data-sector');
        renderFilteredCompanies();
      });
    });

    App.resetMitraFilter = () => {
      selectedSector = 'Semua';
      selectedCity = 'Semua';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (citySelect) citySelect.value = 'Semua';
      sectorBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-sector') === 'Semua'));
      renderFilteredCompanies();
    };

    renderFilteredCompanies();
  },

  switchCompTab(tabId, btnEl) {
    document.querySelectorAll('.comp-tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.comp-tab-content').forEach(c => c.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    const target = document.getElementById(`comp-tab-${tabId}`);
    if (target) target.classList.add('active');
    if (typeof window !== 'undefined' && window.lenis) {
      try { window.lenis.resize(); } catch (e) {}
    }
  },

  async showCompanyDetailModalByName(companyName) {
    if (!companyName) return;
    const cleanName = String(companyName).replace(/PT|CV|Persero|Tbk/gi, '').trim().toLowerCase();
    const companies = await API.getCompanies();
    const found = companies.find(c => {
      const cn = c.nama.toLowerCase();
      return cn.includes(cleanName) || cleanName.includes(c.nama.replace(/PT|CV|Persero|Tbk/gi, '').trim().toLowerCase());
    }) || companies[0];

    if (found) {
      await this.showCompanyDetailModal(found.id);
    } else {
      App.showToast(`Profil ${companyName} sedang disiapkan.`, 'info');
    }
  },

  async showCompanyDetailModal(companyId) {
    let comp = null;
    if (typeof companyId === 'number' || !isNaN(Number(companyId))) {
      comp = await API.getCompanyById(Number(companyId));
    }
    if (!comp) {
      const allComps = await API.getCompanies();
      comp = allComps.find(c => c.id == companyId || c.nama.toLowerCase() === String(companyId).toLowerCase());
    }
    if (!comp) {
      App.showToast('Data profil perusahaan tidak ditemukan.', 'warning');
      return;
    }

    const [allJobs, allReviews] = await Promise.all([
      API.getJobs(),
      API.getReviews()
    ]);
    const compJobs = allJobs.filter(j => j.company_id === comp.id || (j.company_nama && j.company_nama.toLowerCase() === comp.nama.toLowerCase()));
    const compReviews = allReviews.filter(r => r.company_id === comp.id || (r.company_nama && r.company_nama.toLowerCase() === comp.nama.toLowerCase()));

    // Safe fallbacks for enriched data
    const tahunBerdiri = comp.tahun_berdiri || 2015;
    const kategoriEntitas = comp.kategori_entitas || comp.bidang || 'Mitra Industri Resmi DUDI';
    const ukuranKaryawan = comp.ukuran_karyawan || '500+ Karyawan';
    const emailResmi = comp.email_resmi || `kontak@${comp.website ? comp.website.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : 'smktarunabangsa.sch.id'}`;
    const ratingDudi = comp.rating_dudi || (compReviews.length > 0 ? (compReviews.reduce((a, b) => a + (b.rating || 5), 0) / compReviews.length).toFixed(1) : 4.9);
    const totalAlumni = comp.total_alumni_smk || (20 + (comp.id * 3));
    const periodeMou = comp.periode_mou || '2023 – 2026 (Aktif & Berkelanjutan)';
    const jamKerja = comp.jam_kerja || 'Senin – Jumat (08.00 – 17.00 WIB)';
    const aturanPakaian = comp.aturan_pakaian || 'Senin-Rabu: Seragam Praktik SMK / Kamis-Jumat: Kemeja Bebas Rapi';

    const visiText = comp.visi || `Menjadi mitra industri DUDI unggulan dalam memajukan kompetensi dan keahlian vokasi siswa SMK di bidang ${comp.bidang}.`;
    const misiList = comp.misi && comp.misi.length > 0 ? comp.misi : [
      `Membuka kesempatan praktik kerja lapangan nyata berstandar industri modern di ${comp.nama}.`,
      `Membimbing siswa vokasi menjadi talenta siap kerja dengan keahlian teknis dan karakter profesional.`,
      `Menjalin kemitraan link and match berkelanjutan bersama SMK Taruna Bangsa Kota Bekasi.`
    ];

    const budayaKerja = comp.budaya_kerja && comp.budaya_kerja.length > 0 ? comp.budaya_kerja : [
      'Disiplin Waktu Presisi & Tanggung Jawab Profesi',
      'Penerapan Keselamatan dan Kesehatan Kerja (K3) Industri',
      'Kerjasama Tim Terbuka & Komunikasi Efektif',
      'Mentorship Terstruktur 1-on-1 bersama Pembimbing Lapangan'
    ];

    const fasilitasMagang = comp.fasilitas_magang && comp.fasilitas_magang.length > 0 ? comp.fasilitas_magang : [
      'Uang Saku Bulanan Kompetitif (Paid Internship)',
      'Workstation / Lab Praktik Dedicated',
      'Makan Siang & Akses Kafetaria Karyawan',
      'Sertifikat Kompetensi Industri Resmi (Standar DUDI)',
      'Akses Wi-Fi High-Speed & Modul Pembelajaran Khusus'
    ];

    const tahapanSeleksi = comp.tahapan_seleksi && comp.tahapan_seleksi.length > 0 ? comp.tahapan_seleksi : [
      '1. Pengajuan Berkas NISN & Surat Pengantar Resmi BKK Taruna Bangsa',
      '2. Review Portofolio & Uji Keterampilan Teknis Dasar',
      '3. Wawancara Sikap Kerja & Penempatan Divisi Magang',
      '4. Onboarding, Pengenalan Budaya Kerja & Pembagian Mentor'
    ];

    const jurusanPrioritas = comp.jurusan_prioritas && comp.jurusan_prioritas.length > 0 
      ? comp.jurusan_prioritas 
      : ['RPL', 'TAV', 'TITL', 'TKRO'];

    const cleanWebsite = comp.website ? comp.website.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'portal.id';
    const mapsQueryUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(comp.nama + ' ' + (comp.alamat || comp.kota))}`;

    const html = `
      <div class="comp-modal-container">
        <!-- 1. Header Profile Banner -->
        <div class="comp-modal-header">
          <div class="comp-modal-logo-box">
            ${renderCompanyLogo(comp, { size: 56 })}
          </div>
          <div class="comp-modal-title-area">
            <div class="comp-modal-title">
              <span>${comp.nama}</span>
              <span class="comp-modal-entity-badge">${kategoriEntitas}</span>
            </div>
            <div class="comp-modal-subtitle">
              🏢 ${comp.bidang} &bull; 📍 ${comp.kota} &bull; 📅 Berdiri Tahun ${tahunBerdiri}
            </div>
            <div class="comp-modal-pills-row">
              <span class="comp-pill comp-pill-emerald">✓ Status MoU: ${comp.status_mou || 'Aktif'}</span>
              <span class="comp-pill comp-pill-slate"><code>${comp.no_mou || 'MOU/SMK-TB/RESMI'}</code></span>
              <span class="comp-pill comp-pill-amber">👥 ${ukuranKaryawan}</span>
            </div>
          </div>
        </div>

        <!-- 2. Quick Key Stats Strip -->
        <div class="comp-stats-grid">
          <div class="comp-stat-box">
            <div class="comp-stat-value" style="color: #D97706;">⭐ ${ratingDudi}</div>
            <div class="comp-stat-label">Rating Siswa/Alumni</div>
          </div>
          <div class="comp-stat-box">
            <div class="comp-stat-value" style="color: #059669;">${totalAlumni}+</div>
            <div class="comp-stat-label">Alumni PKL Taruna Bangsa</div>
          </div>
          <div class="comp-stat-box">
            <div class="comp-stat-value" style="color: #2563EB;">${compJobs.length} Posisi</div>
            <div class="comp-stat-label">Lowongan Magang Dibuka</div>
          </div>
          <div class="comp-stat-box">
            <div class="comp-stat-value" style="color: #7C3AED; font-size: 14px;">
              ${jurusanPrioritas.join(', ')}
            </div>
            <div class="comp-stat-label">Jurusan Prioritas</div>
          </div>
        </div>

        <!-- 3. Navigation Tabs -->
        <div class="comp-tabs-bar" role="tablist">
          <button type="button" class="comp-tab-button active" onclick="App.switchCompTab('tentang', this)">
            📋 Tentang &amp; Legalitas
          </button>
          <button type="button" class="comp-tab-button" onclick="App.switchCompTab('budaya', this)">
            🏢 Budaya &amp; Fasilitas
          </button>
          <button type="button" class="comp-tab-button" onclick="App.switchCompTab('lowongan', this)">
            💼 Lowongan Aktif (${compJobs.length})
          </button>
          <button type="button" class="comp-tab-button" onclick="App.switchCompTab('ulasan', this)">
            ⭐ Ulasan Alumni (${compReviews.length})
          </button>
        </div>

        <!-- TAB 1: Tentang & Legalitas -->
        <div id="comp-tab-tentang" class="comp-tab-content active">
          <div class="comp-section-block">
            <div class="comp-section-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Profil Perusahaan
            </div>
            <p style="font-size: 13.5px; color: #475569; line-height: 1.65; margin-bottom: 12px;">
              ${comp.deskripsi || 'Perusahaan mitra DUDI resmi SMK Taruna Bangsa Kota Bekasi untuk pengembangan talenta muda vokasi.'}
            </p>
          </div>

          <div class="comp-section-block">
            <div class="comp-section-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Visi &amp; Misi Perusahaan
            </div>
            <div class="comp-visi-quote-box">
              <span style="font-weight: 700; color: #047857;">Visi Perusahaan:</span> &ldquo;${visiText}&rdquo;
            </div>
            <div style="font-size: 12px; font-weight: 700; color: #64748B; margin: 8px 0 4px; text-transform: uppercase;">Misi Utama:</div>
            <ul class="comp-misi-list">
              ${misiList.map(m => `
                <li class="comp-misi-item">
                  <span class="comp-misi-dot"></span>
                  <span>${m}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="comp-section-block">
            <div class="comp-section-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Legalitas Kerjasama &amp; Kontak BKK
            </div>
            <div class="comp-legal-grid">
              <div>
                <div class="comp-legal-item-label">Nomor Registrasi MoU</div>
                <div class="comp-legal-item-val"><code>${comp.no_mou || 'MOU/SMK-TB/RESMI'}</code></div>
              </div>
              <div>
                <div class="comp-legal-item-label">Masa Berlaku Kerjasama</div>
                <div class="comp-legal-item-val" style="color: #059669;">${periodeMou}</div>
              </div>
              <div>
                <div class="comp-legal-item-label">PIC Hubungan Industri (HRD)</div>
                <div class="comp-legal-item-val">${comp.pic_nama || 'Koordinator HRD'}</div>
              </div>
              <div>
                <div class="comp-legal-item-label">Kontak Resmi PIC</div>
                <div class="comp-legal-item-val"><a href="https://wa.me/${(comp.pic_kontak || '').replace(/[^0-9]/g, '')}" target="_blank" style="color: #059669; text-decoration: underline;">📞 ${comp.pic_kontak || '0812-xxxx-xxxx'}</a></div>
              </div>
              <div>
                <div class="comp-legal-item-label">Email Resmi Rekrutmen</div>
                <div class="comp-legal-item-val"><a href="mailto:${emailResmi}" style="color: #2563EB; text-decoration: underline;">✉️ ${emailResmi}</a></div>
              </div>
              <div>
                <div class="comp-legal-item-label">Website Perusahaan</div>
                <div class="comp-legal-item-val"><a href="${comp.website || '#'}" target="_blank" style="color: #2563EB; text-decoration: underline;">🌐 ${cleanWebsite} ↗</a></div>
              </div>
              <div style="grid-column: 1 / -1;">
                <div class="comp-legal-item-label">Alamat Kantor / Pabrik</div>
                <div class="comp-legal-item-val" style="font-weight: 500; line-height: 1.45; margin-top: 4px;">
                  📍 ${comp.alamat || '-'}
                  <div style="margin-top: 4px;">
                    <a href="${mapsQueryUrl}" target="_blank" style="font-size: 11.5px; color: #2563EB; font-weight: 600; text-decoration: underline;">Buka Rute di Google Maps ↗</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2: Budaya & Fasilitas -->
        <div id="comp-tab-budaya" class="comp-tab-content">
          <div class="comp-section-block">
            <div class="comp-section-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Budaya &amp; Etos Kerja Perusahaan
            </div>
            <div class="comp-culture-grid">
              ${budayaKerja.map(b => `
                <div class="comp-culture-card">
                  <span style="color: #059669; font-size: 15px;">✓</span>
                  <span>${b}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="comp-section-block">
            <div class="comp-section-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              Fasilitas &amp; Benefit Siswa Magang
            </div>
            <div class="comp-facilities-list">
              ${fasilitasMagang.map(f => `
                <span class="comp-facility-badge">
                  <span>🎁</span>
                  <span>${f}</span>
                </span>
              `).join('')}
            </div>
          </div>

          <div class="comp-section-block" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px 16px;">
            <div class="comp-section-title" style="margin-bottom: 10px;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Ketentuan Operasional &amp; Seragam
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 12.5px;">
              <div>
                <div class="comp-legal-item-label">Jadwal &amp; Jam Kerja</div>
                <div style="font-weight: 700; color: #0F172A; margin-top: 2px;">${jamKerja}</div>
              </div>
              <div>
                <div class="comp-legal-item-label">Aturan Pakaian / Seragam</div>
                <div style="font-weight: 700; color: #0F172A; margin-top: 2px;">${aturanPakaian}</div>
              </div>
            </div>
          </div>

          <div class="comp-section-block">
            <div class="comp-section-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              Alur &amp; Tahapan Seleksi PKL
            </div>
            <div class="comp-timeline-list">
              ${tahapanSeleksi.map(s => `
                <div class="comp-timeline-step">
                  <span class="comp-step-num">&bull;</span>
                  <span>${s}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- TAB 3: Lowongan Aktif -->
        <div id="comp-tab-lowongan" class="comp-tab-content">
          <div class="comp-section-block">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <span class="comp-section-title" style="margin-bottom: 0;">Lowongan PKL Sedang Dibuka (${compJobs.length})</span>
              <span style="font-size: 12px; color: #64748B;">Khusus Siswa SMK Taruna Bangsa</span>
            </div>

            ${compJobs.length > 0 ? `
              <div style="display: flex; flex-direction: column; gap: 10px; max-height: 320px; overflow-y: auto; padding-right: 4px;">
                ${compJobs.map(j => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #ffffff; border: 1.5px solid #E2E8F0; border-radius: 12px; gap: 12px; transition: border-color 0.15s ease;">
                    <div style="flex: 1; min-width: 0;">
                      <div style="font-size: 14.5px; font-weight: 700; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${j.judul}
                      </div>
                      <div style="font-size: 12px; color: #64748B; display: flex; align-items: center; gap: 8px; margin-top: 4px; flex-wrap: wrap;">
                        <span class="mkt-major-chip ${App.getJobMajorCode(j).toLowerCase()}" style="font-size: 10.5px; padding: 1px 7px;">
                          ${App.getJobMajorCode(j)}
                        </span>
                        <span>&bull;</span>
                        <span style="font-weight: 600; color: #334155;">⏱️ ${j.durasi_bulan || 6} Bulan</span>
                        <span>&bull;</span>
                        <span class="job-card-salary-text ${App.isJobPaid(j) ? 'paid' : 'unpaid'}" style="font-size: 11.5px;">
                          ${App.isJobPaid(j) ? 'Paid Internship' : 'Unpaid'}
                        </span>
                      </div>
                    </div>
                    <div style="flex-shrink: 0;">
                      <button type="button" class="btn btn-primary btn-sm" onclick="Modal.close(); App.handleDaftarPklClick(${j.id});" style="font-size: 12px; padding: 7px 14px; border-radius: 8px; font-weight: 700;">
                        Daftar PKL &rarr;
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div style="text-align: center; padding: 32px 16px; background: #F8FAFC; border-radius: 12px; border: 1px dashed #CBD5E1;">
                <div style="font-size: 28px; margin-bottom: 6px;">💼</div>
                <div style="font-weight: 700; color: #334155; font-size: 14px;">Saat Ini Belum Ada Posisi Baru</div>
                <p style="font-size: 12.5px; color: #64748B; margin-top: 4px;">Kuota penempatan untuk semester berikutnya sedang dalam proses verifikasi tim BKK &amp; HUBIN.</p>
              </div>
            `}
          </div>
        </div>

        <!-- TAB 4: Ulasan Alumni -->
        <div id="comp-tab-ulasan" class="comp-tab-content">
          <div class="comp-section-block">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <span class="comp-section-title" style="margin-bottom: 0;">Ulasan Riil Alumni Siswa (${compReviews.length})</span>
              <span style="font-size: 11.5px; color: #059669; font-weight: 700; background: #ECFDF5; padding: 3px 8px; border-radius: 6px;">✓ Terverifikasi Jurnal PKL</span>
            </div>

            ${compReviews.length > 0 ? `
              <div style="display: flex; flex-direction: column; gap: 12px; max-height: 320px; overflow-y: auto; padding-right: 4px;">
                ${compReviews.map(r => `
                  <div style="background: #ffffff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                      <div>
                        <div style="font-size: 13.5px; font-weight: 700; color: #0F172A;">${r.student_nama}</div>
                        <div style="font-size: 11.5px; color: #64748B;">${r.student_kelas || 'Alumni SMK'} &bull; Posisi: <strong style="color: #334155;">${r.posisi || 'Siswa Magang'}</strong></div>
                      </div>
                      <div style="background: #FEF3C7; color: #D97706; font-size: 12px; font-weight: 800; padding: 2px 8px; border-radius: 6px;">
                        ⭐ ${r.rating ? r.rating.toFixed(1) : '5.0'}
                      </div>
                    </div>
                    <p style="font-size: 13px; color: #334155; line-height: 1.6; margin-bottom: 8px; font-style: italic;">
                      &ldquo;${r.review_text}&rdquo;
                    </p>
                    ${r.pros ? `
                      <div style="font-size: 11.5px; color: #047857; margin-bottom: 4px;">
                        <strong>Kelebihan:</strong> ${r.pros}
                      </div>
                    ` : ''}
                    ${r.cons ? `
                      <div style="font-size: 11.5px; color: #64748B;">
                        <strong>Saran/Tantangan:</strong> ${r.cons}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            ` : `
              <div style="text-align: center; padding: 32px 16px; background: #F8FAFC; border-radius: 12px; border: 1px dashed #CBD5E1;">
                <div style="font-size: 28px; margin-bottom: 6px;">✍️</div>
                <div style="font-weight: 700; color: #334155; font-size: 14px;">Belum Ada Ulasan untuk Perusahaan Ini</div>
                <p style="font-size: 12.5px; color: #64748B; margin-top: 4px;">Jadilah siswa pertama yang menyelesaikan magang dan memberikan ulasan pengalaman berharga di sini!</p>
              </div>
            `}
          </div>
        </div>

        <!-- 4. Footer Actions -->
        <div style="display: flex; gap: 10px; margin-top: 20px; padding-top: 16px; border-top: 1px solid #E2E8F0; justify-content: flex-end; align-items: center; flex-wrap: wrap;">
          <button class="btn btn-secondary" onclick="Modal.close()">Tutup</button>
          <button class="btn btn-primary" onclick="Modal.close(); App.viewCompanyJobs(${comp.id}, '${comp.nama.replace(/'/g, "\\'")}')">
            Buka Lowongan di Katalog (${compJobs.length}) &rarr;
          </button>
        </div>
      </div>
    `;

    Modal.open(html, `Profil Lengkap Mitra: ${comp.nama}`, 'lg');
  }
});
