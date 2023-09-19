import { openFullCard, cardPopup, cardsElements } from "../index.js";
import { addLike, addNewCard, deleteLike } from "./api.js";

import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardName, cardLink, cardLikeCount) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like');
    const likeCounter = cardElement.querySelector('.card__like-amount');
    const deleteButton = cardElement.querySelector('.card__delete');

    cardImage.src = cardLink;
    cardImage.alt = cardName;
    cardTitle.textContent = cardName;
    likeCounter.textContent = cardLikeCount;

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
    addCardElement(cardElement);
    return cardElement;
}

function addCardElement(cardElement) {
    cardsElements.prepend(cardElement);
}

export { createCard, addCardElement };






   // const handleLikeAmount = (likeButton, likeCounter, currentId) => {
    //     addLike(currentId)
    //         .then((res) => {
    //             likeButton.classList.add('card__like_active');
    //             likeCounter.textContent = res.like.length;
    //         })
    //         .catch(console.error);
    // }

    // likeButton.addEventListener('click', () => {
    //     if (likeButton.classList.contains('card__like_active')) {
    //         handleLikeAmount(likeButton, likeCounter, cardElement);
    //     } else {
    //         handleLikeDelete(likeButton, likeCounter, cardElement);
    //     }
    // })

    // const handleLikeDelete = (likeButton, likeCounter, currentId) => {
    //     deleteLike(currentId)
    //         .then((res) => {
    //             likeCounter.textContent = res.likes.length || '';
    //             likeButton.classList.remove('card__like_active');
    //         })
    //         .catch(console.error);
    // }
