<!-- VISTA QUE MUESTRA EL LISTADO DE USUARIOS -->
<template>
  <div class="container">
    <h3>Users</h3>
    <message-component
      v-if="message"
      :message="message"
      :hasSuccess="hasSuccess"
      @close="message = null"
    />
    <div class="table-responsive-sm">
      <users-table :users="users" v-slot="{ user }">
        <td>
          <button class="btn btn-primary" @click="seeUserClicked(user.id)">
            <info-icon />
          </button>
          <button class="btn btn-danger" @click="deleteUserClicked(user.id)">
            <trash-icon />
          </button>
        </td>
      </users-table>
    </div>
  </div>
</template>

<script>
import UserDataService from "../service/UserDataService";
import UsersTable from "../components/UsersTable";
import MessageComponent from "../components/MessageComponent";
import trashIcon from "@/components/TrashIcon.vue";
import infoIcon from "@/components/InfoIcon.vue";

export default {
  name: "Users",
  components: {
    UsersTable,
    MessageComponent,
    trashIcon,
    infoIcon,
  },

  data() {
    return {
      users: [],
      hasSuccess: false,
      message: null,
    };
  },
  // FUNCIONES
  methods: {
    // SOLICITAR A LA BD LA LISTA DE USUARIOS
    async getUsers() {
      try {
        const response = await UserDataService.retrieveAllUsers();
        this.users = response.data;
      } catch (error) {
        this.message = "Couldn't get users, try it again later";
      }
    },
    // IR A LA VISTA DETALLADA DE UN USUARIO
    seeUserClicked(id) {
      this.$router.push(`/users/${id}`);
    },
    // ELIMINAR UN USUARIO
    async deleteUserClicked(id) {
      if(!confirm('Are you sure to delete?')) return;
      try {
        const response = await UserDataService.deleteUser(id);
        this.message = "Delete of successful";
        this.hasSuccess = true;
        this.users = this.users.filter(item => item.id !== id);
        this.closeMessage();
      } catch (error) {
        this.message = "Couldn't delete this user, try it again later";
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
  // AL CARGAR LA VISTA SE SOLICITA A LA LISTA DE USUARIOS
  created() {
    this.getUsers();
  },
};
</script>

<style scoped>
button {
  display: inline-flex;
  align-items: center;
  margin-right: 5px;
}
</style>