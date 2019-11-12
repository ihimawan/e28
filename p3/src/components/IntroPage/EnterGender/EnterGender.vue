<template>
  <div class="row justify-content-center">
    <div class="col-md-4 mb-3">
      <select class="custom-select" v-model="selected" @change="emitting">
        <option selected>Select Gender...</option>
        <option v-for="gender in genders" :value=gender :key=gender>{{gender}}</option>
      </select>
      <small>We want to stay Politically Correct.
        <a href="https://abcnews.go.com/blogs/headlines/2014/02/heres-a-list-of-58-gender-options-for-facebook-users"
           target="_blank">Source</a></small>
    </div>
  </div>
</template>

<script>
import * as info from '../../../helpers/intro/library'

export default {
  name: 'EnterGender',
  props: {
    selectedGender: String
  },
  data: function () {
    return {
      genders: info.genderSelection,
      selected: null
    }
  },
  methods: {
    emitting: function () {
      this.$emit('update:selected-gender', this.selected)
    }
  }
}
</script>
