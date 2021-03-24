var str = document.location.href;
var url = new URL(str);
var pays = url.searchParams.get("country");
var countryStorage = new localStorageDB(pays,localStorage);

window.onload = function()
{
    document.getElementById("pays").innerHTML =`<h1 style="text-align:center;">${pays}</h1>`;
    document.getElementById("pays-title").innerHTML =pays;
    console.log(pays);
    fillStorage()
    initCanvas()
    //initGraph();
}

var Val_max;
var Val_min;
var sections;
var xScale;
var yScale;
var canvas;
var c;

function initCanvas()
{
    canvas = document.getElementById("canvas");
	c = canvas.getContext("2d");
    Val_max = 1000000;
	Val_min = 0;
    var stepSize = 100000;
	var columnSize = 30;
	var rowSize = 30;
    sections = countryStorage.queryAll("Info"+pays).length;
	var margin = 10;
    c.fillStyle = "#0099ff"
	c.font = "20 pt Verdana"


    yScale = (canvas.height - columnSize - margin) / (Val_max - Val_min);
	xScale = (canvas.width - rowSize) / sections;

    c.strokeStyle="#000";
	c.beginPath();

   

    var count =  0;
	for (scale=Val_max;scale>=Val_min;scale = scale - stepSize) {
		var y = columnSize + (yScale * count * stepSize); 
		c.fillText(scale, margin,y + margin);
		c.moveTo(rowSize,y)
		c.lineTo(canvas.width,y)
		count++;
	}
	c.stroke();
	

    c.translate(rowSize,canvas.height + Val_min * yScale +  Val_min * yScale);
	c.scale(1,-1 * yScale);

    
    //console.log(countryStorage.queryAll("Info"+pays).Death);
    //lineTo(x, y);
    c.strokeStyle="#FF0066";
    c.lineWidth = 5;
    c.beginPath();
    c.moveTo(0,countryStorage.queryAll("Info"+pays)[0].Active);
    for (let index = 0; index < sections; index++) {
        c.lineTo(index * xScale,countryStorage.queryAll("Info"+pays)[index].Active);
        console.log(countryStorage.queryAll("Info"+pays)[index].Active);
    }
    c.stroke();


    c.strokeStyle="#000000";
    c.lineWidth = 5;
    c.beginPath();
    c.moveTo(0,countryStorage.queryAll("Info"+pays)[0].Death);
    for (let index = 0; index < sections; index++) {
        c.lineTo(index * xScale,countryStorage.queryAll("Info"+pays)[index].Death);
        console.log(countryStorage.queryAll("Info"+pays)[index].Death);
    }
    c.stroke();
   
    c.strokeStyle="#5BFF37";
    c.lineWidth = 5;
    c.beginPath();
    c.moveTo(0,countryStorage.queryAll("Info"+pays)[0].Recovered);
    for (let index = 0; index < sections; index++) {
        c.lineTo(index * xScale,countryStorage.queryAll("Info"+pays)[index].Recovered);
        console.log(countryStorage.queryAll("Info"+pays)[index].Recovered);
    }
    c.stroke();
    
}




/*

for (let index = 0; index < response.length; index++) {
            
    console.log(response[index].Confirmed);
     c.lineTo(index*3,response[index].Confirmed);
 }
*/












function fillStorage()
{

    
    if (countryStorage.isNew()) {
        countryStorage.createTable("Info"+pays,["Death","Recovered","Active","Date"]);
        countryStorage.commit();
    }
    let p = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onerror = (() => {
            reject("Erreur !")
        })
        xhr.ontimeout = (() => {
            reject("Timeout !")
        })
    
        xhr.responseType = "json"
        xhr.timeout = 1000
        xhr.onload = function() {
            resolve(this.response);
        }
        xhr.open("GET","https://api.covid19api.com/dayone/country/"+pays,true);
        xhr.send();
    })

    p.then(response =>
        {
            //console.log(response);
            countryStorage.deleteRows("Info"+pays);
            countryStorage.commit();
            if (countryStorage.isNew()) {
                countryStorage.createTable("Info"+pays,["Death","Recovered","Active","Date"]);
                countryStorage.commit();
            }
            for (let index = 0; index < response.length; index++) {
                countryStorage.insert("Info"+pays,{Death:response[index].Deaths,
                                              Recovered:response[index].Recovered,
                                              Active:response[index].Active,
                                              Date:response[index].Date});
        
                countryStorage.commit();
            }
        })
    p.catch(error=>{
        console.error(error);
    })
        
}