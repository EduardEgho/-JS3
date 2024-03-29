
const URL = 'https://jsonplaceholder.typicode.com/posts';
const personsBlock = document.querySelector('.container_cards');

const photoImg = 'https://cbgd.ask.fm/da3/7b360/4e76/4a3a/a6b0/a9890cb79290/original/390070.jpg'

const createCard = (post) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = post.title;

    const body = document.createElement('p');
    body.textContent = post.body;

    const image = document.createElement('img');
    image.src = `${photoImg}`



    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(body);

    return card;
};

const fetchDataAndRenderCards = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        data.forEach((post) => {
            const card = createCard(post);
            personsBlock.append(card);
        });
    } catch (error) {
        console.error(error);
    }
};

fetchDataAndRenderCards();






















