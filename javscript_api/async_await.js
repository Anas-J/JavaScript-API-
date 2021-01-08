/*Project: nationalize probability check 
use of async-await for API call
@author: Anas Jamil Piktorlabs*/

let form = document.getElementById("form");
let submit = document.getElementById("submit");
let tryagain = document.getElementsByClassName("tryagain")[0];

form.addEventListener('submit' , e => {                 //eventListener for submit and prevent default
    e.preventDefault();
    let name1 = document.getElementById("name");
    let input1 = name1.value.trim();
    submit.style.display = 'none';
    document.getElementById("lds-ripple").style.display = "inline-block";
    setTimeout(getnation(input1) , 3000);               //function call for get nation
    document.getElementById("output").style.display = 'flex';
    document.getElementById("tryagain").style.display = 'inline-block';
});

async function getnation(name2) {                       //async-await function to fetch api
    let url = "https://api.nationalize.io/?name=".concat(name2);
    let response = await fetch(url);
    let commits = await response.json();
    let country = commits.country[0];
    if(typeof country != "undefined") {                 //when a valid country_id is returned
        document.getElementById("name2").innerHTML = name2;
        document.getElementById("country").innerHTML = country.country_id;
        let pro = Math.round((country.probability + Number.EPSILON) * 100) / 100
        document.getElementById("probablity").innerHTML = pro;
        document.getElementById("lds-ripple").style.display = "none";
    }
    else {                                              //when undefined is returned
        alert("Invalid Name, Please try again!");
        document.getElementById("lds-ripple").style.display = "none";
        submit.style.display="inline-block";
        tryagain.style.display="none";
        document.getElementById("output").style.display = 'none';
    }
}

tryagain.addEventListener('click',e=>{                  //eventListener for try again and reset the screen
    e.preventDefault();
    form.reset();
    submit.style.display="inline-block";
    tryagain.style.display="none";
    document.getElementById("output").style.display = 'none';
    
});