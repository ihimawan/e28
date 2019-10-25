<template>
  <div class="row card-footer text-muted">
    <div class="col-sm" v-for="article in articles" :key="article.title">
      <img :src="article.img" class="img-article img-thumbnail">
      <h5>{{article.title}}</h5>
      <a :href="article.action" target="_blank">View article</a>
    </div>
  </div>
</template>

<script>
import { articles } from '../../../helpers/main/library'

export default {
  name: 'Articles',
  data: function () {
    return {
      articles: articles
    }
  }
}
</script>

<style scoped>
  .img-article{
    max-width:200px;
  }
</style>
