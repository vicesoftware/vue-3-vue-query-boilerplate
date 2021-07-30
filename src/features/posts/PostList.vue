<script>
import { defineComponent, toRefs, watch, computed, reactive } from "vue";
import { useQuery } from "vue-query";
import { useRouter } from "vue-router";
import { getPosts } from "./posts.data";
import { getUsers } from "../users";

export default defineComponent({
  name: "PostsList",
  setup() {
    // See details about ref and reactive here: https://www.thisdot.co/blog/vue-3-composition-api-ref-and-reactive
    const router = useRouter();

    const data = reactive({
      postsKey: ['posts'],
      selectedUserId: undefined,
      isLoading: computed(
        () => postsQuery.isLoading || usersQuery.isLoading
      ),
      isError: computed(
        () => postsQuery.isError || usersQuery.isError
      ),
      error: computed(
         () => data.isError ? (postsQuery.error || usersQuery.error) : ""
      ),
      hasData: computed( 
        () => !!postsQuery.data && !!usersQuery.data
      ),
      posts: computed(
        () => postsQuery && postsQuery.data
      ),
      users: computed( 
        () => usersQuery && usersQuery.data
      ), 
      selectedUser: computed(
        () => router?.currentRoute?.value?.query?.username
      )
    });

    // const postsKey = reactive();
    // const selectedUserId = ref(undefined);

    // const usersQuery = reactive(useQuery("users", () => getUsers()));
    // const postsQuery = reactive(useQuery(postsKey ,() => 
    //   getPosts({userid: selectedUserId.value})
    // ));

    const usersQuery = reactive(useQuery("users", () => getUsers()));
    const postsQuery = reactive(useQuery(data.postsKey ,() => 
      getPosts({userid: data.selectedUserId})
    ));

    const loadData = () => {
       if (data.selectedUser && data.users) {
        data.selectedUserId = data.users.find(user => user.username === data.selectedUser).id;
        const userQuery = `userId=${data.selectedUserId}`;
        set(postsKey, 1, userQuery)
      }
    }

    const changeItem = ($event) => {
      router.push({ name: 'Posts', query: { username: $event.target.value }});
    }

    watch(router.currentRoute, loadData, { immediate:true })

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
