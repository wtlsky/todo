<template>
  <div class="wrap">
    <MyHeader title="Todo" :add="true" :back="false"></MyHeader>
    <div class="container">
      <calendar></calendar>
      <events :date="$store.state.selected" :data-s="$store.state.selected"></events>
    </div>
  </div>
</template>

<script>
  import MyHeader from '../components/MyHeader.vue'
  import calendar from '../components/calendar.vue'
  import events from '../components/events.vue'

  export default {
    name: 'index',
    components: {
      MyHeader: MyHeader,
      calendar: calendar,
      events: events
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media screen and (orientation: landscape) {
    .container {
      display: flex;
      margin: 3.5rem 2rem 0 2rem;
      align-items: flex-start;
    }
  }

  .container {
    flex: 1;
    overflow: auto;
    margin-top: 3.5rem;
  }
</style>
