window.onload = function()
{
    pagination.init();
}


let pagination = {

first : 0,
currentPageNumber : 1,
howManyElement : 10,



    
    init()
    {
      if (this.howManyElement != document.getElementById("pays-affiche").value) {
        
        for (let index = 0; index < this.howManyElement + 1; index++) {
            document.getElementById("table").deleteRow(1);
        }
        this.howManyElement = document.getElementById("pays-affiche").value
        covid.showCountriesInfo();

      }
        
    },
    previousPage()
    {
        cSpan = document.getElementById("numPage");
        if (this.currentPageNumber == 1) {
            alert("Vous êtes sur la premiere page !");
        }
        else
        {
            for (let index = 0; index < this.howManyElement+1; index++) {
                document.getElementById("table").deleteRow(1);
            }
            this.currentPageNumber--;
            cSpan.innerHTML = this.currentPageNumber;
            this.first -= this.howManyElement;
           
            console.log("first "+this.first);
            covid.showCountriesInfo();
            
        }
    },

    nextPage()
    {
       
        if (this.currentPageNumber == Math.ceil(190/this.howManyElement)) {
            alert("Vous êtes sur la derniere page !");
        }
        else
        {
            cSpan = document.getElementById("numPage");
            this.currentPageNumber++;
            for (let index = 0; index < this.howManyElement+1; index++) {
                document.getElementById("table").deleteRow(1);
            }
            this.first += this.howManyElement;
            cSpan.innerHTML = this.currentPageNumber;
            console.log("first "+this.first);
            covid.showCountriesInfo();
        }

      
    
    },

}

