// ==========================================================================
// FIND MY PKL - FAVORIT SAYA (BOOKMARKS) MODULE
// Saved Jobs Manager, Bookmark Toggling, Quick Apply
// ==========================================================================

window.App = window.App || {};
Object.assign(window.App, {
  async toggleBookmark(jobId) {
    jobId = Number(jobId);

    // 1. FRONTEND GUARD: Check if user is logged in as student
    const student = this.currentStudent;
    const isStudent = this.currentRole === 'SISWA' && Boolean(student);

    if (!isStudent) {
      const modalHtml = `
        <div style="text-align: center; padding: 14px 6px;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); color: #D97706; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 30px; box-shadow: 0 6px 14px -2px rgba(217, 119, 6, 0.2);">
            ⭐
          </div>
          <span class="badge badge-amber" style="font-size: 11px; padding: 3px 10px; margin-bottom: 8px;">
            AKSES SISWA TERDAFTAR
          </span>
          <h3 style="font-size: 19px; font-weight: 800; color: #0F172A; margin: 10px 0 8px; line-height: 1.35;">
            Login yuk untuk menambahkan tempat PKL favoritmu!
          </h3>
          <p style="font-size: 13.5px; color: #64748B; line-height: 1.6; max-width: 440px; margin: 0 auto 22px;">
            Simpan tempat PKL terbaik agar mudah dicek kembali kapan saja dari perangkat mana pun setelah kamu masuk ke akun siswa SMK Taruna Bangsa.
          </p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="btn btn-secondary btn-sm" onclick="Modal.close();">
              Nanti Saja
            </button>
            <button class="btn btn-primary btn-sm" onclick="Modal.close(); App.setRole('LOGIN');">
              Masuk ke Akun Siswa &rarr;
            </button>
          </div>
        </div>
      `;
      Modal.open(modalHtml, 'Akses Diperlukan', 'md');
      return;
    }

    // 2. BACKEND API INTEGRATION (with auth validation in backend)
    try {
      const res = await API.toggleFavorite(jobId, student.id);
      const isSaved = res.is_favorited;

      if (!this.bookmarkedJobs) this.bookmarkedJobs = new Set();

      if (isSaved) {
        this.bookmarkedJobs.add(jobId);
        Toast.show('Berhasil Disimpan', 'Lowongan berhasil ditambahkan ke daftar favorit Anda.', 'success');
      } else {
        this.bookmarkedJobs.delete(jobId);
        Toast.show('Dihapus dari Favorit', 'Lowongan dihapus dari daftar favorit Anda.', 'info');
      }

      try {
        localStorage.setItem('findmypkl_bookmarks', JSON.stringify([...this.bookmarkedJobs]));
      } catch (e) {}

      // Update badge counter in top nav
      const topBadge = document.getElementById('top-fav-badge-count');
      if (topBadge) topBadge.textContent = this.bookmarkedJobs.size;

      // Update all matching bookmark buttons on the page dynamically
      const btns = document.querySelectorAll(`[data-bookmark-job-id="${jobId}"]`);
      btns.forEach(btn => {
        if (isSaved) {
          btn.classList.add('saved');
          btn.innerHTML = `
            <span>Tersimpan</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          `;
        } else {
          btn.classList.remove('saved');
          btn.innerHTML = `
            <span>Simpan</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          `;
        }
      });

      const homeBtns = document.querySelectorAll(`[onclick="App.toggleBookmark(${jobId})"]`);
      homeBtns.forEach(btn => {
        if (btn.classList.contains('bookmark-action-btn')) {
          if (isSaved) {
            btn.classList.add('active');
            btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
          } else {
            btn.classList.remove('active');
            btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
          }
        }
      });
    } catch (err) {
      if (err.message && err.message.includes('Login')) {
        Toast.show('Perlu Login', err.message, 'warning');
        App.setRole('LOGIN');
      } else {
        Toast.show('Gagal Menyimpan', err.message, 'error');
      }
    }
  },

  async renderFavoritSayaPage(container) {
    const student = this.currentStudent;
    const isStudent = this.currentRole === 'SISWA' && Boolean(student);

    // =========================================================================
    // 1. UNLOADED / GUEST VIEW: USER BELUM LOGIN
    // =========================================================================
    if (!isStudent) {
      container.innerHTML = `
        <div class="favorit-page-wrapper">
          ${this.getTopNavHtml('favorit')}

          <!-- HERO BANNER -->
          <section class="page-hero-section">
            <div class="page-hero-inner">
              <div class="page-hero-badge" style="background: #FEF3C7; color: #92400E;">
                <span>⭐ Fitur Eksklusif Siswa</span>
              </div>
              <h1 class="page-hero-title">
                Daftar Lowongan PKL <span>Favorit Saya</span>
              </h1>
              <p class="page-hero-desc">
                Kumpulkan dan kelola tempat PKL impianmu dalam satu daftar terpusat sebelum mengajukan lamaran resmi ke HUBIN sekolah.
              </p>
            </div>
          </section>

          <!-- AUTH LOCKED PROMPT CONTAINER -->
          <div class="page-body-container" style="max-width: 680px; margin: 0 auto; padding: 40px 16px 80px;">
            <div class="favorit-locked-card" style="background: #ffffff; border: 1.5px solid #E2E8F0; border-radius: 24px; padding: 48px 28px; text-align: center; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
              <div style="width: 76px; height: 76px; border-radius: 50%; background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); color: #D97706; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 34px; box-shadow: 0 8px 16px -2px rgba(217, 119, 6, 0.2);">
                ⭐
              </div>

              <span class="badge badge-amber" style="font-size: 11.5px; font-weight: 700; padding: 4px 12px; margin-bottom: 12px;">
                AKSES DIPERLUKAN
              </span>

              <h2 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 12px 0 10px; line-height: 1.35;">
                Login yuk untuk menambahkan tempat PKL favoritmu!
              </h2>

              <p style="font-size: 14px; color: #64748B; line-height: 1.65; max-width: 480px; margin: 0 auto 28px;">
                Fitur <strong>Favorit Saya</strong> memungkinkan siswa SMK Taruna Bangsa menyimpan lowongan magang terbaik, memantau sisa kuota, serta membandingkan kriteria sebelum mengajukan lamaran ke HUBIN.
              </p>

              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 30px;">
                <button class="btn btn-primary" onclick="App.setRole('LOGIN')" style="padding: 12px 28px; font-size: 14.5px; font-weight: 700; border-radius: 12px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);">
                  Masuk ke Akun Siswa &rarr;
                </button>
                <button class="btn btn-secondary" onclick="App.setRole('REGISTER')" style="padding: 12px 24px; font-size: 14.5px; font-weight: 600; border-radius: 12px;">
                  Daftar Akun Baru
                </button>
              </div>

              <div style="background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 14px; padding: 14px 18px; text-align: left; display: flex; align-items: center; gap: 12px; max-width: 480px; margin: 0 auto;">
                <span style="font-size: 18px;">💡</span>
                <div style="font-size: 12.5px; color: #475569; line-height: 1.55;">
                  <strong>Info untuk Siswa:</strong> Masuk menggunakan akun terdaftar untuk langsung melihat daftar lowongan yang telah Anda simpan di perangkat ini maupun perangkat lain.
                </div>
              </div>
            </div>
          </div>

          ${this.getPortalFooterHtml()}
        </div>
      `;
      return;
    }

    // =========================================================================
    // 2. LOGGED IN SISWA: FETCH FAVORITES FROM BACKEND
    // =========================================================================
    try {
      const favRes = await API.getFavorites(student.id);
      if (favRes && Array.isArray(favRes.favorites)) {
        this.bookmarkedJobs = new Set(favRes.favorites);
      }
    } catch (e) {
      console.warn('Could not fetch backend favorites:', e);
    }

    const allJobs = await API.getJobs();
    const bookmarkedIds = Array.from(this.bookmarkedJobs || []);
    let favJobs = allJobs.filter(j => bookmarkedIds.includes(j.id));
    let searchQuery = '';

    container.innerHTML = `
      <div class="favorit-page-wrapper">
        ${this.getTopNavHtml('favorit')}

        <!-- 1. HERO BANNER -->
        <section class="page-hero-section">
          <div class="page-hero-inner">
            <div class="page-hero-badge" style="background: #FEF3C7; color: #92400E;">
              <span>⭐ Lowongan Tersimpan</span>
            </div>
            <h1 class="page-hero-title">
              Daftar Lowongan PKL <span>Favorit Saya</span>
            </h1>
            <p class="page-hero-desc">
              Kelola dan pantau lowongan tempat PKL yang telah Anda simpan. Bandingkan kualifikasi, kompensasi, dan lokasi sebelum mengajukan secara resmi ke Koordinator HUBIN.
            </p>

            <div class="page-stats-row">
              <div class="page-stat-chip" id="fav-count-stat-chip">
                <span>⭐</span> <strong id="fav-count-number">${favJobs.length}</strong> Lowongan Tersimpan
              </div>
              <div class="page-stat-chip">
                <span>🔒</span> Tersimpan Aman di Akun ${student.nama}
              </div>
            </div>
          </div>
        </section>

        <!-- 2. MAIN CONTAINER -->
        <div class="page-body-container">
          <div id="favorit-content-area">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- 3. FOOTER -->
        ${this.getPortalFooterHtml()}
      </div>
    `;

    const renderFavContent = () => {
      const area = document.getElementById('favorit-content-area');
      if (!area) return;

      const currentFavIds = Array.from(this.bookmarkedJobs || []);
      favJobs = allJobs.filter(j => currentFavIds.includes(j.id));

      const countStat = document.getElementById('fav-count-number');
      if (countStat) countStat.textContent = favJobs.length;

      let displayList = [...favJobs];
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        displayList = displayList.filter(j => {
          const haystack = `${j.judul} ${j.company_nama} ${j.lokasi_kota} ${j.jurusan_target} ${j.deskripsi}`.toLowerCase();
          return haystack.includes(q);
        });
      }

      if (favJobs.length === 0) {
        area.innerHTML = `
          <div class="favorit-empty-box">
            <div class="favorit-empty-icon">⭐</div>
            <h3 class="favorit-empty-title">Belum Ada Lowongan Favorit</h3>
            <p class="favorit-empty-desc">
              Anda belum menyimpan lowongan tempat PKL apa pun. Jelajahi puluhan lowongan resmi mitra industri di katalog dan tekan tombol <strong>"Simpan"</strong> pada kartu lowongan untuk menambahkannya ke sini.
            </p>
            <button class="btn btn-primary" onclick="App.goToPortalTab('katalog')" style="padding: 12px 24px; font-weight: 700; border-radius: 12px;">
              Jelajahi Katalog Lowongan &rarr;
            </button>
          </div>
        `;
        return;
      }

      area.innerHTML = `
        <div class="favorit-toolbar-row">
          <div style="font-size: 14.5px; font-weight: 700; color: #0f172a;">
            Menampilkan ${displayList.length} dari ${favJobs.length} lowongan favorit
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <input type="text" id="fav-input-search" placeholder="Cari di lowongan tersimpan..." value="${searchQuery}" style="padding: 8px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; min-width: 220px;" />
            <button class="btn btn-secondary btn-sm" onclick="App.clearAllFavorites()" style="color: #ef4444; border-color: #fca5a5;">
              Hapus Semua
            </button>
          </div>
        </div>

        <div class="mkt-cards-grid" id="fav-cards-grid">
          ${displayList.map(j => {
            return (window.renderPklJobCard || App.renderJobCard)(j, {
              className: 'mkt-card-item pkl-job-card',
              id: `fav-card-${j.id}`,
              isBookmarked: true,
              bookmarkCallback: `App.removeFavorite(${j.id})`,
              actionText: 'Daftar PKL',
              actionCallback: `App.handleDaftarPklClick(${j.id})`
            });
          }).join('')}
        </div>

      `;

      const searchInput = document.getElementById('fav-input-search');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          searchQuery = e.target.value;
          renderFavContent();
        });
      }
    };

    App.removeFavorite = async (jobId) => {
      if (this.bookmarkedJobs && student) {
        try {
          await API.toggleFavorite(jobId, student.id);
        } catch (e) {}
        this.bookmarkedJobs.delete(jobId);
        Toast.show('Dihapus dari Favorit', 'Lowongan telah dihapus dari daftar favorit Anda.', 'info');
        renderFavContent();
      }
    };

    App.clearAllFavorites = async () => {
      if (!this.bookmarkedJobs || this.bookmarkedJobs.size === 0) return;
      if (confirm('Yakin ingin menghapus semua lowongan dari daftar favorit?')) {
        const ids = [...this.bookmarkedJobs];
        for (const id of ids) {
          try {
            await API.toggleFavorite(id, student.id);
          } catch (e) {}
        }
        this.bookmarkedJobs.clear();
        Toast.show('Favorit Dikosongkan', 'Seluruh lowongan favorit telah dihapus.', 'info');
        renderFavContent();
      }
    };

    renderFavContent();
  }
});
