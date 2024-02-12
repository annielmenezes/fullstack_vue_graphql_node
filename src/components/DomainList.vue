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
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import AppItemList from "@/components/AppItemList.vue";

export default {
  name: "DomainList",
  components: {
    AppItemList,
  },
  data() {
    return {
      prefixes: ["Air", "Jet", "Flight"],
      suffixes: ["Hub", "Station", "Mart"],
    };
  },
  computed: {
    domains() {
      console.log("Generating domains...");
      const domains = [];
      for (const prefix of this.prefixes) {
        for (const suffix of this.suffixes) {
          const name = prefix + suffix;
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
  methods: {
    addPrefix(prefix) {
      this.prefixes.push(prefix);
    },
    deletePrefix(prefix) {
      this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
    },
    addSuffix(suffix) {
      this.suffixes.push(suffix);
    },
    deleteSuffix(suffix) {
      this.suffixes.splice(this.suffixes.indexOf(suffix), 1);
    },
  },
};
</script>

<style></style>
