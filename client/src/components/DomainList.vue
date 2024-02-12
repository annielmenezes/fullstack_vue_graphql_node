<template>
  <div id="root">
    <div class="container">
      <div class="row">
        <div class="col-md">
          <AppItemList
            title="Prefixos"
            :items="prefixes"
            @add-item="addPrefix"
            @delete-item="deletePrefix"
          />
        </div>
        <div class="col-md">
          <AppItemList
            title="Sufixos"
            :items="suffixes"
            @add-item="addSuffix"
            @delete-item="deleteSuffix"
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
      prefixes: [],
      suffixes: [],
    };
  },
  computed: {
    domains() {
      console.log("Generating domains...");
      const domains = [];
      console.table(this.prefixes);
      console.table(this.suffixes);
      for (const prefix of this.prefixes) {
        for (const suffix of this.suffixes) {
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
    this.getPrefixes();
    this.getSuffixes();
  },
  methods: {
    getPrefixes() {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `{
          prefixes: items (type: "prefix") {
            id
            type
            description
          }
        }`,
        },
      }).then((response) => {
        const query = response.data;
        this.prefixes = query.data.prefixes;
      });
    },
    addPrefix(prefix) {
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
            item: {
              type: "prefix",
              description: prefix,
            },
          },
        },
      }).then((response) => {
        const query = response.data;
        const { saveItem } = query.data;
        console.log(saveItem);
        this.prefixes.push(saveItem);
      });
    },
    deletePrefix(prefix) {
      this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
    },
    getSuffixes() {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `{
          suffixes: items (type: "suffix") {
            description,
            id
            type
          }
        }`,
        },
      }).then((response) => {
        const query = response.data;
        this.suffixes = query.data.suffixes;
      });
    },
    addSuffix(suffix) {
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
            item: {
              type: "suffix",
              description: suffix,
            },
          },
        },
      }).then((response) => {
        const query = response.data;
        const { saveItem } = query.data;
        this.suffixes.push(saveItem);
      });
    },
    deleteSuffix(suffix) {
      this.suffixes.splice(this.suffixes.indexOf(suffix), 1);
    },
  },
};
</script>

<style></style>
