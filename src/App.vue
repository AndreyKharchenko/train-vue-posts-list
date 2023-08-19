<template>
  <v-app>
    <v-main class="main">
      <PostsList/>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import PostsList from './components/Posts/PostsList.vue'

export default defineComponent({
  name: 'App',

  components: {
    PostsList,
  },

  data: () => ({
    //
  }),
})
</script>

<style>
#app .main {
  background-color: aliceblue;
}
</style>
