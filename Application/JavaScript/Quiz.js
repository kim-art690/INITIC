const questions = [

{
question:"Que signifie RAM ?",
options:[
"Random Access Memory",
"Read Access Memory",
"Run Active Memory"
],
answer:0,
skill:"Matériel informatique"
},

{
question:"Quel logiciel permet de taper un texte ?",
options:[
"Excel",
"Word",
"PowerPoint"
],
answer:1,
skill:"Word"
},

{
question:"Windows est un ...",
options:[
"Logiciel système",
"Jeu",
"Antivirus"
],
answer:0,
skill:"Windows"
}

];

let current = 0;
let score = 0;
let time = 60;
let timer;

function startTimer(){

timer = setInterval(()=>{

time--;

document.getElementById("time").innerText = time;

if(time <= 0){

finishQuiz();

}

},1000);

}

function loadQuestion(){

const q = questions[current];

document.getElementById("question").innerText = q.question;

const optionsDiv = document.getElementById("options");

optionsDiv.innerHTML = "";

q.options.forEach((opt,index)=>{

const div = document.createElement("div");

div.classList.add("option");

div.innerText = opt;

div.onclick = ()=> selectOption(div,index);

optionsDiv.appendChild(div);

});

}

let selected = null;

function selectOption(el,index){

document.querySelectorAll(".option").forEach(o=>o.classList.remove("selected"));

el.classList.add("selected");

selected = index;

}

function nextQuestion(){

if(selected === null) return;

if(selected === questions[current].answer){

score++;
}

current++;

selected = null;

if(current < questions.length){

loadQuestion();

}else{

finishQuiz();

}

}

function finishQuiz(){

clearInterval(timer);

document.getElementById("quiz-box").classList.add("hidden");

document.getElementById("result").classList.remove("hidden");

document.getElementById("scoreText").innerText =
"Score : " + score + "/" + questions.length;

// sauvegarde locale (pré Firebase)
localStorage.setItem("lastScore", score);

generateRecommendation();

}

function restartQuiz(){

location.reload();

}

function generateRecommendation(){

let weakSkills = [];

questions.forEach((q,i)=>{

if(i >= score){

weakSkills.push(q.skill);

}

});

localStorage.setItem("weakSkills", JSON.stringify(weakSkills));

}
import { db, auth } from "./firebase-config.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

async function saveScore(score, total){

const user = auth.currentUser;

if(!user) return;

await setDoc(doc(db,"results",user.uid),{
score: score,
total: total,
date: new Date()
});

}