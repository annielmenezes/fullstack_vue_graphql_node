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
              <span class="badge badge-info">{{ prefixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li
                    v-for="prefix in prefixes"
                    :key="prefix"
                    class="list-group-item"
                  >
                    {{ prefix }}
                  </li>
                </ul>
                <br />
                <input
                  class="form-control"
                  type="text"
                  placeholder="Digite o prefixo"
                />
              </div>
            </div>
          </div>
          <div class="col-md">
            <h5>
              Sufixos
              <span class="badge badge-info">{{ suffixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li
                    v-for="sufix in suffixes"
                    :key="sufix"
                    class="list-group-item"
                  >
                    {{ sufix }}
                  </li>
                </ul>
                <br />
                <input
                  class="form-control"
                  type="text"
                  placeholder="Digite o sufixo"
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <h5>
          Domínios <span class="badge badge-info">{{ domains.length }}</span>
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
      prefixes: ["Air", "Jet", "Flight"],
      suffixes: ["Hub", "Station", "Mart"],
      domains: [
        "AirHub",
        "AirStation",
        "AirMart",
        "JetHub",
        "JetStation",
        "JetMart",
        "FlightHub",
        "FlightStation",
        "FlightMart",
      ],
    };
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
