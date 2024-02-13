<template>
  <div>
    <div class="container">
      <div class="text-left">
        <router-link to="/domains">Voltar</router-link>
        <br />
        <h2>{{ domain }}</h2>
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li
                v-for="uri in domains"
                :key="uri.extension"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <div class="position-relative">
                  {{ uri.extension }}
                  <span
                    class="badge rounded"
                    :class="
                      uri.available ? 'text-bg-success' : 'text-bg-danger'
                    "
                  >
                    {{ uri.available ? "Disponível" : "Indisponível" }}
                  </span>
                </div>
                <div>
                  <a class="btn btn-info" :href="uri.checkout" target="_blank">
                    <i class="fa fa-shopping-cart"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "DomainView",
  props: {
    domain: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      domains: [],
    };
  },
  created() {
    axios({
      url: "http://localhost:4000",
      method: "post",
      data: {
        query: `
          mutation ($name: String) {
            domains: generateDomain (name: $name) {
              name
              checkout
              available
              extension
            }
          }
        `,
        variables: {
          name: this.domain,
        },
      },
    }).then((response) => {
      const query = response.data;
      this.domains = query.data.domains;
    });
  },
};
</script>

<style scoped></style>
