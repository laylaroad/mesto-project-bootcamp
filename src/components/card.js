import { openFullCard } from "../index.js";
import { openPopup, closePopup } from "./modal.js";


const cardPopupCloseButton = document.getElementById('card-full-close-button');
const cardPopup = document.getElementById('full-card');
const fullImage = cardPopup.querySelector('.full-card__image');
const fullCaption = cardPopup.querySelector('.full-card__caption');

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


export { createCard };
