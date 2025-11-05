"use strict";

// Inputs
const form = document.querySelector("#contactForm");
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const messageInput = document.querySelector("#message");

// Error message 
const firstNameError = document.querySelector("#firstNameError");
const lastNameError = document.querySelector("#lastNameError");
const emailError = document.querySelector("#emailError");
const phoneError = document.querySelector("#phoneError");
const messageError = document.querySelector("#messageError");
const successMessage = document.querySelector("#successMessage");

// Regex 
const firstNameRegex = /^[A-Za-z]{1,20}$/;                             // seulement lettres, max 20 caractères
const lastNameRegex = /^[A-Za-z]{1,20}$/;                             // seulement lettres, max 20 caractères
const emailRegex = /^\w+@\w+\.\w+$/; 
const phoneRegex = /^0[6-7]\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?$/; 
const messageRegex = /^.{10,}$/;                                      //min 10 charcs

// validation function
function validateInput(input, regex, errorElement, errorMessage) {
  if (!regex.test(input.value)) {
    // invalide feild
    input.classList.add("invalid"); // ajoute bordure rouge
    errorElement.textContent = errorMessage; // message d'erreur
    return false;
  } else {
    // Valide field
    input.classList.remove("invalid");
    errorElement.textContent = ""; // efface l'erreur
    return true;
  }
}

//  Check the validation while typing
firstNameInput.addEventListener("input", () =>
  validateInput(firstNameInput, firstNameRegex, firstNameError, "Nom invalide")
);
lastNameInput.addEventListener("input", () =>
  validateInput(lastNameInput, lastNameRegex, lastNameError, "Prénom invalide")
);
emailInput.addEventListener("input", () =>
  validateInput(emailInput, emailRegex, emailError, "Email invalide")
);
phoneInput.addEventListener("input", () =>
  validateInput(phoneInput, phoneRegex, phoneError, "Téléphone invalide")
);
messageInput.addEventListener("input", () =>
  validateInput(messageInput, messageRegex, messageError, "Message trop court")
);

// ======= Validation au submit =======
const submitBtn = querySelector('.submit-btn');
submitBtn.addEventListener("click", function (event) {
  event.preventDefault(); // empêche l'envoi automatique du formulaire

  // Vérifie tous les champs
  const isFirstNameValid = validateInput(
    firstNameInput,
    firstNameRegex,
    firstNameError,
    "invalide Name"
  );
  const isLastNameValid = validateInput(
    lastNameInput,
    lastNameRegex,
    lastNameError,
    "Invalide Name"
  );
  const isEmailValid = validateInput(
    emailInput,
    emailRegex,
    emailError,
    "Invalide Email"
  );
  const isPhoneValid = validateInput(
    phoneInput,
    phoneRegex,
    phoneError,
    "Invalide Phone"
  );
  const isMessageValid = validateInput(
    messageInput,
    messageRegex,
    messageError,
    "Invalide Message"
  );

  // Si tout est valide
  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isMessageValid
  ) {
    successMessage.textContent = "Message sent successfully!"; // message de succès

    // Réinitialise le formulaire (corrected)
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    messageInput.value = "";

    // remove invalid border if present
    firstNameInput.classList.remove("invalid");
    lastNameInput.classList.remove("invalid");
    emailInput.classList.remove("invalid");
    phoneInput.classList.remove("invalid");
    messageInput.classList.remove("invalid");
  } else {
    successMessage.textContent = "";
  }
});
