import throttle from 'lodash.throttle';

const FORM_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('textarea'),
  input: document.querySelector('input'),
};
const formData = {};

populateTextarea();

refs.form.addEventListener('input', throttle(getFormValue, 500));
refs.form.addEventListener('submit', onFormSubmmit);

function getFormValue(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(FORM_KEY, JSON.stringify(formData));
}

function onFormSubmmit(event) {
	event.preventDefault();
  if (refs.textarea.value && refs.input.value) {
    event.currentTarget.reset();
    console.log(localStorage.getItem(FORM_KEY));
	  localStorage.removeItem(FORM_KEY);
	  return
  }
  return alert('Please fill in all the fields!');
}

function populateTextarea() {
	const savedMessage = JSON.parse(localStorage.getItem(FORM_KEY));
  if (!savedMessage) {
    return;
  }
  refs.textarea.value = savedMessage['message'] || '';
  refs.input.value = savedMessage['email'] || '';
}
