/*Project: nationalize probability check 
use of async-await for API call
@author: Anas Jamil Piktorlabs*/

let form = document.getElementById("form");                     //variables
let submit = document.getElementById("submit");
let tryagain = document.getElementsByClassName("tryagain")[0];
let name1 = document.getElementById("name");
let input1=``;

form.addEventListener('submit' , e => {                         //eventListener for submit and prevent default
    e.preventDefault();
    submit.style.display = 'none';
    document.getElementById("lds-ripple").style.display = "inline-block";
    input1 = name1.value.trim();
    getnation(display);                                         //function call using callback
});

function getnation(callback) {                                  //callback function
    let url = "https://api.nationalize.io/?name=".concat(input1);
    console.log(input1);                                        
    setTimeout(()=>{
        fetch(url).then(response => {                            //API call
            let commits = response.json().then(obj => {
                let country = obj.country[0];
                if(typeof country != "undefined") callback(country);       //when country value is returned
                else {                                           //When undefined is returned
                    alert("Invalid Name, Please try again!");
                    document.getElementById("lds-ripple").style.display = "none";
                    submit.style.display="inline-block";
                    tryagain.style.display="none";
                    document.getElementById("output").style.display = 'none';
                } 
            })
            .catch(e=> console.log(e));  
        }).catch(e=> console.log(e));
    },1000);
}

tryagain.addEventListener('click',e=>{                          //when try again is clicked and screen reset to default
    e.preventDefault();
    form.reset();
    submit.style.display="inline-block";
    tryagain.style.display="none";
    document.getElementById("output").style.display = 'none'; 
});

function display(country) {                                     //display function when valid country value is returned
    document.getElementById("output").style.display = 'flex';
    document.getElementById("name2").innerHTML = input1;
    document.getElementById("country").innerHTML = country.country_id;
    let pro = Math.round((country.probability + Number.EPSILON) * 100) / 100
    document.getElementById("probablity").innerHTML = pro;
    document.getElementById("lds-ripple").style.display = "none";
    document.getElementById("tryagain").style.display = 'inline-block';
}
