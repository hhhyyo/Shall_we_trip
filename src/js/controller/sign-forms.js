import { getInputName, isValid, isSamePassowrd, isSubmit } from '../store/sign';

const $form = document.querySelector('.sign form');

$form.oninput = e => {
  const inputName = getInputName(e.target.name);
  const $inputError = e.target.closest('.input-wrap').lastElementChild;
  const allInputOfForm = $form.querySelectorAll('input');

  inputName.validate =
    e.target.name !== 'confirmPassword' ? isValid(inputName, e.target.value) : isSamePassowrd(e.target.value);

  $inputError.classList.toggle('active', !inputName.validate);
  $inputError.classList.remove('correct');
  $inputError.textContent = inputName.validate ? '' : inputName.errorMessage;

  if (e.target.matches('.sign-up #userEmail')) e.target.nextElementSibling.disabled = !inputName.validate;

  if (e.target.matches('.sign-up #password')) {
    document.querySelector('#confirmPassword').value = '';
    getInputName(document.querySelector('#confirmPassword').name).validate = false;
  }

  e.target.closest('form').querySelector('.button--submit').disabled = !isSubmit(allInputOfForm);
};
