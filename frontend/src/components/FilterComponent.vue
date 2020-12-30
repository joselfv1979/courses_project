<!-- FORMULARIO PARA BUSCAR CURSOS -->
<template>
  <div>
    <h1>Welcome to your Courses site!!!!!</h1>
    <h3>Find your course</h3>
    <form>
      <div class="row">
        <div class="col">
          <label for="language">Language</label>
          <select
            id="language"
            class="form-control form-control-sm"
            v-model="language"
          >
            <option value="">All Languages</option>
            <option>Java</option>
            <option>Python</option>
            <option>C</option>
            <option>Javascript</option>
            <option>Ruby</option>
          </select>
        </div>
        <div class="col">
          <label for="price" class="mr-sm-2">Max price</label>
          <select
            id="price"
            class="form-control form-control-sm"
            v-model="price"
          >
            <option value="">All prices</option>
            <option>1000</option>
            <option>800</option>
            <option>600</option>
            <option>400</option>
            <option>200</option>
            <option>100</option>
          </select>
        </div>
      </div>
    </form>
    <button class="btn btn-success" @click="setParameters()">Search</button>
  </div>
</template>

<script>
export default {
  name: "FilterComponent",
  data() {
    return {
      courses: [],
      language: "",
      format: "",
      price: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    setParameters() {
      let parameters = "";
      let count = 0;

      if (this.language) {
        parameters += "?language=" + this.language;
        count++;
      }

      if (this.price) {
        if (count === 0) parameters += "?price=" + this.price;
        else parameters += "&price=" + this.price;
        count++;
      }
      this.$emit("searchCourses", parameters);
    },
  },
};
</script>

<style scoped>
div > button {
  margin: 25px 0;
}
</style>