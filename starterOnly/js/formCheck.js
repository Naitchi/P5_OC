// DATA

//Dom elements
const main = document.querySelector("main");

const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const qty = document.getElementById("quantity");

const radioLocation = document.querySelectorAll('input[name="location"]');
const right = document.getElementById("checkbox1");
const newsletter = document.getElementById("checkbox2");

let elementCheck = "";

const submit = document.getElementById("submit");

//Regex
const regexName =
  /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,'-]{2,}$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexNumber = /^[0-9]{1,2}$/;

//Error Message
const errorMsgFirstName =
  "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
const errorMsgName =
  "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const errorMsgEmail =
  "Adresse e-mail invalide. (L'adresse doit suivre le format exemple@exemple.exemple.)";
const errorMsgBirth = "Vous devez entrer votre date de naissance.";
const errorMsgNumber =
  "Veuillez entrer au moins un chiffre. (Même si c'est 0.)";
const errorMsgRadio = "Vous devez choisir une option.";
const errorMsgCheckbox =
  "Vous devez vérifier que vous acceptez les termes et conditions.";

//collect User Data
let validData = true;

//ARROWS FUNCTIONS

//check les inputs de nom, prénom, emaill et nombre de tournois
const checkInput = (el, msg, regex) => {
  if (!el.value.trim().match(regex)) {
    showTextError(el, msg);
    validData = false;
  } else {
    hideTextError(el, msg);
  }
};
//check si il y a une date de naissance
const checkDate = (el, msg) => {
  if (!el.value) {
    showTextError(el, msg);
    validData = false;
  } else {
    hideTextError(el);
  }
};
//check les input radio et récupere la valeur
const checkRadioInput = (elements, msg) => {
  elements.forEach((el) => {
    if (el.checked) elementCheck = el.value;
  });
  if (!elementCheck) {
    showTextError(elements, msg);
    validData = false;
  } else {
    hideTextError(elements);
  }
};
//check si les conditions on été coché
const checkCheckboxInput = (el, msg) => {
  if (!el.checked) {
    showTextError(el, msg);
    validData = false;
  } else {
    hideTextError(el);
  }
};

//affiche un message d'erreur
const showTextError = (el, msg) => {
  // 2 paramètres element et message: les input et errorMessages (ce sont les arguments de la fonction appelée)
  let target;
  if (NodeList.prototype.isPrototypeOf(el)) target = el[0].parentNode;
  else target = el.parentNode;
  //pour afficher les messages d'erreurs je me sers du css existant .formData[data-error]
  target.setAttribute("data-error-visible", true);
  target.setAttribute("data-error", msg);
};
//cache un message d'erreur
const hideTextError = (el) => {
  // 2 paramètres element et message: les input et errorMessages (ce sont les arguments de la fonction appelée)
  let target;
  if (NodeList.prototype.isPrototypeOf(el)) target = el[0].parentNode;
  else target = el.parentNode;
  //pour afficher les messages d'erreurs je me sers du css existant .formData[data-error]
  target.setAttribute("data-error-visible", false);
  target.setAttribute("data-error", "");
};

//check the whole form
const checkForm = () => {
  validData = true;
  checkInput(firstName, errorMsgFirstName, regexName);
  checkInput(lastName, errorMsgName, regexName);
  checkInput(email, errorMsgEmail, regexEmail);
  checkDate(birthdate, errorMsgBirth);
  checkInput(qty, errorMsgNumber, regexNumber);
  checkRadioInput(radioLocation, errorMsgRadio);
  checkCheckboxInput(right, errorMsgCheckbox);
  console.log(validData);
  if (validData === true) {
    const data = new FormData();
    data.append("firstname", firstName.value);
    data.append("lastname", lastName.value);
    data.append("email", email.value);
    data.append("birthdate", birthdate.value);
    data.append("qantity", qty.value);
    data.append("location", elementCheck);
    data.append("right", true);
    data.append("newsletter", newsletter.checked);

    modalbg.style.display = "none";

    const validation = document.createElement("div");
    validation.id = "validation";
    const content = document.createElement("div");
    validation.appendChild(content);
    content.classList.add("content");
    const close = document.createElement("span");
    content.appendChild(close);
    close.classList.add("close");
    close.id = "close";
    const text = document.createElement("p");
    content.appendChild(text);
    text.textContent = "Formulaire envoyé !";
    console.log(validation);
    main.append(validation);
    close.addEventListener("click", (e) => {
      validation.remove();
    });
    return console.log(...data);
  }
};

//EVENT LISTENER

firstName.addEventListener("focusout", (e) => {
  checkInput(e.target, errorMsgFirstName, regexName);
});
lastName.addEventListener("focusout", (e) =>
  checkInput(e.target, errorMsgName, regexName)
);
email.addEventListener("focusout", (e) =>
  checkInput(e.target, errorMsgEmail, regexEmail)
);
birthdate.addEventListener("focusout", (e) =>
  checkDate(e.target, errorMsgBirth)
);
qty.addEventListener("focusout", (e) =>
  checkInput(e.target, errorMsgNumber, regexNumber)
);
radioLocation.forEach((el) => {
  el.addEventListener("click", (e) => {
    checkRadioInput(radioLocation, errorMsgRadio);
  });
});
right.addEventListener("click", (e) =>
  checkCheckboxInput(e.target, errorMsgCheckbox)
);
submit.addEventListener("click", (e) => checkForm());
