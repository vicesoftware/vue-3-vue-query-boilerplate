import { createApp } from 'vue'
import router from "./router"
import App from './App.vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

const app = createApp(App);

app.component('v-select', vSelect);

app.use(router).mount('#app');
