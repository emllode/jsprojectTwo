let button = document.querySelector('.submit');
let inputValue = document.querySelector('.search');
let name = document.querySelector('.name');
let temp = document.querySelector('.temp');
let desc = document.querySelector('.desc');


button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=9c8183e6cf109ae7637aab10a479748e')
    .then(response => response.json())
    .then(data => console.log(data))

.catch(err => alert("Wrong city name"))
})
