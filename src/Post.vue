<script>
import { defineComponent } from "vue";
import { useQuery } from "vue-query";
import api from "./api";

const fetcher = async (id) =>
  await api.get(`posts/${id}`);

export default defineComponent({
  name: "Post",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  emits: ["setPostId"],
  setup(props) {
    const { isLoading, isError, isFetching, data, error } = useQuery(
      ["post", props.postId],
      () => fetcher(props.postId)
    );

    return { isLoading, isError, isFetching, data, error };
  },
});
</script>

<template>
  <h1>Post {{ postId }}</h1>
  <a @click="$emit('setPostId', -1)" href="#"> Back </a>
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
