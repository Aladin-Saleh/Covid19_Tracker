var covid19Storage = new localStorageDB("Covid19Lib",localStorage);


if (covid19Storage.isNew()) {
    covid19Storage.createTable("Info",["Country","Date","NewConfirmed","NewDeaths","NewRecovered","TotalConfirmed","TotalDeaths","TotalRecovered"]);
    covid19Storage.createTable("InfoGlobal",["NewConfirmed","NewDeaths","NewRecovered","TotalConfirmed","TotalDeaths","TotalRecovered"]);
    covid19Storage.commit();
}

window.onload=function()
{
    document.getElementById("buttonRefresh").addEventListener("click",covid.updateLocalStorage);
    var heure = document.getElementById("heure");
    var globalAffichage = document.getElementById("affichage");

    covid.showCountriesInfo();
    console.log(covid19Storage.queryAll("Info"));
    heure.innerHTML = covid19Storage.queryAll("Info")[0].Date;
    globalAffichage.innerHTML = covid.showGlobalInfo(); 


}

var xhr = new XMLHttpRequest();
xhr.open("GET","https://api.covid19api.com/summary",true);
//xhr.open("GET","../JSON/container.json",true);
xhr.responseType = "json";
xhr.send();

let covid = {
    
    table : document.getElementById("table"),
    showCountriesInfo()
    {
        var cell = [];
        var row = table.insertRow();
        console.log(pagination.howManyElement + pagination.first);
        for (let index = pagination.first; index < pagination.howManyElement + pagination.first; index++) {
            //covid19Storage.insert("Info",{Country:xhr.response.Countries[index].Country,Date:xhr.response.Countries[index].Date,NewConfirmed:xhr.response.Countries[index].NewConfirmed,NewDeaths:xhr.response.Countries[index].NewDeaths,NewRecovered:xhr.response.Countries[index].NewRecovered,TotalConfirmed:xhr.response.Countries[index].TotalConfirmed,TotalRecovered:xhr.response.Countries[index].TotalRecovered,TotalDeaths:xhr.response.Countries[index].TotalDeaths});
                row = table.insertRow();
                for (let j = 0; j < 7; j++) {
                    cell[j] = row.insertCell();
                }
                if (index < covid19Storage.queryAll("Info").length) {
                    cell[0].innerHTML = `<td><a href="../html/country_info.html?country=${covid19Storage.queryAll("Info")[index].Country}" class="btn btn-link">${covid19Storage.queryAll("Info")[index].Country}</a></td>`;
                    cell[1].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].NewConfirmed}</td>`;
                    cell[2].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].NewDeaths}</td>`;
                    cell[3].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].NewRecovered}</td>`;
                    cell[4].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].TotalConfirmed}</td>`;
                    cell[5].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].TotalDeaths}</td>`;
                    cell[6].innerHTML = `<td>${covid19Storage.queryAll("Info")[index].TotalRecovered}</td>`;    
                }
                
        }
    
    },
    
    showGlobalInfo(){
        console.log(covid19Storage.queryAll("InfoGlobal"));
         data = `
          <td>${covid19Storage.queryAll("InfoGlobal")[0].TotalConfirmed}</td>
          <td>${covid19Storage.queryAll("InfoGlobal")[0].TotalDeaths}</td>
          <td>${covid19Storage.queryAll("InfoGlobal")[0].TotalRecovered}</td>
          <td>${covid19Storage.queryAll("InfoGlobal")[0].NewConfirmed}</td>
          <td>${covid19Storage.queryAll("InfoGlobal")[0].NewDeaths}</td>
          <td>${covid19Storage.queryAll("InfoGlobal")[0].NewRecovered}</td>
          `;
         return data;
    },
    
    
    updateLocalStorage()
    {
        covid19Storage.deleteRows("Info");    
        covid19Storage.deleteRows("InfoGlobal");    
        covid19Storage.commit();
        if (covid19Storage.isNew()) {
            covid19Storage.createTable("Info",["Country","Date","NewConfirmed","NewDeaths","NewRecovered","TotalConfirmed","TotalDeaths","TotalRecovered"]);
            covid19Storage.createTable("InfoGlobal",["NewConfirmed","NewDeaths","NewRecovered","TotalConfirmed","TotalDeaths","TotalRecovered"]);
            covid19Storage.commit();
        }
        for (let index = 0; index < xhr.response.Countries.length; index++) {
            covid19Storage.insert("Info",{Country:xhr.response.Countries[index].Country,Date:xhr.response.Countries[index].Date,NewConfirmed:xhr.response.Countries[index].NewConfirmed,NewDeaths:xhr.response.Countries[index].NewDeaths,NewRecovered:xhr.response.Countries[index].NewRecovered,TotalConfirmed:xhr.response.Countries[index].TotalConfirmed,TotalRecovered:xhr.response.Countries[index].TotalRecovered,TotalDeaths:xhr.response.Countries[index].TotalDeaths});
        }
    
        covid19Storage.insert("InfoGlobal",{NewConfirmed:xhr.response.Global.NewConfirmed,NewDeaths:xhr.response.Global.NewDeaths,NewRecovered:xhr.response.Global.NewRecovered,TotalConfirmed:xhr.response.Global.TotalConfirmed,TotalRecovered:xhr.response.Global.TotalRecovered,TotalDeaths:xhr.response.Global.TotalDeaths});
        covid19Storage.commit();
        
    
    },
    
    
    //console.log(covid19Storage.queryAll("Info"));
    //console.log(covid19Storage.queryAll("InfoGlobal"));
    
  


}






