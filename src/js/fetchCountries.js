const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    return response.json();
  });
}

export default { fetchCountries };

//===================================================================

// function fetchUsers() {
//     return fetch("https://jsonplaceholder.typicode.com/users").then(
//       (response) => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       }
//     );
//   }
