<template>
  <div>
    <h5>
      {{ title }}
      <span class="badge text-bg-info">{{ items.length }}</span>
    </h5>
    <div class="card">
      <div class="card-body">
        <ul class="list-group">
          <li
            v-for="i in items"
            :key="i.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>{{ i.description }}</div>
            <button class="btn btn-info" @click="deleteItem(i)">
              <span class="fa fa-trash"></span>
            </button>
          </li>
        </ul>
        <div class="input-group mt-3">
          <input
            v-model="description"
            class="form-control"
            type="text"
            placeholder="Digite o prefixo"
            @keyup.enter="addItem(type, description)"
          />
          <button
            class="btn btn-info"
            type="button"
            @click="addItem(type, description)"
          >
            <span class="fa fa-plus"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppItemList",
  props: {
    type: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["addItem", "deleteItem"],
  data() {
    return {
      description: "",
    };
  },
  methods: {
    addItem(type, description) {
      this.$emit("addItem", {
        type,
        description,
      });

      this.description = "";
    },
    deleteItem(item) {
      this.$emit("deleteItem", item);
    },
  },
};
</script>

<style scoped></style>
