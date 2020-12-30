<template>
  <div class="container">
    <h1>Instructor Application</h1>
    <h3>Courses</h3>
    <message-component
      v-if="message"
      :message="message"
      @close="message = ''"
    />
    <div class="table-responsive-sm">
      <table class="table" v-if="courses.length">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Language</th>
            <th>Format</th>
            <th>Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses" :key="course.id">
            <td>{{ course.id }}</td>
            <td>{{ course.description }}</td>
            <td>{{ course.language }}</td>
            <td>{{ course.format }}</td>
            <td>{{ course.price }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>No se ha encontrado ningún curso solicitado</div>
    </div>
  </div>
</template>

<script>
import UserDataService from "../service/UserDataService";
import MessageComponent from "../components/MessageComponent";
export default {
  name: "MyCourses",
  components: {
    MessageComponent
  },

  data() {
    return {
      courses: [],
      userId: null,
      message: "",
    };
  },
  computed: {
    id() {
      return localStorage.getItem("userId");
    },
  },
  methods: {
    async getMyCourses() {
      try {
        const response = await UserDataService.retrieveCoursesByUser(this.id);
        this.courses = response.data;
      } catch (error) {
        this.message = "Couldn't get data, try it again later";
      }
    },
  },
  created() {
    this.userId = localStorage.getItem("userId");
    this.getMyCourses();
  },
};
</script>

<style>
</style>