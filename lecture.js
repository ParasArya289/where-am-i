///////// OLD AJAX XML CALL //////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     let pop;
//     if (+data.population > 1000000000) {
//         pop = `${(+data.population / (1000000000)).toFixed(1)}B`;
//     }
//     else if (+data.population > 1000000) {
//         pop = `${(+data.population / (1000000)).toFixed(1)}M`;
//     }
//     else if (+data.population > 1000) {
//         pop = `${(+data.population / (1000)).toFixed(1)}`;
//     }
//     else{
//         pop = data.population;
//     }
//     console.log(pop);

//     const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${pop}</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>
//         `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('russia');
// getCountryData('portugal');
// getCountryData('bharat');
// getCountryData('brazil');

/////////////////////////////////////////////////////////////////

///////// REQUEST AFTER REQUEST IN OLD AJAX XML ////////
// const getCountryAndNeighbourData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   //AJAX call country 1
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //render country1
//     renderData(data);

//     //get country 2
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       renderData(data2, 'neighbour');
//     });
//   });
// };
// getCountryAndNeighbourData('russia');
// const getCountryData = function (country) {
//   // country 1
//   fetch(`https:restcountries.com/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderData(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       //   country2
//       return fetch(`https:restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderData(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} ERR`);
//       renderError(`Something went wrong ${err.message}.Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('bharat');
// });

/////// Event loop in practice ////////

// console.log('------Test Start-----'); //1
// setTimeout(() => console.log(`O sec timer`), 0); //3
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); //4
// Promise.resolve('Resolved Promise 2').then(res => {
//   for (let i = 0; i < 1000000; i++) {}
//   console.log(res);
// }); //5
// console.log(`--------Test End-------`); //2

//both logs will executed first as they are syncronous tasks, then Promise which is told to be resolved immediely will execute as Promises takes place in MICRO-TASK QUEUE which has priority over CALLBACK QUEUE ,hence setTimeout() finish last.

//// Building a simple promise ////

// const lotteryPromise = new Promise(function (resolve, reject) {
//     console.log('Your lottery draw is happening');
//       setTimeout(function () {
//         if (Math.random() >= 0.5) {
//           resolve('You Win');
//         } else {
//           reject(new Error('You Lost'));
//         }
//       }, 2000);
//     });
    
//     lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
    
//     const wait = function(seconds){
//         return new Promise(function(resolve){
//             setTimeout(resolve,seconds *1000);
//         })
//     }
//     wait(2).then(() => {
//         console.log('I waited 2 sec');
//         return wait(1);
//     }).then(()=> console.log('I waited for 1 sec'))
    
//     Promise.resolve('abc').then(res => console.log(res));
//     Promise.reject(new Error('abc')).catch(res => console.log(res))
//////// MODERN WAY OF REQUESTING: PROMISES ////////

