function detectWeakness(results){

let weak = {};

results.forEach(r => {

if(r.score / r.total < 0.5){

weak["Excel"] = (weak["Excel"] || 0) + 1;

}

});

return Object.keys(weak)[0] || "Aucune faiblesse majeure";

}