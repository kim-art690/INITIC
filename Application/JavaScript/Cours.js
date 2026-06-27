const courses = [

{
id:1,

title:"Introduction à l'informatique",

video:"assets/videos/informatique.mp4",

pdf:"assets/pdf/introduction.pdf"
},

{
id:2,

title:"Windows",

video:"assets/videos/windows.mp4",

pdf:"assets/pdf/windows.pdf"
},

{
id:3,

title:"Microsoft Word",

video:"assets/videos/word.mp4",

pdf:"assets/pdf/word.pdf"
}

];

let currentCourse = null;

function openCourse(id){

const course =
courses.find(
c => c.id === id
);

currentCourse = course;

document
.getElementById("courseViewer")
.classList
.remove("hidden");

document
.getElementById("courseTitle")
.innerText =
course.title;

document
.getElementById("videoPlayer")
.src =
course.video;

document
.getElementById("pdfLink")
.href =
course.pdf;

window.scrollTo({

top:
document.body.scrollHeight,

behavior:"smooth"

});

}

function markCompleted(){

if(!currentCourse)
return;

let completed =
JSON.parse(

localStorage.getItem(
"completedCourses"
)

) || [];

if(
!completed.includes(
currentCourse.id
)
){

completed.push(
currentCourse.id
);

localStorage.setItem(
"completedCourses",
JSON.stringify(
completed
)
);

}

alert(
"Cours terminé avec succès 🎉"
);

}