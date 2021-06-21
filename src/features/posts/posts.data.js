import api from "../../infrastructure/api";

export const getPosts = async (id) => {
    if (id) {
      return await api.get(`posts/${id}`);
    }

    return await api.get("posts")
      .catch(e => console.log("Error fetching posts", e));
}