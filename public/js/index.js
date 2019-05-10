



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1');
const messagetwo = document.querySelector('#message2');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading ....';
    messagetwo.textContent = ''
    const location = search.value;
    //const url = 'http://localhost:3000/weather?address=' + location
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messagetwo.textContent = data.forecast
            }
        })
    })
});