// ==========================================================================
// FIND MY PKL - ULASAN PERUSAHAAN MITRA MODULE
// Student & Alumni Reviews, Rating Stars, Upvoting, New Review Submission
// ==========================================================================

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

            <button type="button" class="btn-tulis-ulasan" onclick="App.showAddReviewModal()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Tulis Ulasan Pengalaman
            </button>
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

      grid.innerHTML = filtered.map(r => {
        const initials = r.student_nama ? r.student_nama.split(' ').map(w => w[0]).slice(0, 2).join('') : 'SW';
        const stars = '★'.repeat(Math.floor(r.rating || 5)) + '☆'.repeat(5 - Math.floor(r.rating || 5));
        const ratings = r.ratings || { culture: 5, mentor: 5, allowance: 5, relevance: 5 };

        return `
          <div class="ulasan-card-item">
            <div>
              <div class="ulasan-author-row">
                <div class="ulasan-avatar">${initials}</div>
                <div class="ulasan-author-info">
                  <div class="ulasan-author-name">
                    <span>${r.student_nama}</span>
                    ${r.verified_pkl ? `
                      <span class="ulasan-verified-badge" title="Telah menyelesaikan PKL terverifikasi HUBIN">
                        ✓ Terverifikasi PKL
                      </span>
                    ` : ''}
                  </div>
                  <div class="ulasan-author-meta">
                    ${r.student_kelas || 'XII RPL 1'} &bull; ${r.student_sekolah || 'SMK Taruna Bangsa'}
                  </div>
                </div>
              </div>

              <div class="ulasan-comp-tag">
                🏢 ${r.company_nama} &bull; <strong>${r.posisi || 'Siswa PKL'}</strong>
              </div>

              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                <span style="color: #f59e0b; font-size: 16px; letter-spacing: 1px;">${stars}</span>
                <strong style="font-size: 14px; color: #0f172a;">${Number(r.rating).toFixed(1)}</strong>
              </div>

              <div class="ulasan-rating-aspects-row">
                <span class="ulasan-aspect-chip">🏢 Kultur: ${ratings.culture}</span>
                <span class="ulasan-aspect-chip">👨‍🏫 Mentor: ${ratings.mentor}</span>
                <span class="ulasan-aspect-chip">💰 Kompensasi: ${ratings.allowance}</span>
              </div>

              <p class="ulasan-text-body">
                "${r.review_text}"
              </p>

              <div class="ulasan-pros-cons-box">
                ${r.pros ? `<div class="ulasan-pro-pill"><strong>👍 Kelebihan:</strong> ${r.pros}</div>` : ''}
                ${r.cons ? `<div class="ulasan-con-pill"><strong>💡 Catatan:</strong> ${r.cons}</div>` : ''}
              </div>
            </div>

            <div class="ulasan-card-footer">
              <div>
                📅 ${new Date(r.created_at || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <button type="button" class="btn-review-upvote" id="btn-upvote-${r.id}" onclick="App.handleUpvoteReview(${r.id})">
                <span>👍</span> Membantu (<span id="upvote-count-${r.id}">${r.helpful_count || 0}</span>)
              </button>
            </div>
          </div>
        `;
      }).join('');
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

  async showAddReviewModal() {
    const companies = await API.getCompanies();
    const student = this.currentStudent;
    const defaultName = student ? student.nama : '';
    const defaultKelas = student ? student.kelas : 'XII RPL 1';
    const defaultJurusan = student ? student.jurusan : 'Rekayasa Perangkat Lunak (RPL)';

    const html = `
      <form id="form-tulis-ulasan" onsubmit="App.handleReviewSubmit(event)">
        <p style="font-size: 13px; color: #64748b; margin-bottom: 18px;">
          Bagikan pengalaman nyata Anda selama melaksanakan Praktik Kerja Lapangan (PKL) untuk membantu adik kelas dan sesama siswa SMK Taruna Bangsa Kota Bekasi dalam memilih tempat PKL yang tepat.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 14px;">
          <div class="form-group">
            <label class="form-label">Nama Siswa *</label>
            <input type="text" id="rev-student-nama" class="form-control" value="${defaultName}" required placeholder="Nama lengkap Anda" />
          </div>

          <div class="form-group">
            <label class="form-label">Kelas *</label>
            <input type="text" id="rev-student-kelas" class="form-control" value="${defaultKelas}" required placeholder="Contoh: XII RPL 1" />
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 14px;">
          <label class="form-label">Jurusan Keahlian *</label>
          <select id="rev-student-jurusan" class="form-control" required>
            <option value="Rekayasa Perangkat Lunak (RPL)" ${defaultJurusan.includes('RPL') ? 'selected' : ''}>Rekayasa Perangkat Lunak (RPL)</option>
            <option value="Teknik Audio Video (TAV)" ${defaultJurusan.includes('TAV') ? 'selected' : ''}>Teknik Audio Video (TAV)</option>
            <option value="Teknik Instalasi Tenaga Listrik (TITL)" ${defaultJurusan.includes('TITL') ? 'selected' : ''}>Teknik Instalasi Tenaga Listrik (TITL)</option>
            <option value="Teknik Kendaraan Ringan Otomotif (TKRO)" ${defaultJurusan.includes('TKRO') ? 'selected' : ''}>Teknik Kendaraan Ringan Otomotif (TKRO)</option>
          </select>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 14px;">
          <div class="form-group">
            <label class="form-label">Perusahaan Tempat PKL *</label>
            <select id="rev-company-id" class="form-control" required>
              <option value="" disabled selected>Pilih Perusahaan Mitra</option>
              ${companies.map(c => `<option value="${c.id}">${c.nama}</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Posisi / Peran PKL *</label>
            <input type="text" id="rev-posisi" class="form-control" required placeholder="Contoh: Frontend Web Developer" />
          </div>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <label class="form-label" style="margin: 0; font-weight: 700;">Penilaian & Rating Bintang *</label>
            <div class="star-rating-selector" id="rev-star-picker">
              <button type="button" class="star-btn" onclick="App.setReviewRating(1)" data-star="1">★</button>
              <button type="button" class="star-btn" onclick="App.setReviewRating(2)" data-star="2">★</button>
              <button type="button" class="star-btn" onclick="App.setReviewRating(3)" data-star="3">★</button>
              <button type="button" class="star-btn" onclick="App.setReviewRating(4)" data-star="4">★</button>
              <button type="button" class="star-btn active" onclick="App.setReviewRating(5)" data-star="5">★</button>
            </div>
          </div>
          <input type="hidden" id="rev-rating" value="5.0" />

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; padding-top: 10px; border-top: 1px dashed #e2e8f0;">
            <div>
              <span style="font-size: 12px; color: #64748b;">🏢 Kultur & Lingkungan:</span>
              <select id="rev-rating-culture" class="form-control" style="margin-top: 4px;">
                <option value="5.0">5.0 - Sangat Positif</option>
                <option value="4.8">4.8 - Positif</option>
                <option value="4.5">4.5 - Cukup</option>
              </select>
            </div>
            <div>
              <span style="font-size: 12px; color: #64748b;">👨‍🏫 Bimbingan Mentor:</span>
              <select id="rev-rating-mentor" class="form-control" style="margin-top: 4px;">
                <option value="5.0">5.0 - Sangat Membimbing</option>
                <option value="4.8">4.8 - Membimbing Baik</option>
                <option value="4.5">4.5 - Cukup Membimbing</option>
              </select>
            </div>
            <div>
              <span style="font-size: 12px; color: #64748b;">💰 Kompensasi & Fasilitas:</span>
              <select id="rev-rating-allowance" class="form-control" style="margin-top: 4px;">
                <option value="5.0">5.0 - Memuaskan & Tepat Waktu</option>
                <option value="4.8">4.8 - Cukup Baik</option>
                <option value="4.5">4.5 - Standar</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 14px;">
          <label class="form-label">Ulasan & Cerita Pengalaman PKL *</label>
          <textarea id="rev-review-text" class="form-control" rows="3" required placeholder="Ceritakan bagaimana alur kerja sehari-hari, proyek yang dikerjakan, dan ilmu baru yang didapatkan..."></textarea>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 20px;">
          <div class="form-group">
            <label class="form-label">👍 Kelebihan (Pros)</label>
            <input type="text" id="rev-pros" class="form-control" placeholder="Contoh: Uang saku tepat waktu, mentor sabar" />
          </div>

          <div class="form-group">
            <label class="form-label">💡 Catatan / Tantangan (Cons)</label>
            <input type="text" id="rev-cons" class="form-control" placeholder="Contoh: Sprint deadline padat, butuh fisik prima" />
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" class="btn btn-secondary" onclick="Modal.close()">Batal</button>
          <button type="submit" class="btn btn-primary" style="padding: 10px 20px; font-weight: 700; background: #059669; border-color: #059669;">
            Kirim Ulasan Siswa &rarr;
          </button>
        </div>
      </form>
    `;

    Modal.open(html, 'Tulis Ulasan Pengalaman PKL', 'lg');
    // Set initial 5 stars visual
    this.setReviewRating(5);
  },

  setReviewRating(val) {
    const input = document.getElementById('rev-rating');
    if (input) input.value = Number(val).toFixed(1);
    const starBtns = document.querySelectorAll('#rev-star-picker .star-btn');
    starBtns.forEach((btn, idx) => {
      if (idx < val) {
        btn.classList.add('active');
        btn.style.color = '#f59e0b';
      } else {
        btn.classList.remove('active');
        btn.style.color = '#cbd5e1';
      }
    });
  },

  async handleReviewSubmit(e) {
    e.preventDefault();
    const nama = document.getElementById('rev-student-nama').value.trim();
    const kelas = document.getElementById('rev-student-kelas').value.trim();
    const jurusan = document.getElementById('rev-student-jurusan').value;
    const company_id = document.getElementById('rev-company-id').value;
    const posisi = document.getElementById('rev-posisi').value.trim();
    const rating = document.getElementById('rev-rating').value;
    const rating_culture = document.getElementById('rev-rating-culture').value;
    const rating_mentor = document.getElementById('rev-rating-mentor').value;
    const rating_allowance = document.getElementById('rev-rating-allowance').value;
    const review_text = document.getElementById('rev-review-text').value.trim();
    const pros = document.getElementById('rev-pros').value.trim();
    const cons = document.getElementById('rev-cons').value.trim();

    if (!company_id || !review_text) {
      Toast.show('Data Belum Lengkap', 'Pilih perusahaan dan isi cerita pengalaman magang Anda.', 'warning');
      return;
    }

    try {
      await API.submitReview({
        student_id: this.currentStudent ? this.currentStudent.id : null,
        student_nama: nama,
        student_kelas: kelas,
        student_jurusan: jurusan,
        student_sekolah: 'SMK Taruna Bangsa Kota Bekasi',
        company_id,
        posisi,
        rating,
        rating_culture,
        rating_mentor,
        rating_allowance,
        review_text,
        pros,
        cons
      });

      Modal.close();
      Toast.show('Ulasan Berhasil Dikirim!', 'Terima kasih atas kontribusi Anda. Ulasan telah tampil di halaman Ulasan Perusahaan.', 'success');
      this.render();
    } catch (err) {
      Toast.show('Gagal Mengirim Ulasan', err.message, 'danger');
    }
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
