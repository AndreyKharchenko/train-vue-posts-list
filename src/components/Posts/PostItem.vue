<template>
  <v-card
    class="mx-auto post"
  >
    <v-card-title class="post-title">{{post.title}}</v-card-title>
    <v-card-text>{{post.body}}</v-card-text>
    <v-card-subtitle>{{post.userName.name}}</v-card-subtitle>
  </v-card>
</template>

<script>

import { defineComponent } from 'vue';
export default defineComponent ({
  name: 'PostItem',
  props: {
    post: {
        required: true,
        type: Object 
    }
  },
})
</script>

<style scoped>
.post {
  padding: 10px;
  width: 25vw;
}

.post-title {
  color: #00b0ff;
  white-space: normal;
}

@media screen and ( width < 720px ) {
  .post {
    width: 90vw;
  }
}
</style>