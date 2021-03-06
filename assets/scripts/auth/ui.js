'use strict';
const store = require('../store');

const checkForUser = function() {
  //if user is already signed in
  if(!!store.user.id){
    loggedInSuccess();

    $('#sign-in').hide();
    $('#sign-out').show();
    $('#change-password').show();
    $('#logbox2').show();
    $('#show-meals').show();
    $('.welcome').hide();
  } else {
    $('#sign-out').hide();
    $('#change-password').hide();
    $('#sign-in').show();
    $('#logbox2').hide();
    $('#show-meals').hide();
    $('.welcome').show();
  }
};

const signUpFailure = (err) => {
	if (err.status === 400) {
		//unauthorized
		$('.danger-alert-message').text("Something went wrong. Check your email/password.");
    $('.alert-danger').slideDown();

    $('.alert-danger').delay(2000).slideUp();
	} else {
		$('.danger-alert-message').text("An unknown error occured.");
    $('.alert-danger').slideDown();

    $('.alert-danger').delay(2000).slideUp();

	}
};

const signUpSuccess = (resp) => {
  $("#sign-up")[0].reset();
  $('#logbox').hide();
  $('.alert-message').text("Thanks for signing up! Please sign in!");
  $('.alert-success').slideDown();

  $('.alert-success').delay(2000).slideUp();
};

const signInSuccess = (resp) => {
	store.user = resp.user;
	//keeps a copy of the user in local storage to keep  session open
	window.localStorage.setItem('user', JSON.stringify(resp.user));
  loggedInSuccess();
  $('.alert-message').text('You have signed is as ' + resp.user.email);
	$('.alert-success').slideDown();

	$('.alert-success').delay(2000).slideUp();


	checkForUser();
	return store.user;
};


const loggedInSuccess = () => {
  $("#sign-in")[0].reset();
  $('#signIn').hide();
  $('#logbox').hide();
  $('.meal-show').show();
};

const signOutSuccess = () => {
  $('#logbox').show();
  $('#lobbox2').hide();
  $('.meal-show').html('');


	store.user = {};
	// remove local storage user copy.
	window.localStorage.removeItem('user');
	checkForUser();
	return store;
};

const signOutFailure = () => {
  $('#logbox').show();
  $('#lobbox2').hide();
  $('.meal-show').html('');

  store.user = {};
  window.localStorage.removeItem('user');
  checkForUser();
  return store;
};


const signInFailure = (err) => {
	if (err.status === 401) {
		//unauthorized
		$('.danger-alert-message').text("Wrong username or password! Try again");
    $('.alert-danger').slideDown();

  	$('.alert-danger').delay(2000).slideUp();
	} else {
		$('.danger-alert-message').text("An unknown error occured.");
    $('.alert-danger').slideDown();

  	$('.alert-danger').delay(2000).slideUp();
	}
};

const passwordChangeFailure = (err) => {
	if (err.status === 400) {
		//unauthorized
		$('.danger-alert-message').text("Your existing password is incorect");
    $('.alert-danger').slideDown();

    $('.alert-danger').delay(2000).slideUp();
	} else {
		$('.danger-alert-message').text("An unknown error occured.");
    $('.alert-danger').slideDown();

    $('.alert-danger').delay(2000).slideUp();
	}
};

const passwordChangeSuccess = () => {
  $("#change-password")[0].reset();
	$('.alert-message').text('You have sucessfully changed your password!');
	$('.alert-success').slideDown();

	$('.alert-success').delay(2000).slideUp();
};


module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  passwordChangeFailure,
  passwordChangeSuccess,
  signOutSuccess,
  signOutFailure,
  loggedInSuccess,
  checkForUser
};
