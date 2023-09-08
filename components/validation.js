//FORM VALIDITY
//переменные валидации форм
function showError(input, errorText, settings) {
    const errorId = `error-${input.id}`;
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = errorText;
    input.classList.add('popup__field_invalid');
}

function hideError(input, settings) {
    const errorId = `error-${input.id}`;
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
    input.classList.remove('popup__field_invalid');
}

//ф-ция сброса валидации
function resetValidation(formElement, settings) {
    formElement.reset();
    const inputList = formElement.querySelectorAll(settings.inputSelector);
    inputList.forEach((input) => {
        hideError(input, settings);
    });
}

function checkField(input, settings) {
    const errorText = input.validationMessage;
    if (!input.validity.valid) {
        showError(input, errorText, settings)
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
        enableButton(buttonSubmit)
    } else {
        disableButton(buttonSubmit);
    }
}

function setEventListeners(formElement, settings) {
    const buttonSubmit = formElement.querySelector(settings.buttonSelector);
    disableButton(buttonSubmit);
    const inputList = formElement.querySelectorAll(settings.inputSelector);

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkField(input);
            checkButton(formElement, buttonSubmit);
        });
    });
}
function enableValidation(settings) {
    const formList = document.querySelectorAll(settings.formSelector);
    formList.forEach((formElement) =>
        setEventListeners(formElement, settings));
}

export { resetValidation, enableValidation };
