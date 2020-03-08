// const usersURL = 'https://randomuser.me/api/';
const wikiUrl = 'https://dog.ceo/api/breeds/list';
const usersURL = 'https://randomuser.me/api/?results=12';

console.log(wikiUrl);

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
        getProfiles(results)
    });

// <div class="card">
//     <div class="card-img-container">
//          <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
//     </div>
//     <div class="card-info-container">
//          <h3 id="name" class="card-name cap">first last</h3>
//          <p class="card-text">email</p>
//          <p class="card-text cap">city, state</p>
//     </div>
// </div>


function getProfiles(data) {

    const galleryDiv = document.getElementById('gallery');

    const createCard = document.createElement('div');
    createCard.className = 'card';
    createCard.appendChild(galleryDiv);

    const cardImgContainer = document.createElement('div');
    cardImgContainer.className = 'card-img-container';
    cardImgContainer.appendChild(createCard);

    const img = document.createElement('img');
    img.className = 'card-img';
    img.appendChild(cardImgContainer);

    const cardInfoContainer = document.createElement('div');
    cardInfoContainer.className = 'card-info-container';
    cardInfoContainer.appendChild(createCard);

    const title = document.createElement('h3');
    title.className = 'card-name';
    title.appendChild(cardInfoContainer);

    const email = document.createElement('p');
    email.className = 'card-text';
    email.appendChild(cardInfoContainer);

    const address = document.createElement('p');
    address.className = 'card-text';
    address.appendChild(cardInfoContainer);


    const consoleLog = data.map(item => console.log(item))

    const userProfile = data.map(item => `
         ${title} = ${item.name.first} ${item.name.last}
         ${email} = ${item.email} 
         ${address} = ${item.location.street.name} ${item.location.street.number} ${item.location.city}
    `).join('');

    galleryDiv.innerHTML = userProfile

    console.log("galleryDiv",galleryDiv);

}


