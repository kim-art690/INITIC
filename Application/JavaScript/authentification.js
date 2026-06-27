// Authentification simple basée sur localStorage
// Note: Ceci est une implémentation simplifiée sans Firebase

// Gestion du formulaire d'enregistrement
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role")?.value || "student";

    // Validation simple
    if (!name || !email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    if (password.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    // Vérifier si l'email existe déjà
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email]) {
      alert("Cet email est déjà utilisé");
      return;
    }

    // Enregistrer l'utilisateur
    users[email] = {
      name,
      email,
      password, // En production, il faut hasher le mot de passe!
      role,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("users", JSON.stringify(users));
    alert("Compte créé avec succès! Vous pouvez maintenant vous connecter.");
    window.location.href = "login.html";
  });
}

// Gestion du formulaire de connexion
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Veuillez entrer votre email et votre mot de passe");
      return;
    }

    // Vérifier l'utilisateur
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const user = users[email];

    if (!user || user.password !== password) {
      alert("Email ou mot de passe incorrect");
      return;
    }

    // Connecter l'utilisateur
    localStorage.setItem("isConnected", "true");
    localStorage.setItem("studentName", user.name);
    localStorage.setItem("studentEmail", email);
    localStorage.setItem("studentRole", user.role);

    // Initialiser les progressions des cours à 0% pour le premier login
    const progressKey = `courseProgress_${email}`;
    if (!localStorage.getItem(progressKey)) {
      const courseProgress = {
        "Introduction à l'Informatique": 0,
        "Matériel": 0,
        "Windows": 0,
        "Word": 0,
        "Excel": 0,
        "Internet": 0,
        "Sécurité": 0,
        "Réseaux": 0
      };
      localStorage.setItem(progressKey, JSON.stringify(courseProgress));
    }

    alert(`Bienvenue ${user.name}!`);
    
    // Rediriger selon le rôle
    if (user.role === "teacher") {
      window.location.href = "DashboardEnseigant.html";
    } else {
      window.location.href = "Cours.html";
    }
  });
}

