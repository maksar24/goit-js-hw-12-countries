import './sass/main.scss';
import debounce from 'lodash.debounce';
import { notice  } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import countryCard from './partials/card_country.hbs';
import countriesList from './partials/list_countries.hbs';
import CountriesApiService from './js/countries_service.js';

const refs = {
    countryContainer: document.querySelector(".country-container"),
    input: document.querySelector(".input-country"),
}

refs.input.addEventListener("input", debounce(onSearch, 500));

function onSearch(e) {
  const name = e.target.value.trim();

  if (e.target.value.length === 0) {
    refs.countryContainer.innerHTML = "";
    return;
    }
    
  fetchRequest(name);
};

function appendDirectionMarkup(el) {
    
    if (el.length === 1) {
        const countryMarkup = countryCard(el);
        refs.countryContainer.innerHTML = countryMarkup;
    } else if (el.length > 10) {
        onNotice();
    } else if (el.length > 1 && el.length <= 10) {
        const countriesMarkup = countriesList(el);
        refs.countryContainer.innerHTML = countriesMarkup;
    };
};

function onNotice() {
    notice({
        title: 'Regular Notice',
        text: 'Please, type more specific query',
        delay: 1000
    });
};

function onError() {
  refs.countryContainer.innerHTML = "";
  const error = document.createElement("h1");
  error.textContent = "Sorry, wrong request. Please try again.";
  refs.countryContainer.appendChild(error);
};

function fetchRequest(name) {
    const apiService = new CountriesApiService({
        address: "https://restcountries.eu/rest/v2/name/",
        query: name,
        onResolved: appendDirectionMarkup,
        onRejected: onError,
    });
    apiService.fetchDescriptionCountry();
};