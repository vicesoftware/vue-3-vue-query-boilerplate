<script>
import { defineComponent } from "vue";
import { useQuery } from "vue-query";
import { getUsers } from "./users.data";

export default defineComponent({
  name: "UserDetails",
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { isLoading, isError, isFetching, data, error } = useQuery(
      ["user", props.userId],
      () => getUsers(props.userId)
    );

    return { isLoading, isError, isFetching, data, error };
  },
});
</script>

<template>
  <h1>User {{ userId }}</h1>
  <router-link
            :to="{ name: 'Users'}"
            >Back</router-link
          >
  <div v-if="isLoading" class="update">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <h1>{{ data.username }}</h1>
    <div>
      <p>{{ data.name }}</p>
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
