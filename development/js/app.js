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
  }

});