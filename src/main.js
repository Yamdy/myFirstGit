import { createApp } from 'vue'
import App from './App.vue'
// import store from './store'
import router from './router'
import axios from 'axios';
import VueCompositionApi from '@vue/composition-api';


const app = createApp(App);
app.use(router,axios,VueCompositionApi).mount('#app');


