<template>
  <div id="root">
    <header id="slogan" class="text-center">
      <h1>NameGator</h1>
      <h6 class="text-secondary">Gerador de nomes Vue.js, GraphQL e Node</h6>
    </header>
    <main id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <h5>
              Prefixos
              <span class="badge text-bg-info">{{ prefixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li
                    v-for="prefix in prefixes"
                    :key="prefix"
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>{{ prefix }}</div>
                    <button class="btn btn-info" @click="deletePrefix(sufix)">
                      <span class="fa fa-trash"></span>
                    </button>
                  </li>
                </ul>
                <div class="input-group mt-3">
                  <input
                    v-model="prefix"
                    class="form-control"
                    type="text"
                    placeholder="Digite o prefixo"
                    @keyup.enter="addPrefix(prefix)"
                  />
                  <button
                    class="btn btn-info"
                    type="button"
                    @click="addPrefix(prefix)"
                  >
                    <span class="fa fa-plus"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md">
            <h5>
              Sufixos
              <span class="badge text-bg-info">{{ suffixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li
                    v-for="suffix in suffixes"
                    :key="suffix"
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>{{ suffix }}</div>
                    <button class="btn btn-info" @click="deleteSuffix(suffix)">
                      <span class="fa fa-trash"></span>
                    </button>
                  </li>
                </ul>
                <div class="input-group mt-3">
                  <input
                    v-model="suffix"
                    class="form-control"
                    type="text"
                    placeholder="Digite o sufixo"
                    @keyup.enter="addSuffix(suffix)"
                  />
                  <button
                    class="btn btn-info"
                    type="button"
                    @click="addSuffix(suffix)"
                  >
                    <span class="fa fa-plus"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h5>
          Domínios <span class="badge text-bg-info">{{ domains.length }}</span>
        </h5>
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li
                v-for="domain in domains"
                :key="domain"
                class="list-group-item"
              >
                {{ domain }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export default {
  name: "App",
  data: function () {
    return {
      prefix: "",
      prefixes: ["Air", "Jet", "Flight"],
      suffix: "",
      suffixes: ["Hub", "Station", "Mart"],
      domains: [],
    };
  },
  beforeMount() {
    this.generate();
  },
  methods: {
    addPrefix(prefix) {
      this.prefixes.push(prefix);
      this.prefix = "";
      this.generate();
    },
    deletePrefix(prefix) {
      this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
      this.generate();
    },
    addSuffix(suffix) {
      this.suffixes.push(suffix);
      this.suffix = "";
      this.generate();
    },
    deleteSuffix(suffix) {
      this.suffixes.splice(this.suffixes.indexOf(suffix), 1);
      this.generate();
    },
    generate() {
      this.domains = [];
      for (const prefix of this.prefixes) {
        for (const suffix of this.suffixes) {
          this.domains.push(prefix + suffix);
        }
      }
    },
  },
};
</script>

<style>
#slogan {
  margin-top: 30px;
  margin-bottom: 30px;
}
#main {
  background-color: #f1f1f1;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
