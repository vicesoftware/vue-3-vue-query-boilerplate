const apiUrl = url => import.meta.env.VITE_API_URL + url

const fetchWrapper = (url, options = {}) => {
  const defaultOptions = {
    headers: new Headers({'content-type': 'application/json'})
  };

  return fetch(apiUrl(url), {...defaultOptions, ...options})
    .then((response) =>
      response.json()
    )
}

export default {
  get: fetchWrapper
}