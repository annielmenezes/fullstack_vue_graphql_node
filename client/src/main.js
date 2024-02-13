import { createApp } from "vue";
import { createStore } from "vuex";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import DomainList from "@/components/DomainList.vue";
import DomainView from "@/components/DomainView.vue";
import axios from "axios";

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

const store = createStore({
  state: {
    items: {
      prefix: [],
      suffix: [],
    },
    domains: [],
  },
  mutations: {
    addItem(state, payload) {
      const { item, saveItem } = payload;
      state.items[item.type].push(saveItem);
    },
    deleteItems(state, payload) {
      const { item } = payload;
      const list = state.items[item.type];
      list.splice(list.indexOf(item), 1);
    },
    setItems(state, payload) {
      const { type, items } = payload;
      state.items[type] = items;
    },
    setDomains(state, payload) {
      const { domains } = payload;
      state.domains = domains;
    },
  },
  actions: {
    async addItem(context, payload) {
      const item = payload;
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
          mutation ($item: ItemInput) {
            saveItem(item: $item) {
              id
              type
              description
            }
          }
        `,
          variables: {
            item,
          },
        },
      }).then((response) => {
        const query = response.data;
        const { saveItem } = query.data;
        context.commit("addItem", { item, saveItem });
        context.dispatch("generateDomains");
      });
    },
    async deleteItem(context, payload) {
      const item = payload;
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
          mutation ($id: Int) {
            deleted: deleteItem(id: $id)
          }
        `,
          variables: {
            id: item.id,
          },
        },
      }).then(() => {
        context.commit("deleteItems", { item });
        context.dispatch("generateDomains");
      });
    },
    async getItems(context, payload) {
      const type = payload;
      return axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: ` query ($type: String){
           items (type: $type) {
            id
            type
            description
          }
        }`,
          variables: {
            type,
          },
        },
      }).then((response) => {
        const query = response.data;
        context.commit("setItems", { type, items: query.data.items });
      });
    },
    async generateDomains(context) {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
          mutation {
            domains: generateDomains {
              name
              checkout
              available
            }
          }
        `,
        },
      }).then((response) => {
        const query = response.data;
        const { domains } = query.data;
        context.commit("setDomains", { domains });
      });
    },
  },
});

Promise.all([
  store.dispatch("getItems", "prefix"),
  store.dispatch("getItems", "suffix"),
]).then(() => {
  store.dispatch("generateDomains");
});

app.use(router);

app.use(store);

app.mount("#app");
