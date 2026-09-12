// ==========================================================================
// FIND MY PKL - PORTAL SISWA DASHBOARD MODULE
// Student Profile, Application Tracking, Daily PKL Journal / Logbook
// ==========================================================================

window.App = window.App || {};
Object.assign(window.App, {
  async renderSiswaLamaran(container) {
    const student = this.currentStudent;
    if (!student) return;

    const applications = await API.getApplications({ student_id: student.id });
    this.cachedStudentApplications = applications;

    if (applications.length === 0) {
      container.innerHTML = renderEmptyState(
        'Belum Ada Lamaran PKL yang Diajukan',
        'Anda belum mengajukan lamaran ke perusahaan manapun. Jelajahi katalog lowongan untuk menemukan posisi yang sesuai.',
        '',
        `<button class="btn btn-primary" onclick="App.setTab('katalog')">Jelajahi Lowongan PKL</button>`
      );
      return;
    }

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        ${applications.map(app => {
          let step1Class = 'completed';
          let step2Class = '';
          let step3Class = '';
          let step4Class = '';
          let step5Class = '';

          if (app.status === 'Menunggu Verifikasi HUBIN') {
            step2Class = 'active';
          } else if (app.status === 'Ditolak HUBIN') {
            step2Class = 'rejected';
          } else if (app.status === 'Disetujui HUBIN') {
            step2Class = 'completed';
            step3Class = 'completed';
            step4Class = 'active';
          } else if (app.status === 'Diterima Perusahaan') {
            step2Class = 'completed';
            step3Class = 'completed';
            step4Class = 'completed';
            step5Class = 'completed';
          } else if (app.status === 'Tidak Diterima Perusahaan') {
            step2Class = 'completed';
            step3Class = 'completed';
            step4Class = 'rejected';
          }

          return `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; border-bottom: 1px solid var(--border-color); padding-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 14px;">
                  <div class="company-badge-box" style="background: transparent; border: none; padding: 0;">
                    ${renderCompanyLogo(app, { size: 48 })}
                  </div>
                  <div>
                    <h3 style="font-size: 18px; font-weight: 700; color: var(--slate-900);">${app.job_judul}</h3>
                    <p style="font-size: 14px; font-weight: 500; color: var(--slate-600);">${app.company_nama} &bull; ${app.lokasi_kota}</p>
                  </div>
                </div>
                <div>
                  ${renderBadge(app.status)}
                </div>
              </div>

              <!-- Interactive Timeline Stepper -->
              <div class="tracking-timeline">
                <div class="timeline-step ${step1Class}">
                  <div class="step-circle">1</div>
                  <div class="step-label">Terkirim</div>
                  <div class="step-sub">${app.tanggal_daftar ? app.tanggal_daftar.substring(0,10) : ''}</div>
                </div>
                <div class="timeline-step ${step2Class}">
                  <div class="step-circle">2</div>
                  <div class="step-label">Verifikasi HUBIN</div>
                  <div class="step-sub">Tinjauan Kejuruan</div>
                </div>
                <div class="timeline-step ${step3Class}">
                  <div class="step-circle">3</div>
                  <div class="step-label">Surat Pengantar</div>
                  <div class="step-sub">${app.nomor_surat_pengantar ? 'No: ' + app.nomor_surat_pengantar : 'Diterbitkan Sekolah'}</div>
                </div>
                <div class="timeline-step ${step4Class}">
                  <div class="step-circle">4</div>
                  <div class="step-label">Seleksi Mitra</div>
                  <div class="step-sub">Review DUDI</div>
                </div>
                <div class="timeline-step ${step5Class}">
                  <div class="step-circle">5</div>
                  <div class="step-label">Diterima / Aktif</div>
                  <div class="step-sub">Mulai PKL</div>
                </div>
              </div>

              <!-- Notes and Status Callouts -->
              ${app.catatan_hubin ? `
                <div style="background-color: var(--slate-50); border-left: 3px solid var(--primary-600); padding: 12px 16px; border-radius: var(--radius-sm); margin-top: 14px;">
                  <div style="font-size: 12px; font-weight: 700; color: var(--primary-800); text-transform: uppercase;">Catatan Tim HUBIN Sekolah:</div>
                  <div style="font-size: 13px; color: var(--slate-700); margin-top: 2px;">${app.catatan_hubin}</div>
                </div>
              ` : ''}

              ${app.catatan_perusahaan ? `
                <div style="background-color: var(--emerald-50); border-left: 3px solid var(--emerald-600); padding: 12px 16px; border-radius: var(--radius-sm); margin-top: 10px;">
                  <div style="font-size: 12px; font-weight: 700; color: var(--emerald-800); text-transform: uppercase;">Catatan Perusahaan Mitra:</div>
                  <div style="font-size: 13px; color: var(--emerald-900); margin-top: 2px;">${app.catatan_perusahaan}</div>
                </div>
              ` : ''}

              ${(app.status === 'Disetujui HUBIN' || app.status === 'Diterima Perusahaan' || app.nomor_surat_pengantar) ? (() => {
                const printStatus = (typeof App.getStudentPrintStatus === 'function') 
                  ? App.getStudentPrintStatus(student.id, 'surat') 
                  : { canPrint: true, daysLeft: 0 };
                
                if (printStatus.canPrint) {
                  return `
                    <div class="print-quota-box quota-available">
                      <div>
                        <div style="font-size: 13px; font-weight: 700; color: #166534; display: flex; align-items: center; gap: 6px;">
                          <span>📄 Surat Pengantar Magang Resmi Diterbitkan</span>
                          <span class="print-quota-badge badge-available">✓ Kuota Cetak Tersedia</span>
                        </div>
                        <div style="font-size: 12px; color: #15803d; margin-top: 2px;">
                          No: <strong>${app.nomor_surat_pengantar || 'Telah Diterbitkan BKK'}</strong> &bull; Ketentuan sekolah: Maksimal 1x cetak per minggu
                        </div>
                      </div>
                      <button class="btn btn-primary btn-sm" onclick="App.openSuratPrakerinModal(App.cachedStudentApplications.find(a => a.id === ${app.id}))" style="display: flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.28);">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                        Cetak Surat Resmi (A4)
                      </button>
                    </div>
                  `;
                } else {
                  return `
                    <div class="print-quota-box quota-cooldown">
                      <div>
                        <div style="font-size: 13px; font-weight: 700; color: #92400e; display: flex; align-items: center; gap: 6px;">
                          <span>📄 Surat Pengantar Magang Resmi</span>
                          <span class="print-quota-badge badge-cooldown">⏳ Cooldown: ${printStatus.daysLeft} Hari Lagi</span>
                        </div>
                        <div style="font-size: 12px; color: #b45309; margin-top: 2px;">
                          Telah dicetak pada ${new Date(printStatus.lastPrintedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} &bull; Sesuai ketentuan: Cetak ulang fisik diizinkan 1 minggu 1x
                        </div>
                      </div>
                      <button class="btn btn-secondary btn-sm" onclick="App.openSuratPrakerinModal(App.cachedStudentApplications.find(a => a.id === ${app.id}))" style="display: flex; align-items: center; gap: 6px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        Pratinjau Layar (Read-only)
                      </button>
                    </div>
                  `;
                }
              })() : ''}

              ${app.status === 'Diterima Perusahaan' ? `
                <div style="margin-top: 12px; display: flex; justify-content: flex-end;">
                  <button class="btn btn-primary btn-sm" onclick="App.setTab('penempatan')">
                    Buka Dashboard Penempatan PKL Aktif &rarr;
                  </button>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  async renderSiswaPenempatan(container) {
    const student = this.currentStudent;
    if (!student) return;

    const placements = await API.getPlacements({ student_id: student.id, status: 'Aktif' });

    if (placements.length === 0) {
      container.innerHTML = renderEmptyState(
        'Belum Memiliki Penempatan PKL Aktif',
        'Anda belum memiliki status magang aktif di perusahaan. Ajukan lamaran lowongan dan pantau persetujuannya hingga diterima mitra.',
        '',
        `<button class="btn btn-primary" onclick="App.setTab('katalog')">Lihat Lowongan Tersedia</button>`
      );
      return;
    }

    const p = placements[0];
    const logbooks = await API.getLogbooks(p.id);

    const start = new Date(p.tanggal_mulai);
    const end = new Date(p.tanggal_selesai);
    const today = new Date();
    const totalDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    const passedDays = Math.max(0, Math.min(totalDays, Math.round((today - start) / (1000 * 60 * 60 * 24))));
    const remainingDays = Math.max(0, Math.round((end - today) / (1000 * 60 * 60 * 24)));
    const percent = Math.min(100, Math.round((passedDays / totalDays) * 100));

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div class="card" style="border-top: 4px solid var(--primary-600);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div class="company-badge-box" style="background: transparent; border: none; padding: 0; width: 56px; height: 56px;">
                ${renderCompanyLogo(p, { size: 56 })}
              </div>
              <div>
                <h3 style="font-size: 20px; font-weight: 700; color: var(--slate-900);">${p.company_nama}</h3>
                <p style="font-size: 14px; font-weight: 600; color: var(--primary-600);">${p.job_judul}</p>
                <p style="font-size: 13px; color: var(--slate-500); margin-top: 2px;">${p.company_alamat}</p>
              </div>
            </div>
            <div>
              <span class="badge badge-emerald" style="font-size: 13px; padding: 6px 14px;">
                <span class="badge-dot"></span> PKL Aktif Berjalan
              </span>
            </div>
          </div>

          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; color: var(--slate-700); margin-bottom: 8px;">
              <span>Periode: ${p.tanggal_mulai ? p.tanggal_mulai.substring(0,10) : ''} s.d. ${p.tanggal_selesai ? p.tanggal_selesai.substring(0,10) : ''}</span>
              <span>${remainingDays} Hari Tersisa (${percent}% Selesai)</span>
            </div>
            <div style="width: 100%; height: 10px; background-color: var(--slate-200); border-radius: var(--radius-full); overflow: hidden;">
              <div style="width: ${percent}%; height: 100%; background: linear-gradient(90deg, var(--primary-600), var(--emerald-500)); border-radius: var(--radius-full);"></div>
            </div>

            <div class="grid-2" style="margin-top: 20px;">
              <div style="background-color: var(--slate-50); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <div style="font-size: 11px; font-weight: 700; color: var(--slate-500); text-transform: uppercase;">Pembimbing Industri (DUDI)</div>
                <div style="font-size: 14px; font-weight: 700; color: var(--slate-900); margin-top: 2px;">${p.pembimbing_industri}</div>
                <div style="font-size: 12px; color: var(--slate-500);">Kontak: ${p.company_pic} (${p.company_kontak})</div>
              </div>
              <div style="background-color: var(--slate-50); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <div style="font-size: 11px; font-weight: 700; color: var(--slate-500); text-transform: uppercase;">Guru Pembimbing Sekolah</div>
                <div style="font-size: 14px; font-weight: 700; color: var(--slate-900); margin-top: 2px;">${p.guru_pembimbing}</div>
                <div style="font-size: 12px; color: var(--slate-500);">Koordinator Kejuruan SMK</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
            <div>
              <h3 style="font-size: 17px; font-weight: 700; color: var(--slate-900);">Jurnal / Logbook Kegiatan Harian PKL</h3>
              <p style="font-size: 13px; color: var(--slate-500);">Wajib diisi setiap hari kerja untuk pemantauan oleh Guru Pembimbing & Mentor DUDI.</p>
            </div>
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              ${(() => {
                const logbookPrintStatus = (typeof App.getStudentPrintStatus === 'function')
                  ? App.getStudentPrintStatus(student.id, 'logbook')
                  : { canPrint: true, daysLeft: 0 };
                return `
                  <button class="btn btn-secondary btn-sm" onclick="App.openLogbookWeeklyPrintModal(${p.id})" style="display: flex; align-items: center; gap: 6px;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                    <span>Cetak Jurnal Mingguan (A4)</span>
                    ${logbookPrintStatus.canPrint ? `
                      <span class="print-quota-badge badge-available" style="font-size: 10px; padding: 1px 6px;">1x / Minggu</span>
                    ` : `
                      <span class="print-quota-badge badge-cooldown" style="font-size: 10px; padding: 1px 6px;">${logbookPrintStatus.daysLeft}h lagi</span>
                    `}
                  </button>
                `;
              })()}
              <button class="btn btn-primary btn-sm" onclick="App.showAddLogbookModal(${p.id})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Tulis Logbook Baru
              </button>
            </div>
          </div>

          ${logbooks.length === 0 ? `
            <div style="text-align: center; padding: 30px; color: var(--slate-500); font-size: 14px;">
              Belum ada catatan kegiatan. Mulai catat aktivitas hari pertama Anda!
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 14px;">
              ${logbooks.map(log => `
                <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; background-color: var(--slate-50);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div>
                      <span style="font-size: 12px; font-weight: 700; color: var(--primary-700); background-color: var(--primary-50); padding: 2px 8px; border-radius: var(--radius-sm);">${log.tanggal ? log.tanggal.substring(0,10) : ''}</span>
                      <h4 style="font-size: 15px; font-weight: 700; color: var(--slate-900); margin-top: 4px;">${log.judul_kegiatan}</h4>
                    </div>
                    ${renderBadge(log.status_verifikasi)}
                  </div>
                  <p style="font-size: 13px; color: var(--slate-700); line-height: 1.6;">${log.deskripsi_kegiatan}</p>
                  ${log.kendala ? `
                    <div style="font-size: 12px; color: var(--slate-500); margin-top: 6px; font-style: italic;">
                      Kendala: ${log.kendala}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  },

  showAddLogbookModal(placementId) {
    const today = new Date().toISOString().split('T')[0];
    const contentHtml = `
      <div>
        <div class="form-group">
          <label class="form-label">Tanggal Kegiatan</label>
          <input type="date" id="logbook-tanggal" class="form-input" value="${today}" />
        </div>
        <div class="form-group">
          <label class="form-label">Judul / Topik Kegiatan</label>
          <input type="text" id="logbook-judul" class="form-input" placeholder="Contoh: Pemeliharaan Server & Troubleshooting Kabel LAN" />
        </div>
        <div class="form-group">
          <label class="form-label">Deskripsi Rinci Pekerjaan yang Dilakukan</label>
          <textarea id="logbook-deskripsi" class="form-textarea" rows="4" placeholder="Jelaskan langkah-langkah kerja, software/hardware yang digunakan, dan hasil kerja..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Kendala yang Dihadapi & Solusi (Bila Ada)</label>
          <input type="text" id="logbook-kendala" class="form-input" placeholder="Tuliskan kendala teknis atau tidak ada kendala" />
        </div>
        <button class="btn btn-primary" style="width: 100%;" onclick="App.handleSaveLogbook(${placementId})">
          Simpan Logbook ke TiDB Cloud
        </button>
      </div>
    `;

    Modal.open(contentHtml, 'Input Logbook Kegiatan Harian PKL');
  },

  async handleSaveLogbook(placementId) {
    const tanggal = document.getElementById('logbook-tanggal').value;
    const judul_kegiatan = document.getElementById('logbook-judul').value;
    const deskripsi_kegiatan = document.getElementById('logbook-deskripsi').value;
    const kendala = document.getElementById('logbook-kendala').value;

    if (!tanggal || !judul_kegiatan || !deskripsi_kegiatan) {
      Toast.show('Perhatian', 'Lengkapi tanggal, judul, dan deskripsi kegiatan', 'error');
      return;
    }

    try {
      await API.addLogbook(placementId, { tanggal, judul_kegiatan, deskripsi_kegiatan, kendala });
      Modal.close();
      Toast.show('Logbook Tersimpan', 'Jurnal harian berhasil dicatat di TiDB Cloud.', 'success');
      this.renderContent();
    } catch (err) {
      Toast.show('Gagal Menyimpan Logbook', err.message, 'error');
    }
  },

  async renderSiswaProfil(container) {
    const student = this.currentStudent;
    if (!student) return;

    let statusBannerHtml = '';

    if (student.status_verifikasi === 'Menunggu Verifikasi') {
      statusBannerHtml = `
        <div class="account-state-banner state-pending" style="margin-bottom: 24px;">
          <div class="state-top-row">
            <div class="state-badge-label">
              <span class="pulse-dot" style="background:#f59e0b;"></span>
              <span>STATUS AKUN: MENUNGGU VERIFIKASI</span>
            </div>
            <span style="font-size: 12px; color: #92400e; font-weight: 700;">Dalam Antrean Dapodik</span>
          </div>

          <h3 class="state-headline" style="font-size: 18px; margin: 6px 0 8px;">
            "Data kamu sedang diperiksa oleh HUBIN."
          </h3>
          <p class="state-desc">
            Data pendaftaran atas nama <strong>${student.nama}</strong> (${student.kelas} &bull; NISN: ${student.nisn}) sedang dicocokkan dengan data Dapodik SMK Taruna Bangsa Kota Bekasi oleh Koordinator Hubungan Industri. Proses validasi memakan waktu maksimal 1x24 jam kerja.
          </p>

          <div class="state-timeline-steps">
            <div class="state-timeline-step-node done">
              <div class="state-tl-circle">✓</div>
              <div class="state-tl-text">1. Registrasi Selesai</div>
            </div>
            <div class="state-timeline-sep"></div>
            <div class="state-timeline-step-node current">
              <div class="state-tl-circle">⏳</div>
              <div class="state-tl-text">2. Pemeriksaan HUBIN</div>
            </div>
            <div class="state-timeline-sep"></div>
            <div class="state-timeline-step-node future">
              <div class="state-tl-circle">🔒</div>
              <div class="state-tl-text">3. Akses Pelamaran PKL</div>
            </div>
          </div>
        </div>
      `;
    } else if (student.status_verifikasi === 'Terverifikasi') {
      statusBannerHtml = `
        <div class="account-state-banner state-verified" style="margin-bottom: 24px;">
          <div class="state-top-row">
            <div class="state-badge-label">
              <span>STATUS AKUN: TERVERIFIKASI</span>
            </div>
            <span style="font-size: 12px; color: #065f46; font-weight: 700;">Akses Penuh Aktif</span>
          </div>

          <h3 class="state-headline" style="font-size: 18px; margin: 6px 0 8px;">
            "Akun berhasil diverifikasi. Kamu sekarang dapat mencari dan mengajukan PKL."
          </h3>
          <p class="state-desc">
            Selamat! Akun Anda telah divalidasi dan terhubung resmi dengan buku induk Dapodik SMK Taruna Bangsa Kota Bekasi. Anda kini dapat memilih mitra industri, melamar posisi yang diminati, dan meminta penerbitan Surat Pengantar sekolah.
          </p>

          <div style="margin-top: 14px;">
            <button class="btn btn-primary" onclick="App.setTab('katalog')">
              Cari Tempat PKL Sekarang &rarr;
            </button>
          </div>
        </div>
      `;
    } else if (student.status_verifikasi === 'Perlu Perbaikan') {
      statusBannerHtml = `
        <div class="account-state-banner state-revision" style="margin-bottom: 24px;">
          <div class="state-top-row">
            <div class="state-badge-label">
              <span>STATUS AKUN: PERLU PERBAIKAN</span>
            </div>
            <span style="font-size: 12px; color: #9a3412; font-weight: 700;">Tindakan Diperlukan</span>
          </div>

          <h3 class="state-headline" style="font-size: 18px; margin: 6px 0 8px;">
            "HUBIN meminta kamu memperbaiki beberapa data."
          </h3>
          <p class="state-desc">
            Koordinator HUBIN telah meninjau pendaftaran Anda dan menemukan data yang perlu dikoreksi atau dilengkapi sebelum akun dapat diaktifkan:
          </p>

          <div style="background: rgba(255,255,255,0.85); border: 1px solid #fed7aa; border-radius: 8px; padding: 12px 14px; margin: 12px 0; font-size: 13.5px; color: #7c2d12;">
            <strong>💬 Catatan dari HUBIN:</strong><br>
            <span style="font-style: italic;">"${student.catatan_verifikasi || 'Mohon perbarui nomor WhatsApp aktif dan tautan berkas CV/portofolio.'}"</span>
          </div>

          <div style="margin-top: 14px;">
            <button class="btn btn-primary" style="background: #ea580c; border-color: #ea580c;" onclick="App.showStudentEditModal(${student.id})">
              Perbaiki Data Sekarang ✍
            </button>
          </div>
        </div>
      `;
    } else if (student.status_verifikasi === 'Ditolak') {
      statusBannerHtml = `
        <div class="account-state-banner state-rejected" style="margin-bottom: 24px;">
          <div class="state-top-row">
            <div class="state-badge-label">
              <span>STATUS AKUN: DITOLAK</span>
            </div>
            <span style="font-size: 12px; color: #991b1b; font-weight: 700;">Verifikasi Gagal</span>
          </div>

          <h3 class="state-headline" style="font-size: 18px; margin: 6px 0 8px;">
            "HUBIN menolak verifikasi akun."
          </h3>
          <p class="state-desc">
            Pendaftaran akun Anda tidak dapat disetujui oleh Koordinator HUBIN SMK Taruna Bangsa Kota Bekasi karena:
          </p>

          <div style="background: rgba(255,255,255,0.9); border: 1px solid #fecaca; border-radius: 8px; padding: 12px 14px; margin: 12px 0; font-size: 13.5px; color: #7f1d1d;">
            <strong>❌ Alasan Penolakan:</strong><br>
            <span style="font-weight: 700;">"${student.catatan_verifikasi || 'NISN tidak terdaftar dalam Dapodik SMK Taruna Bangsa Kota Bekasi.'}"</span>
          </div>

          <div style="background: rgba(254, 242, 242, 0.6); padding: 10px 14px; border-radius: 6px; font-size: 12.5px; color: #7f1d1d; line-height: 1.5; margin-top: 10px;">
            <strong>Langkah Konfirmasi Offline:</strong><br>
            Silakan temui petugas BKK & HUBIN SMK Taruna Bangsa Kota Bekasi di Gedung A Lantai 2 atau hubungi melalui email: <code>hubin@smktarunabangsa.sch.id</code> / telepon: <code>(021) 8895-1234</code> dengan membawa Kartu Pelajar asli untuk pengecekan langsung.
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div style="max-width: 820px; margin: 0 auto;">
        ${statusBannerHtml}

        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 20px; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div class="user-avatar" style="width: 64px; height: 64px; font-size: 22px;">
                ${student.nama.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
              </div>
              <div>
                <h3 style="font-size: 20px; font-weight: 700; color: var(--slate-900);">${student.nama}</h3>
                <p style="font-size: 14px; color: var(--slate-500);">${student.jurusan} &bull; ${student.kelas}</p>
                <p style="font-size: 12px; color: var(--primary-700); font-weight: 600;">Siswa Aktif SMK Taruna Bangsa Kota Bekasi</p>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              ${renderBadge(student.status_verifikasi)}
              ${student.status_verifikasi === 'Perlu Perbaikan' ? `
                <button class="btn btn-outline-warning btn-sm" onclick="App.showStudentEditModal(${student.id})">
                  Koreksi Profil ✍
                </button>
              ` : ''}
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 18px;">
            <div class="grid-2">
              <div>
                <label class="form-label" style="font-weight: 700;">Nomor Induk Siswa Nasional (NISN)</label>
                <input type="text" class="form-input" value="${student.nisn}" readonly style="background-color: var(--slate-50);" />
              </div>
              <div>
                <label class="form-label" style="font-weight: 700;">Alamat Email Siswa</label>
                <input type="email" class="form-input" value="${student.email}" readonly style="background-color: var(--slate-50);" />
              </div>
            </div>

            <div class="grid-2">
              <div>
                <label class="form-label" style="font-weight: 700;">Nomor WhatsApp / Kontak</label>
                <input type="text" class="form-input" value="${student.no_hp || '-'}" readonly style="background-color: var(--slate-50);" />
              </div>
              <div>
                <label class="form-label" style="font-weight: 700;">Tautan Berkas CV / Portofolio</label>
                <input type="text" class="form-input" value="${student.cv_url || 'Belum ditautkan'}" readonly style="background-color: var(--slate-50);" />
              </div>
            </div>

            <div style="background-color: var(--slate-50); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-top: 10px;">
              <div style="font-size: 12px; font-weight: 700; color: var(--slate-600); text-transform: uppercase;">Catatan Verifikasi dari HUBIN:</div>
              <p style="font-size: 14px; color: var(--slate-800); margin-top: 4px;">
                ${student.catatan_verifikasi || 'Belum ada catatan tambahan dari pihak sekolah.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  showStudentEditModal(studentId) {
    const student = this.allStudents.find(s => s.id === studentId) || this.currentStudent;
    if (!student) return;

    const contentHtml = `
      <div>
        <div style="background-color: var(--amber-50); border: 1px solid var(--amber-200); border-radius: var(--radius-md); padding: 12px 14px; margin-bottom: 16px;">
          <strong style="font-size: 13px; color: var(--amber-900);">Catatan Perbaikan dari HUBIN:</strong>
          <p style="font-size: 13px; color: var(--amber-800); margin-top: 2px;">
            ${student.catatan_verifikasi || 'Mohon periksa dan perbarui data kontak atau berkas Anda.'}
          </p>
        </div>

        <form id="edit-student-form" onsubmit="event.preventDefault(); App.handleSaveStudentEdit(${student.id});">
          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label">Nama Lengkap (Sesuai Dapodik)</label>
            <input type="text" id="edit-nama" class="form-input" value="${student.nama}" required />
          </div>

          <div class="grid-2" style="margin-bottom: 12px;">
            <div class="form-group">
              <label class="form-label">Kelas</label>
              <input type="text" id="edit-kelas" class="form-input" value="${student.kelas}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Jurusan</label>
              <select id="edit-jurusan" class="form-select">
                <option value="Rekayasa Perangkat Lunak" ${student.jurusan.includes('Rekayasa') ? 'selected' : ''}>Rekayasa Perangkat Lunak</option>
                <option value="Teknik Komputer dan Jaringan" ${student.jurusan.includes('Komputer') ? 'selected' : ''}>Teknik Komputer dan Jaringan</option>
                <option value="Teknik Kendaraan Ringan" ${student.jurusan.includes('Kendaraan') ? 'selected' : ''}>Teknik Kendaraan Ringan</option>
                <option value="Akuntansi" ${student.jurusan.includes('Akuntansi') ? 'selected' : ''}>Akuntansi</option>
                <option value="Manajemen Perkantoran" ${student.jurusan.includes('Perkantoran') ? 'selected' : ''}>Manajemen Perkantoran</option>
                <option value="Multimedia" ${student.jurusan.includes('Multimedia') ? 'selected' : ''}>Multimedia</option>
              </select>
            </div>
          </div>

          <div class="grid-2" style="margin-bottom: 12px;">
            <div class="form-group">
              <label class="form-label">Alamat Email</label>
              <input type="email" id="edit-email" class="form-input" value="${student.email}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Nomor WhatsApp Aktif</label>
              <input type="tel" id="edit-nohp" class="form-input" value="${student.no_hp || ''}" required />
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label">Tautan Berkas CV / Portofolio (Google Drive / LinkedIn / Web)</label>
            <input type="url" id="edit-cv" class="form-input" value="${student.cv_url || ''}" placeholder="https://drive.google.com/..." />
            <span style="font-size: 11.5px; color: var(--slate-500); margin-top: 3px; display: block;">Pastikan hak akses Google Drive diatur ke 'Siapa saja yang memiliki link'.</span>
          </div>

          <div style="display: flex; gap: 10px; justify-content: flex-end;">
            <button type="button" class="btn btn-secondary" onclick="Modal.close()">Batal</button>
            <button type="submit" class="btn btn-primary" style="background: #ea580c; border-color: #ea580c;">
              Kirim Ulang untuk Verifikasi &rarr;
            </button>
          </div>
        </form>
      </div>
    `;

    Modal.open(contentHtml, 'Perbaiki Data Siswa', 'md');
  },

  async handleSaveStudentEdit(studentId) {
    const nama = document.getElementById('edit-nama').value.trim();
    const kelas = document.getElementById('edit-kelas').value.trim();
    const jurusan = document.getElementById('edit-jurusan').value;
    const email = document.getElementById('edit-email').value.trim();
    const no_hp = document.getElementById('edit-nohp').value.trim();
    const cv_url = document.getElementById('edit-cv').value.trim();

    if (!nama || !kelas || !email || !no_hp) {
      Toast.show('Perhatian', 'Mohon lengkapi field wajib.', 'error');
      return;
    }

    try {
      const updated = await API.updateStudent(studentId, {
        nama, kelas, jurusan, email, no_hp, cv_url
      });

      Modal.close();
      Toast.show('Data Berhasil Diperbarui', 'Data perbaikan Anda telah dikirimkan kembali ke HUBIN.', 'success');
      this.allStudents = await API.getStudents();
      this.currentStudent = updated;
      this.currentStudentId = updated.id;
      this.populateRoleSelect();
      this.render();
    } catch (err) {
      Toast.show('Gagal Memperbarui', err.message, 'error');
    }
  }
});
