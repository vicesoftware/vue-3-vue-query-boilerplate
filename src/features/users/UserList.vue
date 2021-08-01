<script>
import { defineComponent, toRefs, reactive, ref } from "vue";
import { useQuery } from "vue-query";
import { getUsers } from "./users.data";
// import { UserDetails } from "./UserDetails.vue";

export default defineComponent({
  name: "UsersList",
  setup() {
    const state = reactive({
      selectedUserId: 0,
      userQuery: null
    })
    state.userQuery = ref(useQuery(
      "users",
      () => getUsers()
    ));

    console.log(state.userQuery);

    return { ...toRefs(state)  };
  },
});
</script>

<template>
  <h1>Users</h1>
  <div>Selected User Id: {{selectedUserId}}</div>
  <div v-if="userQuery?.isLoading">Loading...</div>
  <!-- <div v-else-if="userQuery?.isError">An error has occurred: {{ userQuery?.error }}</div> -->
  <div v-else-if="userQuery?.data">
    <select v-model="selectedUserId">
      <option disabled value="0">Select user</option>
      <option v-for="item in userQuery.data" :value="item.id" :key="item.id">
        {{ item.username }}
      </option>
    </select>
  </div>
</template>

<style scoped>
</style>
