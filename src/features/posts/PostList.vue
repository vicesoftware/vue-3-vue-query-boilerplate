<script>
import { defineComponent, reactive, toRefs, watch, computed } from "vue";
import { useQuery, useQueryClient } from "vue-query";
import { useRouter } from "vue-router";
import { getPosts } from "./posts.data";
import { getUsers } from "../users";

export default defineComponent({
  name: "PostsList",
  setup() {
    const router = useRouter();

    const data = reactive({
      router: {},
      dataRequested: false,
      postsQuery: {},
      usersQuery: {},
      isLoading: computed(
        () => !data.dataRequested || (data.postsQuery.isLoading || data.usersQuery.isLoading)
      ),
      isError: computed(
        () => data.postsQuery.isError || data.usersQuery.isError
      ),
      error: computed(
         () => data.isError ? (data?.postsQuery.error || data?.usersQuery.error) : ""
      ),
      hasData: computed( 
        () => !!data.postsQuery.data && !!data.usersQuery.data
      ),
      posts: computed(
        () => data.postsQuery && data.postsQuery.data
      ),
      users: computed( 
        () => data.usersQuery && data.usersQuery.data
      ), 
      selectedUser: computed(
        () => router?.currentRoute?.value?.query?.username
      )
    });

    const queryClient = useQueryClient();

    const loadData = async () => {
      const postsCacheKey = ['posts'];
      let selectedUser;

      if (data.selectedUser) {        
        const users = queryClient.getQueryData("users");

        if (!users) { // we have a selected users but no users in cache
          // do a dependent query
          return;
        }

        console.log(users);
        selectedUser = users.find(user => user.username === data.selectedUser);
        console.log(selectedUser);
        postsCacheKey.push(`userid=${selectedUser.id}`);
      } 

      const postsQuery = useQuery(
        postsCacheKey,
        () => getPosts({userid: selectedUser?.id})
      );

      const usersQuery = useQuery(
        "users",
        () => getUsers()
      );

      const [postsQueryResponse, usersQueryResponse] =  await Promise.all([
        postsQuery, usersQuery]);

      data.dataRequested = true;

      data.postsQuery = postsQueryResponse;
      data.usersQuery = usersQueryResponse;
    }

    const changeItem = ($event) => {
      router.push({ name: 'Posts', query: { username: $event.target.value }});
    }

    watch(router.currentRoute, loadData, { immediate: true })

    return { ...toRefs(data), changeItem };
  }
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
  <div v-else-if="hasData">
    <select v-on:change="changeItem">
      <option disabled value="" selected>Select a user...</option>
      <option v-bind:key="user.id" v-for="user in users" :value="user.username" :label="user.name">
      </option>
    </select>   
    <ul>
      <li v-for="item in posts" :key="item.id">
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
