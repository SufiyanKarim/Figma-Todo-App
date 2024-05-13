const checkIn = document.getElementById('btn');

const todoIncomplete = document.querySelector('.todo-incomplete');
const currentTaskContainer = document.querySelector('.taskContainer');

const TodoComplete = document.querySelector('.todo-complete');
const previousTaskContainer = document.querySelector('.taskContainer');

const logOutBtn = document.querySelector('.logOut');
const webTaskBtn = document.querySelector('.task')


logOutBtn.addEventListener('click',function(){
    window.location.href = '../Login page/index.html'
})

webTaskBtn.addEventListener('click',function(){
    window.location.href = '../Web-Task/webTask.html'
})




const coordinates = [29.3544, 71.6911];

function getCoordinates() {
    return new Promise(resolve => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                resolve([latitude, longitude]);
            }, () => resolve(coordinates));
        } else resolve(coordinates);
    });
};

const fetchData = function (lat, lon) {
    const apiKey = '4f490492002685a78e085e068c2e2bcf'
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`
    return fetch(url).then(response => {
        return response.json()
    }).then(data => {
        return data
    }).catch(() => 'error')
}


checkIn.addEventListener('click', async function () {
    checkIn.disabled = true;
    const timeoutPromise = new Promise(resolve => {
        setTimeout(() => {
            resolve(coordinates);
        }, 5000)
    });
    try {
        const [lati, longi] = await Promise.race([getCoordinates(), timeoutPromise]);
        const dataFetched = await fetchData(lati, longi);

        const { lat, lon, name, state, country } = dataFetched[0];
        displayFetchedData(lat, lon, name, state, country);
    } finally {
        checkIn.disabled = false;
    }
});


const displayFetchedData = function(lat, lon, name, state, country){
   const taskContainer = document.createElement('div');
   taskContainer.classList.add('taskContainer');

   const label = document.createElement('label');
   label.textContent = '📍'

   const taskCategory = document.createElement('div');
   taskCategory.classList.add('task-category');

   const cityInfo = document.createElement('p');
   cityInfo.classList.add('city');
   cityInfo.textContent = `${name}, ${state}, ${country}`;

   const coordinates = document.createElement('p');
   coordinates.classList.add('coordinates');
   coordinates.textContent = `${lat}, ${lon}`

   

   taskCategory.appendChild(cityInfo);
   taskCategory.appendChild(coordinates);

   
   taskContainer.appendChild(label);
   taskContainer.appendChild(taskCategory);
   todoIncomplete.innerHTML = '';
   todoIncomplete.appendChild(taskContainer);

   const currentLocation = todoIncomplete.innerHTML;
   TodoComplete.innerHTML +=currentLocation

   upTodate();
}

const upTodate = ()=>{
    localStorage.setItem('CurrentLocation',todoIncomplete.innerHTML);
    localStorage.setItem('PreviousLocation',TodoComplete.innerHTML);
}


window.onload = () => {
    const incompletedLocation = localStorage.getItem('CurrentLocation');
    const completedLocation = localStorage.getItem('PreviousLocation');

    if (incompletedLocation) todoIncomplete.innerHTML = incompletedLocation;
    if (completedLocation) TodoComplete.innerHTML = completedLocation;
}
