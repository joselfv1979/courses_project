<!-- TABLA DE USUARIOS -->
<template>
  <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Mail</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>
              {{ user.username }}
            </td>
            <td>{{ user.email }}</td>
            <td></td>
            <slot :user="user"></slot>
          </tr>
        </tbody>
      </table>
</template>

<script>
export default {
    name: "UsersTable",
    props: {
        users: Array
    }
}
</script>

<style>

</style>