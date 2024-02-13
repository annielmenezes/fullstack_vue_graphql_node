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
              <div class="position-relative">
                {{ domain.name }}
                <span
                  class="badge rounded"
                  :class="
                    domain.available ? 'text-bg-success' : 'text-bg-danger'
                  "
                >
                  {{ domain.available ? "Disponível" : "Indisponível" }}
                </span>
              </div>
              <div>
                <a class="btn btn-info" :href="domain.checkout" target="_blank">
                  <i class="fa fa-shopping-cart"></i>
                </a>
                &nbsp;
                <a class="btn btn-info" @click="openDomain(domain)">
                  <i class="fa fa-search"></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppItemList from "@/components/AppItemList.vue";

export default {
  name: "DomainList",
  components: {
    AppItemList,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["domains", "items"]),
  },
  methods: {
    ...mapActions(["addItem", "deleteItem", "getItems", "generateDomains"]),
    openDomain(domain) {
      this.$router?.push({
        path: `/domains/${domain.name}`,
      });
    },
  },
};
</script>

<style></style>
