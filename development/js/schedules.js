document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('userName') === null) {
        window.location.href = "app.html";
    } else
        document.querySelector('.user_name').innerHTML = localStorage.getItem('userName');

    var entry_box = document.querySelector('.entry__box'); //box z listą przepisów

    var new_entry = document.createElement('div'); //
    var new_entry_id = document.createElement('div');
    var new_entry_name = document.createElement('div');
    var new_entry_description = document.createElement('div');
    var new_entry_action = document.createElement('div');
    var new_entry_week = document.createElement('div');
    var new_entry_edit = document.createElement('i');
    var new_entry_bin = document.createElement('i');
    new_entry_action.appendChild(new_entry_edit);
    new_entry_action.appendChild(new_entry_bin);
    new_entry.appendChild(new_entry_id);
    new_entry.appendChild(new_entry_name);
    new_entry.appendChild(new_entry_description);
    new_entry.appendChild(new_entry_week);
    new_entry.appendChild(new_entry_action);
    new_entry.classList.add('entry');
    new_entry_id.classList.add('id');
    new_entry_name.classList.add('name');
    new_entry_description.classList.add('description');
    new_entry_week.classList.add('week');
    new_entry_week.style.paddingLeft = '24px';
    new_entry_action.classList.add('action');
    new_entry_edit.classList.add('far','fa-edit', 'icon','edit');
    new_entry_bin.classList.add('far','fa-trash-alt', 'icon', 'bin');




    var plus = document.querySelector('.title__plus');
    var schedules = document.querySelector('.schedules');
    var addSchedule = document.querySelector('.addschedule');


    plus.addEventListener('click', function () { //funkcja wywolujaca okno z nowym entry, pamietaj o ID (RAFAŁ)
        schedules.style.display = 'none';
        addSchedule.style.display = 'block';

    });
    var allRecipes = (JSON.parse(localStorage.getItem('recipes') == null) ? [] : JSON.parse(localStorage.getItem('recipes')));       //lista zapisanych w local storage przepisów
    var allSchedules = (JSON.parse(localStorage.getItem('schedules') == null) ? [] : JSON.parse(localStorage.getItem('schedules')));

    var saveAndExit = document.getElementById('save_recipe');     //przycisk zapisz i zamknij
    // console.log(saveAndExit);
    var alertBox = document.querySelector('.alert-box');                //alertbox do walidacji
    // console.log(alertBox);
    var scheduleName = document.getElementById('schedule_name');      // input nazwa przeisu
    // console.log(recipeName);
    var scheduleDescription = document.getElementById('schedule_description');      // input nazwa przeisu
    // console.log(recipeName);

    var weekNumber = document.getElementById('week-num');        //nr tygodnia

    var selects = document.querySelectorAll('select[name = "recipe"');

    for (let i = 0; i < selects.length; i++) {
        for (let j = 0; j < allRecipes.length; j++) {
            let newOption = document.createElement('OPTION');
            newOption.innerText = (Number(allRecipes[j].id) +1) +'. '+ allRecipes[j].title;
            selects[i].appendChild(newOption);
        }

    }

    var newSchedule = {       //tu będzie przechowywany nowy przepis
        id: null,
        title: "",
        description: "",
        meals: [],
        week: null
    };

    //********************************************limit tygodni***********************
    weekNumber.addEventListener('change', function (event) {

        if (this.value < 1) {
            this.value = 0;

        } else if (this.value > 52) {
            this.value = 52;
        }
    });

    saveAndExit.addEventListener('click', function (event) {

        switch (true) {
            case scheduleName.value.length > 50:
                alertBox.innerText = "Nazwa planu nie powinna być dłuższa niż 50 znaków";
                break;
            case scheduleName.value.length === 0:
                alertBox.innerText = "Wprowadź nazwę planu";
                break;
            case scheduleDescription.value.length > 360:
                alertBox.innerText = "Opis planu nie powinien być dłuższy niż 360 znaków";
                break;
            case scheduleDescription.value.length === 0:
                alertBox.innerText = "Wprowadź opis planu";
                break;
            case weekNumber.value < 1 || weekNumber.value > 52:
                alertBox.innerText = "Wprowadź numer tygodnia z zakresu 1 - 52";
                break;
            case searchMealDefault(selects):
                alertBox.innerText = "Wybierz dania";
                break;
            case searchWeekDuplicate(allSchedules):
                alertBox.innerText = "Masz już plan na ten tydzień";
                break;
            default:
                alertBox.innerText = null;


                //*************************zapisywanie informacji o nowym przepisue*****************/
                for (let i = 0; i < selects.length; i++) {

                    newSchedule.meals.push(selects[i].value);

                }
                newSchedule.id = ((allSchedules === null) ? 0 : allSchedules.length);
                newSchedule.title = scheduleName.value;
                newSchedule.description = scheduleDescription.value;
                newSchedule.week = weekNumber.value;

                addSchedule.style.display = 'none';
                schedules.style.display = 'block';

                saveToLocalStorage(newSchedule, 'schedules');

                window.location.reload(true);

                //***************czyszczenie********************/
                var inputsAndSelects = document.querySelectorAll('.addschedule input, .addschedule textarea, .addschedule select');

                for(let i = 0; i<inputsAndSelects.length;i++){
                    if(inputsAndSelects[i].tagName === "SELECT"){
                        inputsAndSelects[i].value = 'defaultRecipeCheck'
                    }else{
                        inputsAndSelects[i].value = "";
                    }

                }



        }
    });

    for(var i = 0; i < allSchedules.length; i++){

        var clone = new_entry.cloneNode(true);
        clone.querySelector('.id').innerText = allSchedules[i].id + 1;
        clone.querySelector('.name').innerText = allSchedules[i].title;
        clone.querySelector('.description').innerText = allSchedules[i].description;
        clone.querySelector('.week').innerText = allSchedules[i].week;
        entry_box.appendChild(clone);


        //Usuwanie planu z listy

        clone.querySelector('.bin').addEventListener('click', function () {
            this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
            var del_id = this.parentElement.parentElement.querySelector('.id').innerText - 1;
            for(var j=0; j < allSchedules.length; j++) {
                if(del_id === allSchedules[j].id){
                    allSchedules.splice(j, 1);
                    if(allSchedules.length > 0) {
                        for (var z = 0; z < allSchedules.length; z++) {
                            allSchedules[z].id = z;
                            localStorage.setItem("schedules", JSON.stringify(allSchedules));
                            window.location.reload(true);
                        }
                    }else{
                        localStorage.setItem("schedules", JSON.stringify(allSchedules));
                    }
                }
            }
        })
    }

    function searchMealDefault(selectinput){
        let counter = 0;
        for(let i = 0; i<selectinput.length;i++){
            if(selectinput[i].value === 'defaultRecipeCheck'){
                selectinput[i].style.border = '2px red dashed';
                counter++
            }else{
                selectinput[i].style.border = ' 1px solid #A9A9A9'
            }
        }
        return counter > 0;
    }
    function saveToLocalStorage(array, key) {
        var dataFromLocalStorage = [];
        if (localStorage.getItem(key) !== null) {
            dataFromLocalStorage = JSON.parse(localStorage.getItem(key));
            dataFromLocalStorage.push(array);
            localStorage.setItem(key, JSON.stringify(dataFromLocalStorage));
        } else {
            dataFromLocalStorage.push(array);
            localStorage.setItem(key, JSON.stringify(dataFromLocalStorage));
        }
    }
    var addschedule = document.querySelector('.addschedule');
    var schedules = document.querySelector('.schedules');

  if(localStorage.getItem('widget') === 'clicked') {
    addschedule.style.display = 'block';
    schedules.style.display = 'none';
    localStorage.removeItem('widget');
  }
  var schedule_navi = document.querySelector('.nav_box_schedules');
  schedule_navi.addEventListener('click', function () {
    window.location.reload(true);
  })


    function searchWeekDuplicate(allSchedules){

        let weekCheck = 0;
        for(let i = 0; i<allSchedules.length;i++){
            if(allSchedules[i].week == weekNumber.value){
                weekCheck++
            }
        }
        return weekCheck > 0
    }
});

