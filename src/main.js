// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false;
Vue.use(Vuex);

let localeBase = sessionStorage.getItem('baseDate'),
  localSelected = sessionStorage.getItem('selected'),
  base, selected, today = new Date();
today.setHours(0);today.setMinutes(0);today.setSeconds(0);today.setMilliseconds(0);//将当前时间重置为0:0:0

localeBase ? base = new Date(localeBase) : base = new Date(today)
localSelected ? selected = new Date(localSelected) : selected = new Date(today)
base.setDate(1);
let store = new Vuex.Store({
  state: {
    selected: selected,
    baseDate: base,
    festival: {
      '01': '元旦',
      '114': '情人节',
      '28': '妇女节',
      '215': '消费者权益日',
      '31': '愚人节',
      '41': '劳动节',
      '44': '青年节',
      '412': '护士节',
      '51': '儿童节',
      '55': '环境日',
      '61': '建党节',
      '71': '建军节',
      '83': '抗战胜利日',
      '810': '教师节',
      '91': '国庆节',
      '1011': '剁手节',
      '1125': '圣诞节'
    },
    events: JSON.parse(localStorage.getItem('events')) || []
  },
  mutations: {
    nextMonth(state, changeObj) {
      state[changeObj].setMonth(state[changeObj].getMonth() + 1);
      sessionStorage.setItem(changeObj, state[changeObj])
    },
    preMonth(state, changeObj) {
      state[changeObj].setMonth(state[changeObj].getMonth() - 1)
      sessionStorage.setItem(changeObj, state[changeObj])
    },
    setDate(state, payload) {
      state[payload.field] = payload.date;
      sessionStorage.setItem(payload.field, state[payload.field])
    },
    delEvent(state, index) {
      state.events.splice(index, 1);
      localStorage.setItem('events', JSON.stringify(state.events))
    },
    addEvent(state, payload) {
      state.events.push(payload);
      localStorage.setItem('events', JSON.stringify(state.events))
    }
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
