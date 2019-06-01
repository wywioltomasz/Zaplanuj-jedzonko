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
  widget_recipe.addEventListener('click', function () {
    localStorage.setItem('widget', 'clicked');
    window.location.href = 'recipes.html';
  });
  var widget_schedule = document.querySelector('.widget_add_schedule');

  widget_schedule.addEventListener('click', function () {
    localStorage.setItem('widget', 'clicked');
    window.location.href = 'schedules.html';
  });
  var note_info_text = document.querySelector('.note_info_text');
  var recipes_lenght = localStorage.getItem("recipe_leng");
  var widget_recipe_num = document.querySelector('.recipe_leng');
  if(recipes_lenght === "0"){
    note_info_text.innerHTML = "Nie masz przepisów!";
  }else if(recipes_lenght === '1') {
    widget_recipe_num.innerHTML = '1 przepis';
  }else if(recipes_lenght === '2' || recipes_lenght === '3' || recipes_lenght === '4') {
    widget_recipe_num.innerHTML = recipes_lenght + ' przepisy';
  }else{
    widget_recipe_num.innerHTML = recipes_lenght + ' przepisów';
  }

    //****************************lista planów****************************//


    var previous = document.querySelector('.previous');
    var next = document.querySelector('.next');
    var planBoxTitle = document.querySelector('.plan_box_title');
    var planBoxGrid = document.querySelector('.plan_box_grid');
    var borderBox = document.querySelector('.border_box');
    var listedMeals = [];
    var weekID = document.querySelector('.week_id');

    var schedules = JSON.parse(localStorage.getItem('schedules'));

    var schedulesSortedByWeek = [];

    if (schedules !== null) {
        schedulesSortedByWeek = getSchedules(schedules);
        weekID.innerText = schedulesSortedByWeek[0].week + ' ';
        var currentSchedule = schedulesSortedByWeek[0];
        for (let i = 0; i < currentSchedule.meals.length; i++) {
            let newDiv = document.createElement('DIV');
            newDiv.innerText = currentSchedule.meals[i];
            planBoxGrid.appendChild(newDiv);

            if (i == 6 || (i > 6 && (i - 6) % 7 == 0)) {

                planBoxGrid.appendChild(borderBox.cloneNode(true))

            }

        }

        for(let i =0; i<planBoxGrid.children.length;i++){

            if(planBoxGrid.children[i].classList == ""){
                listedMeals.push(planBoxGrid.children[i])
            }


        }
        if(schedules.length > 1) {

          previous.addEventListener('click', function (event) {

            currentSchedule = findPrevSchedule(schedulesSortedByWeek);
            weekID.innerText = currentSchedule.week;
            for (let i = 0; i < listedMeals.length; i++) {
              listedMeals[i].innerText = currentSchedule.meals[i];


            }


          });

          next.addEventListener('click', function (event) {
            currentSchedule = findNextSchedule(schedulesSortedByWeek);
            weekID.innerText = currentSchedule.week;

            for (let i = 0; i < listedMeals.length; i++) {
              listedMeals[i].innerText = currentSchedule.meals[i];


            }


          });
        }else{
          next.style.cursor = 'not-allowed';
          previous.style.cursor = 'not-allowed';
        }


    } else {
        var noPlanalert = document.createElement('SPAN');
        noPlanalert.classList.add('alert-box');
        noPlanalert.innerText = "Nie masz jeszcze żadnych planów"
        planBoxTitle.append(noPlanalert);


    }


    function checkPlansForCurrentWeek(scheduleArray) {

        let check = 0;
        for (let i = 0; i < scheduleArray.length; i++) {

            if (weekID.innerText == scheduleArray[i].week) {
                check++;
            }

        }
        return check > 0
    }

    function getSchedules(array) {
        var readySchedules = [];

        for (let j = 1; j < 53; j++) {
            for (let u = 0; u < array.length; u++) {

                if (array[u].week == j) {
                    readySchedules.push(array[u]);
                }
            }
        }
        return readySchedules

    }

    function displaySchedule(week) {

        for (let i = 0; i < schedulesSortedByWeek.length; i++) {

            if (schedulesSortedByWeek[i].week == week) {

                return schedulesSortedByWeek[i];

            }

        }


    }

    function findNextSchedule(sortedSchedules) {
        if (weekID.innerText == sortedSchedules[sortedSchedules.length - 1].week) {
            return sortedSchedules[0]
        } else {
            for (let i = 1; i < 53; i++) {
                if (i > Number(weekID.innerText)) {
                    for (let j = 0; j < sortedSchedules.length; j++) {
                        if (i == sortedSchedules[j].week) {
                            return sortedSchedules[j]
                        }

                    }
                }


            }
        }

    } function findPrevSchedule(sortedSchedules) {
        if (weekID.innerText == sortedSchedules[0].week) {
            return sortedSchedules[sortedSchedules.length - 1]
        } else {
            for (let i = 52; i > 0; i--) {
                if (i < Number(weekID.innerText)) {
                    for (let j = 0; j < sortedSchedules.length; j++) {
                        if (i == sortedSchedules[j].week) {
                            return sortedSchedules[j]
                        }

                    }
                }


            }
        }
    }

})
;
