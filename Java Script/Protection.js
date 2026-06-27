function checkAuth() {
  const isConnected = localStorage.getItem('isConnected');
  if (isConnected !== 'true') {
    window.location.href = 'login.html';
  }
}

function getStudentName() {
  return localStorage.getItem('studentName') || 'Élève';
}

function getUserRole() {
  return localStorage.getItem('studentRole') || 'student';
}

function updateHeaderWithStudentName() {
  const studentName = getStudentName();
  const role = getUserRole();
  const userIcons = document.querySelectorAll('.user-icon, .student-icon');

  userIcons.forEach(el => {
    const roleLabel = role === 'teacher' ? 'Enseignant' : 'Élève';
    el.innerHTML = `<i class="fa-solid fa-user-circle" style="margin-right: 0.5rem;"></i>${studentName} (${roleLabel})`;
  });

  applyRoleNavigation();
}

function applyRoleNavigation() {
  const role = getUserRole();
  const isTeacher = role === 'teacher';
  const navs = document.querySelectorAll('#navMenu, #mobileNav');

  navs.forEach(nav => {
    const dashboardLinks = nav.querySelectorAll('a[href="DashboardEnseigant.html"]');

    if (isTeacher && dashboardLinks.length === 0) {
      const dashboardLink = document.createElement('a');
      dashboardLink.href = 'DashboardEnseigant.html';
      dashboardLink.textContent = 'Dashboard';
      dashboardLink.className = 'teacher-dashboard-link';
      nav.insertBefore(dashboardLink, nav.querySelector('button') || null);
    }

    if (!isTeacher) {
      dashboardLinks.forEach(link => link.remove());
    }
  });
}

function requireTeacher() {
  checkAuth();
  if (getUserRole() !== 'teacher') {
    window.location.href = 'Cours.html';
  }
}

function logout() {
  localStorage.removeItem('isConnected');
  localStorage.removeItem('studentName');
  localStorage.removeItem('studentEmail');
  localStorage.removeItem('studentRole');
  window.location.href = 'index.html';
}
