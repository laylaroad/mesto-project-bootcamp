return fetch('https://nomoreparties.co/v1/wbf-cohort-12/cards', {
    headers: {
        authorization: '5970e7b5-fad8-4b45-bc23-ee4a5f3f9441'
    }
})
    .then(res => res.json())
    .then((result) => {
        console.log(result);
    });
