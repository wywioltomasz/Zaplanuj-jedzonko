document.addEventListener('DOMContentLoaded', function () {
  if(localStorage.getItem('userName') === null ){
    window.location.href = "app.html";
  }
  document.querySelector('.user_name').innerHTML = localStorage.getItem('userName');
});