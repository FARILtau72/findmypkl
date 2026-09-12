// ==========================================================================
// FIND MY PKL - AUTHENTICATION & REGISTRATION MODULE
// Login Switcher, Multi-step Registration Wizard, Verification States
// ==========================================================================

window.App = window.App || {};
Object.assign(window.App, {
  renderLoginPage(container, defaultTab = 'siswa') {
    let activeTab = defaultTab;

    const renderCard = () => {
      container.innerHTML = `
        <div class="auth-page-container">
          <div class="auth-card-modern">
            <div class="auth-card-header">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <button class="btn btn-ghost btn-sm" onclick="App.setRole('PUBLIC')" style="font-size: 13px; padding: 4px 10px; color: var(--slate-600);">
                  &larr; Beranda
                </button>
                <div class="brand-logo-modern" style="cursor: pointer;" onclick="App.setRole('PUBLIC')">
                  <div class="brand-logo-icon" style="width: 32px; height: 32px;">
                    <img src="images/logo.png" alt="FindMyPKL Logo" />
                  </div>
                  <div class="brand-logo-text" style="font-size: 18px;">FindMy<span style="color: #059669;">PKL</span></div>
                </div>
                <div style="width: 70px;"></div>
              </div>

              <h3 style="font-size: 22px; font-weight: 800; color: var(--slate-900);">Masuk ke Portal</h3>
              <p style="font-size: 13px; color: var(--slate-500); margin-top: 4px;">Sistem Informasi PKL SMK Taruna Bangsa Kota Bekasi</p>

              <div class="auth-tabs-row">
                <button type="button" class="auth-tab-btn ${activeTab === 'siswa' ? 'active' : ''}" id="tab-btn-siswa">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Siswa SMK
                </button>
                <button type="button" class="auth-tab-btn ${activeTab === 'hubin' ? 'active' : ''}" id="tab-btn-hubin">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                  HUBIN (Admin)
                </button>
              </div>
            </div>

            <div class="auth-card-body">
              ${activeTab === 'siswa' ? `
                <form id="siswa-login-form" onsubmit="event.preventDefault(); App.handleSiswaLogin();">
                  <div class="form-group" style="margin-bottom: 16px;">
                    <label class="form-label" style="font-weight: 700; font-size: 13px;">NISN atau Alamat Email Siswa</label>
                    <input type="text" id="login-student-identity" class="form-input" placeholder="Contoh: 0061829901 atau ahmad.fauzi@..." required autofocus />
                  </div>

                  <div class="form-group" style="margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <label class="form-label" style="margin-bottom: 0; font-weight: 700; font-size: 13px;">Password</label>
                      <span style="font-size: 12px; color: var(--slate-400);">Default: password123</span>
                    </div>
                    <div class="input-password-wrapper">
                      <input type="password" id="login-student-password" class="form-input" placeholder="Masukkan password Anda" required value="password123" />
                      <button type="button" class="btn-toggle-pwd" onclick="App.togglePasswordVisibility('login-student-password', this)">
                        👁️
                      </button>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: 700; font-size: 14px; border-radius: var(--radius-md);">
                    Masuk sebagai Siswa &rarr;
                  </button>
                </form>

                <div style="text-align: center; margin-top: 18px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
                  <span style="font-size: 13px; color: var(--slate-600);">Belum punya akun siswa? </span>
                  <a onclick="App.setRole('REGISTER')" style="font-size: 13px; font-weight: 700; color: var(--primary-600); cursor: pointer; text-decoration: underline;">
                    Daftar Sekarang &rarr;
                  </a>
                </div>

                <div class="quick-test-accounts-box">
                  <h5>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    Uji Coba 4 Status Akun Siswa:
                  </h5>
                  <div class="quick-test-grid">
                    <div class="quick-test-pill" onclick="App.quickLoginStudent(1)">
                      <div>
                        <strong>Ahmad Fauzi</strong> (XII RPL 1)
                        <div style="font-size: 11px; color: #64748b;">Status: Terverifikasi (Akses Penuh)</div>
                      </div>
                      <span class="badge badge-emerald" style="font-size: 10.5px;">Terverifikasi</span>
                    </div>

                    <div class="quick-test-pill" onclick="App.quickLoginStudent(2)">
                      <div>
                        <strong>Siti Rahma Azzahra</strong> (XI RPL 1)
                        <div style="font-size: 11px; color: #64748b;">Status: Menunggu Verifikasi HUBIN</div>
                      </div>
                      <span class="badge badge-amber" style="font-size: 10.5px;">Menunggu</span>
                    </div>

                    <div class="quick-test-pill" onclick="App.quickLoginStudent(6)">
                      <div>
                        <strong>Reza Aditya Putra</strong> (XI TAV 1)
                        <div style="font-size: 11px; color: #64748b;">Status: Perlu Perbaikan (Koreksi Data)</div>
                      </div>
                      <span class="badge badge-orange" style="font-size: 10.5px;">Perlu Perbaikan</span>
                    </div>

                    <div class="quick-test-pill" onclick="App.quickLoginStudent(7)">
                      <div>
                        <strong>Clara Anindya</strong> (XI TITL 1)
                        <div style="font-size: 11px; color: #64748b;">Status: Ditolak (Alasan Penolakan)</div>
                      </div>
                      <span class="badge badge-rose" style="font-size: 10.5px;">Ditolak</span>
                    </div>
                  </div>
                </div>
              ` : `
                <form id="hubin-login-form" onsubmit="event.preventDefault(); App.handleHubinLogin();">
                  <div class="form-group" style="margin-bottom: 16px;">
                    <label class="form-label" style="font-weight: 700; font-size: 13px;">NIP atau Email Koordinator HUBIN</label>
                    <input type="text" id="login-hubin-identity" class="form-input" placeholder="hubin@smktarunabangsa.sch.id" value="hubin@smktarunabangsa.sch.id" required autofocus />
                  </div>

                  <div class="form-group" style="margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <label class="form-label" style="margin-bottom: 0; font-weight: 700; font-size: 13px;">Password Administrator</label>
                      <span style="font-size: 12px; color: var(--slate-400);">Default: admin123</span>
                    </div>
                    <div class="input-password-wrapper">
                      <input type="password" id="login-hubin-password" class="form-input" placeholder="Masukkan password admin" required value="admin123" />
                      <button type="button" class="btn-toggle-pwd" onclick="App.togglePasswordVisibility('login-hubin-password', this)">
                        👁️
                      </button>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: 700; font-size: 14px; border-radius: var(--radius-md);">
                    Masuk sebagai HUBIN (Admin) &rarr;
                  </button>
                </form>

                <div class="quick-test-accounts-box" style="margin-top: 24px;">
                  <h5>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Akses Cepat Koordinator HUBIN:
                  </h5>
                  <div class="quick-test-pill" onclick="App.setRole('HUBIN', 'dashboard')">
                    <div>
                      <strong>Drs. Bambang H., M.Pd</strong>
                      <div style="font-size: 11px; color: #64748b;">Koordinator Hubungan Industri SMK Taruna Bangsa</div>
                    </div>
                    <span class="badge badge-indigo" style="font-size: 11px;">Admin HUBIN</span>
                  </div>
                </div>
              `}
            </div>
          </div>
        </div>
      `;

      const siswaBtn = document.getElementById('tab-btn-siswa');
      const hubinBtn = document.getElementById('tab-btn-hubin');
      if (siswaBtn) siswaBtn.addEventListener('click', () => { activeTab = 'siswa'; renderCard(); });
      if (hubinBtn) hubinBtn.addEventListener('click', () => { activeTab = 'hubin'; renderCard(); });
    };

    renderCard();
  },

  handleSiswaLogin() {
    const ident = (document.getElementById('login-student-identity').value || '').trim();
    if (!ident) {
      Toast.show('Perhatian', 'Masukkan NISN atau Email siswa terlebih dahulu.', 'error');
      return;
    }

    const found = this.allStudents.find(s => 
      s.nisn.toLowerCase() === ident.toLowerCase() || 
      s.email.toLowerCase() === ident.toLowerCase()
    );

    if (found) {
      this.currentStudentId = found.id;
      this.currentStudent = found;
      Toast.show('Login Berhasil', `Selamat datang, ${found.nama}!`, 'success');
      this.setRole('SISWA', found.status_verifikasi === 'Terverifikasi' ? 'katalog' : 'profil', found.id);
    } else {
      Toast.show('Akun Tidak Ditemukan', `NISN/Email "${ident}" tidak terdaftar di sistem. Silakan periksa kembali atau daftar baru.`, 'error');
    }
  },

  quickLoginStudent(studentId) {
    const student = this.allStudents.find(s => s.id === studentId);
    if (!student) return;
    this.currentStudentId = student.id;
    this.currentStudent = student;
    Toast.show('Login Berhasil', `Masuk sebagai ${student.nama} (${student.status_verifikasi})`, 'success');
    this.setRole('SISWA', student.status_verifikasi === 'Terverifikasi' ? 'katalog' : 'profil', student.id);
  },

  handleHubinLogin() {
    Toast.show('Login Berhasil', 'Selamat datang di Portal HUBIN SMK Taruna Bangsa Kota Bekasi!', 'success');
    this.setRole('HUBIN', 'dashboard');
  },

  togglePasswordVisibility(inputId, btnEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      btnEl.textContent = '🙈';
    } else {
      input.type = 'password';
      btnEl.textContent = '👁️';
    }
  },

  renderRegisterPage(container) {
    if (!this.regFormState) {
      this.regFormState = {
        step: 1,
        data: {
          nama: '',
          nisn: '',
          kelas: '',
          jurusan: 'Rekayasa Perangkat Lunak',
          email: '',
          no_hp: '',
          password: '',
          passwordConfirm: ''
        }
      };
    }

    const state = this.regFormState;

    const renderCurrentStep = () => {
      container.innerHTML = `
        <div class="reg-wizard-container" style="min-height: 100vh; padding: 40px 20px; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 10%, #ecfdf5 0%, #f8fafc 60%, #f1f5f9 100%);">
          <div class="reg-wizard-card">
            <div class="reg-wizard-top">
              <button class="btn btn-ghost btn-sm" onclick="App.setRole('PUBLIC')" style="font-size: 13px; padding: 6px 12px; color: var(--slate-600); display: inline-flex; align-items: center; gap: 6px;">
                &larr; Beranda
              </button>
              <div class="brand-logo-modern" style="cursor: pointer;" onclick="App.setRole('PUBLIC')">
                <div class="brand-logo-icon" style="width: 32px; height: 32px;">
                  <img src="images/logo.png" alt="FindMyPKL Logo" />
                </div>
                <div class="brand-logo-text" style="font-size: 18px;">FindMy<span style="color: #059669;">PKL</span></div>
              </div>
              <button class="btn btn-ghost btn-sm" onclick="App.setRole('LOGIN')" style="font-size: 13px; padding: 6px 12px; color: var(--primary-600); font-weight: 700;">
                Sudah Punya Akun? Masuk &rarr;
              </button>
            </div>

            <div class="reg-wizard-header">
              <h2>Registrasi Akun Siswa</h2>
              <p>Khusus Siswa Aktif SMK Taruna Bangsa Kota Bekasi &bull; Ikuti 3 tahapan pendaftaran dengan data yang valid.</p>
            </div>

            <div class="reg-steps-nav">
              <div class="reg-step-node ${state.step >= 1 ? (state.step === 1 ? 'active' : 'completed') : ''}">
                <div class="reg-step-bubble">${state.step > 1 ? '✓' : '1'}</div>
                <div class="reg-step-label">Data Akademik</div>
              </div>
              <div class="reg-step-connector ${state.step > 1 ? 'completed' : ''}"></div>
              <div class="reg-step-node ${state.step >= 2 ? (state.step === 2 ? 'active' : 'completed') : ''}">
                <div class="reg-step-bubble">${state.step > 2 ? '✓' : '2'}</div>
                <div class="reg-step-label">Kontak & Sandi</div>
              </div>
              <div class="reg-step-connector ${state.step > 2 ? 'completed' : ''}"></div>
              <div class="reg-step-node ${state.step === 3 ? 'active' : ''}">
                <div class="reg-step-bubble">3</div>
                <div class="reg-step-label">Konfirmasi Data</div>
              </div>
            </div>

            <div class="reg-wizard-body">
              <div class="reg-form-pane active">
              ${state.step === 1 ? `
                <form id="reg-step1-form" onsubmit="event.preventDefault(); App.handleRegStep1Next();">
                  <div class="form-group" style="margin-bottom: 16px;">
                    <label class="form-label" style="font-weight: 700;">Nama Lengkap Siswa *</label>
                    <input type="text" id="step-nama" class="form-input" placeholder="Masukkan nama lengkap sesuai buku induk / Dapodik" value="${state.data.nama || ''}" required autofocus />
                    <span style="font-size: 12px; color: var(--slate-500); margin-top: 3px; display: block;">Pastikan nama sesuai dengan yang terdaftar di sekolah.</span>
                  </div>

                  <div class="form-group" style="margin-bottom: 16px;">
                    <label class="form-label" style="font-weight: 700;">Nomor Induk Siswa / NISN *</label>
                    <input type="text" id="step-nisn" class="form-input" placeholder="Contoh: 0061829988 (10 digit NISN)" maxlength="15" value="${state.data.nisn || ''}" required />
                    <span style="font-size: 12px; color: var(--slate-500); margin-top: 3px; display: block;">NISN akan dicocokkan otomatis oleh HUBIN dengan database Dapodik.</span>
                  </div>

                  <div class="grid-2" style="margin-bottom: 24px;">
                    <div class="form-group">
                      <label class="form-label" style="font-weight: 700;">Kelas & Rombel *</label>
                      <input type="text" id="step-kelas" class="form-input" placeholder="Contoh: XI RPL 1" value="${state.data.kelas || ''}" required />
                      <span style="font-size: 12px; color: var(--slate-500); margin-top: 3px; display: block;">Format contoh: XI RPL 1 atau XI TAV 1</span>
                    </div>

                    <div class="form-group">
                      <label class="form-label" style="font-weight: 700;">Kompetensi Keahlian (Jurusan) *</label>
                      <select id="step-jurusan" class="form-select" required>
                        <option value="Rekayasa Perangkat Lunak" ${state.data.jurusan === 'Rekayasa Perangkat Lunak' ? 'selected' : ''}>Rekayasa Perangkat Lunak (RPL)</option>
                        <option value="Teknik Audio Video" ${state.data.jurusan === 'Teknik Audio Video' ? 'selected' : ''}>Teknik Audio Video (TAV)</option>
                        <option value="Teknik Instalasi Tenaga Listrik" ${state.data.jurusan === 'Teknik Instalasi Tenaga Listrik' ? 'selected' : ''}>Teknik Instalasi Tenaga Listrik (TITL)</option>
                        <option value="Teknik Kendaraan Ringan Otomotif" ${state.data.jurusan === 'Teknik Kendaraan Ringan Otomotif' ? 'selected' : ''}>Teknik Kendaraan Ringan Otomotif (TKRO)</option>
                      </select>
                      <span style="font-size: 12px; color: var(--slate-500); margin-top: 3px; display: block;">Pilih 1 dari 4 program keahlian resmi SMK Taruna Bangsa</span>
                    </div>
                  </div>

                  <div style="display: flex; justify-content: flex-end; gap: 12px;">
                    <button type="submit" class="btn btn-primary" style="padding: 12px 28px; font-weight: 700; font-size: 14px;">
                      Lanjut: Kontak & Sandi &rarr;
                    </button>
                  </div>
                </form>
              ` : state.step === 2 ? `
                <form id="reg-step2-form" onsubmit="event.preventDefault(); App.handleRegStep2Next();">
                  <div class="form-group" style="margin-bottom: 16px;">
                    <label class="form-label" style="font-weight: 700;">Alamat Email Siswa *</label>
                    <input type="email" id="step-email" class="form-input" placeholder="nama.siswa@smktarunabangsa.sch.id atau email pribadi" value="${state.data.email || ''}" required autofocus />
                    <span style="font-size: 12px; color: var(--slate-500); margin-top: 3px; display: block;">Email digunakan untuk pemberitahuan status verifikasi akun.</span>
                  </div>

                  <div class="form-group" style="margin-bottom: 16px;">
                    <label class="form-label" style="font-weight: 700;">Nomor WhatsApp Aktif *</label>
                    <input type="tel" id="step-whatsapp" class="form-input" placeholder="Contoh: 0812-3456-7890" value="${state.data.no_hp || ''}" required />
                    <span style="font-size: 12px; color: var(--slate-500); margin-top: 3px; display: block;">Nomor ini wajib aktif untuk koordinasi dengan guru pembimbing dan HRD DUDI.</span>
                  </div>

                  <div class="grid-2" style="margin-bottom: 24px;">
                    <div class="form-group">
                      <label class="form-label" style="font-weight: 700;">Password *</label>
                      <div class="input-password-wrapper">
                        <input type="password" id="step-password" class="form-input" placeholder="Minimal 6 karakter" value="${state.data.password || ''}" required />
                        <button type="button" class="btn-toggle-pwd" onclick="App.togglePasswordVisibility('step-password', this)">👁️</button>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label" style="font-weight: 700;">Konfirmasi Password *</label>
                      <div class="input-password-wrapper">
                        <input type="password" id="step-password-confirm" class="form-input" placeholder="Ulangi password" value="${state.data.passwordConfirm || ''}" required />
                        <button type="button" class="btn-toggle-pwd" onclick="App.togglePasswordVisibility('step-password-confirm', this)">👁️</button>
                      </div>
                    </div>
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <button type="button" class="btn btn-secondary" onclick="App.goToRegStep(1)" style="padding: 12px 20px;">
                      &larr; Kembali
                    </button>
                    <button type="submit" class="btn btn-primary" style="padding: 12px 28px; font-weight: 700; font-size: 14px;">
                      Lanjut: Tinjau Data &rarr;
                    </button>
                  </div>
                </form>
              ` : `
                <div>
                  <div style="margin-bottom: 20px;">
                    <h4 style="font-size: 16px; font-weight: 700; color: var(--slate-900); margin-bottom: 6px;">Ringkasan Data Pendaftaran</h4>
                    <p style="font-size: 13px; color: var(--slate-500);">Periksa kembali data diri Anda sebelum dikirimkan ke pihak HUBIN sekolah.</p>
                  </div>

                  <div class="reg-recap-box" style="margin-bottom: 20px;">
                    <div class="reg-recap-grid">
                      <div class="reg-recap-item">
                        <div class="reg-recap-label">Nama Lengkap</div>
                        <div class="reg-recap-val">${state.data.nama}</div>
                      </div>
                      <div class="reg-recap-item">
                        <div class="reg-recap-label">NIS / NISN</div>
                        <div class="reg-recap-val"><code style="font-weight:700;">${state.data.nisn}</code></div>
                      </div>
                      <div class="reg-recap-item">
                        <div class="reg-recap-label">Kelas</div>
                        <div class="reg-recap-val">${state.data.kelas}</div>
                      </div>
                      <div class="reg-recap-item">
                        <div class="reg-recap-label">Jurusan / Kompetensi</div>
                        <div class="reg-recap-val">${state.data.jurusan}</div>
                      </div>
                      <div class="reg-recap-item">
                        <div class="reg-recap-label">Email</div>
                        <div class="reg-recap-val">${state.data.email}</div>
                      </div>
                      <div class="reg-recap-item">
                        <div class="reg-recap-label">WhatsApp</div>
                        <div class="reg-recap-val">${state.data.no_hp}</div>
                      </div>
                    </div>
                  </div>

                  <div style="background-color: var(--amber-50); border: 1px solid var(--amber-200); border-radius: var(--radius-md); padding: 14px 16px; margin-bottom: 20px; display: flex; gap: 12px; align-items: flex-start;">
                    <div style="color: var(--amber-600); margin-top: 2px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </div>
                    <div>
                      <strong style="font-size: 13px; color: var(--amber-900);">Pemberitahuan Status Akun:</strong>
                      <p style="font-size: 12.5px; color: var(--amber-800); margin-top: 2px; line-height: 1.5;">
                        Setelah pendaftaran, akun Anda <strong>tidak langsung memiliki akses penuh</strong>. Status akun akan berstatus <strong>Menunggu Verifikasi</strong> sampai dicocokkan dan disetujui oleh Koordinator HUBIN SMK Taruna Bangsa Kota Bekasi.
                      </p>
                    </div>
                  </div>

                  <div style="margin-bottom: 24px; padding: 12px; background: var(--slate-50); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; font-size: 13px; color: var(--slate-700);">
                      <input type="checkbox" id="reg-agreement-checkbox" style="margin-top: 3px; cursor: pointer;" />
                      <span>Saya menyatakan bahwa data yang saya masukkan adalah benar data saya sebagai siswa aktif SMK Taruna Bangsa Kota Bekasi tahun ajaran 2025/2026.</span>
                    </label>
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <button type="button" class="btn btn-secondary" onclick="App.goToRegStep(2)" style="padding: 12px 20px;">
                      &larr; Ubah Data
                    </button>
                    <button type="button" class="btn btn-primary" onclick="App.handleFinalSubmitRegistration()" style="padding: 12px 28px; font-weight: 700; font-size: 14px; background: var(--primary-600);">
                      Kirim Pendaftaran ke HUBIN &rarr;
                    </button>
                  </div>
                </div>
              `}
              </div>
            </div>
          </div>
        </div>
      `;
    };

    renderCurrentStep();
  },

  goToRegStep(stepNum) {
    if (this.regFormState) {
      this.regFormState.step = stepNum;
      this.renderRegisterPage(document.getElementById('main-content-body'));
    }
  },

  handleRegStep1Next() {
    const nama = document.getElementById('step-nama').value.trim();
    const nisn = document.getElementById('step-nisn').value.trim();
    const kelas = document.getElementById('step-kelas').value.trim();
    const jurusan = document.getElementById('step-jurusan').value;

    if (!nama || !nisn || !kelas || !jurusan) {
      Toast.show('Perhatian', 'Mohon lengkapi seluruh field Data Akademik.', 'error');
      return;
    }

    this.regFormState.data.nama = nama;
    this.regFormState.data.nisn = nisn;
    this.regFormState.data.kelas = kelas;
    this.regFormState.data.jurusan = jurusan;
    this.regFormState.step = 2;
    this.renderRegisterPage(document.getElementById('main-content-body'));
  },

  handleRegStep2Next() {
    const email = document.getElementById('step-email').value.trim();
    const no_hp = document.getElementById('step-whatsapp').value.trim();
    const password = document.getElementById('step-password').value;
    const passwordConfirm = document.getElementById('step-password-confirm').value;

    if (!email || !no_hp || !password || !passwordConfirm) {
      Toast.show('Perhatian', 'Mohon lengkapi seluruh field Kontak & Sandi.', 'error');
      return;
    }

    if (password.length < 6) {
      Toast.show('Password Terlalu Pendek', 'Password minimal terdiri dari 6 karakter.', 'error');
      return;
    }

    if (password !== passwordConfirm) {
      Toast.show('Password Tidak Cocok', 'Konfirmasi password tidak cocok dengan password yang dimasukkan.', 'error');
      return;
    }

    this.regFormState.data.email = email;
    this.regFormState.data.no_hp = no_hp;
    this.regFormState.data.password = password;
    this.regFormState.data.passwordConfirm = passwordConfirm;
    this.regFormState.step = 3;
    this.renderRegisterPage(document.getElementById('main-content-body'));
  },

  async handleFinalSubmitRegistration() {
    const agreement = document.getElementById('reg-agreement-checkbox');
    if (!agreement || !agreement.checked) {
      Toast.show('Persetujuan Diperlukan', 'Silakan centang pernyataan keabsahan data terlebih dahulu.', 'error');
      return;
    }

    const d = this.regFormState.data;
    try {
      const newStudent = await API.registerStudent({
        nama: d.nama,
        nisn: d.nisn,
        kelas: d.kelas,
        jurusan: d.jurusan,
        email: d.email,
        no_hp: d.no_hp,
        password: d.password,
        cv_url: ''
      });

      this.allStudents = await API.getStudents();
      this.populateRoleSelect();

      this.regFormState = null;

      this.renderPostRegistrationSuccess(document.getElementById('main-content-body'), newStudent);
    } catch (err) {
      Toast.show('Pendaftaran Gagal', err.message, 'error');
    }
  },

  renderPostRegistrationSuccess(container, student) {
    container.innerHTML = `
      <div class="reg-wizard-container" style="min-height: 100vh; padding: 40px 20px; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 10%, #ecfdf5 0%, #f8fafc 60%, #f1f5f9 100%);">
        <div class="reg-wizard-card" style="max-width: 640px; width: 100%;">
          <div class="reg-wizard-body" style="text-align: center; padding: 48px 36px;">
          <div style="width: 76px; height: 76px; border-radius: 50%; background: #ecfdf5; border: 2px solid #a7f3d0; color: #10b981; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 34px;">
            ✓
          </div>

          <h2 style="font-size: 26px; font-weight: 800; color: var(--slate-900); margin-bottom: 4px;">
            Pendaftaran Berhasil
          </h2>
          <p style="font-size: 13px; font-weight: 600; color: var(--slate-500); margin-bottom: 12px;">
            SMK Taruna Bangsa Kota Bekasi &bull; BKK & HUBIN
          </p>
          <p style="font-size: 15px; font-weight: 700; color: var(--primary-700); margin-bottom: 24px;">
            Akun kamu sedang menunggu verifikasi HUBIN.
          </p>

          <div class="account-state-banner state-pending" style="text-align: left; margin-bottom: 24px;">
            <div class="state-top-row">
              <div class="state-badge-label">
                <span class="pulse-dot" style="background:#f59e0b;"></span>
                <span>STATUS: MENUNGGU VERIFIKASI</span>
              </div>
              <span style="font-size: 12px; color: #92400e; font-weight: 700;">Maks. 1x24 Jam Kerja</span>
            </div>

            <h4 class="state-headline" style="font-size: 18px; margin: 6px 0 8px;">
              "Data kamu sedang diperiksa oleh HUBIN."
            </h4>
            <p class="state-desc">
              Data pendaftaran atas nama <strong>${student.nama}</strong> (${student.kelas} &bull; NISN: ${student.nisn}) telah tercatat di sistem sekolah. Tim Hubungan Industri (HUBIN) SMK Taruna Bangsa Kota Bekasi akan memvalidasi kesesuaian NISN dan kelasmu dengan data Dapodik resmi.
            </p>

            <div class="state-timeline-steps">
              <div class="state-timeline-step-node done">
                <div class="state-tl-circle">✓</div>
                <div class="state-tl-text">1. Daftar Akun</div>
              </div>
              <div class="state-timeline-sep"></div>
              <div class="state-timeline-step-node current">
                <div class="state-tl-circle">⏳</div>
                <div class="state-tl-text">2. Verifikasi HUBIN</div>
              </div>
              <div class="state-timeline-sep"></div>
              <div class="state-timeline-step-node future">
                <div class="state-tl-circle">🔒</div>
                <div class="state-tl-text">3. Cari & Lamar PKL</div>
              </div>
            </div>
          </div>

          <div style="background-color: var(--slate-50); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px 16px; text-align: left; font-size: 13px; color: var(--slate-600); margin-bottom: 28px; line-height: 1.5;">
            <strong>Catatan Hak Akses:</strong>
            Sebelum akun dinyatakan <em>Terverifikasi</em>, kamu belum dapat mengirimkan lamaran ke perusahaan mitra DUDI. Kamu dapat memantau status verifikasi secara berkala di menu profil akun.
          </div>

          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="App.setRole('SISWA', 'profil', ${student.id})" style="padding: 12px 22px; font-weight: 700;">
              Lihat Status Akun Saya &rarr;
            </button>
            <button class="btn btn-success" onclick="App.setRole('HUBIN', 'verifikasi')" style="padding: 12px 22px; font-weight: 700; background: #059669; border-color: #059669; color: #ffffff; display: inline-flex; align-items: center; gap: 6px;" title="Langsung masuk ke halaman verifikasi HUBIN sekolah">
              <span>Buka Halaman HUBIN (Verifikasi Akun) &rarr;</span>
            </button>
            <button class="btn btn-secondary" onclick="App.setRole('PUBLIC')" style="padding: 12px 20px;">
              Kembali ke Beranda
            </button>
          </div>
          </div>
        </div>
      </div>
    `;
  }
});
