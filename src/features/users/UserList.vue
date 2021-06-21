<script>
import { defineComponent } from "vue";
import { useQuery } from "vue-query";
import { getUsers } from "./users.data";

export default defineComponent({
  name: "UsersList",
  setup() {
    const { isLoading, isError, isFetching, data, error, refetch } = useQuery(
      "users",
      () => getUsers()
    );

    return { isLoading, isError, isFetching, data, error, refetch };
  },
});
</script>

<template>
  <h1>Users</h1>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="item in data" :key="item.id">
        <router-link
            :to="{ name: 'UserList', params: { id: item.id } }"
            >{{item.username}}</router-link
          >
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
