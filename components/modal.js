function handleClickOnOverlay(popup, evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }
    });
    document.addEventListener('mousedown', function (evt) {
        handleClickOnOverlay(popup, evt);
    });

}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }
    });
    document.removeEventListener('mousedown', function (evt) {
        handleClickOnOverlay(popup, evt);
    });
}

export { handleClickOnOverlay, openPopup, closePopup };
