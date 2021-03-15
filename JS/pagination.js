let pagination = {

first : 0,
currentPageNumber : 1,
howManyElement : 10,

    previousPage()
    {
        cSpan = document.getElementById("numPage");
        if (this.currentPageNumber == 1) {
            alert("Vous êtes sur la premiere page !");
        }
        else
        {
            for (let index = 0; index < 11; index++) {
                document.getElementById("table").deleteRow(2);
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
       

        cSpan = document.getElementById("numPage");
        this.currentPageNumber++;
        for (let index = 0; index < 11; index++) {
            document.getElementById("table").deleteRow(2);
        }
        this.first += this.howManyElement;
        cSpan.innerHTML = this.currentPageNumber;
        console.log("first "+this.first);
        covid.showCountriesInfo();
    
    },

}

