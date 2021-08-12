import Vue from 'vue'
// import moment from 'moment'

const dateProcess = (date: string) => {
  // return moment(date).format('DD MMM YYYY hh:mm A')
  return new Date(date).toLocaleString('th', { year: '2-digit', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })
}

Vue.filter('date', dateProcess)
