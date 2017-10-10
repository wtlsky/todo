<template>
  <div class="events">
    <p class="title">
      [{{date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'}} 待办]</p>
    <div class="events-wrap">
      <!-- 判断事件列表中的事件日期与已选择日期是否为同一天。date 为 $store.state.selected (已选中时间) -->
      <event v-for="event,idx in this.$store.state.events" v-if="event.date === date.valueOf()" :content="event.content"
             :index="idx" :key="idx"></event>
    </div>
  </div>
</template>

<script>
  import event from '../components/event.vue'

  export default {
    name: 'events',
    props: ['date'],
    components: {
      event: event
    }
  }
</script>

<style scoped>
  .events {
    width: 95%;
    margin: 1rem auto 0 auto;
  }

  .events > .title {
    font-size: 0.8rem;
    font-weight: bold;
    color: #9F9F9F;
  }

  .events-wrap {
    max-height: 400px;
    overflow: auto;
  }

  @media screen and (orientation: landscape) {
    .events {
      margin-left: 2rem;
      flex: 1;
    }
  }
</style>
