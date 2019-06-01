document.addEventListener('DOMContentLoaded', function () {
    // localStorage.clear();
    var addRecipe = document.querySelector('.addrecipe');   //karta dodawania przepisów
    var recipes = document.querySelector('.recipes');

    //***********************************karta z listą przepisów************************************

    var plus = document.querySelector('.title__plus'); //PLUS na karcie z przepisami
    // console.log(plus);
    var edit = document.querySelectorAll('.edit');//EDIT przepisu
    // console.log(edit);
    var bin = document.querySelectorAll('.bin');//KOSZ
    // console.log(bin);
    var entry = document.querySelectorAll('.entry'); //ostylowane entry do kopiowania;


    plus.addEventListener('click', function () { //funkcja wywolujaca okno z nowym entry, pamietaj o ID (RAFAŁ)
        addRecipe.style.display = 'block';
        recipes.style.display = 'none';

    });

    // console.log(localStorage.getItem('userName'));


//*********************************karta dodawania przepisu********************************

    var saveAndExit = document.getElementById('save_recipe');     //przycisk zapisz i zamknij
    // console.log(saveAndExit);
    var alertBox = document.querySelector('.alert-box');                //alertbox do walidacji
    // console.log(alertBox);
    var recipeName = document.getElementById('recipe_name');      // input nazwa przeisu
    // console.log(recipeName);
    var recipeDescription = document.getElementById('recipe_description');      // input nazwa przeisu
    // console.log(recipeName);
    var newInstruction = document.getElementById('new-instruction');            // input instrukcji
    // console.log(newInstruction);
    var newIngredient = document.getElementById('new-ingredient');              //input składnika

    var addInstruction = document.getElementById('add-instruction');        //przyciski dodawania składników i instrukcji
    var addIngredient = document.getElementById('add-ingredient');

    var instructionList = document.querySelector('.instruction_list');      //listy instrukcji i składników
    var ingredientList = document.querySelector('.ingredient_list');

  var entry_box = document.querySelector('.entry__box'); //box z listą przepisów

  var new_entry = document.createElement('div'); //
  var new_entry_id = document.createElement('div');
  var new_entry_name = document.createElement('div');
  var new_entry_description = document.createElement('div');
  var new_entry_action = document.createElement('div');
  var new_entry_edit = document.createElement('i');
  var new_entry_bin = document.createElement('i');
  new_entry_action.appendChild(new_entry_edit);
  new_entry_action.appendChild(new_entry_bin);
  new_entry.appendChild(new_entry_id);
  new_entry.appendChild(new_entry_name);
  new_entry.appendChild(new_entry_description);
  new_entry.appendChild(new_entry_action);
  new_entry.classList.add('entry');
  new_entry_id.classList.add('id');
  new_entry_name.classList.add('name');
  new_entry_description.classList.add('description');
  new_entry_action.classList.add('action');
  new_entry_edit.classList.add('far','fa-edit', 'icon','edit');
  new_entry_bin.classList.add('far','fa-trash-alt', 'icon', 'bin');




    var ingredients = null;
    var instructions = null;
    var newRecipe = {       //tu będzie przechowywany nowy przepis
        id: null,
        title: "",
        description: "",
        ingredients: [],
        instructions: []
    };
    var allRecipes = (JSON.parse(localStorage.getItem('recipes')==null) ? [] : JSON.parse(localStorage.getItem('recipes')));       //lista zapisanych w local storage przepisów

    addInstruction.addEventListener('click', function (event) {   //dodawanie instrukcji do listy
        if (newInstruction.value !== "") {
            if (newInstruction.value.length > 150) {
                alertBox.innerHTML = "Element instrukcji nie powinien byc dłuższy niż 150 znaków";
            } else {
                alertBox.innerHTML = "";
                var newLi = document.createElement('LI');

                newLi.innerHTML = newInstruction.value + '<i class="fas fa-edit edit"></i><i class="far fa-trash-alt bin"></i>';
                instructionList.appendChild(newLi);
                var newBin = newLi.querySelector('.bin');
                newBin.addEventListener('click', function(event) {              //dodaję usuwanie instrukcji

                    this.parentElement.parentElement.removeChild(this.parentElement);


                });
                var newEdit = newLi.querySelector('.edit');                         //dodaję edycję instrukcji

                newEdit.addEventListener('click', function editListElement(event) {
                    var editingBox = document.createElement('input');
                        editingBox.classList.add("edit_box");
                        this.parentElement.appendChild(editingBox);

                    editingBox.value = this.parentElement.innerText;
                    editingBox.addEventListener('blur', function(event){
                        if(this.value.length < 50){

                            var parent = this.parentElement;
                            console.log(parent);
                            editingBox.parentElement.innerHTML = this.value + '<i class="fas fa-edit edit"></i><i class="far fa-trash-alt bin"></i>';

                            parent.querySelector('.bin').addEventListener('click', function (event) {
                                this.parentElement.parentElement.removeChild(this.parentElement);
                            });
                            parent.querySelector('.edit').addEventListener('click', editListElement)

                        }else{
                            alertBox.innerText = "Element instrukcji nie powinien byc dłuższy niż 150 znaków"
                        }
                    });
                });
                instructions = instructionList.children;            //zbieram instrukcje w pseudolistę
                // console.log(instructions);
                newInstruction.value = null;
            }
        }

    });
    addIngredient.addEventListener('click', function (event) {    //dodawanie składnika do listy
        if (newIngredient.value !== "") {
            if (newIngredient.value.length > 50) {
                alertBox.innerHTML = "Opis składnika nie powinien byc dłuższy niż 50 znaków";
            } else {
                alertBox.innerHTML = "";
                var newLi = document.createElement('LI');

                newLi.innerHTML = newIngredient.value + '<i class="fas fa-edit edit"></i><i class="far fa-trash-alt bin"></i>';
                ingredientList.appendChild(newLi);
                var newBin = newLi.querySelector('.bin');
                newBin.addEventListener('click', function(event) {              //dodaję usuwanie składników

                    this.parentElement.parentElement.removeChild(this.parentElement);

                });
                var newEdit = newLi.querySelector('.edit');                         //dodaję edycję instrukcji

                newEdit.addEventListener('click', function editListElement(event) {
                    var editingBox = document.createElement('input');
                    editingBox.classList.add("edit_box");
                    this.parentElement.appendChild(editingBox);

                    editingBox.value = this.parentElement.innerText;
                    editingBox.addEventListener('blur', function(event){
                        if(this.value.length < 150){

                            var parent = this.parentElement;
                            editingBox.parentElement.innerHTML = this.value + '<i class="fas fa-edit edit"></i><i class="far fa-trash-alt bin"></i>';

                            parent.querySelector('.bin').addEventListener('click', function (event) {
                                this.parentElement.parentElement.removeChild(this.parentElement);
                            });
                            parent.querySelector('.edit').addEventListener('click', editListElement)

                        }else{
                            alertBox.innerText = "Opis składnika nie powinien byc dłuższy niż 150 znaków"
                        }
                    });
                });


                ingredients = ingredientList.children;      //zbieram składniki w pseudolistę
                //console.log(ingredients);
                newIngredient.value = null;
            }
        }
    });

    saveAndExit.addEventListener('click', function (event) { //zapisz i wyjdz click

        //****************************Walidacja********************************************
        switch (true) {
            case recipeName.value.length > 50:
                alertBox.innerText = "Nazwa przepisu nie powinna być dłuższa niż 50 znaków";
                break;
            case recipeName.value.length === 0:
                alertBox.innerText = "Wprowadź nazwę przepisu";
                break;
            case recipeDescription.value.length > 360:
                alertBox.innerText = "Opis przepisu nie powinien być dłuższy niż 360 znaków";
                break;
            case recipeDescription.value.length === 0:
                alertBox.innerText = "Wprowadź opis przepisu";
                break;
            case instructionList.children.length === 0:
                alertBox.innerText = "Przepis musi zawierać instrukcje";
                break;
            case ingredientList.children.length === 0:
                alertBox.innerText = "Przepis musi zawierać składniki";
                break;
          default:

                //****************************Zapisywanie informacji o nowym przepisie**********************
                for (let i = 0; i < instructions.length; i++) {
                    newRecipe.instructions.push(instructions[i].innerText);
                }
                for (let i = 0; i < ingredients.length; i++) {
                    newRecipe.ingredients.push(ingredients[i].innerText);
                }

                newRecipe.id = ((allRecipes === null) ? 0 : allRecipes.length);
                newRecipe.title = recipeName.value;
                newRecipe.description = recipeDescription.value;
                allRecipes.push(newRecipe);

                // console.log(allRecipes);

                addRecipe.style.display = 'none';
                recipes.style.display = 'block';
                // *********** czyszczenie formularza dodającego przepis***************

                var inputsAndLists = document.querySelectorAll('.newrecipe input, .newrecipe textarea, li');   //zbieram wszystkie inputy, textarea i li do czyszczenia
                // console.log(inputsAndLists);
                for (var i = 0; i < inputsAndLists.length; i++) {
                    if (inputsAndLists[i].tagName === 'LI') {
                        inputsAndLists[i].parentElement.removeChild(inputsAndLists[i]);
                    }
                    inputsAndLists[i].value = "";
                }

                // ***************************************Dodawanie przepisu do localStorage*****************


                saveToLocalStorage(newRecipe,"recipes");
                //console.log(typeof allRecipes);

                alertBox.innerHTML = null;

                    //dodawanie nowego przepisu do listy przepisów
              var clone = new_entry.cloneNode(true);

              clone.querySelector('.id').innerText = newRecipe.id + 1;
              clone.querySelector('.name').innerText = newRecipe.title;
              clone.querySelector('.description').innerText = newRecipe.description;

              entry_box.appendChild(clone);
              window.location.reload(true);
        }


    });
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
    //Zapisuje wszystkie przepisy w liscie przepisow.
  for(var i = 0; i < allRecipes.length; i++){
    var clone = new_entry.cloneNode(true);
    clone.querySelector('.id').innerText = allRecipes[i].id + 1;
    clone.querySelector('.name').innerText = allRecipes[i].title;
    clone.querySelector('.description').innerText = allRecipes[i].description;
    entry_box.appendChild(clone);
    //Usuwanie przepisu z listy

    clone.querySelector('.bin').addEventListener('click', function () {
      console.log(this.parentElement.parentElement.parentElement);
      this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
      var del_id = this.parentElement.parentElement.querySelector('.id').innerText - 1;
      for(var j=0; j < allRecipes.length; j++) {
        if(del_id === allRecipes[j].id){
          allRecipes.splice(j, 1);
          if(allRecipes.length > 0) {
            for (var z = 0; z < allRecipes.length; z++) {
              allRecipes[z].id = z;
              localStorage.setItem("recipes", JSON.stringify(allRecipes));
            }
          }else{
            localStorage.setItem("recipes", JSON.stringify(allRecipes));
          }
        }
      }
      window.location.reload(true);
    })
  }
  //edytowanie przepisu
  var recipe_edit = document.querySelectorAll('.edit');
  for(var i = 0; i < recipe_edit.length; i++)
    recipe_edit[i].addEventListener('click', function () {
      addRecipe.style.display = 'block';
      recipes.style.display = 'none';
      console.log(this.parentElement.parentElement);
      document.querySelector('#recipe_name').value = this.parentElement.parentElement.querySelector('.name').innerHTML;
      document.querySelector('#recipe_description').value = this.parentElement.parentElement.querySelector('.description').innerHTML;



  });
  
  var nav_recipes = document.querySelector('.nav_box_recipes');
  nav_recipes.addEventListener('click', function () {
    window.location.reload(true);
  });
  if(localStorage.getItem('userName') === null ){
    window.location.href = "app.html";
  }
  document.querySelector('.user_name').innerHTML = localStorage.getItem('userName');

  if(localStorage.getItem('widget') === 'clicked') {
    addRecipe.style.display = 'block';
    recipes.style.display = 'none';
    localStorage.removeItem('widget');
  }

  var recipe_leng = allRecipes.length;
  localStorage.setItem('recipe_leng', recipe_leng);
});

