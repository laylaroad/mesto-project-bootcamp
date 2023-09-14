
import './pages/index.css';

import { enableValidation, resetValidation } from "./components/validation.js";

import { createCard } from "./components/card.js";

import { handleClickOnOverlay, closePopup, openPopup } from "./components/modal.js";

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import addButtonImage from './images/add-button.svg';
import avatarImage from './images/avatar.svg';
import closeButtonImage from './images/close-button.svg';
import editButtonImage from './images/edit-button.svg';
import likeActiveButtonImage from './images/like-active.svg';
import likeDisabledImage from './images/like-disabled.svg';
import logoImage from './images/logo.svg';
import trashImage from './images/trash.svg';
import changeAvatarPencilImage from './images/avatar-pencil.svg';

import InterBlackEot from './fonts/Inter-Black.eot';
import InterBlackTtf from './fonts/Inter-Black.ttf';
import InterBlackWoff from './fonts/Inter-Black.woff';
import InterBlackWoffTwo from './fonts/Inter-Black.woff2';
import InterBoldEot from './fonts/Inter-Bold.eot';
import InterBoldTtf from './fonts/Inter-Bold.ttf';
import InterBoldWoff from './fonts/Inter-Bold.woff';
import InterBoldWoffTwo from './fonts/Inter-Bold.woff2';
import InterRegularEot from './fonts/Inter-Regular.eot';
import InterRegularTtf from './fonts/Inter-Regular.ttf';
import InterRegularWoff from './fonts/Inter-Black.woff';
import InterRegularWoffTwo from './fonts/Inter-Regular.woff2';

const whoIsTheGoat = [
    // меняем исходные пути на переменные
    { name: 'Add Button Image', image: addButtonImage },
    { name: 'Avatar Image', image: avatarImage },
    { name: 'Close Button Image', image: closeButtonImage },
    { name: 'Edit Button Image', image: editButtonImage },
    { name: 'Like Active Button Image', image: likeActiveButtonImage },
    { name: 'Like Disabled Image', image: likeDisabledImage },
    { name: 'Trash Image', image: trashImage },
    { name: 'Avatar Change Pencil Image', image: changeAvatarPencilImage },
    { name: 'Logo Image', image: logoImage },

    { name: 'Inter Black Eot', link: InterBlackEot },
    { name: 'Inter Black Ttf', link: InterBlackTtf },
    { name: 'Inter Black Woff', link: InterBlackWoff },
    { name: 'Inter Black WoffTwo', link: InterBlackWoffTwo },
    { name: 'Inter Bold Eot', link: InterBoldEot },
    { name: 'Inter Bold Ttf', link: InterBoldTtf },
    { name: 'Inter Bold Woff', link: InterBoldWoff },
    { name: 'Inter Bold Woff Two', link: InterBoldWoffTwo },
    { name: 'Inter Regular Eot', link: InterRegularEot },
    { name: 'Inter Regular Ttf', link: InterRegularTtf },
    { name: 'Inter Regular Woff', link: InterRegularWoff },
    { name: 'Inter Regular Woff Two', link: InterRegularWoffTwo },
];

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

