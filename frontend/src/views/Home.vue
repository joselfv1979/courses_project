<!-- LA VISTA HOME RENDERIZA EL BUSCADOR Y EL LISTADO DE CURSOS  -->
<template>
  <div class="container">
    <filter-component @searchCourses="getCoursesList" />
    <div class="table-responsive-sm">
      <loading-component v-if="isLoading" />
      <div v-else-if="!courses.length">Courses not found</div>
      <div v-else>
        <h3>Courses</h3>
        <message-component
          v-if="message"
          :message="message"
          :hasSuccess="hasSuccess"
          @close="message = null"
        />
        <courses-table :courses="courses" v-slot="{ course }">
          <td v-if="isAdmin">
            <button class="btn btn-success" @click="updateCourse(course.id)">
              <pencil-icon />
            </button>
            <button class="btn btn-danger" @click="deleteCourse(course.id)">
              <trash-icon />
            </button>
          </td>
          <td v-else>
            <button
              class="btn btn-outline-success button-user"
              id="button-user"
              disabled
              v-if="checkRequestedCourses(course)"
            >
              Requested
            </button>
            <button
              class="btn btn-success btn-user"
              id="button-user"
              v-else
              @click="requestCourse(course)"
            >
              Request
            </button>
          </td>
        </courses-table>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from "../service/UserDataService";
import CourseDataService from "../service/CourseDataService";
import FilterComponent from "../components/FilterComponent";
import CoursesTable from "../components/CoursesTable";
import LoadingComponent from "../components/LoadingComponent";
import MessageComponent from "../components/MessageComponent";
import PencilIcon from "../components/PencilIcon";
import TrashIcon from "../components/TrashIcon";

export default {
  name: "Home",
  components: {
    FilterComponent,
    CoursesTable,
    LoadingComponent,
    MessageComponent,
    PencilIcon,
    TrashIcon,
  },
  data() {
    return {
      courses: null,
      language: "",
      format: "",
      price: "",
      loading: false,
      message: "",
      hasSuccess: false,
    };
  },
  props: {
    logged: Boolean,
    userCourses: Array,
    role: String,
  },
  computed: {
    isAdmin() {
      return this.role === "ROLE_ADMIN";
    },
    isLoading() {
      return this.courses === null
    }
  },
  // FUNCIONES:
  methods: {
    // OBTENER CURSOS DE LA BD
    async getCoursesList(parameters) {
      try {
        const response = await CourseDataService.retrieveFilteredCourses(
          parameters
        );
        console.log('hh',response);
        this.courses = response.data;
        localStorage.setItem("params", JSON.stringify(parameters));
      } catch (error) {
        this.message = "Couldn't get data, try it again later";
      } 
    },
    // IR A LA VISTA DE ACTUALIZACIÓN DE UN CURSO (ADMNISTRADOR)
    updateCourse(id) {
      this.$router.push({ name: "UpdateCourse", params: { id: `${id}` } });
    },
    // ELIMINAR UN CURSO (ADIMNISTRADOR)
    async deleteCourse(id) {
      if(!confirm('Are you sure to delete?')) return;
      try {
        await CourseDataService.deleteCourse(id);
        this.courses = this.courses.filter(item => item.id !== id)
        this.message = `Delete of course ${id} Successful`;
        this.hasSuccess = true;
        this.closeMessage();
      } catch (error) {
        this.message = "Couldn't delete this course, try it again later";
      }
    },
    // SOLICITAR UN CURSO (USUARIOS LOGUEADOS)
    async requestCourse(course) {
      if (!this.logged) {
        this.$router.push({ name: "Login" });
        return;
      }
      try {
        const userId = localStorage.getItem("userId");
        await UserDataService.addCourseToUser(userId, course);
        this.message = "Request Successful";
        this.hasSuccess = true;
        this.closeMessage();
        this.$emit("requestCourse", course);
      } catch (error) {
        this.message = "Couldn't request this course, try it again later";
      }
    },
    // RECUPERAR LA LISTA DE CURSOS
    refreshCoursesList() {
      const filter = JSON.parse(localStorage.getItem("params"));
      this.getCoursesList(filter);
    },
    // COMPROBAR SI UN CURSO YA ESTÁ SOLICITADO
    checkRequestedCourses(course) {
      if (this.userCourses)
        return this.userCourses.some(e => e.id === course.id);
    },
    // CERRAR MENSAJE
    closeMessage() {
      setTimeout(() => {
        this.message = null;
        this.hasSuccess = false;
      }, 2000);
    },
  },
  // AL CARGAR LA VISTA SE SOLICITA LA LISTA DE CURSOS
  created() {
    this.refreshCoursesList();
  },
};
</script>

<style scoped>
td > button {
  display: inline-flex;
  align-items: center;
  margin-right: 5px;
  justify-content: center;
}

.btn-user {
  width: 100px;
}
</style>
