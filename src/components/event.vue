<template>
  <div class="event">
    <p v-on:click="changeClose" class="content">{{content}}</p>
    <span class="iconfont icon-del del" v-if="close" v-on:click="del"></span>
  </div>
</template>

<script>
  export default {
    name: 'event',
    props: ['content', 'index'],
    data() {
      return {
        close: false
      }
    },
    methods: {
      changeClose() {
        this.close = !this.close
      },
      del() {
        this.$store.commit('delEvent', this.index)
      }
    }
  }
</script>

<style scoped>
  .event {
    border-left: 5px solid #27ae60;
    margin: 0.5rem 0;
    list-style: none;
    background: #fff;
    display: flex;
    align-items: center;
    font-size: .8em;
  }

  .content {
    cursor: pointer;
    padding: 1em 0 1em 1em;
    font-size: 1rem;
    flex: 1;
    line-height: 2;
  }

  .del {
    text-align: center;
    font-size: 1.5rem;
    color: #d33332;
    padding-right: 0.5rem;
    cursor: pointer;
  }
</style>
