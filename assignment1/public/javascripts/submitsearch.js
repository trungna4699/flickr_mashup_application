//Event handler when the search form is submited
var formSubmit = document.querySelector('#search-form');
formSubmit.addEventListener('submit', function(event) {    
    SearchLocation();
    event.preventDefault();    
})