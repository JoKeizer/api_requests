
const usersURL = 'https://randomuser.me/api/?results=12';

const galleryDiv = document.getElementById('gallery');
const body = document.querySelector('body');
const containerDiv = document.createElement('div');
const searchDiv = document.querySelector(".search-container");

// Function to change background gradient
getRandomColor();

//fetch function for all api calls
function fetchData(url) {
    return fetch(url)
    // .then(checkStatus)
        .then(res => res.json())
        .catch( error => console.log("Look like there is a problem", error));
}

Promise.all([
    fetchData(usersURL),
])
    .then(data => {
        const results = data[0].results;
        getProfiles(results);
        eventListener(results);
        addSearch();
});

/*
* Add search form
*/

function addSearch() {

    const form = `
      <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`

    searchDiv.innerHTML = form;
}

//search handler variables
let users = [];
const searchError = document.createElement("h1");
searchError.style.display = "none";
searchError.innerText = "Sorry, there are no employees that match your search.";


searchDiv.addEventListener("keyup", () => {
    searchField(
        document.querySelector("#search-input"),
        document.querySelectorAll(".card-name")
    );
});

// two arguments on for input and one for searchList
function searchField(input, searchList) {
    let results = [];
    searchList.forEach(userName => {
        userName.parentNode.parentNode.style.display = "none";
        if (userName.textContent.toLowerCase().includes(input.value.toLowerCase())) {
            userName.parentNode.parentNode.style.display = "";
            results.push(userName);
        }
    });

    if (input !== "" && results.length === 0) {
        searchError.style.display = "";
    } else {
        searchError.style.display = "none";
    }
}


/**
 * getProfile from API
 * @return {data} object
 */


function getProfiles(data) {
    // const consoleLog = data.map(item => console.log(item));
    const userProfile = data.map(item => `
       <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${item.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                <p class="card-text">${item.email}</p>
                <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
            </div>
        </div>
   
    `).join('');

    galleryDiv.innerHTML = userProfile;
}

// close model on close button

function closeModel() {
    // console.log("close click")
    containerDiv.remove();

}

/**
 * openModel on click
 * @return {data} object
 */


function openModel(data, i) {
    const originalDateOfBirth = new Date(data[i].dob.date);
    const formattedDateOfBirth = originalDateOfBirth.toLocaleDateString(); //reformatted birth date

    let html = `
             <div class="modal-container">
            <div class="modal">
                <button onclick="closeModel()" type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${data[i].picture.large} alt="profile picture">
                    <h3 id="name" class="modal-name cap"><i class="fa fa-user"></i>${data[i].name.first} ${data[i].name.last}</h3>
                    <p class="modal-text"><i class="fa fa-envelope-open"></i>${data[i].email}</p>
                    <p class="modal-text cap"><i class="fa fa-map-marker"></i>${data[i].location.city}</p>
                    <hr>
                    <p class="modal-text"><li class="fa fa-phone"></li>${data[i].phone}</p>
                    <p class="modal-text"><li class="fa fa-map"></li>${data[i].location.street.number} ${data[i].location.street.name},</br>${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
                    <p class="modal-text"><li class="fa fa-star"></li>Birthday ${formattedDateOfBirth}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
    `;
    containerDiv.innerHTML = html;
    // console.log("containerDiv", containerDiv)
    nextPrevModal(data, i);
    return containerDiv;
}

/*
* Function for next and prev card on button click
* @return {data} object
* @return {i} index
 */


function nextPrevModal (data, i)  {
    const prevProfile = containerDiv.querySelector('.modal-prev');
    const nextProfile = containerDiv.querySelector('.modal-next');

    prevProfile.addEventListener('click', e => {
        openModel(data, i -1)
    });

    nextProfile.addEventListener('click', e => {
        openModel(data, i +1)
    });
}

/*
    eventListener function to open model on every card click
 */

function eventListener(data) {
    let cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            console.log(data, "data");
            body.appendChild(openModel(data, i));
        });
    }
}

/*
    Function random color for body background color
 */

function getRandomColor() {
    let hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
    function populate(gradient) {
        for ( let i = 0; i < 6; i++ ) {
            let x = Math.round( Math.random() * 10 );
            let y = hexValues[x];
            gradient += y;
        }
        return gradient;
    }

    let newColor1 = populate('#');
    let newColor2 = populate('#');
    let angle = Math.round( Math.random() * 10 );

    let newGradient = "linear-gradient(" + angle + "deg, " + newColor1 + "," + newColor2  +")";
    document.body.style.background = newGradient;
}


