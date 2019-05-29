
//carusel main page
let slidingImages = document.querySelectorAll(".slide");
let arrowleft = document.querySelector("#arrow_left");
let arrowright = document.querySelector("#arrow_right");
let counter = 0;
//function which will clear all images
function reset() {
    for (let i = 0; i < slidingImages.length; i++){
       slidingImages[i].style.display = "none";
    }
}
//function which will open image
function startSlide() {
    reset();
    slidingImages[0].style.display = "block";
}
//showing of previus image
function slideLeft() {
    reset();
    slidingImages[counter - 1].style.display = "block";
    counter--
}
//showing of next image
function slideright() {
    reset();
    slidingImages[counter + 1].style.display = "block";
    counter++
}
//event listener for left arrow
arrowleft.addEventListener("click",function () {
    if (counter === 0) {
        counter = slidingImages.length;
    }
    slideLeft();
});
// event listener for right arrow
arrowright.addEventListener("click",function () {
    if (counter === slidingImages.length - 1) {
        counter = -1;
    }
    slideright();
});
   startSlide();