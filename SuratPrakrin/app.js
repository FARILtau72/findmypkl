/**
 * Logika Aplikasi Generator Surat PRAKRIN
 * SMK Taruna Bangsa Bekasi
 */

// ===== STATE DATA =====
let formData = {
    noSurat: '',
    tanggal: '',
    jurusanUtama: '',
    kelasUtama: '',
    perusahaan: '',
    alamatPerusahaan: '',
    students: [
        { nama: '', nis: '', telp: '' },
        { nama: '', nis: '', telp: '' },
        { nama: '', nis: '', telp: '' },
        { nama: '', nis: '', telp: '' }
    ]
};

// ===== LIFECYCLE HOOKS =====
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    setupEventListeners();
    setupJurusanOptions();
});

// ===== SETUP FUNCTIONS =====
function setupJurusanOptions() {
    // Ekstrak Jurusan unik
    const jurusans = [...new Set(CLASS_DATA.map(k => k.jurusan))].sort();
    const selJurusan = document.getElementById('jurusanUtama');
    selJurusan.innerHTML = '<option value="">-- Pilih Jurusan --</option>';
    
    jurusans.forEach(j => {
        const opt = document.createElement('option');
        opt.value = j;
        opt.textContent = j;
        selJurusan.appendChild(opt);
    });

    if (formData.jurusanUtama) {
        selJurusan.value = formData.jurusanUtama;
        updateKelasOptions();
        if (formData.kelasUtama) {
            document.getElementById('kelasUtama').value = formData.kelasUtama;
        }
    }
    renderAll();
}

function setupEventListeners() {
    const inputs = ['noSurat', 'tanggal', 'jurusanUtama', 'kelasUtama', 'perusahaan', 'alamatPerusahaan'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', (e) => {
            formData[id] = e.target.value;
            
            if (id === 'jurusanUtama') {
                formData.kelasUtama = ''; // Reset pilihan kelas saat jurusan diganti
                updateKelasOptions();
                updatePejabatInfo();
            } else if(id === 'kelasUtama') {
                updatePejabatInfo();
            }

            saveToLocalStorage();
            renderPreview();
        });
    });

    // Event Delegation untuk Input Siswa
    document.getElementById('studentsContainer').addEventListener('input', (e) => {
        if(e.target.tagName === 'INPUT') {
            const index = e.target.dataset.index;
            const field = e.target.dataset.field;
            formData.students[index][field] = e.target.value;
            saveToLocalStorage();
            renderPreview();
        }
    });
}

// ===== DROPDOWN MANAGEMENT =====
function updateKelasOptions() {
    const selectKelas = document.getElementById('kelasUtama');
    selectKelas.innerHTML = '<option value="">-- Pilih Kelas --</option>';
    
    if (formData.jurusanUtama) {
        selectKelas.disabled = false;
        const filtered = CLASS_DATA.filter(k => k.jurusan === formData.jurusanUtama);
        filtered.forEach(k => {
            const option = document.createElement('option');
            option.value = k.id;
            option.textContent = k.nama_kelas;
            selectKelas.appendChild(option);
        });
    } else {
        selectKelas.disabled = true;
    }
}

// ===== INFO DISPLAY =====
function updatePejabatInfo() {
    const infoBox = document.getElementById('pejabatInfo');
    const cls = CLASS_DATA.find(k => k.id == formData.kelasUtama);
    
    if (cls) {
        document.getElementById('infoWali').textContent = cls.wali_kelas || '-';
        document.getElementById('infoKaprodi').textContent = cls.kaprodi || '-';
        document.getElementById('infoPembina').textContent = cls.pembina || '-';
        infoBox.classList.remove('hidden');
    } else {
        infoBox.classList.add('hidden');
    }
}

// ===== RENDER FUNCTIONS =====
function renderAll() {
    document.getElementById('noSurat').value = formData.noSurat;
    document.getElementById('tanggal').value = formData.tanggal;
    document.getElementById('jurusanUtama').value = formData.jurusanUtama;
    document.getElementById('perusahaan').value = formData.perusahaan;
    document.getElementById('alamatPerusahaan').value = formData.alamatPerusahaan;

    updatePejabatInfo();
    renderStudentInputs();
    renderPreview();
}

