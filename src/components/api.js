
//делаем запрос к серверу
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-12',
    headers: {
        authorization: '5970e7b5-fad8-4b45-bc23-ee4a5f3f9441',
        'Content-type': 'application.json'
    }
};

//загрузка данных профиля с сервера
function getDataProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}


//делаем запрос других карточек
function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

//редактирование профиля
function editProfile(profileData) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: ' 5970e7b5-fad8-4b45-bc23-ee4a5f3f9441',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: profileData.name,
            about: profileData.about
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//ставим лайк
function addLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
};

//удаляем лайк
function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//меняем аватар
function newAvatar(link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar:
                link
        }),
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//добавляем свою карточку
function addNewCard(newCard) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link,
        }),
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//удаляем свою карточку
function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

export { getDataProfile, getInitialCards, editProfile, addLike, deleteLike, newAvatar, addNewCard, deleteCard };
