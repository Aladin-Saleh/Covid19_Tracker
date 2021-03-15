var str = document.location.href;
var url = new URL(str);
var pays = url.searchParams.get("country");

window.onload = function()
{
    document.getElementById("nameCountry").innerHTML =`<h1 style="text-align:center;">${pays}</h1>`;
    console.log(pays);
    console.log("https://api.covid19api.com/country/"+pays+"/status/confirmed?from=2020-03-01T00:00:00Z&to=2090-04-01T00:00:00Z");
    console.log(xhr.response);

}





xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.open("GET","https://api.covid19api.com/country/"+pays+"/status/confirmed?from=2020-03-01T00:00:00Z&to=2090-04-01T00:00:00Z",true);
xhr.send();


let country = {
 



}


