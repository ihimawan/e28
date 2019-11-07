<template>
  <div id="products">
    <h2>{{ this.categoryName }}</h2>
    <show-product
      v-for="product in categories"
      :key="product.id"
      :product="product"
    ></show-product>
  </div>
</template>

<script>
import { products } from "../products";
import ShowProduct from "./ShowProduct";

export default {
  name: "ShowCategory",
  components: {ShowProduct},
  props: ["categoryName"],
  data: function() {
    return {
      products: products
    };
  },
  computed: {
    categories: function() {
      return this.products.filter(product =>
        product.categories.includes(this.categoryName)
      );
    }
  }
};
</script>
