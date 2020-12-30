<!-- VISTA DE ACTUALIZACIÓN DE DATOS DE UN CURSO -->
<template>
  <div class="container">
    <h1>Instructor Application</h1>
    <div class="course-title">
      <h3>Course</h3>
      <button class="btn btn-success" @click="backCourses()">Back</button>
    </div>
    <message-component
      v-if="message"
      :message="message"
      :hasSuccess="hasSuccess"
      @close="message = null"
    />
    <form>
      <fieldset class="form-group">
        <label>Id</label>
        <input type="text" class="form-control" v-model="course.id" disabled />
      </fieldset>
      <fieldset class="form-group">
        <label>Description</label>
        <input
          type="text"
          class="form-control"
          v-model="course.description"
          @keydown="message = null"
        />
      </fieldset>
      <fieldset class="form-group">
        <label>Language</label>
        <input
          type="text"
          class="form-control"
          v-model="course.language"
          @keydown="message = null"
        />
      </fieldset>
      <div class="form-group">
        <label for="type">Format</label>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            v-model="course.format"
            name="format"
            id="in-person"
            value="in-person"
            @click="message = null"
          />
          <label class="form-check-label" for="inPerson">In-person</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            v-model="course.format"
            name="format"
            id="online"
            value="online"
            @click="message = null"
          />
          <label class="form-check-label" for="online">Online</label>
        </div>
      </div>
      <fieldset class="form-group">
        <label>Price</label>
        <input
          type="text"
          class="form-control"
          v-model="course.price"
          @keydown="message = null"
        />
      </fieldset>
    </form>
    <button class="btn btn-success" @click="validateAndSubmit()">Save</button>
    <button class="btn btn-warning" @click="backCourses()">Cancel</button>
  </div>
</template>

<script>
import CourseDataService from "../service/CourseDataService";
import MessageComponent from "../components/MessageComponent";

export default {
  name: "UpdateCourse",
  components: {
    MessageComponent,
  },
  data() {
    return {
      course: {},
      message: null,
      hasSuccess: false,
    };
  },
  // FUNCIONES
  methods: {
    // PETICIÓN DEL CURSO A LA BASE DE DATOS
    async getCourseDetails(id) {
      try {
        const res = await CourseDataService.retrieveCourse(id);
        this.course = res.data;
      } catch (error) {
        this.message = "Couldn't get data, try it again later";
      }
    },
    // VALIDAR DATOS
    validateAndSubmit() {
      try {
        const newCourse = CourseDataService.validateCourse(this.course);
        this.updateCourse(newCourse);
      } catch (error) {
        this.message = error.message;
      }
    },
    // ACTUALIZAR CURSO
    async updateCourse(newCourse) {
      try {
        const response = await CourseDataService.updateCourse(
          this.course.id,
          newCourse
        );
        this.hasSuccess = true;
        this.message = "Course updated successfully";
        this.closeMessage();
      } catch (error) {
        this.message = "Couldn't update this course, try it again later";
      }
    },
    // CERRAR MENSAJE
    closeMessage() {
      setTimeout(() => {
        this.message = null;
        this.hasSuccess = false;
      }, 2000);
    },
    // VOLVER A HOME
    backCourses() {
      this.$router.push({ name: "Home" });
    },
  },
  // AL CARGAR LA VISTA, SE SOLICITAN LOS DATOS DEL CURSO A ACTUALIZAR
  created() {
    this.getCourseDetails(this.$route.params.id);
  },
};
</script>

<style scoped>
.course-title {
  display: flex;
}

.course-title > button {
  margin-left: auto;
  margin-bottom: 10px;
  margin-right: 0;
}

button {
  margin-right: 10px;
}
</style>