
import './pages/index.css';

import { enableValidation } from "./components/validation.js";

import { createCard, addCardElement, cardElement } from "./components/card.js";

import { closePopup, openPopup } from "./components/modal.js";

import { getDataProfile, getInitialCards, editProfile, addLike, deleteLike, newAvatar, addNewCard, deleteCard } from "./components/api.js";

// const initialCards = [
//     {
//         name: 'Архыз',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//         name: 'Челябинская область',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//         name: 'Иваново',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//         name: 'Камчатка',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//         name: 'Холмогорский район',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//         name: 'Байкал',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
// ]

//buttons of popups edit/add
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

export const initialCards = [];

const closePopupButtons = document.querySelectorAll('.popup__close');
//close button const should delete
const closePopupNewPlaceButton = document.getElementById('add-new-place-close-button');
const closePopupEditButton = document.getElementById('edit-profile-close-button');

const editPopup = document.getElementById('edit-profile-window');
const newItemPopup = document.getElementById('add-new-place-window');

//card popup
export const cardsElements = document.querySelector('.cards');
export const cardPopup = document.getElementById('full-card');
export const cardPopupCloseButton = document.getElementById('card-full-close-button');
const fullImage = cardPopup.querySelector('.full-card__image');
const fullCaption = cardPopup.querySelector('.full-card__caption');

//inputs of new card popup
const placeName = document.querySelector('#place');
const placeLink = document.querySelector('#url');

//profile info
const editProfileForm = document.querySelector('#popup-edit-profile');
const profileText = document.querySelector('.profile__text');
const profileTitle = profileText.querySelector('.profile__title');
const profileJob = profileText.querySelector('.profile__subtitle');

//inputs of profile info popup
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

//new avatar
const addNewAvatarPopup = document.getElementById('new-avatar');
const addAvatarIcon = document.querySelector('.profile__avatar_edit');


const validationSettings = {
    buttonSelector: ".popup__button",
    formSelector: ".popup__form",
    invalidTextClass: "popup__field_invalid",
    inputSelector: ".popup__field",
};

let userId;

setupCards();


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

//вместо forEach можно попробовать найти 
//ближайшую кнопку закрытия от родительского элемента
closePopupButtons.forEach((button) =>
    button.addEventListener('click', (evt) => {
        const popupClosest = evt.target.closest('.popup');
        closePopup(popupClosest);
        console.log(popupClosest);
    })
);

//открываем попап изменения аватарки
function changeAvatar() {
    openPopup(addNewAvatarPopup);
}
addAvatarIcon.addEventListener('click', changeAvatar);

//переписать
export function setupCards() {
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
    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editPopup);
}
enableValidation(validationSettings);
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

Promise.all([getDataProfile(), getInitialCards()])
    .then(([profileData, cardsElements]) => {

        profileTitle.textContent = profileData.name;
        profileJob.textContent = profileData.about;
        userId = profileData._id;

        cardsElements.forEach((cardElement => {
            const newCard = createCard(cardElement);
            addCardElement(newCard);
            console.log(cardElement);
        }))
    })
    .catch(console.error);
