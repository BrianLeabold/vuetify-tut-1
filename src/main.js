import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import router from './router';
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import DateFilter from './filters/date';
import ErrorCmp from '@/components/Error.vue';

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);
Vue.component('v-alert', ErrorCmp);

firebase.initializeApp({
  apiKey: "AIzaSyC9Gt_6X0URbaY1PA7khQZoqJqnohBKpL4",
  authDomain: "consultbrian-vuetify.firebaseapp.com",
  databaseURL: "https://consultbrian-vuetify.firebaseio.com",
  projectId: "consultbrian-vuetify",
  storageBucket: "consultbrian-vuetify.appspot.com",
  messagingSenderId: "842162482063",
  appId: "1:842162482063:web:a80a38cbf24cfaabecb9fa",
  measurementId: "G-CF9RW8RCMR"
});
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    this.$store.dispatch('autoSignIn', user);
  }
});
this.$store.dispatch('loadProjects');


export const db = firebase.firestore();



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
