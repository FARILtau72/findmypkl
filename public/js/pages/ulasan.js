// ==========================================================================
// FIND MY PKL - ULASAN PERUSAHAAN MITRA MODULE
// Student & Alumni Reviews, Rating Stars, Upvoting, New Review Submission
// ==========================================================================

window.App = window.App || {};
Object.assign(window.App, {
  async renderUlasanPerusahaanPage(container) {
    const reviews = await API.getReviews();
    const companies = await API.getCompanies();

    let selectedCompanyId = 'Semua';
    let selectedMajor = 'Semua';
    let selectedRating = 'Semua';
    let searchQuery = '';

    container.innerHTML = `
      <div class="ulasan-page-wrapper">
        ${this.getTopNavHtml('ulasan')}

        <!-- 1. HERO SECTION -->
        <section class="page-hero-section">
          <div class="page-hero-inner">
            <div class="page-hero-badge" style="background: #E0E7FF; color: #3730A3;">
              <span>💬 Testimoni Nyata & Transparansi PKL</span>
            </div>
            <h1 class="page-hero-title">
              Ulasan Perusahaan Mitra dari <span>Siswa & Alumni</span>
            </h1>
            <p class="page-hero-desc">
              Transparansi pengalaman nyata magang di mitra industri resmi: suasana kerja, fasilitas nyata, uang saku, dan kualitas bimbingan mentor lapangan dari siswa SMK Taruna Bangsa Kota Bekasi.
            </p>
          </div>
        </section>

        <!-- 2. MAIN CONTAINER -->
        <div class="page-body-container">
          <!-- Aggregate Hero Card -->
          <div class="ulasan-hero-card">
            <div class="ulasan-score-col">
              <div class="ulasan-big-num">4.9<span>/5.0</span></div>
              <div class="ulasan-stars-gold">★★★★★</div>
              <div class="ulasan-score-sub">1.250+ Ulasan Terverifikasi &bull; 98% Siswa Merekomendasikan</div>
            </div>

            <div class="ulasan-metrics-grid">
              <div class="ulasan-metric-item">
                <div class="ulasan-metric-label-row">
                  <span>🏢 Kultur & Suasana Kerja</span>
                  <strong>4.9 / 5.0</strong>
                </div>
                <div class="ulasan-progress-bg">
                  <div class="ulasan-progress-fill" style="width: 98%;"></div>
                </div>
              </div>

              <div class="ulasan-metric-item">
                <div class="ulasan-metric-label-row">
                  <span>👨‍🏫 Bimbingan Mentor Lapangan</span>
                  <strong>4.9 / 5.0</strong>
                </div>
                <div class="ulasan-progress-bg">
                  <div class="ulasan-progress-fill" style="width: 98%;"></div>
                </div>
              </div>

              <div class="ulasan-metric-item">
                <div class="ulasan-metric-label-row">
                  <span>💰 Uang Saku & Fasilitas Kerja</span>
                  <strong>4.8 / 5.0</strong>
                </div>
                <div class="ulasan-progress-bg">
                  <div class="ulasan-progress-fill" style="width: 96%;"></div>
                </div>
              </div>

              <div class="ulasan-metric-item">
                <div class="ulasan-metric-label-row">
                  <span>🎯 Relevansi Kejuruan SMK</span>
                  <strong>5.0 / 5.0</strong>
                </div>
                <div class="ulasan-progress-bg">
                  <div class="ulasan-progress-fill" style="width: 100%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Toolbar & Filters -->
          <div class="ulasan-toolbar">
            <div style="flex: 1; min-width: 220px; position: relative;">
              <input type="text" id="ulasan-input-search" placeholder="Cari ulasan, nama siswa, atau posisi..." style="width: 100%; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13.5px; outline: none;" />
            </div>

            <select id="ulasan-select-company" class="mitra-city-select" style="min-width: 180px;">
              <option value="Semua">🏢 Semua Perusahaan</option>
              ${companies.map(c => `<option value="${c.id}">${c.nama}</option>`).join('')}
            </select>

            <select id="ulasan-select-jurusan" class="mitra-city-select">
              <option value="Semua">🎓 Semua Jurusan</option>
              <option value="RPL">RPL (Rekayasa Perangkat Lunak)</option>
              <option value="TAV">TAV (Teknik Audio Video)</option>
              <option value="TITL">TITL (Teknik Instalasi Tenaga Listrik)</option>
              <option value="TKRO">TKRO (Teknik Kendaraan Ringan Otomotif)</option>
            </select>

            <select id="ulasan-select-rating" class="mitra-city-select">
              <option value="Semua">⭐ Semua Rating</option>
              <option value="5">⭐⭐⭐⭐⭐ Bintang 5.0</option>
              <option value="4.8">⭐ Bintang 4.8+</option>
            </select>
          </div>

          <!-- Reviews Grid -->
          <div class="ulasan-cards-grid" id="ulasan-cards-grid-body">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- 3. FOOTER -->
        ${this.getPortalFooterHtml()}
      </div>
    `;

    const renderFilteredReviews = () => {
      const grid = document.getElementById('ulasan-cards-grid-body');
      if (!grid) return;

      const q = searchQuery.toLowerCase().trim();
      const filtered = reviews.filter(r => {
        if (selectedCompanyId !== 'Semua' && r.company_id !== Number(selectedCompanyId)) return false;
        if (selectedMajor !== 'Semua' && !((r.student_jurusan || '').toLowerCase().includes(selectedMajor.toLowerCase()))) return false;
        if (selectedRating !== 'Semua' && r.rating < Number(selectedRating)) return false;
        if (q) {
          const haystack = `${r.student_nama} ${r.company_nama} ${r.posisi} ${r.review_text} ${r.pros} ${r.cons}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1;">
            <div style="font-size: 32px; margin-bottom: 12px;">💬</div>
            <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">Belum Ada Ulasan yang Cocok</h4>
            <p style="font-size: 13px; color: #64748b;">Cobalah mengubah filter perusahaan, jurusan, atau rating.</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = filtered.map(r => renderModernReviewCard(r, { showUpvote: false, showProsCons: false })).join('');
    };

    // Event listeners
    const searchInput = document.getElementById('ulasan-input-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderFilteredReviews();
      });
    }

    const compSelect = document.getElementById('ulasan-select-company');
    if (compSelect) {
      compSelect.addEventListener('change', (e) => {
        selectedCompanyId = e.target.value;
        renderFilteredReviews();
      });
    }

    const jurSelect = document.getElementById('ulasan-select-jurusan');
    if (jurSelect) {
      jurSelect.addEventListener('change', (e) => {
        selectedMajor = e.target.value;
        renderFilteredReviews();
      });
    }

    const ratSelect = document.getElementById('ulasan-select-rating');
    if (ratSelect) {
      ratSelect.addEventListener('change', (e) => {
        selectedRating = e.target.value;
        renderFilteredReviews();
      });
    }

    renderFilteredReviews();
  },

  async handleUpvoteReview(reviewId) {
    try {
      const updated = await API.upvoteReview(reviewId);
      const countEl = document.getElementById(`upvote-count-${reviewId}`);
      if (countEl) countEl.textContent = updated.helpful_count;
      const btn = document.getElementById(`btn-upvote-${reviewId}`);
      if (btn) btn.classList.add('upvoted');
      Toast.show('Terima Kasih!', 'Umpan balik Anda telah dicatat.', 'success');
    } catch (err) {
      console.error(err);
    }
  }
});
