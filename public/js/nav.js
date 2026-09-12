// ==========================================================================
// FIND MY PKL - NAVIGATION & USER DRAWER MODULE
// Top Navigation, Mobile Bottom Nav, Mobile Drawer, User Dropdown, Shared Footer
// ==========================================================================

window.App = window.App || {};
Object.assign(window.App, {
  toggleUserDropdown(e) {
    if (e) e.stopPropagation();
    const pill = e ? e.currentTarget : null;
    const dropdown = pill ? pill.querySelector('.mkt-user-dropdown') : null;
    if (dropdown) {
      const isVisible = dropdown.style.display === 'block';
      document.querySelectorAll('.mkt-user-dropdown').forEach(d => { d.style.display = 'none'; });
      document.querySelectorAll('.mkt-user-profile-pill.active').forEach(p => p.classList.remove('active'));

      if (!isVisible) {
        dropdown.style.display = 'block';
        pill.classList.add('active');
      }
    } else {
      const dropdowns = document.querySelectorAll('.mkt-user-dropdown');
      dropdowns.forEach(dropdown => {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      });
    }
  },

  showSwitchStudentModal() {
    const students = this.allStudents || [];
    const currentId = this.currentStudentId;

    const html = `
      <div>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">
          Pilih akun siswa untuk menguji berbagai kondisi akun (Terverifikasi, Menunggu Verifikasi HUBIN, Perlu Perbaikan, atau Ditolak):
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px; max-height: 380px; overflow-y: auto; padding-right: 4px;">
          ${students.map(s => {
            const isSelected = s.id === currentId;
            const initials = s.nama.split(' ').map(w => w[0]).slice(0, 2).join('');
            const statusClass = s.status_verifikasi === 'Terverifikasi' ? 'badge-emerald' : s.status_verifikasi === 'Perlu Perbaikan' ? 'badge-amber' : s.status_verifikasi === 'Ditolak' ? 'badge-rose' : 'badge-blue';

            return `
              <div onclick="App.switchStudentAccount(${s.id})" style="border: 1.5px solid ${isSelected ? '#10b981' : '#e2e8f0'}; background: ${isSelected ? '#f0fdf4' : '#ffffff'}; border-radius: 12px; padding: 12px 14px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s ease;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 36px; height: 36px; border-radius: 50%; background: ${isSelected ? '#10b981' : '#e2e8f0'}; color: ${isSelected ? '#ffffff' : '#475569'}; font-weight: 800; font-size: 13px; display: flex; align-items: center; justify-content: center;">
                    ${initials}
                  </div>
                  <div>
                    <div style="font-weight: 700; font-size: 13.5px; color: #0f172a;">${s.nama} ${isSelected ? '<span style="color: #10b981; font-size: 12px;">(Aktif)</span>' : ''}</div>
                    <div style="font-size: 12px; color: #64748b;">${s.kelas} &bull; ${s.jurusan}</div>
                  </div>
                </div>
                <div>
                  <span class="badge ${statusClass}" style="font-size: 11px;">${s.status_verifikasi}</span>
                </div>
              </div>
            `;
          }).join('')}

          <div onclick="App.switchToGuestMode()" style="border: 1.5px dashed #cbd5e1; background: #f8fafc; border-radius: 12px; padding: 12px 14px; cursor: pointer; display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #e2e8f0; color: #64748b; font-size: 16px; display: flex; align-items: center; justify-content: center;">
              👤
            </div>
            <div>
              <div style="font-weight: 700; font-size: 13.5px; color: #0f172a;">Mode Tamu (Belum Terdaftar / Belum Login)</div>
              <div style="font-size: 12px; color: #64748b;">Uji pendaftaran akun baru atau peringatan login saat melamar</div>
            </div>
          </div>
        </div>
      </div>
    `;

    Modal.open(html, 'Ganti Akun Siswa (Simulasi Demo)', 'md');
  },

  async switchStudentAccount(studentId) {
    this.currentStudentId = Number(studentId);
    this.currentStudent = this.allStudents.find(s => s.id === this.currentStudentId) || this.allStudents[0];
    this.currentRole = 'SISWA';
    this.saveSession();
    try {
      if (typeof API !== 'undefined' && API.getFavorites) {
        const favRes = await API.getFavorites(this.currentStudentId);
        this.bookmarkedJobs = new Set((favRes && favRes.favorites) ? favRes.favorites : []);
      }
    } catch (e) {
      this.bookmarkedJobs = new Set();
    }
    Modal.close();
    Toast.show('Akun Diganti', `Anda sekarang masuk sebagai ${this.currentStudent.nama} (${this.currentStudent.status_verifikasi})`, 'success');
    this.render();
  },

  switchToGuestMode() {
    this.currentRole = 'PUBLIC';
    this.bookmarkedJobs = new Set();
    this.saveSession();
    Modal.close();
    Toast.show('Mode Tamu', 'Anda berada dalam mode pengunjung belum login.', 'info');
    this.render();
  },

  getTopNavHtml(activeTab = 'beranda') {
    const isSiswaLoggedIn = this.currentRole === 'SISWA' && Boolean(this.currentStudent);
    const student = isSiswaLoggedIn ? this.currentStudent : null;
    const initials = student ? student.nama.split(' ').map(w => w[0]).slice(0, 2).join('') : 'SA';
    const schoolSub = student ? `${student.kelas || 'XII RPL 1'} &bull; ${student.status_verifikasi === 'Terverifikasi' ? 'Siswa Aktif' : (student.status_verifikasi || 'Siswa')}` : 'Siswa Aktif';
    const favCount = (isSiswaLoggedIn && this.bookmarkedJobs) ? this.bookmarkedJobs.size : 0;
    const favBadge = favCount > 0 ? `<span class="nav-fav-badge">${favCount}</span>` : '';
    const isTransparent = activeTab === 'beranda';

    return `
      <!-- 1. TOP NAVBAR (Transparent on Hero, Solid White on Scroll & Inner Pages) -->
      <nav class="public-navbar ${isTransparent ? 'navbar-transparent' : 'navbar-solid'}" id="public-navbar">
        <div class="public-nav-container">
          <div class="brand-logo-modern" onclick="App.goToPortalTab('beranda')">
            <div class="brand-logo-icon">
              <img src="images/logo.png" alt="FindMyPKL Logo" />
            </div>
            <div>
              <div class="brand-logo-text" style="line-height: 1.1;">FindMy<span style="color: #059669;">PKL</span></div>
              <div style="font-size: 8.5px; font-weight: 700; letter-spacing: 0.5px; color: #64748B; text-transform: uppercase;">SMK TARUNA BANGSA</div>
            </div>
          </div>

          <!-- Desktop Links (Hidden on Mobile < 768px via CSS) -->
          <div class="public-nav-links">
            <a class="public-nav-link ${activeTab === 'beranda' ? 'nav-pill-active' : ''}" onclick="App.goToPortalTab('beranda')">Beranda</a>
            <a class="public-nav-link ${activeTab === 'katalog' ? 'nav-pill-active' : ''}" onclick="App.goToPortalTab('katalog')">Cari Tempat PKL</a>
            <a class="public-nav-link ${activeTab === 'mitra' ? 'nav-pill-active' : ''}" onclick="App.goToPortalTab('mitra')">Mitra Industri</a>
            <a class="public-nav-link ${activeTab === 'favorit' ? 'nav-pill-active' : ''}" onclick="App.goToPortalTab('favorit')">
              Favorit Saya ${favBadge}
            </a>
            <a class="public-nav-link ${activeTab === 'ulasan' ? 'nav-pill-active' : ''}" onclick="App.goToPortalTab('ulasan')">Ulasan Perusahaan</a>
          </div>

          <div class="public-nav-actions">
            <!-- Portal Guru / HUBIN button (Desktop only, hidden on mobile) -->
            <button class="btn-nav-hubin-pill" onclick="App.setRole('LOGIN', 'hubin')" title="Portal Guru / HUBIN SMK">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>
              <span>Portal Guru / HUBIN</span>
            </button>

            ${isSiswaLoggedIn ? `
              <!-- Logged-in Student Profile Pill -->
              <div class="mkt-user-profile-pill" onclick="App.toggleUserDropdown(event)" title="Menu Akun Siswa">
                <div class="mkt-user-avatar">${initials}</div>
                <div class="mkt-user-meta">
                  <div class="mkt-user-name">${student.nama}</div>
                  <div class="mkt-user-sub">${schoolSub}</div>
                </div>
                <svg class="mkt-user-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>

                <div class="mkt-user-dropdown" style="display: none;" onclick="event.stopPropagation()">
                  <div class="mkt-dropdown-header">
                    <div class="mkt-dropdown-avatar">${initials}</div>
                    <div class="mkt-dropdown-user-info">
                      <div class="mkt-dropdown-name" title="${student.nama}">${student.nama}</div>
                      <div class="mkt-dropdown-sub">${student.kelas} &bull; NISN: ${student.nisn}</div>
                      <div class="mkt-dropdown-badge-wrap">
                        <span class="mkt-dropdown-badge ${student.status_verifikasi === 'Terverifikasi' ? 'badge-verified' : ''}">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                          ${student.status_verifikasi === 'Terverifikasi' ? 'Terverifikasi' : student.status_verifikasi}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="mkt-dropdown-links">
                    <a class="mkt-dropdown-item" onclick="App.setRole('SISWA', 'profil')">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <span>Profil Siswa & Berkas</span>
                    </a>
                    <a class="mkt-dropdown-item" onclick="App.setRole('SISWA', 'lamaran')">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      <span>Lamaran PKL Saya</span>
                    </a>
                    <a class="mkt-dropdown-item" onclick="App.setRole('SISWA', 'jurnal')">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      <span>Jurnal Kegiatan PKL</span>
                    </a>
                  </div>
                  <div class="mkt-dropdown-divider"></div>
                  <div class="mkt-dropdown-links">
                    <a class="mkt-dropdown-item" onclick="App.showSwitchStudentModal()">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                      <span>Ganti Akun Siswa (Demo)</span>
                    </a>
                    <a class="mkt-dropdown-item" onclick="App.setRole('LOGIN', 'hubin')">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>
                      <span>Masuk ke Portal HUBIN</span>
                    </a>
                    <a class="mkt-dropdown-item mkt-item-danger" onclick="App.logout()">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      <span>Keluar (Logout)</span>
                    </a>
                  </div>
                </div>
              </div>
            ` : `
              <!-- Guest Unauthenticated Auth Buttons (NO profile avatar!) -->
              <div class="guest-nav-auth-group">
                <button class="btn-nav-login" onclick="App.setRole('LOGIN')">Masuk</button>
                <button class="btn-nav-register" onclick="App.setRole('REGISTER')">Daftar</button>
              </div>
              <button class="btn-mobile-login" onclick="App.setRole('LOGIN')">Masuk</button>
            `}

            <!-- Mobile Hamburger Button -->
            <button type="button" class="btn-mobile-drawer-toggle" onclick="App.toggleMobileDrawer()" aria-label="Buka Menu Navigasi">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>
      </nav>

      <!-- 2. MOBILE SLIDE-OVER DRAWER -->
      <div id="mobile-drawer-overlay" class="mobile-drawer-overlay" onclick="App.closeMobileDrawer()">
        <div class="mobile-drawer" onclick="event.stopPropagation()">
          <div class="mobile-drawer-header">
            <div class="brand-logo-modern" onclick="App.closeMobileDrawer(); App.goToPortalTab('beranda');">
              <div class="brand-logo-icon" style="width: 32px; height: 32px;">
                <img src="images/logo.png" alt="FindMyPKL Logo" />
              </div>
              <div>
                <div class="brand-logo-text" style="font-size: 16px;">FindMy<span style="color: #059669;">PKL</span></div>
              </div>
            </div>
            <button type="button" class="mobile-drawer-close" onclick="App.closeMobileDrawer()">&times;</button>
          </div>

          ${isSiswaLoggedIn ? `
            <div class="mobile-drawer-profile">
              <div class="mobile-drawer-avatar">${initials}</div>
              <div style="min-width: 0;">
                <div style="font-weight: 800; font-size: 14px; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${student.nama}</div>
                <div style="font-size: 11.5px; color: #64748B;">${student.kelas} &bull; NISN: ${student.nisn}</div>
                <div style="margin-top: 4px;">
                  <span class="badge ${student.status_verifikasi === 'Terverifikasi' ? 'badge-emerald' : student.status_verifikasi === 'Perlu Perbaikan' ? 'badge-amber' : student.status_verifikasi === 'Ditolak' ? 'badge-rose' : 'badge-blue'}" style="font-size: 10px; padding: 2px 8px;">
                    ${student.status_verifikasi === 'Terverifikasi' ? '✓ Terverifikasi' : student.status_verifikasi}
                  </span>
                </div>
              </div>
            </div>
            <div style="padding: 10px 14px 4px;">
              <button type="button" class="btn btn-secondary btn-sm" style="width: 100%; font-size: 11.5px; justify-content: center;" onclick="App.closeMobileDrawer(); App.showSwitchStudentModal();">
                🔄 Ganti Akun Siswa (Demo)
              </button>
            </div>
          ` : `
            <div class="mobile-drawer-guest-card">
              <div style="font-weight: 800; font-size: 14px; color: #0F172A; margin-bottom: 4px;">Selamat Datang di FindMyPKL</div>
              <div style="font-size: 12px; color: #64748B; margin-bottom: 12px; line-height: 1.4;">Masuk atau daftarkan akun siswa Anda untuk melamar lowongan dan mencatat jurnal kegiatan PKL.</div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-secondary btn-sm" style="flex: 1; justify-content: center;" onclick="App.closeMobileDrawer(); App.setRole('LOGIN');">Masuk</button>
                <button class="btn btn-primary btn-sm" style="flex: 1; justify-content: center;" onclick="App.closeMobileDrawer(); App.setRole('REGISTER');">Daftar</button>
              </div>
            </div>
          `}

          <div class="mobile-drawer-nav">
            <div style="font-size: 10px; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.8px; padding: 6px 14px;">Navigasi Portal</div>
            <a class="mobile-drawer-link ${activeTab === 'beranda' ? 'active' : ''}" onclick="App.closeMobileDrawer(); App.goToPortalTab('beranda')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span>Beranda Utama</span>
            </a>
            <a class="mobile-drawer-link ${activeTab === 'katalog' ? 'active' : ''}" onclick="App.closeMobileDrawer(); App.goToPortalTab('katalog')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span>Cari Tempat PKL (Katalog)</span>
            </a>
            <a class="mobile-drawer-link ${activeTab === 'mitra' ? 'active' : ''}" onclick="App.closeMobileDrawer(); App.goToPortalTab('mitra')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>Mitra Industri Resmi (13 DUDI)</span>
            </a>
            <a class="mobile-drawer-link ${activeTab === 'favorit' ? 'active' : ''}" onclick="App.closeMobileDrawer(); App.goToPortalTab('favorit')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>Favorit Saya ${favBadge}</span>
            </a>
            <a class="mobile-drawer-link ${activeTab === 'ulasan' ? 'active' : ''}" onclick="App.closeMobileDrawer(); App.goToPortalTab('ulasan')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>Ulasan Perusahaan & Testimoni</span>
            </a>

            <div class="mobile-drawer-divider"></div>
            <div style="font-size: 10px; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.8px; padding: 6px 14px;">Akses Sekolah & Akun</div>
            <a class="mobile-drawer-link" onclick="App.closeMobileDrawer(); App.setRole('LOGIN', 'hubin')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>
              <span>Portal Guru / HUBIN SMK</span>
            </a>

            ${isSiswaLoggedIn ? `
              <a class="mobile-drawer-link" onclick="App.closeMobileDrawer(); App.setRole('SISWA', 'profil')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Profil & Berkas Siswa</span>
              </a>
              <a class="mobile-drawer-link" onclick="App.closeMobileDrawer(); App.setRole('SISWA', 'lamaran')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span>Lamaran PKL Saya</span>
              </a>
              <a class="mobile-drawer-link" onclick="App.closeMobileDrawer(); App.setRole('SISWA', 'jurnal')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <span>Jurnal Kegiatan PKL</span>
              </a>
              <a class="mobile-drawer-link" onclick="App.closeMobileDrawer(); App.logout()" style="color: #EF4444;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span>Keluar (Logout)</span>
              </a>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- 3. MOBILE BOTTOM NAVIGATION BAR -->
      <nav class="mobile-bottom-nav">
        <button class="mobile-nav-btn ${activeTab === 'beranda' ? 'active' : ''}" onclick="App.goToPortalTab('beranda')">
          <div class="mobile-nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span>Beranda</span>
        </button>
        <button class="mobile-nav-btn ${activeTab === 'katalog' ? 'active' : ''}" onclick="App.goToPortalTab('katalog')">
          <div class="mobile-nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <span>Cari PKL</span>
        </button>
        <button class="mobile-nav-btn ${activeTab === 'mitra' ? 'active' : ''}" onclick="App.goToPortalTab('mitra')">
          <div class="mobile-nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <span>Mitra</span>
        </button>
        <button class="mobile-nav-btn ${activeTab === 'favorit' ? 'active' : ''}" onclick="App.goToPortalTab('favorit')">
          <div class="mobile-nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ${favCount > 0 ? `<span class="mobile-nav-badge">${favCount}</span>` : ''}
          </div>
          <span>Favorit</span>
        </button>
        <button class="mobile-nav-btn ${activeTab === 'ulasan' ? 'active' : ''}" onclick="App.goToPortalTab('ulasan')">
          <div class="mobile-nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <span>Ulasan</span>
        </button>
      </nav>
    `;
  },

  toggleMobileDrawer() {
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (overlay) overlay.classList.toggle('active');
  },

  closeMobileDrawer() {
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (overlay) overlay.classList.remove('active');
  },

  getPortalFooterHtml() {
    return `
      <footer class="dark-portal-footer" style="margin-top: 50px;">
        <div class="footer-inner-dark">
          <div class="footer-dark-top-grid">
            <div class="footer-brand-col">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                <img src="images/logo.png" alt="FindMyPKL Logo" style="width: 36px; height: 36px; border-radius: 9px; object-fit: cover; box-shadow: 0 2px 10px rgba(0,0,0,0.35); flex-shrink: 0;" />
                <h4 style="margin: 0; font-size: 20px; line-height: 1;">
                  FindMy<span style="color: #10b981;">PKL</span>
                </h4>
              </div>
              <p>
                Platform digital tata kelola dan penelusuran Praktik Kerja Lapangan (PKL) eksklusif bagi siswa <strong>SMK Taruna Bangsa Kota Bekasi</strong>, menghubungkan siswa, BKK/HUBIN sekolah, dan Dunia Usaha & Dunia Industri (DUDI).
              </p>
              <div style="margin-top: 14px;">
                <span class="page-hero-badge" style="background: rgba(16, 185, 129, 0.18); color: #34d399; font-size: 11px;">
                  &bull; Platform Aktif Resmi SMK & DUDI
                </span>
              </div>
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
              <h5>KOTA PENEMPATAN</h5>
              <ul class="footer-dark-links">
                <li><a onclick="App.quickFilterCity('Bekasi')">Kota & Kab. Bekasi</a></li>
                <li><a onclick="App.quickFilterCity('Jakarta')">DKI Jakarta</a></li>
                <li><a onclick="App.quickFilterCity('Bandung')">Bandung & Cimahi</a></li>
                <li><a onclick="App.quickFilterCity('Surabaya')">Surabaya & Sidoarjo</a></li>
                <li><a onclick="App.quickFilterCity('Malang')">Malang Raya</a></li>
              </ul>
            </div>

            <div class="footer-dark-col">
              <h5>BKK & HUBIN TARUNA BANGSA</h5>
              <div class="footer-contact-info">
                <p>Email: <a href="mailto:hubin@smktarunabangsa.sch.id">hubin@smktarunabangsa.sch.id</a></p>
                <p>WhatsApp BKK: <strong>0812-8800-9900</strong></p>
                <p>Telp Sekolah: <strong>(021) 8895-1234</strong></p>
                <p style="margin-top: 6px; font-size: 12px; color: #64748b;">
                  Gedung BKK SMK Taruna Bangsa Kota Bekasi<br>
                  Jl. Kaliabang Bungur No. 24, Pejuang, Medan Satria<br>
                  Kota Bekasi, Jawa Barat 17131
                </p>
              </div>
            </div>
          </div>

          <div class="footer-dark-bottom">
            <div>
              &copy; 2026 <strong>FindMyPKL</strong> &bull; SMK Taruna Bangsa Kota Bekasi. Hak Cipta Dilindungi.
            </div>
            <div style="display: flex; gap: 16px; font-size: 12px; color: #64748b;">
              <a onclick="App.goToPortalTab('mitra')" style="cursor: pointer;">Mitra Industri</a>
              <a onclick="App.goToPortalTab('ulasan')" style="cursor: pointer;">Ulasan Perusahaan</a>
              <a onclick="App.goToPortalTab('favorit')" style="cursor: pointer;">Favorit Saya</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
});
