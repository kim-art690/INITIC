import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

async function checkRole(user){

const snap = await getDoc(doc(db,"users",user.uid));

if(!snap.exists()) return;

const role = snap.data().role;

if(role !== "teacher"){
  window.location = "dashboard.html";
}

}