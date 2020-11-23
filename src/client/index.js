
/* Global Variables */
const baseURL = 'http://api.geonames.org/searchJSON?q=';
const userName = 'rayshawndallison';
document.getElementById('returnDate').setAttribute('minDate',`2020-11-11`);

// Create a new date instance dynamically with JS
let d = new Date();


document.getElementById('generate').addEventListener('click', () => {
    let city = document.getElementById('city').value;
    getCoordinates(baseURL, userName, city)
    .then(data => {
        let travelDate = document.getElementById('travelDate').value.split('-');
        let travelMonth = travelDate[1];
        let travelYear = travelDate[0];
        let travelDay = travelDate[2];
        const weatherBiturl = 'http://api.weatherbit.io/v2.0/current?';
        const weatherBitapi = '7d92255b96864307aa9e94562d3cd52e';
        getWeather(weatherBiturl, weatherBitapi, data.geonames[0].lng, data.geonames[0].lat, data.geonames[0].name)
        .then(data => {
            const pixurl = 'https://pixabay.com/api/?';
            const pixapi = '19211440-fc37a8ac17131a95f2289b0de';
            getPic(pixurl, pixapi, data.data[0].city_name)
            .then(data => {
              const pic = document.createElement('img');
              pic.src = data.hits[0].largeImageURL;
              pic.alt = data.hits[0].tags;
              document.getElementById('app').appendChild(pic);
              let returnDate = document.getElementById('returnDate').value.split('-');
              returnDate.minDate = '0';
            let returnMonth = returnDate[1];
            let returnYear = returnDate[0];
            let returnDay = returnDate[2];

            let tripLength = document.createElement('p');
            let tripLengthDiv = document.createElement('div');
            tripLength.innerText = `You will be gone for Years: ${returnYear - travelYear} Months: ${returnMonth - travelMonth} Days: ${returnDay - travelDay}`
            tripLength.style.display = 'inline-block';
            document.getElementById('title').appendChild(tripLengthDiv);
            tripLengthDiv.appendChild(tripLength);
            })

            
        })
        
        //postWeather('', {temp: data.main.temp, date: newDate, feelings: feel});
        
    })
    
});


const getPic = async (url, apiKey, city) => {

    const wholeURL = `${url}key=${apiKey}&q=${encodeURIComponent(city)}&image_type=photo`;
    const response = await fetch(wholeURL);
    try{
        const data = await response.json();
        //console.log(data);
        return data;

    }catch(err){
        console.log(`We have encountered this error: ${err}`);
    }
}



const getCoordinates = async (baseURL, userName, city) => {

    const wholeURL = `${baseURL}${city}&username=${userName}`;
    const response = await fetch(wholeURL);
    try{
        const data = await response.json();
        //console.log(data);
        return data;

    }catch(err){
        console.log(`We have encountered this error: ${err}`);
    }
}

const getWeather = async (url, apiKey, long, lat, city) => {

    const wholeURL = `${url}lat=${lat}&lon=${long}&key=${apiKey}`;
    const response = await fetch(wholeURL);
    try{
        const data = await response.json();
        //console.log(data);
        return data;

    }catch(err){
        console.log(`We have encountered this error: ${err}`);
    }
}



const postWeather = async (url = '', data = {}) => {
    


    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        newData = await response.json();
        console.log(newData);
        return newData;
        }catch(error){
            console.log(`we have encountered this error: ${error}`);

        }
}