document.addEventListener('DOMContentLoaded', function () {

  var submitName = document.getElementById('submit_name');          //Znajduję input imienia
  var inputName = document.getElementById('input_name');          //Znajduję button wysyłający imię z inputu
  var userName = document.querySelector('.user_name');//Imię w headerze aplikacji
  var firstEntry = document.querySelector('.first_entry');
  //console.log(inputName.value);

// localStorage.clear();
  if (localStorage.getItem('userName') === null) {

    submitName.addEventListener('click', function (event) {
      console.log('klik');
      if (inputName.value !== '') {                                               //jeśli coś jest w inpucie

        localStorage.setItem('userName', inputName.value);                  //dodaję do local storage imię pod nazwą userName
        // console.log(localStorage);
        inputName.value = null;

        userName.innerText = localStorage.userName;//zmieniam imię w html na podane przez input
        submitName.parentElement.parentElement.removeChild(firstEntry);
        window.location.reload(true);


      }

    });
    inputName.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        submitName.click();
      }
    })
  } else {
    userName.innerText = localStorage.userName;
    submitName.parentElement.parentElement.removeChild(firstEntry);
  }
  if(localStorage.getItem('userName') === null )
  {
    var app_main = document.querySelector('.app_content_main');
    var dashboard = document.querySelector('.dashboard');
    app_main.style.display = 'block';
    dashboard.style.display = 'none';
  }
});
