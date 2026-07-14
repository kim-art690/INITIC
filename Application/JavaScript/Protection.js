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

function getCurrentPage() {
  const page = window.location.pathname.split('/').pop().toLowerCase();
  return page === '' ? 'index.html' : page;
}

function getRoleNavLinks() {
  const role = getUserRole();
  const currentPage = getCurrentPage();
  const links = [];

  if (role === 'teacher') {
    if (currentPage === 'index.html') {
      links.push({ text: 'Cours', href: 'Cours.html' });
      links.push({ text: 'Dashboard', href: 'DashboardEnseigant.html' });
    } else {
      links.push({ text: 'Accueil', href: 'index.html' });
      links.push({ text: 'Cours', href: 'Cours.html' });
      links.push({ text: 'Dashboard', href: 'DashboardEnseigant.html' });
    }
  } else {
    links.push({ text: 'Accueil', href: 'index.html' });
    links.push({ text: 'Cours', href: 'Cours.html' });
    links.push({ text: 'Assistant', href: 'Assistant.html' });
    links.push({ text: 'Résultats', href: 'Resultats.html' });
  }

  return links;
}

function renderNavLinks(nav, links) {
  if (!nav) return;

  if (nav.id === 'navMenu' || nav.id === 'mobileNav') {
    nav.innerHTML = links.map(link => `<a href="${link.href}" style="text-decoration: none; color: #334155; font-weight: 500; transition: 0.3s;">${link.text}</a>`).join('');
  } else if (nav.tagName === 'UL') {
    nav.innerHTML = links.map(link => `<li><a href="${link.href}" style="text-decoration: none; color: #334155; font-weight: 500; transition: 0.3s;">${link.text}</a></li>`).join('') + (links.length ? '<li><a href="#" onclick="logout(); return false;" style="text-decoration: none; color: #ef4444; font-weight: 600;">Déconnexion</a></li>' : '');
  }
}

function applyRoleNavigation() {
  const isConnected = localStorage.getItem('isConnected') === 'true';
  if (!isConnected) return;

  const links = getRoleNavLinks();
  const navMenu = document.getElementById('navMenu');
  const mobileNav = document.getElementById('mobileNav');
  const defaultNav = document.querySelector('nav ul');

  renderNavLinks(navMenu, links);
  renderNavLinks(mobileNav, links);
  renderNavLinks(defaultNav, links);
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
