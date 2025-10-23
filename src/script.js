const loginToggle = document.getElementById('login-toggle');
const registerToggle = document.getElementById('register-toggle');
const loginMenu = document.querySelector('.login-menu');
const registerMenu = document.querySelector('.register-menu');
const closeMenuBtn = document.querySelectorAll('#close-btn');

const emailLoginInput = document.getElementById('email-login');
const passwordLoginInput = document.getElementById('password-login');
const loginBtn = document.getElementById('login-btn');

const nameRegisterInput = document.getElementById('name-register');
const emailInput = document.getElementById('email-register');
const passwordInput = document.getElementById('password-register');
const registerTermsCheckbox = document.getElementById('register-terms');
const registerButton = document.getElementById('register-btn');

const nameForm = document.getElementById('name-form');
const emailForm = document.getElementById('email-form');
const familyInputs = document.querySelectorAll('input[name="family"]');
const rateInputs = document.querySelectorAll('input[name="rate"]');
const textarea = document.getElementById('textarea-input');
const charCount = document.getElementById('counter');

const agreementCheckbox = document.getElementById('agreement');
const submitFormButton = document.getElementById('submit-form-btn');

const form = document.querySelector('.evaluation-form');
const formDataContainer = document.getElementById('form-data');
const bodyLogo = document.querySelector('.body-logo');

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function updateLoginButtonState() {
  const emailValid = validateEmail(emailLoginInput.value);
  const passwordValid = passwordLoginInput.value.length >= 8;
  loginBtn.disabled = !(emailValid && passwordValid);
}

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const menuToggle = document.querySelector('.menu-toggle');

  const email = emailLoginInput.value;
  const password = passwordLoginInput.value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const foundUser = users.find((user) => user.userEmail === email
  && user.userPassword === password);

  if (foundUser) {
    alert('Login successful!');
    menuToggle.innerHTML = 'Logged';
    loginMenu.classList.remove('active');
    return;
  }

  alert('Invalid credentials. Please try again.');
});

function updateRegisterButtonState() {
  const nameValid = nameRegisterInput.value.length >= 3;
  const emailValid = validateEmail(emailInput.value);
  const passwordValid = passwordInput.value.length >= 8;
  const termsAgreed = registerTermsCheckbox.checked;
  registerButton.disabled = !(nameValid && emailValid && passwordValid && termsAgreed);
}

registerButton.addEventListener('click', () => {
  const name = nameRegisterInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userData = {
    userName: name,
    userEmail: email,
    userPassword: password,
  };

  users.push(userData);
  alert('Successful registration!');

  localStorage.setItem('users', JSON.stringify(users));
});

function updateCharCount() {
  const remainingChars = 500 - textarea.value.length;
  charCount.textContent = `${remainingChars}`;
}

function updateSubmitButtonState() {
  const isFamilySelected = document.querySelector('input[name="family"]:checked');
  const isRateSelected = document.querySelector('input[name="rate"]:checked');

  const validEmail = validateEmail(emailForm.value);
  const validName = nameForm.value.length < 3;
  submitFormButton.disabled = validName || !validEmail
  || !isFamilySelected || !isRateSelected || !agreementCheckbox.checked;
}

function displayFormData() {
  const name = form.querySelector('#name-form').value;
  const email = form.querySelector('#email-form').value;
  const house = form.querySelector('#house-select').value;
  const family = form.querySelector('input[name="family"]:checked').value;
  const subjects = Array.from(form.querySelectorAll('.subject:checked')).map((subject) => subject.value).join(', ');
  const rating = form.querySelector('input[name="rate"]:checked').value;
  const comment = form.querySelector('#textarea-input').value;

  const formattedData = `
    <div class="data"><h2>Name:</h2><p>${name}</p></div>
    <div class="data"><h2>Email:</h2><p>${email}</p></div>
    <div class="data"><h2>Family:</h2><p>${family}</p></div>
    <div class="data"><h2>House:</h2><p>${house}</p></div>
    <div class="data"><h2>Expected contents:</h2><p>${subjects}</p></div>
    <div class="data"><h2>Rating:</h2><p>${rating}</p></div>
    <div class="data"><h2>Comment:</h2><p>${comment}</p></div>
  `;

  formDataContainer.innerHTML = formattedData;
  form.style.display = 'none';
  formDataContainer.style.display = 'flex';
}

loginToggle.addEventListener('click', () => {
  registerMenu.classList.remove('active');
  loginMenu.classList.toggle('active');
});

closeMenuBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    registerMenu.classList.remove('active');
    loginMenu.classList.remove('active');
  });
});

emailLoginInput.addEventListener('input', updateLoginButtonState);
passwordLoginInput.addEventListener('input', updateLoginButtonState);

registerToggle.addEventListener('click', () => {
  loginMenu.classList.remove('active');
  registerMenu.classList.toggle('active');
});

nameRegisterInput.addEventListener('input', updateRegisterButtonState);
emailInput.addEventListener('input', updateRegisterButtonState);
passwordInput.addEventListener('input', updateRegisterButtonState);
registerTermsCheckbox.addEventListener('change', updateRegisterButtonState);

nameForm.addEventListener('input', () => updateSubmitButtonState());
emailForm.addEventListener('input', () => updateSubmitButtonState());
familyInputs.forEach((input) => input.addEventListener('change', updateSubmitButtonState));
rateInputs.forEach((input) => input.addEventListener('change', updateSubmitButtonState));
textarea.addEventListener('input', updateCharCount);

document.addEventListener('DOMContentLoaded', () => {
  updateSubmitButtonState();
  agreementCheckbox.addEventListener('change', updateSubmitButtonState);
});

submitFormButton.addEventListener('click', (event) => {
  event.preventDefault();
  displayFormData();
  bodyLogo.style.display = 'none';
});

window.addEventListener('load', () => {
  updateCharCount();
});
