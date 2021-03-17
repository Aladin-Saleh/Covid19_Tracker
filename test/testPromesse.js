


window.onload=function()
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
        })
    p.catch(error=>{
        console.error(error);
    })
   


    

}