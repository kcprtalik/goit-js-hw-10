//                                                                  IMOPRT

import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './js/fetchCountries';

//                                                                 VARIABLES

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInput = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');

//                                                                 FUNCTIONS

function inputOn(event) {
  event.preventDefault();

  const textInput = event.target.value.trim();

  if (textInput.length !== 0) {
    API.fetchCountries(textInput).then(createMarkup).catch(Err);
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
}

function createMarkup(country) {
  if (country.length > 10) {
    Notiflix.Notify.info(
      `Too many matches found. Please enter a more specific name.`
    );
  } else if (country.length > 1 && country.length <= 10) {
    countryList.innerHTML = country
      .map(({ name, flags }) => {
        return `
                <li>
                <div>
                <p><img src="${flags.png}" alt="flag" width = 60px height = 30px> ${name.official}</p>
                </div>
                </li>
            `;
      })
      .join('');

    countryInfo.innerHTML = '';
  } else {
    countryInfo.innerHTML = country
      .map(({ name, capital, population, flags, languages }) => {
        return `<img src="${
          flags.png
        }" alt="flag" width=320px height = 150px>
        <h1>${name.official}</h1>
                <p class="infos"><b>Capital:</b> ${capital}</p>
                <p class="infos"><b>Population:</b> ${population}</p>
                <p class="infos"><b>Languages:</b> ${Object.values(
                  languages
                )}</p>`;
      })
      .join('');

    countryList.innerHTML = '';
  }
}

function Err(error) {
  Notiflix.Notify.failure(`Oops, there is no country with that name`);
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

//                                                              EVENT

countryInput.addEventListener('input', debounce(inputOn, DEBOUNCE_DELAY));

//==============================================================

//var debounce = require('lodash.debounce');

//=================================================================

// function renderUserList(users) {
//     const markup = users
//       .map((user) => {
//         return `<li>
//             <p><b>Name</b>: ${user.name}</p>
//             <p><b>Email</b>: ${user.email}</p>
//             <p><b>Company</b>: ${user.company.name}</p>
//           </li>`;
//       })
//       .join("");
//     userList.innerHTML = markup;
//   }
//init