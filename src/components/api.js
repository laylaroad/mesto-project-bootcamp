
//делаем запрос к серверу

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-12',
    headers: {
        authorization: '5970e7b5-fad8-4b45-bc23-ee4a5f3f9441',
        'Content-Type': 'application/json',
    },
};

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

function request(endpoint, options) {
    return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse);
}


//загрузка данных профиля с сервера
function getDataProfile() {
    return request(`/users/me`, {
        headers: config.headers,
    })
}


//делаем запрос других карточек
function getInitialCards() {
    return request(`/cards`, {
        headers: config.headers,
    })
}

//редактирование профиля
function editProfile(name, about) {
    return request(`/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        }),
    })
};

//ставим лайк
function addLike(id) {
    return request(`/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    })
};

//удаляем лайк
function deleteLike(id) {
    return request(`/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
};

//меняем аватар
function newAvatar(link) {
    return request(`/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar:
                link
        }),
    })
}

//добавляем свою карточку
function addNewCard(name, link) {
    return request(`/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
}

//удаляем свою карточку
function deleteCard(id) {
    return request(`/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
};

export { getDataProfile, getInitialCards, editProfile, addLike, deleteLike, newAvatar, addNewCard, deleteCard };