const getJSON = function (url, errorMsg = '') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
    });
  };
  const getCountryData = function (country) {
    // country 1
    getJSON(`https:restcountries.com/v2/name/${country}`, 'Country not found')
      .then(data => {
        renderData(data[0]);
        const neighbour = data[0].borders;
  
        if (!neighbour) throw new Error('Neighbour country not found');
        //   country2
        return getJSON(
          `https:restcountries.com/v2/alpha/${neighbour[0]}`,
          'country not found'
        );
      })
      .then(data => renderData(data, 'neighbour'))
      .catch(err => {
        console.error(`${err} ERR`);
        renderError(`${err.message}`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };
  
  // getCountryData('');
  // btn.addEventListener('click', function () {
  //   getCountryData('bharat');
  // });
//////// codding challange ////////

// const wait = function (seconds) {
//     return new Promise(function (resolve) {
//       setTimeout(resolve, seconds * 1000);
//     });
//   };
  
//   const imgContainer = document.querySelector('.images');
  
//   const createImage = function (imgPath) {
//     return new Promise(function (resolve, reject) {
//       const img = document.createElement('img');
//       img.src = imgPath;
//       img.addEventListener('load', function () {
//         imgContainer.append(img);
//         resolve(img);
//       });
//       img.addEventListener('error', function () {
//         reject(new Error('Image not found'));
//       });
//     });
//   };
  
//   let currentImg;
//   createImage('img/img-1.jpg')
//     .then(img => {
//         currentImg = img;
//       console.log('image 1 loaded');
//       return wait(2)
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//         return createImage('img/img-2.jpg')
//     })
//     .then(img => {
//       currentImg = img;
//       console.log('image 2 loaded');
//       return wait(2)
//     })
//     .then(()=>{
//       currentImg.style.display = 'none';
//       return createImage('img/img-3.jpg')
//     })
//     .then(img => {
//         currentImg = img;
//         console.log('image 3 loaded');
//         return wait(2)
//     }).then(()=>{
//         currentImg.style.display = 'none';
//     })
//     .catch(err => console.error(err));
  
  //////////////////////////////////////////

  //// codding challange//////
const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };
  
  const imgContainer = document.querySelector('.images');
  
  const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = imgPath;
      img.addEventListener('load', function () {
        imgContainer.append(img);
        resolve(img);
      });
      img.addEventListener('error', function () {
        reject(new Error('Image not found'));
      });
    });
  };
  
  //part1
  const loadNpause = async function () {
    try {
      //img1
      let img2 = await createImage('img/img-1.jpg');
      console.log('load img 1');
      await wait(2);
      img2.style.display = 'none';
  
      //img2
      img2 = await createImage('img/img-2.jpg');
      console.log('load img 2');
      await wait(2);
      img2.style.display = 'none';
  
      //img3
      img2 = await createImage('img/img-3.jpg');
      console.log('load img 3');
      await wait(2);
      img2.style.display = 'none';
    } catch (err) {
      console.log(err);
    }
  };
  // loadNpause();
  
  //part2
  const loadAll = async function(imgArr){
      try{
          const imgs = imgArr.map(async img => await createImage(img))
          const imageEl = await Promise.all(imgs);
          console.log(imageEl);
          imageEl.forEach(img => img.classList.add('parallel'))
      }catch(err){
          console.log(err);
      }
  }
  loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

  
//////////Promise.race///////

// (async function () {
//   const race = await Promise.race([
//     getJSON(`https:restcountries.com/v2/name/bharat`),
//     getJSON(`https:restcountries.com/v2/name/portugal`),
//     getJSON(`https:restcountries.com/v2/name/pakistan`),
//   ]);
//   console.log(race[0]);
// })();

/////////////////////////////////////
// Promise.any([
//     Promise.resolve('succes'),
//     Promise.reject('succes'),
//     Promise.resolve('succes'),
// ]).then(res => console.log(res))
// .catch(err => console.log(err))

/////// Promise.all ////////
const get3Countries = async function (c1, c2, c3) {
    try {
      // const [data1] = await getJSON(`https:restcountries.com/v2/name/${c1}`);
      // const [data2] = await getJSON(`https:restcountries.com/v2/name/${c2}`);
      // const [data3] = await getJSON(`https:restcountries.com/v2/name/${c3}`);
      // console.log([data1.capital, data2.capital, data3.capital]);
  
      //using Promise.all because it will save time and load all request parallely.This function is known as combinator function.It will short circuit if any of the request is rejected.
  
      const data = await Promise.all([
        getJSON(`https:restcountries.com/v2/name/${c1}`),
        getJSON(`https:restcountries.com/v2/name/${c2}`),
        getJSON(`https:restcountries.com/v2/name/${c3}`),
      ]);
      console.log(data.map(d => d[0].capital));
    } catch (err) {
      console.log(err);
    }
  };
  // get3Countries('portugal', 'bharat', 'china');
    
  /////// codding challange ///////


const getPostion = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  // getPostion().then(pos => console.log(pos))

// const whereAmI = function () {
//     getPostion().then(pos => {
//         const {latitude:lat,longitude:lng} = pos.coords;
//         console.log(lat,lng);
//         return fetch(`https://geocode.xyz/${52.508},${13.381}?geoit=json`)
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem in geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       getCountryData(data.country);
//     })
//     .catch(err => console.error(`ERROR: ${err.message}`));
// };

// btn.addEventListener('click', whereAmI);