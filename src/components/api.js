
import { request, config } from "./utils.js";

//загрузка данных профиля с сервера
function getDataProfile() {
    return request(`${config.url}/users/me`, {
        headers: config.headers,
    })
}

//запрос других карточек
function getInitialCards() {
    return request(`${config.url}/cards`, {
        headers: config.headers,
    })
}

//редактирование профиля
function editProfile(name, about) {
    return request(`${config.url}/users/me`, {
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
    return request(`${config.url}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    })
};

//удаляем лайк
function deleteLike(id) {
    return request(`${config.url}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
};

//меняем аватар
function newAvatar(link) {
    return request(`${config.url}/users/me/avatar`, {
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
    return request(`${config.url}/cards`, {
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
    return request(`${config.url}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
};

export { getDataProfile, getInitialCards, editProfile, addLike, deleteLike, newAvatar, addNewCard, deleteCard };
