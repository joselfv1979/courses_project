<!-- VISTA DETALLADA DE UN USUARIO Y SUS CURSOS-->
<template>
  <div class="container">
    <loading-component v-if="isLoading" />
    <div v-else class="container">
      <message-component
        v-if="message"
        :message="message"
        :hasSuccess="hasSuccess"
        @close="message = null"
      />
      <div class="table-responsive-sm">
        <h3>User</h3>
        <users-table :users="users">
          <td></td>
        </users-table>
      </div>
      <h3>Courses</h3>
      <div v-if="courses.length" class="table-responsive-sm">
        <courses-table :courses="courses" v-slot="{ course }">
          <td>
            <button class="btn btn-danger" @click="deleteCourseClicked(course)">
              <trash-icon />
            </button>
          </td>
        </courses-table>
      </div>
      <div v-else>No courses requested</div>
    </div>
  </div>
</template>

<script>
import UserDataService from "../service/UserDataService";
import CourseDataService from "../service/CourseDataService";
import CoursesTable from "../components/CoursesTable";
import UsersTable from "../components/UsersTable";
import LoadingComponent from "../components/LoadingComponent";
import MessageComponent from "../components/MessageComponent";
import TrashIcon from "../components/TrashIcon.vue";

export default {
  name: "UserDetails",
  components: {
    CoursesTable,
    UsersTable,
    LoadingComponent,
    MessageComponent,
    TrashIcon,
  },

  data() {
    return {
      courses: null,
      users: [],
      message: "",
      hasSuccess: false,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    isLoading() {
      return this.courses === null
    }
  },
  // FUNCIONES
  methods: {
    // SOLICITAR A LA BD LOS DATOS DE UN USUARIO
    async refreshUserDetails() {
      try {
        const res = await UserDataService.retrieveUser(this.id);
        this.users.splice(0, 1, res.data);
        this.courses = res.data.courses; 
      } catch (error) {
        this.message = "Couldn't get data, try it again later";
      } 
    },
    // ELIMINAR UN CURSO ASIGNADO A UN USUARIO
    async deleteCourseClicked(course) {
      if(!confirm('Are you sure to delete?')) return;
      try {
        await UserDataService.removeCourseToUser(this.id, course);
        this.courses = this.courses.filter(item => item.id !== course.id)
        this.hasSuccess = true;
        this.message = `Delete of course Successful`;
        this.closeMessage();
      } catch (error) {
        this.message = "Couldn't delete this course, try it again later";
      }
    },
    // CERRAR MENSAJE
    closeMessage() {
      setTimeout(() => {
        this.message = null;
        this.hasSuccess = false;
      }, 2000);
    },
  },
  // AL CARGAR LA VISTA SE SOLICITAN LOS DATOS DEL USUARIO
  created() {
    this.refreshUserDetails();
  },
};
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
}

h3 {
  display: flex;
}

span {
  margin-left: 10rem;
}
</style>