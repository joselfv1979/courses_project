<!-- VISTA DONDE EL ADMINISTRADOR CREA UN NUEVO CURSO -->
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
        <label>Description</label>
        <input
          type="text"
          id="description"
          class="form-control"
          v-model="course.description"
          @keydown="message = null"
          v-focus
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
            @click="message = null"
            name="format"
            id="in-person"
            value="in-person"
          />
          <label class="form-check-label" for="inPerson">In-person</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            v-model="course.format"
            @click="message = null"
            name="format"
            id="online"
            value="online"
          />
          <label class="form-check-label" for="online">Online</label>
        </div>
      </div>
      <fieldset class="form-group">
        <label>Price</label>
        <input
          type="text"
          class="form-control"
          @keydown="message = null"
          v-model="course.price"
        />
      </fieldset>
    </form>
    <button class="btn btn-success" @click="validateAndSubmit">Save</button>
    <button class="btn btn-warning" @click="backCourses">Cancel</button>
  </div>
</template>

<script>
import CourseDataService from "../service/CourseDataService";
import MessageComponent from "../components/MessageComponent";

export default {
  name: "AddCourse",
  components: {
    MessageComponent,
  },
  data() {
    return {
      course: {
        description: "",
        language: "",
        format: "",
        price: null,
      },
      message: null,
      hasSuccess: false,
    };
  },
  // FUNCIONES
  methods: {
    // VALIDAR DATOS
    validateAndSubmit() {
      try {
        const courseData = CourseDataService.validateCourse(this.course);
        this.createCourse(courseData);
      } catch (error) {
        this.message = error.message;
      }
    },
    // CREAR CURSO
    async createCourse(course) {
      try {
        const response = await CourseDataService.createCourse(course);
        this.message = "Course created successfully";
        this.hasSuccess = true;
        this.clearForm();
      } catch (error) {
        error.response
          ? (this.message = error.response.data.message)
          : (this.message = "Couldn't create this course, try it again later");
      }
    },
    // LIMPIAR FORMULARIO
    clearForm() {
      this.course = {};
      setTimeout(() => {
        this.message = null;
        this.hasSuccess = false;
        document.getElementById("description").focus();
      }, 2000);
    },
    // VOLVER A HOME
    backCourses() {
      this.$router.push({ name: "Home" });
    },
  },
  // DIRECTIVA PARA ESTABLECER EL FOCO EN EL CAMPO DESCRIPCIÓN CON V-FOCUS
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
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