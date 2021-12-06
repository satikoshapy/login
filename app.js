// hardcoded users that are allowed to log in =)
let users = [
     {
        email: "hello@test.com",
        password: "welcome123"
     }
    ,
    {
        email: "bye@test.com",
        password: "welcome111"
     }
    
];
//check if submit button exists and if clicked, call the function validate user
if (document.getElementById('submit')) {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', () => {
        validateUser();
    })
}

//check if the user inside the users array
const validateUser = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    //save the value of the user name in a var so we can later use it in secure.html
    let userName = document.getElementById("name").value;

    console.log(email);
    console.log(password);

    //lets loop through the users array so we can check if we can grant the access to the user
    for (let user of users){
        if(user.email == email && user.password == password){
            //if the user email and password match with any item inside the users array
            //redirect the page to secure.html    
            window.location = "secure.html";
            //save the user name to session storage so we can use it on secure.html
            sessionStorage.setItem("userName", JSON.stringify(userName));
        } else {
            // else acces denied
            setTimeout(function(){
                alert('access denied');
            }, 1000)
            
        }
    }       
    
}
//////////IMPORTANT -> even if the user inputted the correct email and password
//// the alert might still pop up, DONT WORRY just press ok and 
///you'll redirected to the secure.html
///if the user input is incorrect no matter how may times you press ok, no access to secure.html

const urlArr = window.location.pathname.split("/");//lets make the current page into an array
/// if the user is on secure.html say Hello and their name
if (urlArr[urlArr.length - 1] == "secure.html"){
    //fetching the saved user name from the sessionstorage
    let userName = JSON.parse(sessionStorage.getItem('userName'))
    if(document.querySelector("#user-name")){
        //say hello to our user
        document.getElementById("user-name").innerHTML = "Hello " + userName;
        
    }
}
//fetch the api 
async function getApi(){
    try {
        // fetch the login users
        const result = await fetch('https://randomuser.me/api/?results=100');
        const data = await result.json();
        // pass them to the displayData function
        displayData(data);
    } catch (err) {
        console.log(err);
    }
}
getApi();

let numberOfWomen = 0;///counter for women
let numberOfMen = 0;///counter for men

const displayData = (data) => {
    //lets destructure the data obj
    const { results } = data;
    for (let person of results){
        if (person.gender == "female"){
            //increment the counter
            numberOfWomen++;
            document.getElementById("women").innerHTML += 
            `<div class="card">
            <div class="card-body">
            <p>Gender: ${person.gender}</p>
            <p>${person.name["first"]} ${person.name["last"]}<p/>
            </div>
            </div>`
        }else
        { 
            //increment the counter
            numberOfMen++;
            // assign the iterated data to a HTML element
            document.getElementById("men").innerHTML += 
            
            `<div class="card">
            <div class="card-body">
            <p>Gender: ${person.gender}</p>
            <p>${person.name["first"]} ${person.name["last"]}</p>
            </div>
            </div>`
        }
    }
    //lets show the numbers....
    document.getElementById("numberWomen").innerHTML = "Number of women is "+ numberOfWomen;
    document.getElementById("numberMen").innerHTML = "Number of men is " + numberOfMen;
}







