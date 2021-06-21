import api from "../../infrastructure/api";

export const getUsers = async (id) => {
    if (id) {
      return await api.get(`users/${id}`);
    }

    return await api.get("users")
      .catch(e => console.log("Error fetching posts", e));
}
