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
            for (let index = 0; index < this.howManyElement; index++) {
                document.getElementById("table").deleteRow(1);
            }
            this.currentPageNumber--;
            cSpan.innerHTML = this.currentPageNumber;
            this.first -= this.howManyElement;
           
            console.log(this.first);
            covid.showCountriesInfo();
            
        }
    },

    nextPage()
    {
        for (let index = 0; index < this.howManyElement; index++) {
            
            document.getElementById("table").deleteRow(2);
        }

        cSpan = document.getElementById("numPage");
        this.currentPageNumber++;
        this.first += this.howManyElement;
        
        cSpan.innerHTML = this.currentPageNumber;
        console.log(this.first);
       
        covid.showCountriesInfo();
    
    },

}

