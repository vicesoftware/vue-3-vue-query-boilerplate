<script>
import { defineComponent, reactive, toRefs } from "vue";
import { useQuery, useQueryClient } from "vue-query";
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
    const state = reactive({
      query: null, cacheData: null
    });

    state.query = reactive(useQuery(
      ["post", props.postId],
      () => getPosts({ id: props.postId})
    ));

    const queryClient = useQueryClient();

    const cache = queryClient.queryCache.find("posts");

    if (cache?.state.data) {
      console.log(cache?.state.data);
      state.cacheData = cache.state.data.find(post => post.id === +props.postId);
      console.log(state.cacheData);
    }

    return { ...toRefs(state) };
  },
});
</script>

<template>
  <h1>Post {{ postId }}</h1>
  <router-link
            :to="{ name: 'Posts'}"
            >Back</router-link
          >
  <div v-if="!cacheData && query.isLoading" class="update">Loading...</div>
  <div v-else-if="query.isError">An error has occurred: {{ error }}</div>
  <div v-else-if="cacheData || query.data">
    <h1>{{ query.data?.title || cacheData.title }}</h1>
    <div>
      <p>{{ query.data?.body || cacheData.body }}</p>
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
