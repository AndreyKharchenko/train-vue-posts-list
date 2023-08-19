import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const postsAPI = {
    getPosts() {
        return instance.get('posts');
    }
}

export const usersAPI = {
    getUsers() {
        return instance.get('users');
    }
}