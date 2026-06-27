import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "VOTRE_API_KEY",

authDomain: "VOTRE_DOMAINE",

projectId: "VOTRE_PROJECT_ID",

storageBucket: "VOTRE_BUCKET",

messagingSenderId: "VOTRE_ID",

appId: "VOTRE_APP_ID"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
import { getAuth }
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "VOTRE_API_KEY",

authDomain: "VOTRE_DOMAINE",

projectId: "VOTRE_PROJECT_ID",

storageBucket: "VOTRE_BUCKET",

messagingSenderId: "VOTRE_ID",

appId: "VOTRE_APP_ID"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);