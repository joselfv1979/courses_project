<!-- MENSAJE DE ÉXITO O ERROR -->
<template>
  <!-- <div :class="[isError ? errorClass : successClass]"> -->
  <div :class="[hasSuccess ? successClass : errorClass]">  
    <button class="close" data-dismiss="alert" @click="$emit('close')">
      &times;
    </button>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "MessageComponent",
  props: {
    message: String,
    hasSuccess: Boolean,
  },
  data() {
    return {
      successClass: "alert alert-success alert-dismissible",
      errorClass: "alert alert-danger alert-dismissible",
    };
  },
};
</script>

<style>
</style>