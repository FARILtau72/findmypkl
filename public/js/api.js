const API = {
  baseUrl: '/api',

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Terjadi kesalahan pada server');
      }
      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err);
      throw err;
    }
  },

  // Health & Database status
  getHealth() {
    return this.request('/health');
  },

  // Students
  getStudents(params = {}) {
    const q = new URLSearchParams(params).toString();
    return this.request(`/students${q ? '?' + q : ''}`);
  },

  getStudentById(id) {
    return this.request(`/students/${id}`);
  },

  registerStudent(data) {
    return this.request('/students', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  verifyStudent(id, data) {
    return this.request(`/students/${id}/verify`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  updateStudent(id, data) {
    return this.request(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Companies
  getCompanies(params = {}) {
    const q = new URLSearchParams(params).toString();
    return this.request(`/companies${q ? '?' + q : ''}`);
  },

  getCompanyById(id) {
    return this.request(`/companies/${id}`);
  },

  addCompany(data) {
    return this.request('/companies', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Jobs
  getJobs(params = {}) {
    const q = new URLSearchParams(params).toString();
    return this.request(`/jobs${q ? '?' + q : ''}`);
  },

  getJobById(id) {
    return this.request(`/jobs/${id}`);
  },

  createJob(data) {
    return this.request('/jobs', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  updateJob(id, data) {
    return this.request(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  deleteJob(id) {
    return this.request(`/jobs/${id}`, {
      method: 'DELETE'
    });
  },

  // Applications
  getApplications(params = {}) {
    const q = new URLSearchParams(params).toString();
    return this.request(`/applications${q ? '?' + q : ''}`);
  },

  submitApplication(data) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  updateApplicationStatus(id, data) {
    return this.request(`/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Placements
  getPlacements(params = {}) {
    const q = new URLSearchParams(params).toString();
    return this.request(`/placements${q ? '?' + q : ''}`);
  },

  completePlacement(id, data) {
    return this.request(`/placements/${id}/complete`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Logbooks
  getLogbooks(placementId) {
    return this.request(`/placements/${placementId}/logbooks`);
  },

  addLogbook(placementId, data) {
    return this.request(`/placements/${placementId}/logbooks`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Alumni
  getAlumni(params = {}) {
    const q = new URLSearchParams(params).toString();
    return this.request(`/alumni${q ? '?' + q : ''}`);
  },

  // Reviews (Ulasan Perusahaan)
  getReviews(params = {}) {
    const q = new URLSearchParams(params).toString();
    return this.request(`/reviews${q ? '?' + q : ''}`);
  },

  submitReview(data) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  upvoteReview(id) {
    return this.request(`/reviews/${id}/upvote`, {
      method: 'POST'
    });
  },

  // Favorites / Bookmarks
  getFavorites(studentId) {
    return this.request('/favorites', {
      headers: studentId ? { 'X-Student-Id': String(studentId) } : {}
    });
  },

  toggleFavorite(jobId, studentId) {
    return this.request('/favorites/toggle', {
      method: 'POST',
      headers: studentId ? { 'X-Student-Id': String(studentId) } : {},
      body: JSON.stringify({ job_id: jobId, student_id: studentId })
    });
  },

  // Reset dummy store to default
  resetData() {
    return this.request('/reset', { method: 'POST' });
  }
};
