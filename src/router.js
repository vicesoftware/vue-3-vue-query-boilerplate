import { createRouter, createWebHistory } from "vue-router";
import Posts from "./Posts.vue";
import Post from "./Post.vue";
import About from "./About.vue";

const routerHistory = createWebHistory();

const routes = [
  {
    path: "/",
    name: "Posts",
    component: Posts
  },
  {
    path: "/posts/:id",
    name: "Post",
    props: (route) => {
      return {
        postId: route.params.id
      };
    },
    component: Post
  },
  {
    path: "/about",
    name: "About",
    component: About
  }
];

const router = createRouter({
  history: routerHistory,
  routes
});

export default router;
