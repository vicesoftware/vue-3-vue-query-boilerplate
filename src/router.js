import { createRouter, createWebHistory } from "vue-router";
import { PostList, PostDetails} from "./features/posts";
import { About } from "./features/about";

const routerHistory = createWebHistory();

const routes = [
  {
    path: "/",
    name: "Posts",
    component: PostList
  },
  {
    path: "/posts/:id",
    name: "Post",
    props: (route) => {
      return {
        postId: route.params.id
      };
    },
    component: PostDetails
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
