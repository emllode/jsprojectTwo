const button = document.querySelector('.submit');
const inputValue = document.querySelector('.search');
const nameOfCity = document.querySelector('.name');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');


button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=9c8183e6cf109ae7637aab10a479748e')
    .then(response => response.json())
    .then(data =>  {
        let nameValue = data['name'];
        let tempValue = Math.round(data['main']['temp']);
        let descValue = data['weather'][0]['description'];

        nameOfCity.innerHTML = nameValue;
        temp.innerHTML = tempValue - 273;
        desc.innerHTML = descValue;
    })


    

.catch(err => alert("That city doesn't exist."))
})
