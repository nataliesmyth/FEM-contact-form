const form = document.getElementById('form');
const submitBtn = document.getElementById('submit');
const modal = document.getElementById('modal');
const radioBtns = document.querySelectorAll('input[name="query-type"]');
const message = document.getElementById('message');
const termsConsent = document.getElementById('consent');

function clearFields() {
  document.querySelectorAll("input").forEach(control => {
    console.log(control.type)
    if (!["radio", "checkbox"].includes(control.type)) {
      control.value = "";
    } else {
      control.checked = false;
    }
  });
  document.querySelector("textarea").value = "";
  document.querySelector('[checked]').removeAttribute("checked");
};

const validateForm = (e) => {
  e.preventDefault();
  let totalErrors = 0;
  const firstName = document.getElementById('firstname');
  const lastName = document.getElementById('lastname');
  const email = document.getElementById('email');
  console.log(radioBtns[0].checked);

  if (firstName.value === '') {
    console.log("Please enter your first name.");
    firstName.style.borderColor = 'hsl(var(--clr-secondary))';
    firstName.nextElementSibling.classList.remove('hidden');
  } else {
    firstName.style.borderColor = 'hsl(var(--clr-primary-medium))';
    firstName.nextElementSibling.classList.add('hidden');

  }
  if (lastName.value === '') {
    console.log("Please enter your last name.");
    lastName.style.borderColor = 'hsl(var(--clr-secondary))';
    lastName.nextElementSibling.classList.remove('hidden');
  } else {
    lastName.style.borderColor = 'hsl(var(--clr-primary-medium))';
    lastName.nextElementSibling.classList.add('hidden');
  }
  if (email.value === '' || !emailIsValid(email.value)) {
    console.log('please enter your email address')
    email.style.borderColor = 'hsl(var(--clr-secondary))';
    email.nextElementSibling.classList.remove('hidden');
  } else {
    email.style.borderColor = 'hsl(var(--clr-primary-medium))';
    email.nextElementSibling.classList.add('hidden');

  }
  if (radioBtns[0].checked !== true && radioBtns[1].checked !== true) {
    console.log('please select a query type')
    const radioContainer = document.getElementById('radioContainer');
    radioContainer.lastElementChild.classList.remove('hidden');
  } else {
    radioContainer.lastElementChild.classList.add('hidden');
  }
  if (message.value === '') {
    console.log('please enter a message');
    message.nextElementSibling.classList.remove('hidden');
    message.style.borderColor = 'hsl(var(--clr-secondary))';
  } else {
    message.nextElementSibling.classList.add('hidden');
    message.style.borderColor = 'hsl(var(--clr-primary-medium))';
  }
  if (termsConsent.checked !== true) {
    termsConsent.parentElement.nextElementSibling.classList.remove('hidden');
    termsConsent.parentElement.lastElementChild.classList.add('flex');
    termsConsent.style.borderColor = 'hsl(var(--clr-secondary))';
  } else {
    termsConsent.parentElement.nextElementSibling.classList.add('hidden');
    termsConsent.style.borderColor = 'hsl(var(--clr-primary-medium))';

  }
  if (totalErrors > 0) {
    return false;
  }
  console.log('form validated')
  formIsValid()
  return true
}

function formIsValid() {
  modal.classList.remove('hidden');
  clearFields();
}

const emailIsValid = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.querySelectorAll('input[type="radio"]').forEach(control => {
  control.addEventListener("click", e => {
      let selected = e.target.nextElementSibling.textContent;
      let container = e.target.closest("fieldset");
      container.querySelectorAll('label').forEach(radioValue => {
          if (radioValue.textContent === selected) {
              radioValue.previousElementSibling.setAttribute("checked", true);
          }
          else {
              radioValue.previousElementSibling.removeAttribute("checked");
          }
      })
  })
});

submitBtn.addEventListener('click', validateForm);