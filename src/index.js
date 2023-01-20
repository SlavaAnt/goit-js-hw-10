import './css/styles.css';
import { fetchCountry } from './fetchCountries';
import debounce from 'lodash.debounce';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const body = document.querySelector('body');
const input = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

function addInputStyles() {
  input.style.display = 'block';
  input.style.textAlign = 'center';
  input.style.margin = 'auto';
}
addInputStyles();
// -------------------------
input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  body.style.backgroundColor = 'rgb(222, 246, 238';
  const countryName = input.value.trim();

  if (!countryName) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  }

  fetchCountry(countryName)
    .then(countries => {
      if (countries.length > 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        manyMatchesAlert();
      } else if (countries.length === 1) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = onCardMarkup(countries);
      } else {
        countryInfo.innerHTML = '';
        countryList.innerHTML = onListMarkup(countries);
      }
    })
    .catch(wrongNameAlert);
}

function onCardMarkup(country) {
  return country
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<div 
            class='card-country' style="text-align: center; font-size: 24px"> 
            <h2 class='card__title'>Name of country:  ${name.official}</h2>
            <p class='card-text'>Capital: ${capital}</p>
            <p class='card-text'>Population of country: ${population}</p>
            <div class='card-img-box'>
                Flag:
                <img class='card-img' src='${flags.svg}' alt='flag of ${
          name.official
        }' 
                width='40' 
                height = '30'>
            <p class='card-text'>Language(s): ${Object.values(languages)} </p>
            </div>
        `
    )
    .join('');
}

function onListMarkup(countries) {
  return countries
    .map(
      ({ name, flags }) =>
        `<li class="country-item" style="
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        list-style: none;
        margin-left: -40px">
        <p class="country-text" style="
        margin: 5px 0">${name.official}:</p>
        <img src="${flags.svg}" alt="${name.official}" width='32'>
        </li>`
    )
    .join('');
}

function manyMatchesAlert() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function wrongNameAlert() {
  Notify.failure('Oops, there is no country with that name');
}
