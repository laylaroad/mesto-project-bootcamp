// import { validationSettings } from "./constants.js";
import { closePopup } from "./modal.js";
import { disableButton } from "./validation.js";

function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText;
    } else {
        button.textContent = buttonText;
    }
};

function handleSubmit(request, evt, inputEl = true, loadingText = "Сохранение...") {
    evt.preventDefault();
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, loadingText);
    request()
        .then(() => {
            inputEl && evt.target.reset();
            closePopup(evt.target.closest('.popup'))
            disableButton(submitButton);
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, submitButton, initialText);
        });
}

//запрос к серверу
export const config = {
    url: 'https://nomoreparties.co/v1/wbf-cohort-12',
    headers: {
        authorization: '5970e7b5-fad8-4b45-bc23-ee4a5f3f9441',
        'Content-Type': 'application/json',
    },
};

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

function request(url, options) {
    return fetch(url, options).then(checkResponse);
}


export { renderLoading, handleSubmit, request };
