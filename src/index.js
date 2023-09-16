
import './pages/index.css';

import { enableValidation } from "./components/validation.js";

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

const closePopupButtons = document.querySelectorAll('.popup__close');
const closePopupNewPlaceButton = document.getElementById('add-new-place-close-button');
const closePopupEditButton = document.getElementById('edit-profile-close-button');

const editPopup = document.getElementById('edit-profile-window');
const newItemPopup = document.getElementById('add-new-place-window');

export const cardsElements = document.querySelector('.cards');
// const addNewPlaceSubmitButton = document.getElementById('new-place-save-button');

export const cardPopup = document.getElementById('full-card');
export const cardPopupCloseButton = document.getElementById('card-full-close-button');
const fullImage = cardPopup.querySelector('.full-card__image');
const fullCaption = cardPopup.querySelector('.full-card__caption');

const placeName = document.querySelector('#place');
const placeLink = document.querySelector('#url');

const editProfileForm = document.querySelector('#popup-edit-profile');
const profileText = document.querySelector('.profile__text');

const addNewAvatarPopup = document.getElementById('new-avatar');
const addAvatarIcon = document.querySelector('.profile__avatar_edit');
const submitAvatarButton = document.getElementById('save-new-avatar');
// const editProfileSubmitButton = document.querySelector('#edit-profile-button');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

const validationSettings = {
    buttonSelector: ".popup__button",
    formSelector: ".popup__form",
    invalidTextClass: "popup__field_invalid",
    inputSelector: ".popup__field",
};

let userId;

setupCards();

// Promise.all([], [])
// .then ([data, cards]) => {
//     profileName.textContent = data.name;
//     profileJob.textContent = data.about;
//     userId.data._id;
//     cards.forEach((card) => {
//         const newCard = createCard(card);
//         elements.Container.append(newCard);
//     });
// })
// .catch((error) => {
//     console.error('Error profile info', error);
// });

profileEditButton.addEventListener('click', function () {
    openPopup(editPopup);
});

closePopupEditButton.addEventListener('click', function () {
    closePopup(editPopup);
})

profileAddButton.addEventListener('click', function () {
    openPopup(newItemPopup);
})

closePopupNewPlaceButton.addEventListener('click', function () {
    closePopup(newItemPopup);
})

cardPopupCloseButton.addEventListener('click', function () {
    closePopup(cardPopup);
})

closePopupButtons.forEach((button) =>
    button.addEventListener('click', (evt) => {
        const popupClosest = evt.target.closest('.popup');
        closePopup(popupClosest);
        console.log(popupClosest);
    })
);

function changeAvatar() {
    openPopup(addNewAvatarPopup);
}
addAvatarIcon.addEventListener('click', changeAvatar);

function setupCards() {
    initialCards.forEach(({ name, link }) => {
        const newCard = createCard(name, link);
        createCard(name, link);
        cardsElements.append(newCard);
    });
}

export function openFullCard(cardLink, cardName) {
    openPopup(cardPopup);
    fullImage.src = cardLink;
    fullImage.alt = cardName;
    fullCaption.textContent = cardName;
};

function handleNewPlaceFormSubmit(event) {
    event.preventDefault();
    const addCard = createCard(placeName.value, placeLink.value);
    cardsElements.prepend(addCard);
    closePopup(newItemPopup);
    placeName.value = '';
    placeLink.value = '';
}
newItemPopup.addEventListener('submit', handleNewPlaceFormSubmit);

function handleEditProfileFormSubmit(event) {
    event.preventDefault();
    profileText.querySelector('.profile__title').textContent = nameInput.value;
    profileText.querySelector('.profile__subtitle').textContent = jobInput.value;
    // profileEditButton.textContent = "Сохранение...";
    closePopup(editPopup);
}
enableValidation(validationSettings);
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);


//часть функции, которая добавляет инфу на страницу; добавить после кнопки с сохранением
// changeUserProfile(nameValue, jobValue)
// .then((res) => {
//     console.log('Информация добавлена!');
//     profileName.textContent = res.name;
//     profileJob.textContent = res.about;
//     closePopup(editPopup);
// })
// .catch((error) => {
//     console.error('Что-то не так!', error);
// })
// .finally(() => {
//     profileEditButton.textContent = "Сохранить";
// });
