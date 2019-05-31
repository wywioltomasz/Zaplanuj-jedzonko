document.addEventListener('DOMContentLoaded', function () {

    var plus = document.querySelector('.title__plus');
    var schedules = document.querySelector('.schedules');


    plus.addEventListener('click', function () { //funkcja wywolujaca okno z nowym entry, pamietaj o ID (RAFAŁ)
        schedules.style.display = 'block';
        console.log('plus działa')
        // addSchedule.style.display = 'none';

    });





});