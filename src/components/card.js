import { cardsElements, profileId } from "../index.js";
import { addLike, deleteCard, deleteLike } from "./api.js";

import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector('#card-template').content;
const cardPopup = document.getElementById('full-card');
const fullImage = cardPopup.querySelector('.full-card__image');
const fullCaption = cardPopup.querySelector('.full-card__caption');

function createCard(cardName, cardLink, cardLikes, cardId, owner) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like');
    const likeCounter = cardElement.querySelector('.card__like-amount');
    const deleteButton = cardElement.querySelector('.card__delete');
    const cardLikeCount = cardLikes.length;
    cardImage.src = cardLink;
    cardImage.alt = cardName;
    cardTitle.textContent = cardName;
    likeCounter.textContent = cardLikeCount;

    if (owner._id !== profileId) {
        deleteButton.remove();
    };

    deleteButton.addEventListener('click', () => {
        deleteCard(cardId)
            .then(() => cardElement.remove())
            .catch(() => console.log(err));
    });

    if (cardLikes.some(({ _id }) => _id === profileId)) {
        likeButton.classList.add('card__like_active');
    }

    likeButton.addEventListener('click', () => {
        if (likeButton.classList.contains('card__like_active')) {
            handleLikeDelete(likeButton, likeCounter, cardId);
        } else {
            handleLikeAdd(likeButton, likeCounter, cardId);
        }
    });

    function openFullCard(cardLink, cardName) {
        openPopup(cardPopup);
        fullImage.src = cardLink;
        fullImage.alt = cardName;
        fullCaption.textContent = cardName;
    };
    cardImage.addEventListener('click', () => {
        openFullCard(cardLink, cardName);
    })
    cardImage.addEventListener('click', function () {
        openPopup(cardPopup);
    })

    addCardElement(cardElement);

    return cardElement;
}

function addCardElement(cardElement) {
    cardsElements.prepend(cardElement);
}

const handleLikeAdd = (likeButton, likeCounter, cardId) => {
    addLike(cardId)
        .then((res) => {
            likeButton.classList.add('card__like_active');
            likeCounter.textContent = res.likes.length;
        })
        .catch(console.error);
}

const handleLikeDelete = (likeButton, likeCounter, cardId) => {
    deleteLike(cardId)
        .then((res) => {
            likeButton.classList.remove('card__like_active');
            likeCounter.textContent = res.likes.length;
        })
        .catch(console.error);
}

export { createCard, addCardElement };

