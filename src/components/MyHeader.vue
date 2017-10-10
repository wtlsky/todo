<template>
  <header>
    <div class="iconfont icon-logo logo" v-if="!back"></div>
    <div class="iconfont icon-back back" v-if="back" v-on:click="goBack"></div>
    <p class="title" :class="{indent:indent}">{{title}}</p>
    <router-link to="/addEvent" class="iconfont icon-jiahao" v-if="add"></router-link>
  </header>
</template>

<script>
  export default {
    name: 'MyHeader',
    props: ['title', 'back', 'add'],
    computed: {
      indent() {
        return window.location.hash === '#/addEvent'
      }
    },
    methods: {
      goBack() {
        window.history.back();
      }
    }
  }
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-around;
    padding: .8rem 0;
    position: fixed;
    width: 100%;
    background: #fff;
    color: #969688;
    box-shadow: 0 2px 3px #ccc;
    z-index: 9;
    align-items: center;
  }

  header > .title {
    flex: 1;
    text-align: center;
    font-size: 1em;
  }

  .indent {
    text-indent: -2em;
  }

  .logo {
    color: #27ae60;
  }

  .back {
    cursor: pointer;
    color: #333;
  }

  .logo, .back {
    margin-left: 1.5rem;
    font-size: 1.5em;
  }

  a {
    color: #333;
    margin-right: 1.5rem;
    font-size: 1.5em;
  }
</style>
