<!-- VISTA DE REGISTRO DE USUARIOS -->
<template>
  <div class="container">
    <h3>Create an account</h3>
    <form>
      <message-component
        v-if="message"
        :message="message"
        :hasSuccess="hasSuccess"
        @close="message = null"
      />
      <div>
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          v-model="user.username"
          @keydown="message = null"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          v-model="user.email"
          @keydown="message = null"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="user.password"
          @keydown="message = null"
          class="form-control"
        />
      </div>
    </form>
    <button class="btn btn-success" @click="validateAndSubmit()">Submit</button>
  </div>
</template>

<script>
import UserDataService from "../service/UserDataService";
import MessageComponent from "../components/MessageComponent";
export default {
  name: "Registration",
  components: {
    MessageComponent,
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      message: null,
      hasSuccess: false,
    };
  },
  // FUNCIONES
  methods: {
    // ENVÍO DE LOS DATOS DE USUARIO A LA FUNCIÓN DE VALIDACIÓN
    validateAndSubmit() {
      try {
        const userData = UserDataService.validateUser(this.user);
        this.register(userData);
      } catch (error) {
        this.message = error.message;
      }
    },
    // PETICIÓN DE REGISTRO DE USUARIO A LA BD
    async register(user) {
      try {
        const result = await UserDataService.createUser(user);
        this.message = "Count created successfully"
        this.hasSuccess = true;
        this.closeMessage()
      } catch (error) {
        error.response
          ? (this.message = error.response.data.message)
          : (this.message = "Couldn't register, try it again later");
      }
    },
    closeMessage() {
      setTimeout(() => {
        this.message = null;
        this.hasSuccess = false;
        this.$router.push({ name: "Login" });
      }, 2000)
    }
  },
};
</script>

<style scoped>
</style>