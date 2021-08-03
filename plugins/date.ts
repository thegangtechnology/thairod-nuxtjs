import Vue from 'vue'
import moment from 'moment'

const dateProcess = (date: string) => {
  return moment(date).format('DD MMM YYYY hh:mm A')
}

Vue.filter('date', dateProcess)
