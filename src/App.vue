<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import { useQueryProvider } from "vue-query";
import { VueQueryDevTools } from "vue-query/devtools";

import Posts from "./Posts.vue";
import Post from "./Post.vue";

export default defineComponent({
  name: "App",
  components: { Posts, Post, VueQueryDevTools },
  setup() {
    useQueryProvider();

    const visitedPosts = ref(new Set());
    const isVisited = (id: number) => visitedPosts.value.has(id);

    const postId = ref(-1);
    const setPostId = (id: number) => {
      visitedPosts.value.add(id);
      postId.value = id;
    };

    return {
      isVisited,
      postId,
      setPostId,
    };
  },
});
</script>

<template>
  <div class="app">
    <div class="nav">
      <router-link to="/">Posts</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view></router-view>
  </div>
  <!-- <Post
    v-if="postId > -1"
    :postId="postId"
    :style="{}"
    @setPostId="setPostId"
  />
  <Posts v-else :isVisited="isVisited" @setPostId="setPostId" /> -->
  <VueQueryDevTools :initialIsOpen="true" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav {
  display: flex;
  justify-content: space-around;
}
</style>
