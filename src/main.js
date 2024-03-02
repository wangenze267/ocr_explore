import './assets/main.css'
import DevUI from 'vue-devui';
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

const app = createApp(App)

ThemeServiceInit({ infinityTheme }, 'infinityTheme');

app.use(createPinia())
app.use(DevUI)
app.use(router)

app.mount('#app')
