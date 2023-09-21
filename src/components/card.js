import { openFullCard, cardPopup, cardsElements, userId } from "../index.js";
import { addLike, deleteCard, deleteLike } from "./api.js";

import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardName, cardLink, cardLikeCount, _id, owner) {
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


    if (owner._id !== userId) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', () => {
            deleteCard(_id)
                .then(() => cardElement.remove())
                .catch(console.error);
            // const cardClosest = evt.target.closest('.card');
            // cardClosest._idremove();
        }
        );
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
                cardLikeCount = res.likes.length || '';
                likeButton.classList.remove('card__like_active');
            })
            .catch(console.error);
    }

    //прописать логику чтобы отображалось что именно я поставила лайк 
    // для этого нужно передать в функцию массив с лайками и прописать условие
    // в котором я спрашиваю содержит ли этот массив мой лайк. 
    // это нужно для того чтобы отображалось сердечко когда я ставлю лайк и после перезагрузки страницы


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

export { createCard, addCardElement };

