import Home from "@/views/Home";
import Definition from "@/views/Definition";
import Bookmarks from "@/views/Bookmarks";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/search/:word",
    name: "definition",
    component: Definition,
    props: true,
  },

  {
    path: "/bookmarks",
    name: "bookmarks",
    component: Bookmarks,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
