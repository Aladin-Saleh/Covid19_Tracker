var covid19Storage = new localStorageDB("Covid19Lib",localStorage);


if (covid19Storage.isNew()) {
    covid19Storage.createTable("Info",["Country","Date","NewConfirmed","NewDeaths","NewRecovered","TotalConfirmed","TotalDeaths","TotalRecovered"]);
    covid19Storage.createTable("InfoGlobal",["NewConfirmed","NewDeaths","NewRecovered","TotalConfirmed","TotalDeaths","TotalRecovered"]);
    covid19Storage.commit();
}

window.onload=function()
{
        covid.updateLocalStorage()
    var heure = document.getElementById("heure");
    var globalAffichage = document.getElementById("affichage");

    //console.log(covid19Storage.queryAll("Info"));
    heure.innerHTML = covid19Storage.queryAll("Info")[0].Date;
    globalAffichage.innerHTML = covid.showGlobalInfo(); 


}



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

    getCountryInfo()
    {
        return covid19Storage.queryAll("Info")
    },

    showGlobalInfo(){
        //console.log(covid19Storage.queryAll("InfoGlobal"));
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
            xhr.open("GET","https://api.covid19api.com/summary",true);
            xhr.send();
        })
    
        p.then(response =>
            {
                console.log(response.Countries);
                covid19Storage.deleteRows("Info");    
                covid19Storage.deleteRows("InfoGlobal");    
                covid19Storage.commit();
                if (covid19Storage.isNew()) {
                    covid19Storage.createTable("Info",["Country","Date","NewConfirmed","NewDeaths","NewRecovered","TotalConfirmed","TotalDeaths","TotalRecovered"]);
                    covid19Storage.createTable("InfoGlobal",["NewConfirmed","NewDeaths","NewRecovered","TotalConfirmed","TotalDeaths","TotalRecovered"]);
                    covid19Storage.commit();
                }
                for (let index = 0; index < response.Countries.length; index++) {
                    covid19Storage.insert("Info",{Country:response.Countries[index].Country,Date:response.Countries[index].Date,NewConfirmed:response.Countries[index].NewConfirmed,NewDeaths:response.Countries[index].NewDeaths,NewRecovered:response.Countries[index].NewRecovered,TotalConfirmed:response.Countries[index].TotalConfirmed,TotalRecovered:response.Countries[index].TotalRecovered,TotalDeaths:response.Countries[index].TotalDeaths});
                }
            
                covid19Storage.insert("InfoGlobal",{NewConfirmed:response.Global.NewConfirmed,NewDeaths:response.Global.NewDeaths,NewRecovered:response.Global.NewRecovered,TotalConfirmed:response.Global.TotalConfirmed,TotalRecovered:response.Global.TotalRecovered,TotalDeaths:response.Global.TotalDeaths});
                covid19Storage.commit();
            })
        p.catch(error=>{
            console.error(error);
        })
            
        
    
    },
    
    
    //console.log(covid19Storage.queryAll("Info"));
    //console.log(covid19Storage.queryAll("InfoGlobal"));
    
  
   

}





