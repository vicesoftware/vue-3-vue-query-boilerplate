<script>
import { defineComponent } from "vue";
import { useQuery } from "vue-query";
import { getPosts } from "./data";

export default defineComponent({
  name: "Posts",
  emits: ["setPostId"],
  setup() {
    const { isLoading, isError, isFetching, data, error, refetch } = useQuery(
      "posts",
      () => getPosts()
    );

    return { isLoading, isError, isFetching, data, error, refetch };
  },
});
</script>

<template>
  <h1>Posts</h1>
  <p>
    As you visit the posts below, you will notice them in a loading state the
    first time you load them. However, after you return to this list and click
    on any posts you have already visited again, you will see them load
    instantly and background refresh right before your eyes!
    <strong>
      (You may need to throttle your network speed to simulate longer loading
      sequences)
    </strong>
  </p>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="item in data" :key="item.id">
        <router-link
            :to="{ name: 'Post', params: { id: item.id } }"
            >{{item.title}}</router-link
          >
      </li>
    </ul>
  </div>
</template>

<style scoped>
.visited {
  font-weight: bold;
  color: green;
}
</style>
