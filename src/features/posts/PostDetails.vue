<script>
import { defineComponent } from "vue";
import { useQuery } from "vue-query";
import { getPosts } from "./posts.data";

export default defineComponent({
  name: "PostDetails",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { isLoading, isError, isFetching, data, error } = useQuery(
      ["post", props.postId],
      () => getPosts({ id: props.postId})
    );

    return { isLoading, isError, isFetching, data, error };
  },
});
</script>

<template>
  <h1>Post {{ postId }}</h1>
  <router-link
            :to="{ name: 'Posts'}"
            >Back</router-link
          >
  <div v-if="isLoading" class="update">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <h1>{{ data.title }}</h1>
    <div>
      <p>{{ data.body }}</p>
    </div>
    <div v-if="isFetching" class="update">Background Updating...</div>
  </div>
</template>

<style scoped>
.update {
  font-weight: bold;
  color: green;
}
</style>
