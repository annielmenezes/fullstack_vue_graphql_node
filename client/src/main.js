import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import DomainList from "@/components/DomainList.vue";
import DomainView from "@/components/DomainView.vue";

const app = createApp(App, {});

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/domains",
      component: DomainList,
    },
    {
      path: "/domains/:domain",
      component: DomainView,
      props: true,
    },
    {
      path: "/",
      redirect: "/domains",
    },
  ],
});

app.use(router);

app.mount("#app");
