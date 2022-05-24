export const selectMapper = {
  true: (item, id) => item.id === id ? !item.commented : item.commented,
  false: (item, id) => item.id !== id
}

//export const url = 'http://boysthings.top:9999';
export const url = 'http://localhost:9999';

export const getAPI = (path) => fetch(url + '/' + path)
  .then((response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  });

export const postAPI = (path, body) => fetch(url + '/' + path, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
})
  .then((response) => {
    if (response.status >= 200 && response.status <= 299) {
      return;
    } else {
      throw Error(response.statusText);
    }
  });