
import './pages/index.css';

import { enableValidation } from "./components/validation.js";

import { createCard } from "./components/card.js";

import { closePopup, openPopup } from "./components/modal.js";

import { getDataProfile, getInitialCards, editProfile, newAvatar, addNewCard } from "./components/api.js";

//buttons of popups edit/add
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const closePopupButtons = document.querySelectorAll('.popup__close');
//close button const should delete
const closePopupNewPlaceButton = document.getElementById('add-new-place-close-button');
const closePopupEditButton = document.getElementById('edit-profile-close-button');

const editPopup = document.getElementById('edit-profile-window');
const newCardPopup = document.getElementById('add-new-place-window');

//card popup
export const cardsElements = document.querySelector('.cards');
export const cardPopup = document.getElementById('full-card');
export const cardPopupCloseButton = document.getElementById('card-full-close-button');
const fullImage = cardPopup.querySelector('.full-card__image');
const fullCaption = cardPopup.querySelector('.full-card__caption');

//inputs of new card popup
const cardName = document.querySelector('#place');
const cardLink = document.querySelector('#url');

//profile info
const editProfileForm = document.querySelector('#popup-edit-profile');
const profileText = document.querySelector('.profile__text');
const profileTitle = profileText.querySelector('.profile__title');
const profileJob = profileText.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');

//inputs of profile info popup
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

//new avatar popup
const addNewAvatarPopup = document.getElementById('new-avatar');
const newAvatarForm = document.getElementById('new-avatar-form');
const addAvatarIcon = document.querySelector('.profile__avatar_edit');
const avatarLinkInput = document.getElementById('link');


const validationSettings = {
    buttonSelector: ".popup__button",
    formSelector: ".popup__form",
    invalidTextClass: "popup__field_invalid",
    inputSelector: ".popup__field",
};

export let profileId = "";

Promise.all([getDataProfile(), getInitialCards()])
    .then(([profileData, cardsElements]) => {
        profileTitle.textContent = profileData.name;
        profileJob.textContent = profileData.about;
        profileAvatar.src = profileData.avatar;
        profileId = profileData._id;

        cardsElements.forEach((cardElement => {
            createCard(cardElement.name, cardElement.link,
                cardElement.likes.length, cardElement._id, cardElement.owner);
        }))
    })
    .catch(console.error);


profileEditButton.addEventListener('click', function () {
    openPopup(editPopup);
});

closePopupEditButton.addEventListener('click', function () {
    closePopup(editPopup);
})

profileAddButton.addEventListener('click', function () {
    openPopup(newCardPopup);
})

closePopupNewPlaceButton.addEventListener('click', function () {
    closePopup(newCardPopup);
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

export function openFullCard(cardLink, cardName) {
    openPopup(cardPopup);
    fullImage.src = cardLink;
    fullImage.alt = cardName;
    fullCaption.textContent = cardName;
};

function handleNewPlaceFormSubmit(event) {
    event.preventDefault();
    const addCard = createCard(cardName.value, cardLink.value, cardLikeCount, _id, owner);
    addNewCard(cardName.value, cardLink.value);
    cardsElements.prepend(addCard);
    closePopup(newCardPopup);
    cardName.value = '';
    cardLink.value = '';
}
newCardPopup.addEventListener('submit', handleNewPlaceFormSubmit);

function handleEditProfileFormSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    editProfile(nameInput.value, jobInput.value);
    closePopup(editPopup);
}
enableValidation(validationSettings);
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);


function handleSubmitAvatar(event) {
    event.submitter.textContent = "Сохранение...";
    event.preventDefault();

    newAvatar(avatarLinkInput.value)
        .then((profilaData) => {
            profileAvatar.src = profilaData.avatar;
        })
        .catch(() => {
            console.error;
        })
        .finally(() => {
            event.submitter.textContent = "Сохранение...";
        });
    closePopup(addNewAvatarPopup);
}
newAvatarForm.addEventListener('submit', handleSubmitAvatar);
