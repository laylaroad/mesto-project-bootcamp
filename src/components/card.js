import { openFullCard, cardPopup, cardsElements, profileId } from "../index.js";
import { addLike, deleteCard, deleteLike } from "./api.js";

import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector('#card-template').content;

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
            handleLikeDelete(likeButton, cardLikeCount, cardId);
        } else {
            handleLikeAmount(likeButton, cardLikeCount, cardId);
        }
    });

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

const handleLikeAmount = (likeButton, cardLikeCount, cardId) => {
    addLike(cardId)
        .then((res) => {
            likeButton.classList.add('card__like_active');
            cardLikeCount = res.likes.length;
        })
        .catch(console.error);
}

const handleLikeDelete = (likeButton, cardLikeCount, cardId) => {
    deleteLike(cardId)
        .then((res) => {
            cardLikeCount = res.likes.length || 0;
            likeButton.classList.remove('card__like_active');
            console.log(res);
        })
        .catch(console.error);
}

export { createCard, addCardElement };

