export function fetchCountry(country) {
  const BASE_URL = `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`;
  // 'https://restcountries.com/v3.1/name/canada?fields=name,capital,population,flags,languages';
  // 'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages';
  return fetch(BASE_URL).then(response => {
    console.log(response);
    if (!response) {
      throw new error(response.statusText);
    }
    return response.json();
  });
}
