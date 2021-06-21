import { createRouter, createWebHistory } from "vue-router";
import { PostList, PostDetails} from "./features/posts";
import { UserList, UserDetails } from "./features/users";
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
  },
  {
    path: "/users",
    name: "Users",
    component: UserList
  },
  {
    path: "/users-list/:id",
    name: "UserList",
    props: (route) => {
      return {
        userId: route.params.id
      };
    },
    component: UserDetails
  }
];

const router = createRouter({
  history: routerHistory,
  routes
});

export default router;
