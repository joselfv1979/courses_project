<!-- MENÚ CON NAVEGADOR -->
<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div>
        <a href="#" class="navbar-brand">JoseGithub</a>
      </div>
      <ul class="navbar-nav">
        <li>
          <router-link class="nav-link" :to="{ name: 'Home' }"
            >Courses</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav" v-if="isAdmin">
        <li>
          <router-link class="nav-link" :to="{ name: 'AddCourse' }"
            >Add Course</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav" v-if="isAdmin">
        <li>
          <router-link class="nav-link" :to="{ name: 'Users' }"
            >Users</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav" v-if="isUser">
        <li>
          <router-link class="nav-link" :to="{ name: 'MyCourses' }"
            >My Courses</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav" v-if="!logged">
        <li>
          <router-link class="nav-link" :to="{ name: 'Registration' }"
            >Registration</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav">
        <li>
          <router-link class="nav-link" :to="{ name: 'About' }"
            >About</router-link
          >
        </li>
      </ul>
      <ul
        class="navbar-nav navbar-collapse justify-content-end"
        v-if="logged"
      >
        <li class="nav-username">Hello, {{ username }}</li>
        <li @click="logout()">
          <router-link class="nav-link" :to="{ name: 'Home' }"
            >Logout</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav navbar-collapse justify-content-end" v-else>
        <li>
          <router-link class="nav-link" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "MenuCustom",

  computed: {
    isAdmin() {
      return this.role === "ROLE_ADMIN";
    },
    isUser() {
      return this.role === "ROLE_USER";
    },
  },
  props: {
    username: String,
    logged: Boolean,
    role: String,
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
}

.nav-username {
  color: white;
}
</style>