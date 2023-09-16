

function handleClickOnOverlay(popup, evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
    }
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('mousedown', function (evt) {
        handleClickOnOverlay(popup, evt);
    });

}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener('mousedown', function (evt) {
        handleClickOnOverlay(popup, evt);
    });
}

export { handleClickOnOverlay, openPopup, closePopup };
