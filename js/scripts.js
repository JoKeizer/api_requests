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



function getProfiles(data) {
    const galleryDiv = document.getElementById('gallery');
    const consoleLog = data.map(item => console.log(item))

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
   
    `);

    galleryDiv.innerHTML = userProfile;
}


