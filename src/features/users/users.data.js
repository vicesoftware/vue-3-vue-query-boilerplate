import api from "../../infrastructure/api";

export const getUsers = async ({id, username} = {}) => {
    let url = 'users'

    if (id) {
      url =  url + `/${id}`;
    } 

    if (username) {
      url = url + `?username=${this.selectedUser}`;
    }

    return await api.get("users")
      .catch(e => console.log("Error fetching posts", e));
}
