import Home from "@/views/Home";
import WordPage from "@/views/WordPage";
import Bookmark from "@/views/Bookmark";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/search/:word",
    name: "search-word",
    component: WordPage,
    props: true,
  },

  {
    path: "/bookmarks",
    name: "bookmarks",
    component: Bookmark,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
