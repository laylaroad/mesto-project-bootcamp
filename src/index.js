
import './pages/index.css';

import { enableValidation, resetValidation } from "./components/validation.js";

import { createCard } from "./components/card.js";

import { handleClickOnOverlay, closePopup, openPopup } from "./components/modal.js";

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
const fullImage = cardPopup.querySelector('.full-card__image');
const fullCaption = cardPopup.querySelector('.full-card__caption');

const placeName = document.querySelector('#place');
const placeLink = document.querySelector('#url');

const editProfileForm = document.querySelector('#popup-edit-profile');
const profileText = document.querySelector('.profile__text');
const editProfileSubmitButton = document.querySelector('#edit-profile-button');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

const validationSettings = {
    buttonSelector: ".popup__button",
    formSelector: ".popup__form",
    invalidTextClass: "popup__field_invalid",
    inputSelector: ".popup__field",
};


setupCards();

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

function setupCards() {
    initialCards.forEach(({ name, link }) => {
        createCard(name, link);
    });
}

export function openFullCard(cardLink, cardName) {
    openPopup(cardPopup);
    fullImage.src = cardLink;
    fullImage.alt = cardName;
    fullCaption.textContent = cardName;
    closePopup(cardPopup);
}

function handleNewPlaceFormSubmit(event) {
    event.preventDefault();
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
    resetValidation(editProfileForm, validationSettings);
    closePopup(editPopup);
}
enableValidation(validationSettings);
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

