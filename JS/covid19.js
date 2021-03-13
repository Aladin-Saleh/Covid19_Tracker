



function getCovidInformation(){

let affichage = document.getElementById("affichage");
var xhr = new XMLHttpRequest();
var data = '';

xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
       /* console.log(this.response);
        console.log(this.response.Global.France);
        console.log("total confirmed "+this.response.Global.TotalConfirmed)
        console.log("total recovered "+this.response.Global.TotalRecovered);
        console.log("total deaths "+this.response.Global.TotalDeaths);//Works
        console.log(data.Global);*/
        //data.innerHTML = this.response.Global.TotalDeaths;
        data = `
         <td>${this.response.Global.TotalConfirmed}</td>
         <td>${this.response.Global.TotalDeaths}</td>
         <td>${this.response.Global.TotalRecovered}</td>`;
        affichage.innerHTML = data;

    }
}

xhr.open("GET","https://api.covid19api.com/summary",true);
//xhr.open("GET","../JSON/container.json");
xhr.responseType = "json";
xhr.send();

}




    



    