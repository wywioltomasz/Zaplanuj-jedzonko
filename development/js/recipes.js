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
    // for(var i = 0; i < edit.length; i++){ //funckja do edytowania przepisu (RAFAŁ)
    //  edit.addEventListener('click', function () {
    //
    //
    //  })
    // }
    for (var i = 0; i < bin.length; i++) {
        bin[i].addEventListener('click', function () {
            var entry_box = document.querySelector('.entry__box');
            entry_box.removeChild(this.parentElement.parentElement) //event usuwajacy przepis na klika;
        });
    }
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

    saveAndExit.addEventListener('click', function (event) { //funkcja wywolujaca okno z nowym entry, pamietaj o ID (RAFAŁ)

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
                for (var i = 0; i < instructions.length; i++) {
                    newRecipe.instructions.push(instructions[i].innerText);
                }
                for (var i = 0; i < ingredients.length; i++) {
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


                saveRecipeToLocalStorage(newRecipe);
                console.log(allRecipes);
                console.log(typeof allRecipes);

                alertBox.innerHTML = null;

        }


    });
    function saveRecipeToLocalStorage(recipe) {
        var dataFromLocalStorage = [];
        if (localStorage.getItem("recipes") !== null) {
            dataFromLocalStorage = JSON.parse(localStorage.getItem("recipes"));
            dataFromLocalStorage.push(recipe);
            localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
        } else {
            dataFromLocalStorage.push(recipe);
            localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
        }
    }

});

