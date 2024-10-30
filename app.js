const form = document.getElementById('form');
const submitBtn = document.getElementById('submit');
const modal = document.getElementById('modal');
const radioBtns = document.querySelectorAll('input[name="query-type"]');
const message = document.getElementById('message');
const termsConsent = document.getElementById('consent');

// function clearError(e) {
//   console.log(e.target)
//   let control = e.target;
//   if (control.nodeName == "TEXTAREA") {
//     let container = control.closest("div");
//     container.querySelector("textarea").classList.remove("error");
//     container.querySelector("p").classList.add("hidden");
//   } else if (!["radio", "checkbox"].includes(control.type)) {
//     let container = control.closest("div");
//     container.querySelector("input").classList.remove("error");
//     container.querySelector("p").classList.add("hidden");
//   } else {
//     if (control.type == "radio") {
//       let container = control.closest("fieldset");
//       container.querySelector("p").classList.add("hidden");
//   } else {
//       let container = control.closest("div");
//       container.querySelector("p").classList.add("hidden");
//     }
//   }
// };

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

// document.querySelectorAll("input").forEach(control => {
//   control.addEventListener("focus", clearError);
// });

// document.querySelector("textarea").addEventListener("focus", clearError);

const validateForm = (e) => {
  e.preventDefault();
  let totalErrors = 0;
  const firstName = document.getElementById('firstname');
  const lastName = document.getElementById('lastname');
  const email = document.getElementById('email');
  // const radioBtns = document.querySelectorAll('input[name="query-type"]');
  console.log(radioBtns[0].checked);
  let isTrue = true;


  if (firstName.value === '') {
    totalErrors++
    console.log("Please enter your first name.");
    firstName.style.borderColor = 'hsl(var(--clr-secondary))';
    firstName.nextElementSibling.classList.remove('hidden');
  }
  if (lastName.value === '') {
    totalErrors++
    console.log("Please enter your last name.");
    lastName.style.borderColor = 'hsl(var(--clr-secondary))';
    lastName.nextElementSibling.classList.remove('hidden');
  }
  if (email.value === '' || !emailIsValid(email.value)) {
    totalErrors++
    console.log('please enter your email address')
    email.nextElementSibling.classList.remove('hidden');
    email.style.borderColor = 'hsl(var(--clr-secondary))';
  }
  if (radioBtns[0].checked !== true && radioBtns[1].checked !== true) {
    console.log('please select a query type')
    const radioContainer = document.getElementById('radioContainer');
    radioContainer.lastElementChild.classList.remove('hidden');
  }
  if (message.value === '') {
    console.log('please enter a message');
    message.nextElementSibling.classList.remove('hidden');
    message.style.borderColor = 'hsl(var(--clr-secondary))';
  }
  if (termsConsent.checked !== true) {
    totalErrors++
    termsConsent.parentElement.nextElementSibling.classList.remove('hidden');
    termsConsent.parentElement.lastElementChild.classList.add('flex');
    termsConsent.style.borderColor = 'hsl(var(--clr-secondary))';
  }
  if (totalErrors > 0) {
    return false;
  }
  console.log('form validated')
  firstName.style.borderColor = 'hsl(var(--clr-primary))';
  firstName.nextElementSibling.classList.add('hidden');
  lastName.style.borderColor = 'hsl(var(--clr-primary))';
  lastName.nextElementSibling.classList.add('hidden')
  email.style.borderColor = 'hsl(var(--clr-primary))';
  email.nextElementSibling.classList.add('hidden');
  termsConsent.nextElementSibling.classList.remove('hidden');
  termsConsent.style.borderColor = 'hsl(var(--clr-secondary))';
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
          if (radioValue.textContent == selected) {
              radioValue.previousElementSibling.setAttribute("checked", true);
          }
          else {
              radioValue.previousElementSibling.removeAttribute("checked");
          }
      })
  })
});

submitBtn.addEventListener('click', validateForm);