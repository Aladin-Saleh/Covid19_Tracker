var str = document.location.href;
var url = new URL(str);
var pays = url.searchParams.get("country");

window.onload = function()
{
    document.getElementById("pays").innerHTML =`<h1 style="text-align:center;">${pays}</h1>`;
    document.getElementById("pays-title").innerHTML =pays;
    console.log(pays);
  
}



function initCanvas(response)
{
    var canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth -100 ;
    canvas.height = window.innerHeight -100;
    var c = canvas.getContext('2d');
    Val_max = 100000;
	Val_min = -20;
	var columnSize = 1;
	var rowSize = 1;

  

    //Courbe
	yScale = (canvas.height - columnSize ) / (Val_max - Val_min);
	xScale = (canvas.width - rowSize) / 12;

    c.translate(rowSize,canvas.height + Val_min * yScale +  Val_min * yScale);
	c.scale(1,-1 * yScale);

    c.beginPath();
    c.moveTo(0,0);
    for (let index = 0; index < response.length; index++) {
            
       console.log(response[index].Cases);
        c.lineTo(index*3,response[index].Cases);
    }
    c.strokeStyle = "#FF0000";
    c.lineWidth = 10
    c.stroke();
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
    var ladate=new Date()
    document.write(ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear())
    //console.log(ladate.getFullYear()+"-"+(ladate.getMonth()+1)+"-"+(ladate.getDate()-7)+"T00:00:00Z");
    //console.log(ladate.getFullYear()+"-0"+(ladate.getMonth()+1)+"-"+(ladate.getDate()-15)+"T00:00:00Z");
    let date;
    if (ladate.getMonth()+1 < 10 && ladate.getDate()-7 < 10 ) {
        date = ladate.getFullYear()+"-0"+(ladate.getMonth()+1)+"-0"+(ladate.getDate()-7)+"T00:00:00Z";
    }
    else if (ladate.getMonth()+1 < 10) {
        date = ladate.getFullYear()+"-0"+(ladate.getMonth()+1)+"-"+(ladate.getDate()-7)+"T00:00:00Z";
    }
    
    else if (ladate.getDate()-7 < 10) {
        date = ladate.getFullYear()+"-"+(ladate.getMonth()+1)+"-0"+(ladate.getDate()-7)+"T00:00:00Z";
    }
    else
    {
        date = ladate.getFullYear()+"-"+(ladate.getMonth()+1)+"-"+(ladate.getDate()-7)+"T00:00:00Z";
    }

    console.log(date);

    xhr.open("GET","https://api.covid19api.com/country/"+pays+"/status/confirmed?from="+date+"&to=2021-03-21T00:00:00Z",true);

    xhr.send();
})
p.then(response =>
    {
        let i = (response.length) - 7;
        console.log(response[i].Date);
        initCanvas(response);
    })
p.catch(error=>{
    console.error(error);
})
