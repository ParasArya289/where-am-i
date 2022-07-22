'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderData = function (data, className = '') {
  let pop;
  if (+data.population > 1000000000) {
    pop = `${(+data.population / 1000000000).toFixed(1)}B`;
  } else if (+data.population > 1000000) {
    pop = `${(+data.population / 1000000).toFixed(1)}M`;
  } else if (+data.population > 1000) {
    pop = `${(+data.population / 1000).toFixed(1)}K`;
  } else {
    pop = data.population;
  }
  //   console.log(pop);

  const html = `
      <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${pop}</p>
              <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
              <p class="country__row"><span>🏛</span>${data.capital}</p>
              <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
          </article>
          `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};


const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

//// async await //////
const whereAmI = async function (country) {
  try {
    const res = await fetch(`https:restcountries.com/v2/name/${country}`);
    if (!res.ok) throw new Error('Country Not Found');

    const data = await res.json();
    renderData(data[0]);
    const asyncNeighbour = data[0].borders[0];

    const res2 = await fetch(
      `https:restcountries.com/v2/name/${asyncNeighbour}`
    );
    if (!res.ok) throw new Error('Country Not Found');
    console.log(res2);
    const [data2] = await res2.json();
    renderData(data2, 'neighbour');
  } catch (err) {
    console.log(err);
    renderError(err.message);
  }
};
btn.addEventListener('click', function () {
  whereAmI('bharat');
});



