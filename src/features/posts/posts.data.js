import api from "/src/infrastructure/api.js";

export const getPosts = async ({id, userid} = {}) => {
  let url = 'posts'

  if (id) {
    url =  url + `/${id}`;
  } 

  if (userid) {
      url = url + `?userId=${userid}`;
  }

  return await api.get(url)
    .catch(e => console.log("Error fetching posts", e));
}