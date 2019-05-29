document.addEventListener('DOMContentLoaded', function () {
  var plus = document.querySelector('.title__plus'); //PLUS
  // console.log(plus);
  var edit = document.querySelectorAll('.edit');//EDIT
  // console.log(edit);
  var bin = document.querySelectorAll('.bin');//KOSZ
  // console.log(bin);
  var entry = document.querySelectorAll('.entry'); //ostylowane entry do kopiowania;
  plus.addEventListener('click', function () { //funkcja wywolujaca okno z nowym entry, pamietaj o ID (RAFAŁ)

  });
  // for(var i = 0; i < edit.length; i++){ //funckja do edytowania przepisu (RAFAŁ)
  //  edit.addEventListener('click', function () {
  //
  //  })
  // }
  for(var i = 0; i < bin.length; i++){
    bin[i].addEventListener('click', function () {
      var entry_box = document.querySelector('.entry__box');
      entry_box.removeChild(this.parentElement.parentElement) //event usuwajacy przepis na klika;
   })
    var submitName = document.getElementById('submit_name');          //Znajduję input imienia
    var inputName = document.getElementById('input_name');          //Znajduję button wysyłający imię z inputu
    var userName = document.querySelector('.user_name');//Imię w headerze aplikacji
    var firstEntry = document.querySelector('.first_entry');
  //console.log(inputName.value);
// localStorage.clear();
if(localStorage.getItem('userName') === null ){

    submitName.addEventListener('click', function (event) {
        console.log('klik');
        if (inputName.value !== '') {                                               //jeśli coś jest w inpucie

            localStorage.setItem('userName', inputName.value);                  //dodaję do local storage imię pod nazwą userName
            // console.log(localStorage);
            inputName.value = null;

            userName.innerText = localStorage.userName;//zmieniam imię w html na podane przez input


        }

    });
    inputName.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            submitName.click();
        }
    })
}else{
  userName.innerText = localStorage.userName;
  submitName.parentElement.parentElement.removeChild(firstEntry);
}

});
