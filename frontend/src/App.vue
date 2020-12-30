<!-- COMPONENTE PRINCIPAL DE LA APLICACIÓN -->
<template>
  <div id="app">
    <header>
      <menucustom
        @logout="logoutUser"
        :username="username"
        :logged="logged"
        :role="role"
      />
    </header>
    <main>
      <router-view
        @login="doLogin"
        @requestCourse="addCourseToUser"
        :userCourses="userCourses"
        :role="role"
        :logged="logged"
      />
    </main>
    <footer>
      <footercustom />
    </footer>
  </div>
</template>

<script>
import UserDataService from "@/service/UserDataService";
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "App",
  components: {
    menucustom,
    footercustom,
  },
  data() {
    return {
      username: "",
      logged: false,
      role: "",
      userCourses: [],
    };
  },
  // FUNCIONES
  methods: {
    // INICIALIZACIÓN DE VARIABLES GOLBALES
    doLogin(result) {
      localStorage.clear();
      this.username = result.username;
      this.role = result.roles[0];
      this.userCourses = result.courses;
      this.logged = true;
      UserDataService.storeUserData(result);
    },
    // RECUPERA DATOS ALMACENADOS EN LOCALSTORAGE
    getUserSettings() {
      this.username = localStorage.getItem("name");
      if (this.username) this.logged = true;
      this.role = localStorage.getItem("role");
      this.userCourses = JSON.parse(localStorage.getItem("userCourses"));
    },
    // AÑADE UN CURSO A UN USUARIO
    addCourseToUser(course) {
      this.userCourses.push(course);
      localStorage.setItem("userCourses", JSON.stringify(this.userCourses));
    },
    // VACIAR LOS DATOS DEL USUARIO AL DESLOGUEARSE
    logoutUser() {
      this.username = "";
      this.role = "";
      this.logged = false;
      this.userCourses = [];
      localStorage.clear();
    },
  },
  created() {
    this.getUserSettings();
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
}

header {
  height: 15vh;
}

main {
  min-height: 75vh;
  display: flex;
}

footer {
  height: 10vh;
}

</style>
