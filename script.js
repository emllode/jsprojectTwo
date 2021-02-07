const submitBtn = document.querySelector('.submit');
const inputValue = document.querySelector('.search');
const nameOfCity = document.querySelector('.name');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
;
const checkboxTwo = document.querySelector('.attractionsChecked');
const checkboxThree = document.querySelector('.AToZChecked');



submitBtn.addEventListener('click' , () => {

    const checkboxOne = document.getElementById("weather").checked;
    if(checkboxOne == true) {
        return weatherFetch();
    }
    else 
    {
        alert("you have not checked weather")
    }

})



    /*      -----------      API-fetch for weather        ---------------    */
function weatherFetch() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=9c8183e6cf109ae7637aab10a479748e')
    .then(response => response.json())
    .then(data =>  {
        let nameValue = data['name'];
        let tempValue = Math.round(data['main']['temp']); //avrundar till närmre heltal
        let descValue = data['weather'][0]['description'];

        nameOfCity.innerHTML = nameValue;
        temp.innerHTML = tempValue - 273; //förändra från kelvin till celsius 
        desc.innerHTML = descValue;
    })
    
// Fångar om staden inte existerar i API:n och slänger ut ett alert 
.catch(() => alert("That city doesn't exist."))
}


// TEST SKIT NEDAN

// button.addEventListener('click', function(){
//     let numberOfCheckedItems = 0;
    
//     const allCheckboxes = document.querySelector('.checkboxes');
    
//     for(let i = 0; i < allCheckboxes.length; i++) {
//         if(allCheckboxes[i].checked)
//             numberOfCheckedItems++;
//     }
//     if(numberOfCheckedItems == 0)  
//     {  
//         fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=9c8183e6cf109ae7637aab10a479748e')
//         .then(response => response.json())
//         .then(data =>  {
//             let nameValue = data['name'];
//             let tempValue = Math.round(data['main']['temp']); //avrundar till närmre heltal
//             let descValue = data['weather'][0]['description'];
    
//             nameOfCity.innerHTML = nameValue;
//             temp.innerHTML = tempValue - 273; //förändra från kelvin till celsius 
//             desc.innerHTML = descValue;
//         })
    
//         // Fångar om staden inte existerar i API:n och slänger ut ett alert 
//         .catch(err => alert("That city doesn't exist.")) 
//     }  
//         else if(numberOfCheckedItems == 1)
//         {
//             alert("fail");
//         }
    
    
//     })