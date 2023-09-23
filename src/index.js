
import './pages/index.css';

import { enableValidation } from "./components/validation.js";

import { handleSubmit } from "./components/utils.js"

import { validationSettings } from './components/constants.js';

import { createCard } from "./components/card.js";

import { closePopup, openPopup } from "./components/modal.js";

import { getDataProfile, getInitialCards, editProfile, newAvatar, addNewCard } from "./components/api.js";

//buttons of popups edit/add
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const closePopupButtons = document.querySelectorAll('.popup__close');

const editPopup = document.getElementById('edit-profile-window');
const newCardPopup = document.getElementById('add-new-place-window');

//card popup
export const cardsElements = document.querySelector('.cards');

//inputs of new card popup
const cardName = document.getElementById('place');
const cardLink = document.getElementById('url');
const cardSubmitForm = document.forms['new-card-form'];

//profile info
const editProfileForm = document.forms['edit-profile-form'];
const profileText = document.querySelector('.profile__text');
const profileTitle = profileText.querySelector('.profile__title');
const profileJob = profileText.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');

//inputs of profile info popup
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');

//new avatar popup
const addNewAvatarPopup = document.getElementById('new-avatar');
const newAvatarForm = document.forms['new-avatar-form'];
const addAvatarIcon = document.querySelector('.profile__avatar_edit');
const avatarLinkInput = document.getElementById('link');

export let profileId = "";

Promise.all([getDataProfile(), getInitialCards()])
    .then(([profileData, cardsElements]) => {
        profileTitle.textContent = profileData.name;
        profileJob.textContent = profileData.about;
        profileAvatar.src = profileData.avatar;
        profileId = profileData._id;

        cardsElements.reverse();
        cardsElements.forEach((cardElement => {
            createCard(cardElement.name, cardElement.link,
                cardElement.likes, cardElement._id, cardElement.owner);
        }))
    })
    .catch(console.error);


profileEditButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(editPopup);
});

profileAddButton.addEventListener('click', function () {
    openPopup(newCardPopup);
})

closePopupButtons.forEach((button) =>
    button.addEventListener('click', (evt) => {
        const popupClosest = evt.target.closest('.popup');
        closePopup(popupClosest);
    })
);

function changeAvatar() {
    openPopup(addNewAvatarPopup);
}
addAvatarIcon.addEventListener('click', changeAvatar);

function handleNewPlaceFormSubmit(evt) {
    function makeRequest() {
        return addNewCard(cardName.value, cardLink.value)
            .then((res) => {
                createCard(res.name, res.link, res.likes, res._id, res.owner);
            });
    }
    handleSubmit(makeRequest, evt);
}
cardSubmitForm.addEventListener('submit', handleNewPlaceFormSubmit);

enableValidation(validationSettings);

function handleEditProfileFormSubmit(evt) {
    function makeRequest() {
        return editProfile(nameInput.value, jobInput.value)
            .then((res) => {
                profileTitle.textContent = res.name;
                profileJob.textContent = res.about;
            });
    }
    handleSubmit(makeRequest, evt);
}
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

function handleSubmitAvatar(evt) {
    function makeRequest() {
        return newAvatar(avatarLinkInput.value)
            .then((profilaData) => {
                profileAvatar.src = profilaData.avatar;
            });
    }
    handleSubmit(makeRequest, evt);
}
newAvatarForm.addEventListener('submit', handleSubmitAvatar);