function renderStudentInputs() {
    const container = document.getElementById('studentsContainer');
    container.innerHTML = '';

    formData.students.forEach((student, index) => {
        const div = document.createElement('div');
        div.className = 'p-3 bg-gray-50 border border-gray-200 rounded-lg relative';
        
        let deleteBtn = '';
        if (formData.students.length > 1) {
            deleteBtn = `
                <button onclick="removeStudent(${index})" class="text-red-500 hover:text-red-700 absolute top-2 right-2">
                    <i class="fa-solid fa-trash text-sm"></i>
                </button>
            `;
        } else {
            deleteBtn = `<span class="text-xs font-bold text-gray-400 absolute top-2 right-2">#${index + 1}</span>`;
        }

        div.innerHTML = `
            ${deleteBtn}
            <div class="grid grid-cols-1 gap-3 mt-2">
                <input type="text" placeholder="Nama Lengkap Siswa" data-index="${index}" data-field="nama" value="${student.nama}" class="w-full p-2 text-sm border border-gray-300 rounded outline-none focus:ring-1 focus:ring-blue-500" />
                <div class="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="NIS" data-index="${index}" data-field="nis" value="${student.nis}" class="w-full p-2 text-sm border border-gray-300 rounded outline-none focus:ring-1 focus:ring-blue-500" />
                    <input type="text" placeholder="No Telepon" data-index="${index}" data-field="telp" value="${student.telp}" class="w-full p-2 text-sm border border-gray-300 rounded outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderPreview() {
    const cls = CLASS_DATA.find(k => k.id == formData.kelasUtama);

    document.getElementById('prevNoSurat').textContent = formData.noSurat || '..................';
    document.getElementById('prevTanggal').textContent = formData.tanggal || '...........................';
    document.getElementById('prevPerusahaan').textContent = formData.perusahaan;
    document.getElementById('prevAlamat').textContent = formData.alamatPerusahaan;

    document.getElementById('prevWali').textContent = (cls && cls.wali_kelas) ? cls.wali_kelas : '........................................';
    document.getElementById('prevKaprodi').textContent = (cls && cls.kaprodi) ? cls.kaprodi : '........................................';
    document.getElementById('prevPembina').textContent = (cls && cls.pembina) ? cls.pembina : '........................................';

    const tbody = document.getElementById('prevStudentsBody');
    tbody.innerHTML = '';
    
    formData.students.forEach((student, idx) => {
        const tr = document.createElement('tr');
        tr.className = 'h-8';
        
        const displayKelas = (student.nama || student.nis) ? (cls ? cls.nama_kelas : '') : '';

        tr.innerHTML = `
            <td class="border border-black text-center">${idx + 1}</td>
            <td class="border border-black px-2">${student.nama}</td>
            <td class="border border-black px-2 text-center">${student.nis}</td>
            <td class="border border-black px-2 text-center">${student.telp}</td>
            <td class="border border-black px-2 text-center font-bold">${displayKelas}</td>
        `;
        tbody.appendChild(tr);
    });

    const catatanBody = document.getElementById('prevCatatanBody');
    catatanBody.innerHTML = '';

    formData.students.forEach((student, idx) => {
        const tr = document.createElement('tr');
        tr.className = 'h-6';
        tr.innerHTML = `
            <td class="border border-black px-2">${idx + 1}.</td>
            <td class="border border-black px-2">${idx + 1}.</td>
        `;
        catatanBody.appendChild(tr);
    });
}

// ===== STUDENT MANAGEMENT =====
function addStudent() {
    if (formData.students.length < 6) {
        formData.students.push({ nama: '', nis: '', telp: '' });
        saveToLocalStorage();
        renderStudentInputs();
        renderPreview();
    } else {
        alert("Maksimal 6 siswa untuk 1 surat.");
    }
}

function removeStudent(index) {
    if (formData.students.length > 1) {
        formData.students.splice(index, 1);
        saveToLocalStorage();
        renderStudentInputs();
        renderPreview();
    }
}

// ===== FORM MANAGEMENT =====
function resetForm() {
    if(confirm("Apakah Anda yakin ingin mengosongkan semua form?")) {
        formData = {
            noSurat: '',
            tanggal: '',
            jurusanUtama: '',
            kelasUtama: '',
            perusahaan: '',
            alamatPerusahaan: '',
            students: [
                { nama: '', nis: '', telp: '' },
                { nama: '', nis: '', telp: '' },
                { nama: '', nis: '', telp: '' },
                { nama: '', nis: '', telp: '' }
            ]
        };
        localStorage.removeItem('suratPrakrinHtmlData');
        renderAll();
    }
}

function saveAndPrint() {
    if(!formData.noSurat || !formData.tanggal || !formData.perusahaan || !formData.alamatPerusahaan || !formData.kelasUtama) {
        alert('Pilih kelas dan lengkapi detail surat (Nomor, Tanggal, Perusahaan, Alamat) terlebih dahulu!');
        return;
    }
    
    const validStudents = formData.students.filter(s => s.nama.trim() !== '');
    if(validStudents.length === 0) {
        alert('Minimal harus ada 1 siswa!');
        return;
    }

    saveToLocalStorage();
    alert('Data surat berhasil disimpan ke aplikasi!');
    window.print();
}

// ===== LOCAL STORAGE =====
function saveToLocalStorage() {
    localStorage.setItem('suratPrakrinHtmlData', JSON.stringify(formData));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('suratPrakrinHtmlData');
    if (savedData) {
        try {
            formData = JSON.parse(savedData);
        } catch (e) {
            console.error("Gagal membaca data dari local storage", e);
        }
    }
}

// ===== AUTH HELPERS =====
function doLogout(){
    if(confirm('Yakin ingin logout?')){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }
}
