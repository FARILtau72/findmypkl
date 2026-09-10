// ==========================================================================
// FIND MY PKL - HOMEPAGE PAGE MODULE
// Hero Section, Unified Search, Recommendation Cards, Features, Testimonials, FAQ
// ==========================================================================

Object.assign(window.App, {
  async renderPublicHomepage(container) {
    if (!this.cachedJobs || this.cachedJobs.length === 0) {
      try {
        this.cachedJobs = await API.getJobs();
      } catch (e) {
        console.error('Failed to fetch jobs for homepage:', e);
      }
    }

    const jobs = this.cachedJobs || [];

    container.innerHTML = `
      ${this.getTopNavHtml('beranda')}

      <!-- 2. HERO SECTION -->
      <section class="hero-modern-section">
        <div class="hero-modern-content">

          <h1 class="hero-headline-modern">
            Cari Tempat PKL Sesuai
            <span>JurusanMu</span>
          </h1>

          <p class="hero-subtitle-modern">
            Platform resmi penelusuran dan pengelolaan Praktik Kerja Lapangan (PKL) khusus bagi siswa-siswi <strong>SMK Taruna Bangsa Kota Bekasi</strong>.<br>
          </p>

          <!-- 3. Floating Unified Search Bar (3 Segments + Green Button) -->
          <div class="search-bar-unified">
            <div class="search-seg">
              <span class="search-seg-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input type="text" id="unified-search-posisi" placeholder="Posisi / Pekerjaan (mis. Web Dev)" />
            </div>

            <div class="search-divider"></div>

            <div class="search-seg">
              <span class="search-seg-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </span>
              <select id="unified-search-jurusan">
                <option value="Semua">Semua Jurusan</option>
                <option value="RPL">Rekayasa Perangkat Lunak (RPL)</option>
                <option value="TAV">Teknik Audio Video (TAV)</option>
                <option value="TITL">Teknik Instalasi Tenaga Listrik (TITL)</option>
                <option value="TKRO">Teknik Kendaraan Ringan Otomotif (TKRO)</option>
              </select>
            </div>

            <div class="search-divider"></div>

            <div class="search-seg">
              <span class="search-seg-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <select id="unified-search-kota">
                <option value="Semua">Semua Kota</option>
                <option value="Bekasi">Bekasi</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Cikarang">Cikarang</option>
                <option value="Bandung">Bandung</option>
                <option value="Tangerang">Tangerang</option>
              </select>
            </div>

            <button class="btn-search-green" onclick="App.handleUnifiedSearch()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Cari
            </button>
          </div>

          <!-- 4. 3 Feature Highlights Under Hero -->
          <div class="hero-highlights-grid">
            <div class="highlight-item-card">
              <div class="highlight-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M15 9h-6"/><path d="M15 15h-6"/></svg>
              </div>
              <div>
                <h4>500+ Mitra DUDI Resmi</h4>
                <p>Perusahaan rekanan telah menjalin MoU resmi dengan SMK Taruna Bangsa Kota Bekasi</p>
              </div>
            </div>

            <div class="highlight-item-card">
              <div class="highlight-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div>
                <h4>10rb+ Ulasan Siswa</h4>
                <p>Testimoni jujur dan penilaian nyata dari alumni PKL SMK Taruna Bangsa</p>
              </div>
            </div>

            <div class="highlight-item-card">
              <div class="highlight-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              </div>
              <div>
                <h4>100% Terverifikasi HUBIN</h4>
                <p>Program PKL resmi dan didampingi guru pembimbing SMK Taruna Bangsa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. TRUSTED COMPANIES STRIP -->
      <section class="trusted-strip-section">
        <div class="trusted-strip-label">DIPERCAYA OLEH RATUSAN INDUSTRI TERNAMA</div>
        <div class="trusted-logos-row">
          <div class="partner-logo-item" onclick="App.goToPortalTab('mitra')">
            <img src="/images/logos/telkom.svg" alt="Telkom Indonesia" class="partner-logo-img" />
            <span>Telkom</span>
          </div>
          <div class="partner-logo-item" onclick="App.goToPortalTab('mitra')">
            <img src="/images/logos/astra.svg" alt="Astra International" class="partner-logo-img" />
            <span>Astra</span>
          </div>
          <div class="partner-logo-item" onclick="App.goToPortalTab('mitra')">
            <img src="/images/logos/goto.svg" alt="GoTo Gojek Tokopedia" class="partner-logo-img" />
            <span>GoTo</span>
          </div>
          <div class="partner-logo-item" onclick="App.goToPortalTab('mitra')">
            <img src="/images/logos/ahm.svg" alt="Astra Honda Motor" class="partner-logo-img" />
            <span>Honda AHM</span>
          </div>
          <div class="partner-logo-item" onclick="App.goToPortalTab('mitra')">
            <img src="/images/logos/mandiri.svg" alt="Bank Mandiri" class="partner-logo-img" />
            <span>Mandiri</span>
          </div>
          <div class="partner-logo-item" onclick="App.goToPortalTab('mitra')">
            <img src="/images/logos/paragon.svg" alt="Paragon Wardah" class="partner-logo-img" />
            <span>Paragon</span>
          </div>
        </div>
      </section>

      <!-- 6. HOW IT WORKS SECTION (3 STEPS) -->
      <section class="how-it-works-section">
        <div class="section-modern-title">
          <h2>Berikut Cara <span class="text-green">Mencari</span> Tempat PKL Yang Sesuai</h2>
        </div>

        <div class="how-steps-grid">
          <div class="step-card-modern">
            <div class="step-card-top">
              <div class="step-badge-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <span class="step-corner-num">01</span>
            </div>
            <h3>Cari & Filter</h3>
            <p>Temukan lowongan PKL sesuai jurusan kamu di SMK Taruna Bangsa Kota Bekasi dan kriteria yang diinginkan.</p>
          </div>

          <div class="step-card-modern">
            <div class="step-card-top">
              <div class="step-badge-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
              </div>
              <span class="step-corner-num">02</span>
            </div>
            <h3>Bandingkan & Pilih</h3>
            <p>Lihat ulasan kakak kelas alumni, benefit, uang saku, dan profil mitra industri DUDI sebelum melamar.</p>
          </div>

          <div class="step-card-modern">
            <div class="step-card-top">
              <div class="step-badge-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </div>
              <span class="step-corner-num">03</span>
            </div>
            <h3>Ajukan ke HUBIN Taruna Bangsa</h3>
            <p>Kirim lamaran secara online dan dapatkan verifikasi Surat Pengantar resmi dari BKK & HUBIN SMK Taruna Bangsa Kota Bekasi.</p>
          </div>
        </div>
      </section>

      <!-- 7. REKOMENDASI TEMPAT PKL (CARDS) -->
      <section id="rekomendasi-pkl" class="rekomendasi-section">
        <div class="section-modern-title">
          <h2>Rekomendasi <span class="text-green">Tempat PKL</span></h2>
          <p>Pilihan terbaik lowongan magang mitra industri resmi untuk siswa SMK Taruna Bangsa Kota Bekasi.</p>
        </div>

        <!-- Mobile Carousel Navigation & Hint (Visible only on mobile <= 768px via CSS) -->
        <div class="rekomendasi-mobile-nav">
          <div class="rekomendasi-swipe-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            <span>Geser lowongan &rarr;</span>
          </div>
          <div class="rekomendasi-arrow-group">
            <button type="button" class="btn-rekomendasi-arrow" onclick="App.scrollRekomendasiCards('prev')" aria-label="Lowongan Sebelumnya" title="Sebelumnya">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button type="button" class="btn-rekomendasi-arrow" onclick="App.scrollRekomendasiCards('next')" aria-label="Lowongan Selanjutnya" title="Selanjutnya">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        <div id="homepage-rekomendasi-grid" class="rekomendasi-grid">
          <!-- Populated by renderRekomendasiCards -->
        </div>

        <!-- Mobile Carousel Dots Indicator -->
        <div id="rekomendasi-carousel-dots" class="rekomendasi-carousel-dots"></div>
      </section>

      <!-- 8. TESTIMONIALS SECTION -->
      <section class="testimonials-section">
        <div class="section-modern-title">
          <h2>Apa Yang <span class="text-green">Mereka</span> Katakan?</h2>
          <p>Kisah sukses dan ulasan nyata dari siswa &amp; alumni SMK Taruna Bangsa Kota Bekasi</p>
        </div>

        <div class="testimonials-grid">
          ${renderModernReviewCard({
            student_nama: 'Arga Kurniawan',
            alumni_label: 'Alumni RPL 2025',
            company_nama: 'PT Media Kreatif Nusantara',
            posisi: 'Frontend Web Developer',
            completion_period: 'Selesai Nov 2025',
            rating: 4.0,
            review_text: 'Supervisor ramah dan aktif memberi arahan harian. Suasana kantor kondusif untuk siswa PKL, serta tugas yang diberikan terstruktur.',
            avatar_url: '/images/avatars/arga-kurniawan.png'
          }, { showUpvote: false, showProsCons: false })}

          ${renderModernReviewCard({
            student_nama: 'Bayu Nugroho',
            alumni_label: 'Alumni TKRO 2025',
            company_nama: 'PT Telkom Indonesia (Persero) Tbk',
            posisi: 'Frontend Web Developer',
            completion_period: 'Selesai Agu 2025',
            rating: 5.0,
            review_text: 'Pengalaman magang yang sangat berharga. Senior engineer ramah membimbing arsitektur jaringan dan web portal modern, serta uang saku tepat waktu.',
            avatar_url: '/images/avatars/student-2.png'
          }, { showUpvote: false, showProsCons: false })}

          ${renderModernReviewCard({
            student_nama: 'Siti Rahma',
            alumni_label: 'Alumni TAV 2025',
            company_nama: 'CV Kreatif Digital',
            posisi: 'UI/UX & Creative Designer',
            completion_period: 'Selesai Jul 2025',
            rating: 4.8,
            review_text: 'Sangat menyenangkan untuk siswa yang mendalami desain antarmuka digital. Klien berskala nasional sehingga portofolio langsung dilirik industri.',
            avatar_url: '/images/avatars/student-4.png'
          }, { showUpvote: false, showProsCons: false })}
        </div>

        <div style="text-align: center; margin-top: 36px;">
          <button type="button" class="btn btn-secondary" onclick="App.goToPortalTab('ulasan')" style="padding: 12px 28px; font-weight: 700; border-radius: 9999px; font-size: 14px; border: 1.5px solid #CBD5E1; background: #ffffff; color: #0F172A; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s ease;">
            <span>Lihat Semua Ulasan Alumni</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </section>

      <!-- 9. DUAL CTA SECTION -->
      <section class="dual-cta-section">
        <div class="dual-cta-grid">
          <div class="cta-box-light" style="background: linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%); border: 1.5px solid #a7f3d0;">
            <div>
              <div class="cta-card-header">
                <div class="cta-card-icon cta-card-icon-emerald">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 10v6"/>
                    <path d="M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <h3>Pendaftaran & Pengajuan PKL Siswa</h3>
              </div>
              <p>Daftarkan akun dengan data NISN aktif SMK Taruna Bangsa Kota Bekasi. Tunggu verifikasi tim HUBIN, lalu ajukan lowongan ke perusahaan mitra impian.</p>
            </div>
            <div class="cta-actions-group">
              <button class="btn-cta-green" onclick="App.setRole('REGISTER')">
                Daftar Siswa Baru &rarr;
              </button>
              <button class="btn btn-secondary" onclick="App.setRole('LOGIN')" style="padding: 10px 18px; font-weight: 700;">
                Sudah Ada Akun? Masuk
              </button>
            </div>
          </div>

          <div class="cta-box-light">
            <div>
              <div class="cta-card-header">
                <div class="cta-card-icon cta-card-icon-blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 21h18"/>
                    <path d="M5 21V7l8-4v18"/>
                    <path d="M19 21V11l-6-4"/>
                    <path d="M9 9h1"/>
                    <path d="M9 13h1"/>
                    <path d="M9 17h1"/>
                  </svg>
                </div>
                <h3>Portal BKK & HUBIN Sekolah</h3>
              </div>
              <p>Validasi berkas NISN pendaftaran siswa, setujui lamaran PKL, terbitkan Surat Pengantar resmi sekolah, dan pantau jurnal harian siswa magang.</p>
            </div>
            <div class="cta-actions-group">
              <button class="btn btn-primary" onclick="App.setRole('LOGIN', 'hubin')" style="padding: 12px 24px; font-weight: 700;">
                Masuk Portal HUBIN &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 10. FAQ ACCORDION SECTION -->
      <section class="faq-section">
        <div class="section-modern-title">
          <h2>Pertanyaan yang Sering Diajukan (FAQ)</h2>
          <p>Jawaban atas pertanyaan umum seputar pelaksanaan PKL siswa SMK Taruna Bangsa Kota Bekasi</p>
        </div>

        <div class="faq-accordion-container">
          <div class="faq-card-item active" id="faq-0">
            <button class="faq-header-btn" onclick="App.toggleFaq(0)">
              <span>Apakah portal ini khusus untuk siswa SMK Taruna Bangsa Kota Bekasi?</span>
              <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="faq-body-collapse">
              <p><strong>Ya, benar!</strong> Platform FindMyPKL ini didedikasikan <strong>eksklusif hanya untuk siswa-siswi aktif SMK Taruna Bangsa Kota Bekasi</strong>. Pendaftaran akun diverifikasi langsung oleh tim BKK & HUBIN sekolah menggunakan data NISN Dapodik resmi.</p>
            </div>
          </div>

          <div class="faq-card-item" id="faq-1">
            <button class="faq-header-btn" onclick="App.toggleFaq(1)">
              <span>Bagaimana alur penerbitan Surat Pengantar oleh HUBIN?</span>
              <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="faq-body-collapse">
              <p>Setelah siswa mengajukan lamaran ke perusahaan yang dituju, tim BKK & HUBIN SMK Taruna Bangsa Kota Bekasi akan memvalidasi kesesuaian kejuruan dan nilai rapor. Surat Pengantar resmi bernomor (No. 421.5/SMK-TB/HUBIN/...) akan otomatis diterbitkan ke perusahaan tujuan.</p>
            </div>
          </div>

          <div class="faq-card-item" id="faq-2">
            <button class="faq-header-btn" onclick="App.toggleFaq(2)">
              <span>Bagaimana jika akun siswa belum diverifikasi oleh HUBIN?</span>
              <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="faq-body-collapse">
              <p>Siswa tetap dapat menjelajahi lowongan mitra. Pastikan NISN dan kelas Anda telah terdaftar di Dapodik SMK Taruna Bangsa Kota Bekasi. Anda juga dapat mengonfirmasi langsung ke Ruang BKK/HUBIN sekolah untuk percepatan verifikasi.</p>
            </div>
          </div>

          <div class="faq-card-item" id="faq-3">
            <button class="faq-header-btn" onclick="App.toggleFaq(3)">
              <span>Kompetensi keahlian apa saja di SMK Taruna Bangsa yang didukung?</span>
              <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="faq-body-collapse">
              <p>Tersedia lowongan untuk 4 program keahlian unggulan di SMK Taruna Bangsa Kota Bekasi: Rekayasa Perangkat Lunak (RPL), Teknik Audio Video (TAV), Teknik Instalasi Tenaga Listrik (TITL), dan Teknik Kendaraan Ringan Otomotif (TKRO).</p>
            </div>
          </div>

          <div class="faq-card-item" id="faq-4">
            <button class="faq-header-btn" onclick="App.toggleFaq(4)">
              <span>Bagaimana cara memperoleh sertifikat resmi kelulusan PKL?</span>
              <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="faq-body-collapse">
              <p>Setelah menyelesaikan masa magang dan mengisi jurnal logbook harian, pihak industri dan guru pembimbing SMK Taruna Bangsa memberikan penilaian akhir. Sertifikat kelulusan PKL resmi bernomor registrasi sekolah akan langsung terbit di akun siswa.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 11. DARK NAVY FOOTER -->
      <footer class="dark-portal-footer">
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
            </div>

            <div class="footer-dark-col">
              <h5>JURUSAN TARUNA BANGSA</h5>
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
                <li><a onclick="App.quickFilterCity('Cikarang')">Kawasan Industri Cikarang</a></li>
                <li><a onclick="App.quickFilterCity('Bandung')">Bandung & Sekitarnya</a></li>
                <li><a onclick="App.quickFilterCity('Tangerang')">Tangerang & Banten</a></li>
              </ul>
            </div>

            <div class="footer-dark-col">
              <h5>BKK & HUBIN TARUNA BANGSA</h5>
              <div class="footer-contact-info">
                <p>Email: <a href="mailto:hubin@smktarunabangsa.sch.id">hubin@smktarunabangsa.sch.id</a></p>
                <p>WhatsApp: <strong>0812-8800-9900</strong></p>
                <p>Telp: <strong>(021) 8895-1234</strong></p>
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
            <div class="footer-social-icons">
              <span class="footer-social-btn" title="Instagram">📸</span>
              <span class="footer-social-btn" title="LinkedIn">💼</span>
              <span class="footer-social-btn" title="Facebook">🌐</span>
              <span class="footer-social-btn" title="YouTube">▶️</span>
            </div>
          </div>
        </div>
      </footer>
    `;

    this.renderRekomendasiCards(jobs.slice(0, 6));

    // Setup Enter key on search input
    const posInput = document.getElementById('unified-search-posisi');
    if (posInput) {
      posInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleUnifiedSearch();
      });
    }

    if (this.updateNavbarScroll) {
      this.updateNavbarScroll();
    }
  },

  renderRekomendasiCards(jobsList) {
    const grid = document.getElementById('homepage-rekomendasi-grid');
    if (!grid) return;

    if (!jobsList || jobsList.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; width: 100%;">
          ${renderEmptyState('Tidak Ada Lowongan Sesuai Kriteria', 'Cobalah mencari dengan kata kunci posisi, jurusan, atau kota lain.')}
        </div>
      `;
      return;
    }

    grid.innerHTML = jobsList.map(j => {
      const isBookmarked = this.bookmarkedJobs && this.bookmarkedJobs.has(j.id);
      return (window.renderPklJobCard || App.renderJobCard)(j, {
        className: 'rekomendasi-card pkl-job-card',
        isBookmarked,
        actionText: 'Daftar'
      });
    }).join('');


    this.setupRekomendasiCarouselListeners();
  },

  scrollRekomendasiCards(direction) {
    const grid = document.getElementById('homepage-rekomendasi-grid');
    if (!grid) return;
    const card = grid.querySelector('.rekomendasi-card');
    const scrollStep = card ? (card.offsetWidth + 16) : 300;
    grid.scrollBy({
      left: direction === 'next' ? scrollStep : -scrollStep,
      behavior: 'smooth'
    });
  },

  scrollRekomendasiToCard(index) {
    const grid = document.getElementById('homepage-rekomendasi-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll('.rekomendasi-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  },

  setupRekomendasiCarouselListeners() {
    const grid = document.getElementById('homepage-rekomendasi-grid');
    const dotsContainer = document.getElementById('rekomendasi-carousel-dots');
    if (!grid || !dotsContainer || typeof grid.querySelectorAll !== 'function') return;

    const cards = grid.querySelectorAll('.rekomendasi-card');
    if (cards.length <= 1) {
      dotsContainer.style.display = 'none';
      return;
    }

    dotsContainer.style.display = '';
    dotsContainer.innerHTML = Array.from(cards).map((_, i) => `
      <div class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="App.scrollRekomendasiToCard(${i})" title="Lihat lowongan ${i + 1}"></div>
    `).join('');

    let isTicking = false;
    grid.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const scrollLeft = grid.scrollLeft;
          const cardWidth = cards[0]?.offsetWidth || 280;
          const activeIndex = Math.round(scrollLeft / (cardWidth + 16));
          const dots = dotsContainer.querySelectorAll('.carousel-dot');
          dots.forEach((dot, idx) => {
            if (idx === Math.min(activeIndex, dots.length - 1)) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
          isTicking = false;
        });
        isTicking = true;
      }
    }, { passive: true });
  },

  handleUnifiedSearch() {
    const posisi = (document.getElementById('unified-search-posisi')?.value || '').trim();
    const jurusan = document.getElementById('unified-search-jurusan')?.value || 'Semua';
    const kota = document.getElementById('unified-search-kota')?.value || 'Semua';

    this.initialCatalogSearch = {
      keyword: posisi,
      jurusan: jurusan,
      kota: kota
    };

    const targetRole = this.currentRole === 'SISWA' ? 'SISWA' : 'PUBLIC';
    this.setRole(targetRole, 'katalog');
  },

  quickFilterMajor(majorCode) {
    const jurSelect = document.getElementById('unified-search-jurusan');
    if (jurSelect) jurSelect.value = majorCode;
    this.handleUnifiedSearch();
  },

  quickFilterCity(cityName) {
    const citySelect = document.getElementById('unified-search-kota');
    if (citySelect) citySelect.value = cityName;
    this.handleUnifiedSearch();
  },

  toggleFaq(index) {
    const item = document.getElementById(`faq-${index}`);
    if (item) {
      item.classList.toggle('active');
      if (typeof window !== 'undefined' && window.lenis) {
        try { window.lenis.resize(); } catch (e) {}
      }
    }
  },

  showLoginModal() {
    this.setRole('LOGIN');
  },

  showAboutModal() {
    const contentHtml = `
      <div>
        <div style="text-align: center; margin-bottom: 20px;">
          <div class="brand-icon-box" style="margin: 0 auto 12px; width: 56px; height: 56px; padding: 0; overflow: hidden; background: transparent; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);">
            <img src="images/logo.png" alt="FindMyPKL Logo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 14px; display: block;" />
          </div>
          <h3 style="font-size: 18px; font-weight: 800; color: var(--slate-900);">Tentang Find My PKL</h3>
          <p style="font-size: 13px; color: var(--slate-500);">SMK Taruna Bangsa Kota Bekasi &bull; BKK & Hubungan Industri (HUBIN)</p>
        </div>

        <p style="font-size: 14px; color: var(--slate-700); line-height: 1.6; margin-bottom: 14px;">
          <strong>Find My PKL</strong> adalah sistem informasi terpadu yang dirancang <strong>khusus untuk siswa-siswi SMK Taruna Bangsa Kota Bekasi</strong> guna memfasilitasi penelusuran lowongan Praktik Kerja Lapangan (PKL), manajemen berkas, penerbitan Surat Pengantar resmi, serta pemantauan jurnal kegiatan harian.
        </p>

        <div style="background-color: var(--slate-50); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px;">
          <h5 style="font-size: 13px; font-weight: 700; color: var(--slate-900); margin-bottom: 6px;">Keunggulan & Ketentuan Khusus:</h5>
          <ul style="font-size: 13px; color: var(--slate-600); padding-left: 18px; line-height: 1.6;">
            <li>Eksklusif bagi siswa aktif dari seluruh kejuruan SMK Taruna Bangsa Kota Bekasi.</li>
            <li>Validasi data NISN terintegrasi langsung dengan database Dapodik sekolah.</li>
            <li>Penerbitan Surat Pengantar resmi berkop SMK Taruna Bangsa Kota Bekasi secara otomatis.</li>
            <li>Jurnal harian (logbook) digital yang dipantau real-time oleh guru pembimbing dan mentor DUDI.</li>
            <li>Penyimpanan data lokal mandiri (in-memory mock store) yang responsif dan bebas dependensi eksternal.</li>
          </ul>
        </div>

        <button class="btn btn-secondary" style="width: 100%;" onclick="Modal.close()">Tutup</button>
      </div>
    `;

    Modal.open(contentHtml, 'Tentang Find My PKL');
  },

  async showPartnersModal() {
    const companies = await API.getCompanies();
    const contentHtml = `
      <div>
        <div style="text-align: center; margin-bottom: 20px;">
          <h3 style="font-size: 18px; font-weight: 800; color: var(--slate-900);">Mitra Dunia Usaha & Industri (DUDI) Resmi</h3>
          <p style="font-size: 13px; color: var(--slate-500);">Daftar perusahaan rekanan yang telah menandatangani Nota Kesepahaman (MoU) resmi dengan SMK Taruna Bangsa Kota Bekasi.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto; padding-right: 4px;">
          ${companies.map(c => `
            <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; background-color: var(--slate-50); display: flex; align-items: center; justify-content: space-between; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div class="company-badge-box" style="background-color: ${c.logo_color || '#1e40af'}; width: 44px; height: 44px; font-size: 14px;">
                  ${c.logo_initials || 'DUDI'}
                </div>
                <div>
                  <h4 style="font-size: 15px; font-weight: 700; color: var(--slate-900);">${c.nama}</h4>
                  <div style="font-size: 12px; color: var(--slate-500);">${c.bidang} &bull; ${c.kota}</div>
                  <div style="font-size: 11px; color: var(--primary-700); margin-top: 2px;">No. MoU: <code>${c.no_mou || 'Resmi Terdaftar'}</code></div>
                </div>
              </div>
              <span class="badge badge-emerald">${c.status_mou}</span>
            </div>
          `).join('')}
        </div>

        <button class="btn btn-secondary" style="width: 100%; margin-top: 18px;" onclick="Modal.close()">Tutup</button>
      </div>
    `;

    Modal.open(contentHtml, 'Mitra Perusahaan (DUDI)', 'lg');
  }
});
