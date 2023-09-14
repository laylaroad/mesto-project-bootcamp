//делаем запрос к серверу
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wfb-cohort12/cards',
    headers: {
        authorization: '5970e7b5-fad8-4b45-bc23-ee4a5f3f9441',
        'Content-type': 'application.json'
    }
};



//загрузка карточек с сервера
fetch('https://nomoreparties.co/v1/cohortId/users/me', {
    method: 'PATCH',
    headers: {
        authorization: '5970e7b5-fad8-4b45-bc23-ee4a5f3f9441',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist',
    })
});
