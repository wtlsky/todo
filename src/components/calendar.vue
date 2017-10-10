<template>
  <div class="calendar">
    <div class="cal_bar">
      <div class="iconfont icon-left btn" v-on:click="preMonth"></div>
      <div class="month">{{ $store.state.baseDate.getFullYear() + '年' + ($store.state.baseDate.getMonth() + 1) + '月'}}
      </div>
      <div class="iconfont icon-right btn" v-on:click="nextMonth"></div>
    </div>
    <div class="cal_body">
      <ul class="cal_head">
        <li>MON</li>
        <li>TUE</li>
        <li>WED</li>
        <li>THU</li>
        <li>FRI</li>
        <li>SAT</li>
        <li>SUN</li>
      </ul>
      <ul class="cal_content">
        <li v-for="date in this.dates"
            :class="{otherMonth:!isSameMonth(date,new Date($store.state.baseDate)),today:isSameDate(date,new Date()),selected:isSameDate(date,new Date($store.state.selected))}"
            v-on:click="pick(date)">
          <span class="date">{{new Date(date).getDate()}}</span>
          <div class="event" v-if="hasEvents(date) && isSameMonth(date,new Date($store.state.baseDate))">
            {{hasEvents(date)}}
          </div>
          <span class="festival" :title="getFestival(date)"
                v-if="getFestival(date) && isSameMonth(date,new Date($store.state.baseDate))">{{getFestival(date)}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'calendar',
    data() {
      return {
        festival: this.$store.state.festival,
        dates: []
      }
    },
    methods: {
      /**@desc 初始化日历**/
      init() {
        let _state = this.$store.state
        this.dates = []
        const days = this.getDays(_state.baseDate.getFullYear(), _state.baseDate.getMonth() + 1)
        const firstDay = _state.baseDate.getDay() === 0 ? 6 : _state.baseDate.getDay() - 1
        for (let i = firstDay - 1; i >= 0; i--) {
          const s = new Date(_state.baseDate.getFullYear(), _state.baseDate.getMonth(), -i)
          this.dates.push(s)
        }
        for (let i = 1; i <= days; i++) {
          const s = new Date(_state.baseDate.getFullYear(), _state.baseDate.getMonth(), i)
          this.dates.push(s)
        }
        for (let i = 1, len = 42 - this.dates.length; i <= len; i++) {
          const s = new Date(_state.baseDate.getFullYear(), _state.baseDate.getMonth() + 1, i)
          this.dates.push(s)
        }
      },

      /**@desc 日历跳转至下一月或前一月**/
      nextMonth() {
        this.$store.commit('nextMonth', 'baseDate')
        this.init()
      },
      preMonth() {
        this.$store.commit('preMonth', 'baseDate')
        this.init()
      },

      /**@desc 获取对应日期的节日
       * @param date {date} 需要获取节日的日期**/
      getFestival(date) {
        return this.festival[date.getMonth() + '' + date.getDate()]
      },

      /**@desc 选择日期
       * @param date {date} 被选中的日期**/
      pick(date) {
        let baseDate = new Date(date)
        baseDate.setDate(1)
        this.$store.commit('setDate', {field: 'baseDate', date: baseDate})
        this.$store.commit('setDate', {field: 'selected', date: date})
        this.init()
      },

      /**@desc 判断两个日期是否是同一天或同一个月**/
      isSameDate(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
      },
      isSameMonth(date1, date2) {
        return date1.getMonth() === date2.getMonth()
      },

      /**@desc 判断对应日期是否有待办事项**/
      hasEvents(date) {
        let events = this.$store.state.events,
          len = 0;
        if (!events) return 0;
        for (let i = 0; i < events.length; i++) {
          if (events[i].date === date.valueOf()) len++
        }
        return len
      },

      /**@desc 获取某月的天数**/
      getDays(year, month) {
        let days = 0
        if (month !== 2) {
          //1-7月 单数月为31日
          if (month <= 7) {
            days = month % 2 !== 1 ? 30 : 31
          } else {
            //8-12月 双月为31日
            days = month % 2 === 0 ? 31 : 30
          }
        } else {
          days = (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0) ? 29 : 28
        }
        return days;
      }
    },
    created() {
      this.init()
    }
  }
</script>

<style scoped>
  .calendar {
    width: 95%;
    margin: 0 auto;
  }

  .cal_bar {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.5rem;
    margin: 1rem 0;
  }

  .month {
    padding: 0 1rem;
  }

  .btn {
    background: #fff;
    padding: 0 .3rem;
    box-shadow: 0 0 2px #bdbdbd;
    cursor: pointer;
  }

  .cal_body {
    background: #fff;
    box-shadow: 0 0 3px #bdbdbd;
  }

  .cal_head {
    list-style: none;
    display: flex;
    align-items: center;
    background: #FAFBFD;
    padding: 0.5rem 0;
  }

  .cal_head > li {
    width: calc(100% / 7);
    text-align: center;
    font-size: 0.8rem;
    color: #9F9F9F;
  }

  .cal_content {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    color: #333;
  }

  .otherMonth {
    color: #bdbdbd;
    background: url('/static/images/otherMonth_BG.png') !important;
  }

  .cal_content > li {
    text-align: center;
    position: relative;
    width: 14.28%;
    box-shadow: 0 0 1px rgba(44, 62, 80, 0.3);
    cursor: pointer;
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .festival {
    position: absolute;
    width: 100%;
    background: #f44b54;
    color: #fff;
    font-size: 0.8rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    bottom: 0;
    left: 0;
  }

  .event {
    position: absolute;
    font-size: 0.75rem;
    padding: 0 .3rem;
    top: 2px;
    right: 2px;
    background: #ff833c;
    color: #fff;
    border-radius: 4px;
    text-align: center;
  }

  .selected {
    background: #109b9c;
    color: #fff;
  }

  .today > .date {
    border-bottom: 2px solid #f90606;
    font-weight: bold;
  }

  @media screen and (orientation: landscape) {
    .calendar {
      width: 50%;
      max-width: 600px;
    }
  }
</style>
