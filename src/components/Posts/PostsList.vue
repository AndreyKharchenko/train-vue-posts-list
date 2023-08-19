<template>
  <div class="post-list-container">
    <div class="filter-input-container">
      <div class="input">
        <v-text-field
            v-model="searchQuery"
            density="compact"
            variant="solo"
            label="Filter by author..."
            prepend-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:preppend-inner="onClick"
          ></v-text-field>
      </div>
    </div>
    <div class="post-list">
        <PostItem 
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
        />
    </div>
  </div>
</template>

<script>
import {postsAPI, usersAPI} from '@/api/index';
import { computed, defineComponent, onMounted, ref } from 'vue';
import PostItem from './PostItem.vue';
export default defineComponent ({
  components: { PostItem },
  name: 'PostsList',
  setup() {
    const posts = ref([]);
    const users = ref([]);
    const searchQuery = ref('');

    const filteredPosts = computed(() => {
      return posts.value.filter(post => {
        return post.userName.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      })
    })

    const getPosts = async () => {
      try {
        const res = await postsAPI.getPosts();
        return res.data;
      } catch (error) {
        console.error('ERR: getPosts', error);
      }
    }

    const getUsers = async () => {
      try {
        const res = await usersAPI.getUsers();
        users.value = [...res.data];
      } catch (error) {
        console.error('ERR: getUsers', error);
      }
    }

    const initPostList = async () => {
      try {
        await getUsers();
        const data = await getPosts();
        posts.value = data.map(it => {
          it.title = it.title[0].toUpperCase() + it.title.slice(1);
          it.body = it.body[0].toUpperCase() + it.body.slice(1);
          const {name, id} = users.value.find(u => u.id == it.userId);
          it.userName = {name, id};
          return it;
        })
        
      } catch (error) {
        console.error('ERR: init', error);
      }
    }

    

    onMounted(initPostList);

    return {
      posts,
      users,
      searchQuery,
      filteredPosts
    }
  }
  
})
</script>

<style scoped>
.post-list-container {
  box-sizing: border-box;
}

.filter-input-container {
  display: flex;
  justify-content: center;
  align-content: center;
  position: sticky;
  top: 0px;
  background-color: aliceblue;
  z-index: 1;
  margin-bottom: 2rem;
  padding-top: 20px;
}

.input {
  width: 25%;
}

.post-list {
  width: 100vw;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  z-index: -1;
  gap: 10px;
}

@media screen and ( width < 720px ) {
.input {
  width: 80%;
}
}

</style>
