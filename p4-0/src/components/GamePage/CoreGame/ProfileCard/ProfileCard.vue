<template>
  <div class="col-sm">
    <div class="card border-secondary" style="width: 18rem;">
      <img :src="require('../../../../assets/images/game/' + currentProfile.id + '.jpg')" class="card-img-top"
           width="300" height="300">
      <div class="card-body">
        <h5 class="card-title">{{currentProfile.title}}</h5>
        <p class="card-text">{{currentProfile.description}}</p>
      </div>
      <div class="card-body">
        <a href="#" @click="$emit('select-answer', 'llamas')" class="card-link">Llama</a>
        <a href="#" @click="$emit('select-answer', 'alpacas')" class="card-link">Alpaca</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    currentProfile: {
      type: Object,
      required: true
    }
  }
}
</script>
