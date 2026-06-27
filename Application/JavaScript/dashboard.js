const ctx =
document.getElementById('progressChart');

new Chart(ctx, {

type:'line',

data:{

labels:[
'Quiz 1',
'Quiz 2',
'Quiz 3',
'Quiz 4',
'Quiz 5'
],

datasets:[{

label:'Progression',

data:[
45,
58,
63,
74,
82
],

borderWidth:3,

tension:.4

}]

},

options:{
responsive:true
}

});