//валидация
// const validationSettings = {
//     inputSelector: '.input__text',
//     buttonSelector: '.input__btn',
//     formSelector: '.popup__form',
//     invalidTextClass: 'input__text_invalid',
// }

const inputProfileSelector = document.querySelector('.popup__field');
const invalidPopupField = document.querySelector('.popup__field_invalid');

function showError(input, errorText) {
    const errorId = 'error-' + input.id;
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = errorText;
    input.classList.add(invalidPopupField);
}

function hideError(input) {
    const errorId = 'error-' + input.id;
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
    input.classList.remove(invalidPopupField);
}

function checkField(input) {
    if (!input.validity.valid) {
        showError(input, input.validationMessage);
    } else {
        hideError(input);
    }
}

function enableButton(button) {
    button.disabled = false;
}

function disableButton(button) {
    button.disabled = true;
}

function checkButton(formElement, buttonSubmit) {
    if (formElement.checkValidity()) {
        enableButton(buttonSubmit);
    } else {
        disableButton(buttonSubmit);
    }
}

function setEventListeners(formElement) {
    const buttonSubmit = formElement.querySelector(editProfileSubmitButton);
    disableButton(buttonSubmit);
    const inputList = formElement.querySelectorAll(editProfileSubmitButton);

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkField(input, settings);
            checkButton(formElement, buttonSubmit);
        });
    });
}

function enableValidation() {
    const formList = document.querySelectorAll(editProfileForm);
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
}

// function keyEscapeButton(evt) {
//     const popupOpened = document.querySelector('.popup_opened');
//     if (evt.key === "Escape") {
//         closePopup('.popup_opened');
//     }
// }



// function openPopup(popupOpened) {
//     popupOpened.classList.add('popup_opened');
// }

// function closePopup(popupOpened) {
//     popupOpened.classList.remove('popup_opened');
//     document.addEventListener('keydown', keyEscapeButton);
// }

// popupOpened.addEventListener('click', function (evt) {
//     if (evt.currentTarget === evt.target) {
//         closePopup(popupOpened);
//     }
