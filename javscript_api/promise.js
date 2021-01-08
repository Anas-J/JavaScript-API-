/*Project: nationalize probability check 
use of async-await for API call
@author: Anas Jamil Piktorlabs*/

let form = document.getElementById("form");                             //variables
let submit = document.getElementById("submit");
let tryagain = document.getElementsByClassName("tryagain")[0];

form.addEventListener('submit' , e => {                                 //eventListener for submit and prevent default
    e.preventDefault();
    let name1 = document.getElementById("name");
    let input1 = name1.value.trim();
    submit.style.display = 'none';
    document.getElementById("lds-ripple").style.display = "inline-block";
    setTimeout(getnation(input1), 3000);
    document.getElementById("output").style.display = 'flex';
    document.getElementById("tryagain").style.display = 'inline-block';
});

function getnation(name2) {                                             //get nation function using promise
    let url = "https://api.nationalize.io/?name=".concat(name2);
    new Promise((resolve,reject) => {
        fetch(url).then(response => {                                   //fetch API
            if(response.ok){
                let commits = response.json().then(obj => {
                    let country = obj.country[0];
                    if(typeof country != "undefined") {                 //when valid country value is returned
                        document.getElementById("name2").innerHTML = name2;
                        document.getElementById("country").innerHTML = country.country_id;
                        let pro = Math.round((country.probability + Number.EPSILON) * 100) / 100
                        document.getElementById("probablity").innerHTML = pro;
                        document.getElementById("lds-ripple").style.display = "none";
                    }
                    else {                                              //whhen undefined is returned
                        alert("Invalid Name, Please try again!");
                        document.getElementById("lds-ripple").style.display = "none";
                        submit.style.display="inline-block";
                        tryagain.style.display="none";
                        document.getElementById("output").style.display = 'none';
                    }
                });    
            }
            else {
                reject(new Error('error'));
            }
        }, error => {
            reject( new Error(error.message));
        });
    });
}

tryagain.addEventListener('click',e=>{                                    //eventListener for tryagain and resetting the screen
    e.preventDefault(); 
    form.reset();
    submit.style.display="inline-block";
    tryagain.style.display="none";
    document.getElementById("output").style.display = 'none';
    
});