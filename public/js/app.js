// ==========================================================================
// FIND MY PKL - CORE APPLICATION CONTROLLER
// Public Homepage + Siswa & HUBIN Portals
// Integrated with In-Memory Standalone Store
// ==========================================================================

window.App = {
  // Application State
  currentRole: 'PUBLIC', // 'PUBLIC', 'SISWA', 'HUBIN', 'LOGIN', 'REGISTER'
  currentTab: 'beranda', // 'beranda', 'katalog', 'mitra', 'favorit', 'ulasan', 'dashboard', 'verifikasi', 'persetujuan', 'lowongan', 'mitra-hubin', 'monitoring', 'alumni', 'lamaran', 'penempatan', 'profil'
  currentStudent: null,
  currentStudentId: null,
  isLoggedIn: false,
  bookmarkedJobs: new Set(),
  databaseInfo: null,
  cachedJobs: [],
  cachedCompanies: [],
  regFormState: null,

  getCompanyLogoHtml(item, options = {}) {
    return window.renderCompanyLogo ? window.renderCompanyLogo(item, options) : '';
  },

  getCompanyLogoUrl(item) {
    return window.getCompanyLogoUrl ? window.getCompanyLogoUrl(item) : '/images/logos/default-company.svg';
  },

  renderJobCard(j, options = {}) {
    return window.renderPklJobCard ? window.renderPklJobCard(j, options) : '';
  },

  saveSession() {
    try {
      const session = {
        role: this.currentRole,
        studentId: this.currentStudentId,
        tab: this.currentTab
      };
      localStorage.setItem('findmypkl_session', JSON.stringify(session));
    } catch (e) {
      console.warn('Failed to save session:', e);
    }
  },

  loadSession() {
    try {
      const raw = localStorage.getItem('findmypkl_session');
      if (raw) {
        const session = JSON.parse(raw);
        if (session && session.role) {
          this.currentRole = session.role;
          if (session.role === 'SISWA' && session.studentId) {
            this.currentStudentId = Number(session.studentId);
          } else if (session.role === 'PUBLIC') {
            this.currentStudentId = null;
          }
          if (session.tab) this.currentTab = session.tab;
        }
      } else {
        this.currentRole = 'PUBLIC';
        this.currentStudentId = null;
        this.currentTab = 'beranda';
      }
      if (this.currentRole === 'SISWA' && this.currentStudentId) {
        const rawBm = localStorage.getItem('findmypkl_bookmarks');
        if (rawBm) {
          try {
            const bm = JSON.parse(rawBm);
            if (Array.isArray(bm)) this.bookmarkedJobs = new Set(bm);
          } catch (e) {}
        }
      } else {
        this.bookmarkedJobs = new Set();
      }
    } catch (e) {
      console.warn('Failed to load session:', e);
    }
  },

  clearSession() {
    this.currentRole = 'PUBLIC';
    this.currentStudentId = null;
    this.currentStudent = null;
    this.isLoggedIn = false;
    this.bookmarkedJobs = new Set();
    try {
      localStorage.removeItem('findmypkl_session');
      localStorage.removeItem('findmypkl_bookmarks');
    } catch (e) {
      console.warn('Failed to clear session:', e);
    }
  },

  initLenis() {
    if (typeof Lenis === 'undefined') return;
    try {
      window.lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: false, // Let mouse wheel scroll naturally with zero hijacking or freezing
        syncTouch: false,
        autoRaf: true,
        prevent: (node) => {
          if (!node || !node.closest) return false;
          return Boolean(node.closest('.modal-dialog, .modal-backdrop, .modal-body, .mkt-filter-sheet, .app-sidebar, [data-lenis-prevent]'));
        }
      });

      window.lenis.on('scroll', () => {
        this.updateNavbarScroll();
      });

      // Failsafe native scroll listener for navbar transparency & floating states
      window.addEventListener('scroll', () => {
        this.updateNavbarScroll();
      }, { passive: true });

      // Global observer for dynamic DOM height updates (SPA catalog, filters, tabs)
      if (typeof ResizeObserver !== 'undefined' && typeof document !== 'undefined' && document.body) {
        const ro = new ResizeObserver(() => {
          if (window.lenis) {
            try { window.lenis.resize(); } catch (e) {}
          }
        });
        ro.observe(document.body);
        const mainEl = document.querySelector('.app-main') || document.getElementById('app-container');
        if (mainEl) ro.observe(mainEl);
      }
    } catch (e) {
      console.warn('Failed to initialize Lenis smooth scroll:', e);
    }
  },

  async init() {
    console.log('Initializing Find My PKL App...');
    this.initLenis();
    this.loadSession(); // Restore user login session automatically
    await this.fetchDatabaseHealth();
    await this.loadInitialData();
    this.setupEventListeners();
    await this.render();
  },

  async fetchDatabaseHealth() {
    try {
      const data = await API.getHealth();
      this.databaseInfo = data;
      this.updateDbStatusPill(true);
    } catch (err) {
      console.warn('Database health check warning:', err);
      this.updateDbStatusPill(false);
    }
  },

  updateDbStatusPill(isOnline) {
    const pill = document.getElementById('tidb-pill');
    if (!pill) return;
    if (isOnline) {
      pill.innerHTML = `
        <span class="pulse-dot"></span>
        <span>Mode Data Dummy Aktif</span>
      `;
      pill.title = 'Mode Data Dummy Mandiri - Klik untuk rincian & opsi reset data';
    } else {
      pill.innerHTML = `
        <span style="width:8px; height:8px; border-radius:50%; background-color:#f43f5e;"></span>
        <span>Server Offline</span>
      `;
    }
  },

  async loadInitialData() {
    try {
      this.allStudents = await API.getStudents();
      this.cachedJobs = await API.getJobs();
      if (this.currentRole === 'SISWA' && this.currentStudentId) {
        this.currentStudent = this.allStudents.find(s => s.id === this.currentStudentId) || null;
        if (this.currentStudent) {
          this.currentStudentId = this.currentStudent.id;
          try {
            const favRes = await API.getFavorites(this.currentStudent.id);
            if (favRes && Array.isArray(favRes.favorites)) {
              this.bookmarkedJobs = new Set(favRes.favorites);
            }
          } catch (e) {
            this.bookmarkedJobs = new Set();
          }
        } else {
          this.currentStudentId = null;
          this.bookmarkedJobs = new Set();
        }
      } else {
        this.currentStudent = null;
        this.bookmarkedJobs = new Set();
        if (this.currentRole !== 'SISWA') {
          this.currentStudentId = null;
        }
      }
      this.populateRoleSelect();
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  },

  populateRoleSelect() {
    const roleSelect = document.getElementById('demo-role-select');
    if (!roleSelect) return;

    const currentValue = roleSelect.value;
    const studentOptions = this.allStudents.map(s => {
      const statusText = s.status_verifikasi === 'Terverifikasi' ? 'Terverifikasi' : s.status_verifikasi;
      return `<option value="SISWA_${s.id}">${s.nama} (${s.kelas} &bull; ${statusText})</option>`;
    }).join('');

    roleSelect.innerHTML = `
      <optgroup label="🌐 Halaman Pengunjung">
        <option value="PUBLIC">Beranda Publik (Homepage Pengunjung)</option>
      </optgroup>
      <optgroup label="👤 Siswa SMK (Pengguna Siswa)">
        ${studentOptions}
      </optgroup>
      <optgroup label="🏫 HUBIN (Admin Hubungan Industri Sekolah)">
        <option value="HUBIN">Drs. Bambang H., M.Pd (Koordinator HUBIN)</option>
      </optgroup>
      <optgroup label="📝 Alur Pendaftaran">
        <option value="REGISTER">+ Registrasi Akun Siswa Baru</option>
      </optgroup>
    `;

    if (this.currentRole === 'PUBLIC') {
      roleSelect.value = 'PUBLIC';
    } else if (this.currentRole === 'SISWA') {
      roleSelect.value = `SISWA_${this.currentStudentId}`;
    } else {
      roleSelect.value = this.currentRole;
    }
  },

  setupEventListeners() {
    const roleSelect = document.getElementById('demo-role-select');
    if (roleSelect) {
      roleSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'PUBLIC') {
          this.setRole('PUBLIC');
        } else if (val === 'HUBIN') {
          this.setRole('HUBIN', 'dashboard');
        } else if (val === 'REGISTER') {
          this.setRole('REGISTER', 'register');
        } else {
          const studentId = parseInt(val.replace('SISWA_', ''));
          this.setRole('SISWA', 'katalog', studentId);
        }
      });
    }

    const closeBtn = document.getElementById('modal-close-btn');
    const backdrop = document.getElementById('global-modal-backdrop');
    if (closeBtn) closeBtn.addEventListener('click', () => Modal.close());
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) Modal.close();
      });
    }

    document.addEventListener('click', () => {
      const dropdown = document.getElementById('mkt-user-dropdown');
      if (dropdown) dropdown.style.display = 'none';
      const dropdownHome = document.getElementById('mkt-user-dropdown-home');
      if (dropdownHome) dropdownHome.style.display = 'none';
    });

    const tidbPill = document.getElementById('tidb-pill');
    if (tidbPill) {
      tidbPill.addEventListener('click', () => this.showDatabaseModal());
    }

    const menuToggle = document.getElementById('menu-toggle-btn');
    const sidebar = document.getElementById('app-sidebar');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

    if (menuToggle) {
      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openSidebar();
      });
    }

    if (sidebarCloseBtn) {
      sidebarCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeSidebar();
      });
    }

    if (sidebarBackdrop) {
      sidebarBackdrop.addEventListener('click', () => {
        this.closeSidebar();
      });
    }

    window.addEventListener('scroll', () => {
      this.updateNavbarScroll();
    }, { passive: true });
  },

  updateNavbarScroll() {
    const navbar = document.getElementById('public-navbar');
    if (!navbar) return;
    const hasTransparent = (navbar.classList && typeof navbar.classList.contains === 'function')
      ? navbar.classList.contains('navbar-transparent')
      : (navbar.className && navbar.className.includes('navbar-transparent'));
    if (!hasTransparent) return;

    const scrollY = (typeof window !== 'undefined' && window.lenis && typeof window.lenis.scroll === 'number')
      ? window.lenis.scroll
      : ((typeof window !== 'undefined' && (window.scrollY || window.pageYOffset || 0)) || 0);

    const scrolled = scrollY > 40;
    if (scrolled) {
      if (navbar.classList && typeof navbar.classList.add === 'function') {
        navbar.classList.add('navbar-scrolled');
      } else if (navbar.className && !navbar.className.includes('navbar-scrolled')) {
        navbar.className = (navbar.className + ' navbar-scrolled').trim();
      }
    } else {
      if (navbar.classList && typeof navbar.classList.remove === 'function') {
        navbar.classList.remove('navbar-scrolled');
      } else if (navbar.className) {
        navbar.className = navbar.className.replace('navbar-scrolled', '').trim();
      }
    }
  },

  openSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    if (document.body && document.body.classList) {
      document.body.classList.add('sidebar-drawer-open');
    }
  },

  closeSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    if (document.body && document.body.classList) {
      document.body.classList.remove('sidebar-drawer-open');
    }
    if (typeof window !== 'undefined' && window.lenis) {
      try { window.lenis.start(); window.lenis.resize(); } catch (e) {}
    }
  },




  setRole(role, initialTab = null, studentId = null) {
    this.currentRole = role;
    if (role === 'SISWA') {
      const idToUse = studentId || this.currentStudentId || 1;
      this.currentStudentId = idToUse;
      this.currentStudent = this.allStudents.find(s => s.id === idToUse) || this.allStudents[0];
      if (this.currentStudent) {
        API.getFavorites(this.currentStudent.id).then(res => {
          if (res && Array.isArray(res.favorites)) {
            this.bookmarkedJobs = new Set(res.favorites);
            const badge = document.getElementById('top-fav-badge-count');
            if (badge) badge.textContent = this.bookmarkedJobs.size;
          }
        }).catch(() => {});
      }
    } else if (role === 'PUBLIC') {
      this.currentStudent = null;
      this.currentStudentId = null;
      this.bookmarkedJobs = new Set();
    }

    if (initialTab) {
      this.currentTab = initialTab;
    } else {
      if (role === 'PUBLIC') this.currentTab = 'beranda';
      else if (role === 'LOGIN') this.currentTab = 'login';
      else if (role === 'REGISTER') this.currentTab = 'register';
      else if (role === 'SISWA') this.currentTab = 'katalog';
      else if (role === 'HUBIN') this.currentTab = 'dashboard';
    }

    this.closeSidebar();
    this.saveSession();
    this.render();
  },

  setTab(tab) {
    this.currentTab = tab;
    this.closeSidebar();
    this.saveSession();
    this.render();
  },


  logout() {
    this.clearSession();
    this.currentRole = 'PUBLIC';
    this.currentTab = 'beranda';
    this.currentStudentId = null;
    this.currentStudent = null;
    Toast.show('Berhasil Keluar', 'Anda telah keluar dari akun.', 'info');
    this.render();
  },

  goToPortalTab(tab) {
    this.currentTab = tab;
    if (this.currentRole === 'LOGIN' || this.currentRole === 'REGISTER') {
      this.currentRole = this.currentStudent ? 'SISWA' : 'PUBLIC';
    }
    this.saveSession();
    if (typeof document !== 'undefined') {
      if (document.body) document.body.style.overflow = '';
      if (document.documentElement) document.documentElement.style.overflow = '';
    }
    if (typeof window !== 'undefined' && window.lenis) {
      try {
        window.lenis.start();
        window.lenis.resize();
        window.lenis.scrollTo(0, { immediate: true });
      } catch (e) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.render();
  },

  viewCompanyJobs(companyId, companyName) {
    this.initialCatalogSearch = {
      keyword: companyName || '',
      jurusan: 'Semua',
      kota: 'Semua'
    };
    this.goToPortalTab('katalog');
  },

  renderSidebar() {
    const userAvatar = document.getElementById('sidebar-user-avatar');
    const userName = document.getElementById('sidebar-user-name');
    const userRoleTag = document.getElementById('sidebar-user-tag');
    const navList = document.getElementById('sidebar-nav-list');

    if (this.currentRole === 'SISWA') {
      const s = this.currentStudent || { nama: 'Siswa SMK', kelas: 'XII RPL 1', status_verifikasi: 'Menunggu Verifikasi' };
      userAvatar.textContent = s.nama.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
      userName.textContent = s.nama;
      userRoleTag.innerHTML = `${s.kelas} &bull; ${renderBadge(s.status_verifikasi)}`;

      navList.innerHTML = `
        <div class="nav-section-title">Navigasi Utama</div>
        <a class="nav-item" onclick="App.setRole('PUBLIC')" style="color: var(--primary-600); font-weight: 600;">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Kembali ke Beranda</span>
          </div>
        </a>

        <div class="nav-section-title">Menu Siswa</div>
        <a class="nav-item ${this.currentTab === 'katalog' ? 'active' : ''}" onclick="App.goToPortalTab('katalog')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>Cari & Jelajah Lowongan</span>
          </div>
        </a>
        <a class="nav-item ${this.currentTab === 'lamaran' ? 'active' : ''}" onclick="App.setTab('lamaran')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span>Lamaran Saya</span>
          </div>
        </a>
        <a class="nav-item ${this.currentTab === 'penempatan' ? 'active' : ''}" onclick="App.setTab('penempatan')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <span>Tempat PKL Aktif</span>
          </div>
        </a>
        <a class="nav-item ${this.currentTab === 'profil' ? 'active' : ''}" onclick="App.setTab('profil')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Profil & Status Akun</span>
          </div>
        </a>

        <div class="nav-section-title">Jelajah & Informasi</div>
        <a class="nav-item ${this.currentTab === 'mitra' ? 'active' : ''}" onclick="App.goToPortalTab('mitra')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Mitra Industri (DUDI)</span>
          </div>
        </a>
        <a class="nav-item ${this.currentTab === 'favorit' ? 'active' : ''}" onclick="App.goToPortalTab('favorit')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>Lowongan Favorit</span>
          </div>
        </a>
        <a class="nav-item ${this.currentTab === 'ulasan' ? 'active' : ''}" onclick="App.goToPortalTab('ulasan')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>Ulasan Perusahaan</span>
          </div>
        </a>

        <div class="nav-section-title">Sesi Akun</div>
        <a class="nav-item" onclick="App.logout()" style="color: #dc2626; cursor: pointer;">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span>Keluar dari Akun</span>
          </div>
        </a>
      `;
    } else if (this.currentRole === 'HUBIN') {
      userAvatar.textContent = 'HB';
      userName.textContent = 'Drs. Bambang H., M.Pd';
      userRoleTag.textContent = 'Kepala Hubungan Industri (HUBIN)';

      navList.innerHTML = `
        <div class="nav-section-title">Navigasi Utama</div>
        <a class="nav-item" onclick="App.setRole('PUBLIC')" style="color: var(--primary-600); font-weight: 600;">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Kembali ke Beranda</span>
          </div>
        </a>

        <div class="nav-section-title">Menu Utama HUBIN</div>
        <a class="nav-item ${this.currentTab === 'dashboard' ? 'active' : ''}" onclick="App.setTab('dashboard')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Dashboard Ringkasan</span>
          </div>
        </a>
        <a class="nav-item ${this.currentTab === 'verifikasi' ? 'active' : ''}" onclick="App.setTab('verifikasi')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
            <span>Verifikasi Siswa</span>
          </div>
        </a>
        <a class="nav-item ${this.currentTab === 'persetujuan' ? 'active' : ''}" onclick="App.setTab('persetujuan')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg>
            <span>Persetujuan Lamaran</span>
          </div>
        </a>
        <a class="nav-item ${this.currentTab === 'lowongan' ? 'active' : ''}" onclick="App.setTab('lowongan')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <span>Kelola Lowongan PKL</span>
          </div>
        </a>
        <a class="nav-item ${this.currentTab === 'mitra' ? 'active' : ''}" onclick="App.setTab('mitra')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Mitra Industri (DUDI)</span>
          </div>
        </a>
        <a class="nav-item ${this.currentTab === 'monitoring' ? 'active' : ''}" onclick="App.setTab('monitoring')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            <span>Monitoring Siswa PKL</span>
          </div>
        </a>
        <a class="nav-item ${this.currentTab === 'alumni' ? 'active' : ''}" onclick="App.setTab('alumni')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            <span>Riwayat & Alumni PKL</span>
          </div>
        </a>

        <div class="nav-section-title">Sesi Admin</div>
        <a class="nav-item" onclick="App.logout()" style="color: #dc2626; cursor: pointer;">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span>Keluar dari Admin</span>
          </div>
        </a>
      `;
    } else if (this.currentRole === 'REGISTER') {
      userAvatar.textContent = 'REG';
      userName.textContent = 'Pendaftaran Siswa';
      userRoleTag.textContent = 'Calon Siswa PKL';

      navList.innerHTML = `
        <div class="nav-section-title">Navigasi Utama</div>
        <a class="nav-item" onclick="App.setRole('PUBLIC')" style="color: var(--primary-600); font-weight: 600;">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Kembali ke Beranda</span>
          </div>
        </a>

        <div class="nav-section-title">Pendaftaran</div>
        <a class="nav-item active" onclick="App.setTab('register')">
          <div class="nav-item-left">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            <span>Formulir Pendaftaran</span>
          </div>
        </a>
      `;
    }
  },

  renderHeader() {
    const titleEl = document.getElementById('header-title');
    const descEl = document.getElementById('header-desc');
    const actionsEl = document.getElementById('header-actions');

    actionsEl.innerHTML = '';

    const logoutBtnHtml = `
      <button class="btn-logout-clean" onclick="App.logout()" title="Keluar dari akun">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span>Keluar</span>
      </button>
    `;

    if (this.currentRole === 'SISWA') {
      if (this.currentTab === 'katalog') {
        titleEl.textContent = 'Jelajah Lowongan PKL';
        descEl.textContent = 'Temukan tempat Praktik Kerja Lapangan dari mitra industri terpercaya yang sesuai dengan kejuruan Anda.';
      } else if (this.currentTab === 'lamaran') {
        titleEl.textContent = 'Pelacak Lamaran Saya';
        descEl.textContent = 'Pantau tahapan verifikasi berkas oleh HUBIN hingga persetujuan dari perusahaan mitra DUDI.';
      } else if (this.currentTab === 'penempatan') {
        titleEl.textContent = 'Tempat Penempatan PKL Aktif';
        descEl.textContent = 'Informasi pembimbing, durasi magang, dan pengisian jurnal kegiatan (logbook) harian.';
      } else if (this.currentTab === 'profil') {
        titleEl.textContent = 'Profil & Status Siswa';
        descEl.textContent = 'Informasi akun Dapodik siswa, kelengkapan berkas, dan status verifikasi dari pihak HUBIN.';
      }
      actionsEl.innerHTML = logoutBtnHtml;
    } else if (this.currentRole === 'HUBIN') {
      if (this.currentTab === 'dashboard') {
        titleEl.textContent = 'Dashboard Hubungan Industri (HUBIN)';
        descEl.textContent = 'Pusat kendali tata kelola PKL SMK Taruna Bangsa Kota Bekasi (BKK & Hubungan Industri).';
        actionsEl.innerHTML = `
          <button class="btn btn-primary btn-sm" onclick="App.setTab('verifikasi')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Antrean Verifikasi
          </button>
          <button class="btn btn-secondary btn-sm" onclick="App.showAddJobModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Tambah Lowongan
          </button>
          ${logoutBtnHtml}
        `;
      } else if (this.currentTab === 'verifikasi') {
        titleEl.textContent = 'Verifikasi Akun Siswa';
        descEl.textContent = 'Validasi identitas NISN, rombongan belajar, dan rapor siswa sebelum dapat melamar PKL.';
        actionsEl.innerHTML = logoutBtnHtml;
      } else if (this.currentTab === 'persetujuan') {
        titleEl.textContent = 'Persetujuan Lamaran PKL Siswa';
        descEl.textContent = 'Tinjau kesesuaian kompetensi keahlian dan terbitkan Surat Pengantar resmi ke mitra industri.';
        actionsEl.innerHTML = logoutBtnHtml;
      } else if (this.currentTab === 'lowongan') {
        titleEl.textContent = 'Kelola Lowongan PKL';
        descEl.textContent = 'Kelola kuota, jurusan target, dan penawaran PKL dari perusahaan mitra DUDI.';
        actionsEl.innerHTML = `
          <button class="btn btn-primary btn-sm" onclick="App.showAddJobModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Tambah Lowongan Baru
          </button>
          ${logoutBtnHtml}
        `;
      } else if (this.currentTab === 'mitra') {
        titleEl.textContent = 'Mitra Industri (DUDI)';
        descEl.textContent = 'Daftar perusahaan rekanan SMK, nomor nota kesepahaman (MoU), dan kontak penanggung jawab.';
        actionsEl.innerHTML = `
          <button class="btn btn-primary btn-sm" onclick="App.showAddCompanyModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Tambah Mitra Baru
          </button>
          ${logoutBtnHtml}
        `;
      } else if (this.currentTab === 'monitoring') {
        titleEl.textContent = 'Monitoring Siswa PKL Aktif';
        descEl.textContent = 'Pantau keaktifan siswa magang, kelengkapan logbook harian, serta evaluasi akhir nilai industri.';
        actionsEl.innerHTML = logoutBtnHtml;
      } else if (this.currentTab === 'alumni') {
        titleEl.textContent = 'Riwayat Penempatan & Pelacak Alumni';
        descEl.textContent = 'Arsip data mantan siswa yang telah menyelesaikan PKL di perusahaan mitra tertentu.';
        actionsEl.innerHTML = logoutBtnHtml;
      }
    } else if (this.currentRole === 'REGISTER') {
      titleEl.textContent = 'Registrasi Akun Siswa Baru';
      descEl.textContent = 'Daftarkan diri Anda untuk memulai pencarian tempat Praktik Kerja Lapangan (PKL).';
    }
  },

  async renderContent() {
    const container = document.getElementById('main-content-body');
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 0;">
        <div style="width: 38px; height: 38px; border: 3px solid #e2e8f0; border-top-color: var(--primary-600); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px;"></div>
        <p style="color: var(--slate-500); font-size: 14px;">Memuat data sistem Find My PKL...</p>
      </div>
      <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
    `;

    try {
      if (this.currentRole === 'SISWA') {
        if (this.currentTab === 'katalog') await this.renderSiswaKatalog(container);
        else if (this.currentTab === 'lamaran') await this.renderSiswaLamaran(container);
        else if (this.currentTab === 'penempatan') await this.renderSiswaPenempatan(container);
        else if (this.currentTab === 'profil') await this.renderSiswaProfil(container);
      } else if (this.currentRole === 'HUBIN') {
        if (this.currentTab === 'dashboard') await this.renderHubinDashboard(container);
        else if (this.currentTab === 'verifikasi') await this.renderHubinVerifikasi(container);
        else if (this.currentTab === 'persetujuan') await this.renderHubinPersetujuan(container);
        else if (this.currentTab === 'lowongan') await this.renderHubinLowongan(container);
        else if (this.currentTab === 'mitra') await this.renderHubinMitra(container);
        else if (this.currentTab === 'monitoring') await this.renderHubinMonitoring(container);
        else if (this.currentTab === 'alumni') await this.renderHubinAlumni(container);
      } else if (this.currentRole === 'REGISTER') {
        this.renderRegisterPage(container);
      }
    } catch (err) {
      container.innerHTML = `
        <div class="card" style="border-left: 4px solid var(--rose-600);">
          <h3 style="color: var(--rose-700); margin-bottom: 8px;">Gagal Memuat Konten</h3>
          <p style="color: var(--slate-600); font-size: 14px;">${err.message}</p>
          <button class="btn btn-secondary btn-sm" style="margin-top: 16px;" onclick="App.render()">Coba Lagi</button>
        </div>
      `;
    }
  },

  async render() {
    if (typeof document !== 'undefined') {
      if (document.body) document.body.style.overflow = '';
      if (document.documentElement) document.documentElement.style.overflow = '';
    }
    if (typeof window !== 'undefined' && window.lenis) {
      try {
        window.lenis.start();
        window.lenis.resize();
      } catch (e) {}
    }

    const sidebar = document.getElementById('app-sidebar');
    const header = document.getElementById('main-header');
    const contentBody = document.getElementById('main-content-body');

    if (this.currentRole === 'LOGIN') {
      if (sidebar) sidebar.style.display = 'none';
      if (header) header.style.display = 'none';
      if (contentBody) {
        contentBody.style.padding = '0';
        contentBody.style.maxWidth = '100%';
        contentBody.style.margin = '0';
      }
      this.renderLoginPage(contentBody, this.currentTab === 'hubin' ? 'hubin' : 'siswa');
      return;
    }

    if (this.currentRole === 'REGISTER') {
      if (sidebar) sidebar.style.display = 'none';
      if (header) header.style.display = 'none';
      if (contentBody) {
        contentBody.style.padding = '0';
        contentBody.style.maxWidth = '100%';
        contentBody.style.margin = '0';
      }
      this.renderRegisterPage(contentBody);
      return;
    }

    const portalTabs = ['beranda', 'katalog', 'mitra', 'favorit', 'ulasan'];
    const isPortalView = portalTabs.includes(this.currentTab) || this.currentRole === 'PUBLIC';

    if (isPortalView && this.currentRole !== 'HUBIN') {
      if (sidebar) sidebar.style.display = 'none';
      if (header) header.style.display = 'none';
      if (contentBody) {
        contentBody.style.padding = '0';
        contentBody.style.maxWidth = '100%';
        contentBody.style.margin = '0';
      }

      if (this.currentTab === 'katalog') {
        await this.renderMarketplaceCatalog(contentBody, this.currentRole === 'SISWA');
      } else if (this.currentTab === 'mitra') {
        await this.renderMitraIndustriPage(contentBody);
      } else if (this.currentTab === 'favorit') {
        await this.renderFavoritSayaPage(contentBody);
      } else if (this.currentTab === 'ulasan') {
        await this.renderUlasanPerusahaanPage(contentBody);
      } else {
        await this.renderPublicHomepage(contentBody);
      }
      if (typeof window !== 'undefined' && window.lenis) {
        try { window.lenis.resize(); } catch (e) {}
      }
      return;
    }

    // Dashboard with sidebar & header (SISWA internal tabs: lamaran, profil, jurnal, penempatan; or HUBIN)
    if (sidebar) sidebar.style.display = '';
    if (header) header.style.display = '';
    if (contentBody) {
      contentBody.style.padding = '';
      contentBody.style.maxWidth = '';
      contentBody.style.margin = '';
    }
    this.renderSidebar();
    this.renderHeader();
    await this.renderContent();
    if (typeof window !== 'undefined' && window.lenis) {
      try { window.lenis.resize(); } catch (e) {}
    }
  },

  showDatabaseModal() {
    const info = this.databaseInfo || {};
    const db = info.database || {};
    const counts = info.counts || {};

    const contentHtml = `
      <div>
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 20px; border-radius: var(--radius-lg); margin-bottom: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="pulse-dot"></span>
              <span style="font-weight: 700; font-size: 15px; color: #a7f3d0;">Mode Data Dummy Mandiri</span>
            </div>
            <span style="font-size: 12px; background: rgba(255,255,255,0.15); padding: 2px 8px; border-radius: var(--radius-full);">In-Memory Standalone</span>
          </div>
          <div style="font-size: 13px; color: #94a3b8;">
            Tipe Mesin: <strong>${db.engine || 'Penyimpanan Data Mock Standalone'}</strong>
          </div>
          <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">
            Status: <strong style="color: #34d399;">Aktif & Siap Digunakan (Bebas Koneksi Database Eksternal)</strong>
          </div>
          <div style="font-size: 12px; color: #cbd5e1; margin-top: 8px; line-height: 1.5;">
            Seluruh fitur pencarian, pendaftaran siswa, verifikasi akun HUBIN, pengajuan lamaran, penerbitan surat pengantar, hingga jurnal logbook harian berjalan 100% menggunakan memori server.
          </div>
        </div>

        <h4 style="font-size: 15px; font-weight: 700; color: var(--slate-900); margin-bottom: 12px;">Ringkasan Data Demo Aktif:</h4>
        <div class="grid-2" style="margin-bottom: 20px;">
          <div style="background-color: var(--slate-50); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 12px; color: var(--slate-500);">Siswa Terdaftar</div>
            <div style="font-size: 20px; font-weight: 700; color: var(--slate-900);">${counts.students_count || 0}</div>
          </div>
          <div style="background-color: var(--slate-50); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 12px; color: var(--slate-500);">Mitra Industri (DUDI)</div>
            <div style="font-size: 20px; font-weight: 700; color: var(--slate-900);">${counts.companies_count || 0}</div>
          </div>
          <div style="background-color: var(--slate-50); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 12px; color: var(--slate-500);">Lowongan PKL Tersedia</div>
            <div style="font-size: 20px; font-weight: 700; color: var(--slate-900);">${counts.jobs_count || 0}</div>
          </div>
          <div style="background-color: var(--slate-50); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 12px; color: var(--slate-500);">Total Lamaran & Penempatan</div>
            <div style="font-size: 20px; font-weight: 700; color: var(--slate-900);">${(counts.applications_count || 0) + (counts.active_placements_count || 0)}</div>
          </div>
        </div>

        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary" style="flex: 1;" onclick="App.handleResetDummyData()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
            Reset Data Dummy ke Awal
          </button>
          <button class="btn btn-primary" style="flex: 1;" onclick="Modal.close()">
            Tutup
          </button>
        </div>
      </div>
    `;

    Modal.open(contentHtml, 'Status Data Dummy Mandiri');
  },

  async handleResetDummyData() {
    try {
      await API.resetData();
      await this.fetchDatabaseHealth();
      await this.loadInitialData();
      Toast.show('Data Direset', 'Seluruh data dummy berhasil dikembalikan ke kondisi awal.', 'success');
      Modal.close();
      await this.render();
    } catch (err) {
      Toast.show('Gagal Reset', err.message, 'error');
    }
  }
};

// Start application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
