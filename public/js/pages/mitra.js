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
                Detail Profil
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

  async showCompanyDetailModal(companyId) {
    const comp = await API.getCompanyById(companyId);
    if (!comp) return;
    const allJobs = await API.getJobs();
    const compJobs = allJobs.filter(j => j.company_id === comp.id);

    const initials = comp.logo_initials || comp.nama.split(' ').map(w => w[0]).slice(0, 3).join('');
    const color = comp.logo_color || '#1e40af';

    const html = `
      <div>
        <div style="display: flex; gap: 16px; align-items: center; padding-bottom: 16px; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
          <div style="width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0;">
            ${renderCompanyLogo(comp, { size: 56 })}
          </div>
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${comp.nama}</h3>
            <div style="font-size: 12.5px; color: #64748b;">${comp.bidang} &bull; ${comp.kota}</div>
            <div style="margin-top: 4px;">
              <span class="badge badge-emerald" style="font-size: 10px; padding: 2px 8px;">✓ Status MoU: ${comp.status_mou || 'Aktif'}</span>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 18px;">
          <h5 style="font-size: 12.5px; font-weight: 700; color: #334155; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">Tentang Perusahaan</h5>
          <p style="font-size: 13.5px; color: #475569; line-height: 1.6;">${comp.deskripsi || 'Perusahaan mitra resmi DUDI SMK Taruna Bangsa.'}</p>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 18px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 12.5px;">
          <div>
            <span style="color: #64748b;">No. Registrasi MoU:</span>
            <div style="font-weight: 700; color: #0f172a; margin-top: 2px;"><code>${comp.no_mou || 'MOU/SMK-TB/RESMI'}</code></div>
          </div>
          <div>
            <span style="color: #64748b;">Website Resmi:</span>
            <div style="margin-top: 2px;"><a href="${comp.website || '#'}" target="_blank" style="font-weight: 700; color: #2563eb; text-decoration: underline;">${comp.website ? comp.website.replace('https://', '') : 'Portal Resmi'} ↗</a></div>
          </div>
          <div>
            <span style="color: #64748b;">PIC Hubungan Industri:</span>
            <div style="font-weight: 700; color: #0f172a; margin-top: 2px;">${comp.pic_nama || 'Koordinator HRD'}</div>
          </div>
          <div>
            <span style="color: #64748b;">Kontak Resmi:</span>
            <div style="font-weight: 700; color: #059669; margin-top: 2px;">📞 ${comp.pic_kontak || '0812-xxxx-xxxx'}</div>
          </div>
          <div style="grid-column: 1 / -1;">
            <span style="color: #64748b;">Alamat Kantor / Pabrik:</span>
            <div style="font-weight: 600; color: #334155; margin-top: 2px;">${comp.alamat || '-'}</div>
          </div>
        </div>

        <div>
          <h5 style="font-size: 12.5px; font-weight: 700; color: #334155; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
            Lowongan PKL Aktif di Perusahaan Ini (${compJobs.length})
          </h5>
          ${compJobs.length > 0 ? `
            <div style="display: flex; flex-direction: column; gap: 8px; max-height: 180px; overflow-y: auto; padding-right: 4px;">
              ${compJobs.map(j => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px;">
                  <div>
                    <div style="font-size: 13.5px; font-weight: 700; color: #0f172a;">${j.judul}</div>
                    <div style="font-size: 11.5px; color: #64748b; display: flex; align-items: center; gap: 6px; margin-top: 2px;">
                      <span>Target: ${j.jurusan_target}</span>
                      <span>&bull;</span>
                      <span class="mkt-badge-comp ${App.isJobPaid(j) ? 'paid' : 'unpaid'}" style="font-size: 10px; padding: 1px 6px;">${App.isJobPaid(j) ? 'Paid' : 'Unpaid'}</span>
                    </div>
                  </div>
                  <button class="btn btn-primary btn-sm" onclick="Modal.close(); App.handleDaftarPklClick(${j.id});" style="font-size: 12px; padding: 6px 12px;">
                    Daftar PKL
                  </button>
                </div>
              `).join('')}
            </div>
          ` : `
            <p style="font-size: 13px; color: #94a3b8; font-style: italic;">Saat ini kuota penempatan sedang diproses untuk semester berikutnya.</p>
          `}
        </div>

        <div style="display: flex; gap: 10px; margin-top: 20px; justify-content: flex-end;">
          <button class="btn btn-secondary" onclick="Modal.close()">Tutup</button>
          <button class="btn btn-primary" onclick="Modal.close(); App.viewCompanyJobs(${comp.id}, '${comp.nama.replace(/'/g, "\\'")}')">
            Buka di Katalog &rarr;
          </button>
        </div>
      </div>
    `;

    Modal.open(html, `Profil Mitra Industri: ${comp.nama}`, 'lg');
  }
});
