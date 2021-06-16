<script>
import { defineComponent } from "vue";
import { useQuery } from "vue-query";
import api from "./api";

const fetcher = async () => {
  return await api.get("posts")
    .catch(e => console.log("Error fetching posts", e));
}

export default defineComponent({
  name: "Posts",
  props: {
    isVisited: {
      type: Function,
      required: true,
    },
  },
  emits: ["setPostId"],
  setup() {
    const { isLoading, isError, isFetching, data, error, refetch } = useQuery(
      "posts",
      fetcher
    );

    return { isLoading, isError, isFetching, data, error, refetch };
  },
});
</script>

<template>
  <h1>Posts</h1>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="item in data" :key="item.id">
        <a
          @click="$emit('setPostId', item.id)"
          href="#"
          :class="{ visited: isVisited(item.id) }"
          >{{ item.title }}</a
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
