'use strict';
window.addEventListener('DOMContentLoaded', () => {
const listMovies = document.getElementById('listMovies'),
      content = document.querySelector('.content'),
      title = document.getElementById('title');

// Отрисовка данных
const render = (data, elem) => {
  content.innerHTML = '';
  data.map(hero => {
    if(elem) {
      for(let index in hero.movies) {
        if(hero.movies[index] === elem.textContent) {   
          title.textContent = hero.movies[index];   
          createCard(hero);
        }
      }
    } else {
      createCard(hero);
    }
  });
}, 

  // Отрисовка меню
  createListMenu = (data) => {
    let moviesName = [];
    data.map(hero => {
      for(let index in hero.movies) {
        moviesName.push(hero.movies[index]);
      }
    });
    moviesName = new Set(moviesName);
    moviesName.forEach((item, i) => {
      let li = document.createElement('li');
      li.textContent = item;
      listMovies.append(li);
    });
  },

  // Создание списка фильмов в карточке героя
  createListMovies = data => {
    let movies = '';
    for (let i in data.movies) {
      movies += `<li>${data.movies[i]}</li>`;
    }
    return movies;
  },

  // Создание карточки
  createCard = (data) => {
    data.realName ? data.realName : data.realName = 'Нет данных';
    let card = `<div class="panel card">
                  <div class="card__photo">
                    <img src="./db/${data.photo}" alt="${data.name}">
                  </div>
                  <div class="card__info">
                    <span class="info__group--nick">${data.name}</span>
                    <div class="info__group info__group--name">
                      <span class="info__key">Настоящее имя</span>
                      <span class="info__value">${data.realName}</span>
                    </div>
                    <div class="info__group info__group--status">
                      <span class="info__key">Статус</span>
                      <span class="info__value">${data.status}</span>
                    </div>
                    <div class="info__group info__group--films">
                      <span class="info__value">Список фильмов</span>
                      <ul class="info__list">
                      ${createListMovies(data)}
                      </ul>
                    </div>
                  </div>
                </div>`
    content.insertAdjacentHTML('beforeend', card);
  };

// Получение данных
const getData = () => {
  fetch('./db/dbHeroes.json')
    .then((response) => {
      if(response.status !== 200){
        throw new Error('Status network not 200.');
      }
      return response.json();
    })
    .then((data) => {
      createListMenu(data);
      listMovies.addEventListener('click', (event) => {
        let target = event.target;
        listMovies.querySelectorAll('li').forEach(item => item.classList.remove('active'));
        target.classList.add('active');
        if(target.tagName === 'LI') {
          render(data, target);
        }
      });
      render(data);
    })
    .catch((error) => console.log(error));
};

getData();

});