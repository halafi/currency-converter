import fetch from 'node-fetch';

const API_URL = 'https://api.exchangeratesapi.io/latest';

export const getCurrencies = (): Promise<string[]> =>
  fetch(`${API_URL}`)
    .then((res) => res.json())
    .then((response) => Object.keys(response.rates).concat(response.base).sort())
    .catch((err) => {
      // client won't be informed about error for now
      console.error(`[server] ${err}`);
    });

export const getRates = (baseCur: string) => {
  const cur = baseCur.toUpperCase(); // must be
  return fetch(`${API_URL}${cur !== 'EUR' ? `?base=${cur}` : ''}`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(`[server] ${err}`);
    });
};
