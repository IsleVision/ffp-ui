<template>
  <div :class="classObj" class="app-wrapper">
    <div class="main-menu">
      <img src="../../../assets/image/menuview.png" style="display:block;width: 100%;height: 100%">
    </div>
  </div>
</template>

<script>

  export default {
    name: 'MainMenu',
    data(){
      return{
        view:1
      }
    },
    computed: {

    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>

</style>
