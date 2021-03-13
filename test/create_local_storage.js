//localStorage.clear(); pour vider le stockage en local
//console.log(localStorage);

//localStorage.removeItem("name"); supprimer une valeur en donnant la clé 
var storage = new localStorageDB("TestStorage", localStorage);


window.onload=function(){
 document.getElementById("buttonRefresh").addEventListener("click",fillLocalStorage);
}

function fillLocalStorage()
{
    var print = document.getElementById("print");
    storage.deleteRows("Info");    
    storage.commit();


    if (storage.isNew()) {
        storage.createTable("Info",["name","age"]);
    }
    
    for (let index = 0; index < xhr.response.length; index++) {
        storage.insert("Info",{name:xhr.response[index].prenom,age:xhr.response[index].age});
        
    }
    storage.commit();

    console.log(storage.queryAll("Info"));
    
    for (let index = 0; index < xhr.response.length; index++) {
        //storage.insert("Info",{name:xhr.response[index].prenom,age:xhr.response[index].age});
        print.innerHTML = `
        </br>
        <p>${storage.queryAll("Info")[index].name}: ${storage.queryAll("Info")[index].age}</p>
        </br>
        `;
    }
   

}

var xhr = new XMLHttpRequest();
xhr.open("GET","./test.json",true);
xhr.responseType = "json";
xhr.send();





console.log(storage.queryAll("Info"));