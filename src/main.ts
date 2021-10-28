import { createApp } from "vue";
import App from "./App.vue";
import components from "./components/UI/";
import SvgIcon from "vue3-icon";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.component("svg-icon", SvgIcon);

app.mount("#app");
