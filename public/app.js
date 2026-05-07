async function loadData(){return await fetch("/data").then(r=>r.json());}
function getTimeSlot(){const h=new Date().getHours();if(h<11)return"morning";if(h<17)return"lunch";if(h<22)return"evening";return"night";}
function getDay(){return["sun","mon","tue","wed","thu","fri","sat"][new Date().getDay()];}
function getHighlights(menu){return menu.filter(i=>i.highlight).slice(0,4);}
