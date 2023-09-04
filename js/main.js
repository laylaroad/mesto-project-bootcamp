
// import { createCard, setupCards } from './card.js';

// import { cleanValidation, enableValidation } from './validation.js';

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const closePopupButton = document.querySelector('.popup__close');
const closePopupNewPlaceButton = document.querySelector('#add-new-place-close-button');

const editPopup = document.getElementById('edit-profile-window');
const newItemPopup = document.getElementById('add-new-place-window');

const cards = document.querySelectorAll('.card');
const addNewPlaceSubmitButton = document.getElementById('new-place-save-button');

const cardPopup = document.getElementById('full-card');
const cardPopupCloseButton = document.getElementById('card-full-close-button');
const fullImage = cardPopup.querySelector('.full-card__image');
const fullCaption = cardPopup.querySelector('.full-card__caption');

const placeName = document.querySelector('#new-place-name');
const placeLink = document.querySelector('#new-place-link');

const editProfileForm = document.querySelector('#popup-edit-profile');
const profileText = document.querySelector('.profile__text');
const editProfileSubmitButton = document.querySelector('#edit-profile-button');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

setupCards();
// enableValidation(validationSettings);

function handleClickOnOverlay(popup, evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }
    });
    document.addEventListener('mousedown', function (evt) {
        handleClickOnOverlay(popup, evt);
    });

}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }
    });
    document.removeEventListener('mousedown', function (evt) {
        handleClickOnOverlay(popup, evt);
    });
}

profileEditButton.addEventListener('click', function () {
    openPopup(editPopup);
});

closePopupButton.addEventListener('click', function () {
    closePopup(editPopup);
})

profileAddButton.addEventListener('click', function () {
    openPopup(newItemPopup);

})

closePopupNewPlaceButton.addEventListener('click', function () {
    closePopup(newItemPopup);
})

function createCard(cardName, cardLink) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like');
    const deleteButton = cardElement.querySelector('.card__delete');

    cardImage.src = cardLink;
    cardImage.alt = cardName;
    cardTitle.textContent = cardName;
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like_active');
    });
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });
    cardImage.addEventListener('click', () => {
        openFullCard(cardLink, cardName);
    })
    cardImage.addEventListener('click', function () {
        openPopup(cardPopup);
    })

    cardPopupCloseButton.addEventListener('click', function () {
        closePopup(cardPopup);
    })

    document.querySelector('.cards').prepend(cardElement);
    return cardElement;
}

function setupCards() {
    initialCards.forEach(({ name, link }) => {
        createCard(name, link);
    });
}


function openFullCard(cardLink, cardName) {
    openPopup(cardPopup);
    fullImage.src = cardLink;
    fullImage.alt = cardName;
    fullCaption.textContent = cardName;
    closePopup(cardPopup);
}

function handleNewPlaceFormSubmit(event) {
    event.preventDefault();
    validateInput([placeName, placeLink]);
    createCard(placeName.value, placeLink.value);
    closePopup(newItemPopup);
    placeName.value = '';
    placeLink.value = '';
}
newItemPopup.addEventListener('submit', handleNewPlaceFormSubmit);


function handleEditProfileFormSubmit(event) {
    event.preventDefault();
    profileText.querySelector('.profile__title').textContent = nameInput.value;
    profileText.querySelector('.profile__subtitle').textContent = jobInput.value;

    closePopup(editPopup);
}
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);


//FORM VALIDITY
//переменные валидации форм
const buttonSelector = '.popup__button';
const formSelector = '.popup__form';
const invalidTextClass = 'popup__field_invalid';
const inputSelector = '.popup__field';

function showError(input, errorText) {
    input.classList.add(invalidTextClass);
    const errorId = 'error-' + input.id;
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = errorText;
}

function hideError(input) {
    input.classList.remove(invalidTextClass);
    const errorId = 'error-' + input.id;
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
}

//ф-ция сброса валидации
function resetValidation(formElement) {
    formElement.reset();
    const inputList = formElement.querySelectorAll(inputSelector);
    inputList.forEach((input) => {
        hideError(input);
    });
}

function checkField(input) {
    if (!input.validity.valid) {
        showError(input, input.validationMessage)
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

// const formElement = document.querySelector(formSelector);

function setEventListeners(formElement) {
    const buttonSubmit = formElement.querySelector(buttonSelector);
    disableButton(buttonSubmit);
    const inputList = formElement.querySelectorAll(inputSelector);

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkField(input);
            checkButton(formElement, buttonSubmit);
        });
    });
}


const formList = document.querySelectorAll(formSelector);
formList.forEach((formElement) => {
    setEventListeners(formElement);
});



