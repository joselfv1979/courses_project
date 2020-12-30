<!-- VISTA DE LOGIN DE USUARIOS -->
<template>
  <div class="container">
    <h3>Login</h3>
    <form>
      <message-component
        v-if="message"
        :message="message"
        @close="message = null"
      />
      <div class="form-group">
        Username:
        <input
          type="text"
          name="username"
          v-model="username"
          @keydown="message = null"
          class="form-control"
        />
      </div>
      <div class="form-group">
        Password:
        <input
          type="password"
          name="password"
          v-model="password"
          @keydown="message = null"
          class="form-control"
        />
      </div>
    </form>
    <button @click="validateUserData()" class="btn btn-success">Login</button>
  </div>
</template>
<script>
import UserDataService from "../service/UserDataService";
import MessageComponent from "../components/MessageComponent";

export default {
  name: "Login",
  components: {
    MessageComponent,
  },
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  // FUNICONES:
  methods: {
    // VALIDACIÓN DE CAMPOS RELLENADOS
    validateUserData() {
      if (!this.username) {
        this.message = "Enter your username";
        return;
      } else if (!this.password) {
        this.message = "Enter your password";
        return;
      }
      this.login();
    },
    // PETICIÓN DE LOGIN A LA BD
    async login() {
      try {
        const result = await UserDataService.loginUser({
          username: this.username,
          password: this.password,
        });
        this.$emit("login", result.data);
        this.$router.push({ name: "Home" });
      } catch (error) {
        error.response
          ? (this.message = error.response.data.message)
          : (this.message = "Couldn't get login, try it again later");
      }
    },
  },
};
</script>