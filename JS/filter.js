

class filter{


    constructor()
    {
        this.pays = "";
        this.currentPage = 0;
        this.nombrePage = 10;
        this.nombreElement = 20;
        this.nombrePays = 190;
    }


    getNombrePays()
    {
        return this.nombrePays;
    }

    setNombrePays(newNP)
    {
        this.nombrePage = newNP;
    }

    getCurrentPage()
    {
        return this.currentPage;
    }

    setCurrentPage(curPage)
    {
        this.currentPage = curPage;
    }

    getPays()
    {
        return this.pays;
    }

    setPays(paysN)
    {
        this.pays = paysN;
    }

    setNombrePage(nPage)
    {
        this.nombrePage = nPage;
    }

    getNombreElement()
    {
        return this.nombreElement;
    }

    setNombreElement(nElem)
    {
        this.nombreElement = nElem;
    }
    getNombrePage()
    {
        return this.nombrePage;
    }

}














/*
function Filter()
{
    let service = {
        filter
    };
    var search = document.querySelector('.filter-input');
    search.addEventListener('input', filter);
    function filter(e){
            let results;
            let temp ="";
            console.log("debug");
            
            results = covid.getCountryInfo().filter( item=> 
                item.Country.toLowerCase().includes(e.target.value.toLowerCase()) 
                );
            
            console.log(results)
            var cell = [];
            var row = table.insertRow();
            for (let index = 0; index < results.length; index++) {
                    row = table.insertRow();
                    for (let j = 0; j < 7; j++) {
                        cell[j] = row.insertCell();
                    }
                    if (index < results.length) {
                        cell[0].innerHTML = `<td><a href="../html/country_info.html?country=${results[index].Country}" class="btn btn-link">${results[index].Country}</a></td>`;
                        cell[1].innerHTML = `<td>${results[index].NewConfirmed}</td>`;
                        cell[2].innerHTML = `<td>${results[index].NewDeaths}</td>`;
                        cell[3].innerHTML = `<td>${results[index].NewRecovered}</td>`;
                        cell[4].innerHTML = `<td>${results[index].TotalConfirmed}</td>`;
                        cell[5].innerHTML = `<td>${results[index].TotalDeaths}</td>`;
                        cell[6].innerHTML = `<td>${results[index].TotalRecovered}</td>`;
                    }
            }
    }
    return service;
}*/