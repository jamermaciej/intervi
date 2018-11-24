$(document).ready(function(){

const recipe = $('.recipe a');
const menuToggle = $('.menu-toggle');
const menu = $('.menu');

recipe.each(function(index, recipe){
  $(recipe).click(function(e){
    e.preventDefault();

    const current = $(this).parent();

    current.siblings().removeClass('active');
    current.toggleClass('active');
  });
});

menuToggle.click(function(){
  $(this).toggleClass('open');
  menu.toggleClass('open');
});

const contactForm = $('#contact-form');

function displayError(message, field){

  if ( !$(field).parent().find('.error-message').length ){

    let errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    $(field).parent().addClass('error');
    $(field).parent().append(errorMessage);
  }
}
function removeError(field){
  $(field).parent().removeClass('error');
  $(field).parent().find('.error-message').remove();
}

contactForm.submit( function(e) {
  e.preventDefault();

  const fields = document.querySelectorAll(':required')

  for(let i = 0; i < fields.length; i++){

    if( fields[i].type === "text")  {
      if( fields[i].value.length === 0 ){
        const message = 'Podaj swoje Imię.'
        displayError(message, fields[i]);
        } else {
          removeError(fields[i]);
        }
      } else if( fields[i].type === "email")  {
        const email = fields[i].value.toLowerCase();
        const regExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if( !regExp.test(email) ){
          const message = 'Wpisz poprawny adres e-mail'
          displayError(message, fields[i]);
        } else {
          removeError(fields[i]);
        }
      }
    };

    if( !$('.error').length ){
      $(contactForm)[0].submit();
    }
  });

});
