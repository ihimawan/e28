<template>
  <div class="text-center">
    <img :src=data.img class="float-left">
    <h2>{{ data.title }}</h2>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="(reason, index) in data.reasons" :key=index >{{reason}}</li>
    </ul>
  </div>
</template>

<script>
import { loversProof } from '../../../helpers/main/library'

export default {
  name: 'LoversProof',
  data: function () {
    return {
      data: loversProof
    }
  }
}
</script>
