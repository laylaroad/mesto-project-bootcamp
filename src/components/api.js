//делаем запрос к серверу
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wfb-cohort12/cards',
    headers: {
        authorization: '5970e7b5-fad8-4b45-bc23-ee4a5f3f9441',
        'Content-type': 'application.json'
    }
};

//удаляем лайк
const deleteLike = (id) => {
    return request(`${api.config.baseUrl}/ cards/${id}`, {
        method: 'DELETE',
        headers: api.config.headers,
    });
};

//ставим лайк
const putLike = (id) => {
    return request(`${api.config.baseUrl}/ cards/${id}`, {
        method: 'PUT',
        headers: api.config.headers,
    });
};


const newAvatar = (avatar) => {
    return request(`${api.config.baseUrl}/avatar/${id}`), {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar,
        }),
    }
};

