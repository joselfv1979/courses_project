<!-- TABLA DE CURSOS -->
<template>
  <table class="table table-striped">
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
        <slot :course="course"></slot>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "CoursesTable",
  props: {
    courses: Array,
  },
};
</script>

<style>
</style>