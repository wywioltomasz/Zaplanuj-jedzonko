document.addEventListener('DOMContentLoaded', function () {

  var submitName = document.getElementById('submit_name');          //Znajduję input imienia
  var inputName = document.getElementById('input_name');          //Znajduję button wysyłający imię z inputu
  var userName = document.querySelector('.user_name');//Imię w headerze aplikacji
  var firstEntry = document.querySelector('.first_entry');
  //console.log(inputName.value);

// localStorage.clear();
  if (localStorage.getItem('userName') === null) {

    submitName.addEventListener('click', function (event) {
      if (inputName.value !== '') {                                               //jeśli coś jest w inpucie

        localStorage.setItem('userName', inputName.value);                  //dodaję do local storage imię pod nazwą userName
        // console.log(localStorage);
        inputName.value = null;

        userName.innerText = localStorage.userName;//zmieniam imię w html na podane przez input
        submitName.parentElement.parentElement.parentElement.removeChild(firstEntry.parentElement);
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
    submitName.parentElement.parentElement.parentElement.removeChild(firstEntry.parentElement);
  }
  if(localStorage.getItem('userName') === null )
  {
    var app_main = document.querySelector('.app_content_main');
    var dashboard = document.querySelector('.dashboard');
    app_main.style.display = 'block';
    dashboard.style.display = 'none';
  }
  //Usuwanie powiadomien widgetow//
  var close_buttons = document.querySelectorAll('.fa-window-close');
  for(var i=0; i < close_buttons.length; i++){
    close_buttons[i].addEventListener('click', function () {
      this.parentElement.parentElement.removeChild(this.parentElement);
    })
  }
  var widget_recipe = document.querySelector('.widget_add_recipe');
  console.log(widget_recipe);
  widget_recipe.addEventListener('click', function () {
    localStorage.setItem('widget', 'clicked');
    window.location.href = 'recipes.html';
  })

});
