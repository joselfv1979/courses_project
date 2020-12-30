<!-- COMPONENTE QUE CREA EL FOOTER PARA LA APLICACIÓN-->
<template> 
  <div class="container">
      <h6>Created by Jose 2020</h6>
  </div>
</template>

<script>
export default {
    name: 'FooterCustom' 
}
</script>

<style scoped>

.container {
  display: flex;
  height: 100%;
}

h6 {
  margin: auto;
  font-weight: bold; 
  color: #2c3e50;
}
</style>