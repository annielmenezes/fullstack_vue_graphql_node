<template>
  <div id="root">
    <header id="slogan" class="text-center">
      <h1>NameGator</h1>
      <h6 class="text-secondary">Gerador de nomes Vue.js, GraphQL e Node</h6>
    </header>
    <main id="main">
      <DomainList />
    </main>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import DomainList from "@/components/DomainList.vue";

export default {
  name: "App",
  components: {
    DomainList,
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
