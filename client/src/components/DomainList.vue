<template>
  <div id="root">
    <div class="container">
      <div class="row">
        <div class="col-md">
          <AppItemList
            title="Prefixos"
            type="prefix"
            :items="items.prefix"
            @add-item="addItem"
            @delete-item="deleteItem"
          />
        </div>
        <div class="col-md">
          <AppItemList
            title="Sufixos"
            type="suffix"
            :items="items.suffix"
            @add-item="addItem"
            @delete-item="deleteItem"
          />
        </div>
      </div>
      <br />
      <h5>
        Domínios
        <span class="badge text-bg-info">{{ domains.length }}</span>
      </h5>
      <div class="card">
        <div class="card-body">
          <ul class="list-group">
            <li
              v-for="domain in domains"
              :key="domain.name"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>{{ domain.name }}</div>
              <a class="btn btn-info" :href="domain.checkout" target="_blank">
                <i class="fa fa-shopping-cart"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppItemList from "@/components/AppItemList.vue";

export default {
  name: "DomainList",
  components: {
    AppItemList,
  },
  data() {
    return {
      items: {
        prefix: [],
        suffix: [],
      },
    };
  },
  computed: {
    domains() {
      console.log("Generating domains...");
      const domains = [];
      for (const prefix of this.items.prefix) {
        for (const suffix of this.items.suffix) {
          const name = prefix.description + suffix.description;
          const url = name.toLowerCase();
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`;
          domains.push({
            name,
            checkout,
          });
        }
      }
      return domains;
    },
  },
  created() {
    this.getItems("prefix");
    this.getItems("suffix");
  },
  methods: {
    getItems(type) {
      axios({
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
        this.items[type] = query.data.items;
      });
    },
    addItem(item) {
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
        console.log(saveItem);
        this.items[saveItem.type].push(saveItem);
      });
    },
    deleteItem(item) {
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
        this.getItems(item.type);
      });
    },
  },
};
</script>

<style></style>
