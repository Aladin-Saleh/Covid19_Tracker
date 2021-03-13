var covid19Storage = new localStorageDB("Covid19Lib",localStorage);
if (covid19Storage.isNew()) {
    covid19Storage.createTable("Info",["Country","Date","NewConfirmed","NewDeaths","NewRecovered","TotalConfirmed","TotalDeaths","TotalRecovered"]);
    covid19Storage.commit();
}

window.onload=function()
{
    //document.getElementById("buttonRefresh").addEventListener("click",updateLocalStorage);
    var heure = document.getElementById("heure");
    heure.innerHTML = xhr.response.Global.Date;
    var table = document.getElementById("table");
    var cell = [];
    for (let index = 0; index < covid19Storage.queryAll("Info").length; index++) {
        //covid19Storage.insert("Info",{Country:xhr.response.Countries[index].Country,Date:xhr.response.Countries[index].Date,NewConfirmed:xhr.response.Countries[index].NewConfirmed,NewDeaths:xhr.response.Countries[index].NewDeaths,NewRecovered:xhr.response.Countries[index].NewRecovered,TotalConfirmed:xhr.response.Countries[index].TotalConfirmed,TotalRecovered:xhr.response.Countries[index].TotalRecovered,TotalDeaths:xhr.response.Countries[index].TotalDeaths});
        var row = table.insertRow();
            for (let j = 0; j < 7; j++) {
                cell[j] = row.insertCell();
            }
            cell[0].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].Country}`;
            cell[1].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].NewConfirmed}`;
            cell[2].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].NewDeaths}`;
            cell[3].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].NewRecovered}`;
            cell[4].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].TotalConfirmed}`;
            cell[5].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].TotalDeaths}`;
            cell[6].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].TotalRecovered}`;
    }
    console.log(covid19Storage.queryAll("Info"));

}


function updateLocalStorage()
{
    covid19Storage.deleteRows("Info");    
    covid19Storage.commit();
    if (covid19Storage.isNew()) {
        covid19Storage.createTable("Info",["Country","Date","NewConfirmed","NewDeaths","NewRecovered","TotalConfirmed","TotalDeaths","TotalRecovered"]);
        covid19Storage.commit();
    }
    for (let index = 0; index < xhr.response.Countries.length; index++) {
        covid19Storage.insert("Info",{Country:xhr.response.Countries[index].Country,Date:xhr.response.Countries[index].Date,NewConfirmed:xhr.response.Countries[index].NewConfirmed,NewDeaths:xhr.response.Countries[index].NewDeaths,NewRecovered:xhr.response.Countries[index].NewRecovered,TotalConfirmed:xhr.response.Countries[index].TotalConfirmed,TotalRecovered:xhr.response.Countries[index].TotalRecovered,TotalDeaths:xhr.response.Countries[index].TotalDeaths});
        covid19Storage.commit();
    }

}


console.log(covid19Storage.queryAll("Info"));


var xhr = new XMLHttpRequest();
xhr.open("GET","https://api.covid19api.com/summary",true);
//xhr.open("GET","../JSON/container.json",true);
xhr.responseType = "json";
xhr.send();



   