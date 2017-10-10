<template>
  <div class="container">
    <p class="date">{{selected.getFullYear() + '年' + (selected.getMonth() + 1) + '月' + selected.getDate() + '日'}}</p>
    <textarea :maxlength="maxLength" class="event-content" v-model="eventContent" placeholder="请在此输入内容"></textarea>
    <p class="counter">{{eventContent.length}} / {{maxLength}}</p>
    <button v-on:click="addEvent">添加事项</button>
  </div>
</template>

<script>
  export default {
    name: 'editor',
    data() {
      return {
        selected: this.$store.state.selected,
        eventContent: '',
        maxLength: 100
      }
    },
    methods: {
      addEvent() {
        const time = this.selected.valueOf()
        if (this.eventContent === '') return alert('内容不能为空')
        this.$store.commit('addEvent', {date: time, content: this.eventContent})
        window.history.back()
      }
    },
    mounted() {
      const inputBox = this.$el.querySelector('.event-content')
      inputBox.focus()
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 3.5rem;
  }

  .date {
    width: 90%;
    margin: 0.5rem auto;
    font-size: 0.9rem;
  }

  .event-content {
    display: block;
    width: 90%;
    margin: 0 auto;
    height: 10rem;
    outline: none;
    padding: 0.5rem;
    font-size: 1rem;
    resize: none;
  }

  .counter {
    font-size: 0.8rem;
    width: 90%;
    margin: .5rem auto 0 auto;
    text-align: right;
    color: #263238;
  }

  button {
    display: block;
    border: 0;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
    margin: 0 auto;
    background: #109b9c;
    color: #fff;
    cursor: pointer;
  }
</style>
