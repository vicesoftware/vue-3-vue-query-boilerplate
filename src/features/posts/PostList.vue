<script>
import { defineComponent } from "vue";
import VueSelect from "vue-select";
import { useQuery } from "vue-query";
import { getPosts } from "./posts.data";
import { getUsers } from "../users";

export default defineComponent({
  name: "PostsList",
  async created() {
    return await this.loadData();
  },
  data() {
    return {
      dataRequested: false,
      postsQuery: {},
      usersQuery: {},
      selectedUser: {}
    }
  },
  computed: {
    isLoading() {
      return !this.dataRequested || (this.postsQuery.isLoading || this.usersQuery.isLoading);
    },
    isError() {
      return this.postsQuery.isError || this.usersQuery.isError;
    },
    error() {
      return this.isError ? (this.postQuery.error || this.usersQuery.error) : "";
    },
    hasData() {
      return !!this.postsQuery.data && !!this.usersQuery.data;
    },
    posts() {
      return this.postsQuery && this.postsQuery.data;
    },
    users() {
      return this.usersQuery && this.usersQuery.data;
    }
  },
  methods: {
    async loadData() {
      const [postsQuery, usersQuery] =  await Promise.all([
        useQuery(
          "posts",
          () => getPosts()
        ), useQuery(
          "users",
          () => getUsers()
        )]);

      this.dataRequested = true;

      this.postsQuery = postsQuery;
      this.usersQuery = usersQuery;
    }
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
    <div>hi</div>
    <select v-model="selectedUser">
      <option disabled>Select a user...</option>
      <option v-bind:key="user.id" v-for="user in users" :value="user.id" :label="user.name">
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
