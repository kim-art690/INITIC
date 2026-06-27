import { db } from "./firebase-config.js";
import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

async function loadDashboard(){

const usersSnap =
await getDocs(collection(db,"users"));

const resultsSnap =
await getDocs(collection(db,"results"));

let totalScore = 0;
let count = 0;

resultsSnap.forEach(doc=>{

const data = doc.data();

totalScore += (data.score / data.total) * 100;

count++;

});

const avg = count ? (totalScore / count).toFixed(1) : 0;

document.getElementById("students").innerText =
usersSnap.size;

document.getElementById("avg").innerText =
avg + "%";

// analyse simple des difficultés
let weak = "Excel";

document.getElementById("weak").innerText = weak;

// tableau résultats
const table = document.getElementById("resultsTable");

resultsSnap.forEach(doc=>{

const d = doc.data();

const div = document.createElement("div");

div.innerHTML = `
<p>Score : ${d.score}/${d.total}</p>
<p>Date : ${new Date(d.date.seconds*1000).toLocaleString()}</p>
<hr>
`;

table.appendChild(div);

});

}

loadDashboard();


import { jsPDF } from "jspdf";

window.exportPDF = function () {

const doc = new jsPDF();

doc.setFontSize(16);
doc.text("Rapport pédagogique - EduInfo7", 20, 20);

doc.setFontSize(12);
doc.text("Résumé des performances :", 20, 40);

let y = 60;

document.querySelectorAll("#resultsTable div").forEach((el, i) => {
  doc.text(el.innerText, 20, y);
  y += 20;
});

doc.save("rapport_eduinfo7.pdf");

};