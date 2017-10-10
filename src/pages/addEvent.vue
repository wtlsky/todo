<template>
  <div class="wrap">
    <my-header :back="true" title="添加事项"></my-header>
    <event-editor></event-editor>
  </div>
</template>

<script>
  import MyHeader from '../components/MyHeader.vue'
  import eventEditor from '../components/eventEditor.vue'

  export default {
    name: 'page',
    components: {
      MyHeader: MyHeader,
      eventEditor: eventEditor
    }
  }
</script>

<style scoped>

</style>
