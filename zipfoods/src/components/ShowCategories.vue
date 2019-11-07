<template>
  <div>
    <h2>Categories</h2>
    <ul class="cleanList">
      <li v-for="(category, id) in categories" :key="id" @click="selectCategory(category)">
        <router-link :to="{ name: 'categories', params: { category: category }}">{{ category }}</router-link>
      </li>
    </ul>
    <ShowCategory v-if="selectedCategoryName !== null" :category-name="selectedCategoryName" />
  </div>
</template>

<script>
import { products } from "../products";
import ShowCategory from "./ShowCategory";

export default {
  name: "",
  components: {ShowCategory},
  data: function() {
    return {
      products: products,
      selectedCategoryName: null
    };
  },
  methods : {
    selectCategory: function (value) {
      this.selectedCategoryName = value
    }
  },
  computed: {
    categories: function() {
      let categories = this.products.map(product => product.categories);
      let mergedCategories = [].concat.apply([], categories);
      return [...new Set(mergedCategories)].sort();
    }
  }
};
</script>

<style scoped></style>
