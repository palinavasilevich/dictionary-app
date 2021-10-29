import { createApp } from "vue";
import SvgIcon from "vue3-icon";

import App from "./App.vue";
import components from "./components/UI/";

import router from "@/router";

import store from "@/store";

import "./styles/main.scss";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.component("svg-icon", SvgIcon);

app.use(router).use(store).mount("#app");
