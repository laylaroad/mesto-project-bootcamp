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
];

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const closePopupButton = document.querySelector('.popup__close');
const closePopupNewPlaceButton = document.querySelector('#add-new-place-close-button');
const popupElement = document.querySelector('.popup');

const editPopup = document.getElementById('edit-profile-window');
const newItemPopup = document.getElementById('add-new-place-window');

const openCardPopup = document.getElementById('full-card');

const cards = document.querySelectorAll('.card');
const addNewPlaceSubmitButton = document.getElementById('new-place-save-button');

setupCards();

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

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
    closePopup(newItemPopup)
})

const openCardButton = document.querySelectorAll('.card__image');
openCardButton.forEach((card__image) => {
    card__image.addEventListener('click', function () {
        openPopup(openCardPopup);
    })
});

const openCardCloseButton = document.getElementById('card-full-close-button');
openCardCloseButton.addEventListener('click', function () {
    closePopup(openCardPopup);
})


function openFullCard(cardLink, cardName) {
    openPopup(openCardPopup);
    const fullImage = openCardPopup.querySelector('.full-card__image');
    const fullCaption = openCardPopup.querySelector('.full-card__caption');
    fullImage.src = cardLink;
    fullImage.alt = cardName;
    fullCaption.textContent = cardName;
    closePopup(openCardPopup);
}

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
    document.querySelector('.cards').prepend(cardElement);
    return cardElement;
}

function setupCards() {
    initialCards.forEach(({ name, link }) => {
        createCard(name, link);
    });
}


function handleNewPlaceFormSubmit(event) {
    event.preventDefault();
    const placeName = document.querySelector('#new-place-name');
    const placeLink = document.querySelector('#new-place-link');

    createCard(placeName.value, placeLink.value);
    closePopup(newItemPopup);
    placeName.value = '';
    placeLink.value = '';
}
newItemPopup.addEventListener('submit', handleNewPlaceFormSubmit);


const editProfileForm = document.querySelector('#popup-edit-profile');
const profileText = document.querySelector('.profile__text');
const editProfileSubmitButton = document.querySelector('#edit-profile-button');

function handleEditProfileFormSubmit(event) {
    event.preventDefault();
    const nameInput = document.querySelector('#name');
    const jobInput = document.querySelector('#job');
    profileText.querySelector('.profile__title').textContent = nameInput.value;
    profileText.querySelector('.profile__subtitle').textContent = jobInput.value;

    closePopup(editPopup);
    nameInput.value = '';
    jobInput.value = '';
}
editPopup.addEventListener('submit', handleEditProfileFormSubmit);
