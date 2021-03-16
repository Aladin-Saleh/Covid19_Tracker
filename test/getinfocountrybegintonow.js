
window.onload = function()
{
    document.getElementById("pays").innerHTML = pays;
    //18 pays outre-mer pour la france
    initCanvas()
}










function initCanvas()
{
    var canvas = document.querySelector('canvas');
    canvas.width = 800 ;
    canvas.height = 500;
    var c = canvas.getContext('2d');
    var array = [];
    Val_max = 400;
	Val_min = 0;
	var columnSize = 5;
	var rowSize = 5;
    //Courbe

    	
	yScale = (canvas.height - columnSize ) / (Val_max - Val_min);
	xScale = (canvas.width - rowSize) / 12;

    c.translate(rowSize,canvas.height + Val_min * yScale +  Val_min * yScale);
	c.scale(1,-1 * yScale);
    c.beginPath();
    var xScale = 10;
    c.moveTo(0,0);
    for (let index = 0; index < xhr.response.length; index++) {
            
       console.log(xhr.response[index].Cases);
        c.lineTo(index*xScale,xhr.response[index].Cases*0.1);
    }

    c.stroke();
}


xhr = new XMLHttpRequest();
xhr.open("GET","https://api.covid19api.com/country/"+pays+"/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z");
xhr.responseType = "json";
xhr.send();




















