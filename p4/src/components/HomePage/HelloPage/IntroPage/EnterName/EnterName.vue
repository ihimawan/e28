<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-4 mb-3">
        <input type="text" class="form-control" :class="{'is-valid' : $v.enteredName.$dirty && !$v.enteredName.$anyError, 'is-invalid' : $v.enteredName.$anyError}"
               id="username" placeholder="Give yourself a name" v-model.trim="$v.enteredName.$model" data-test="enter-name-input">
        <div class="valid-feedback">
          <slot name="valid-feedback-text">Beautiful name you got.</slot>
        </div>
        <div class="invalid-feedback">
          <div v-if="!$v.enteredName.required">You must put your name!</div>
          <div v-if="!$v.enteredName.minLength">Name must have at least {{$v.enteredName.$params.minLength.min}} characters!</div>
          <div v-if="!$v.enteredName.maxLength">Name must be less than {{$v.enteredName.$params.maxLength.max}} characters!</div>
          <div v-if="!$v.enteredName.alpha">Must only be alphabetic name!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {validName} from "../../../../../helpers/intro/settings";

export default {
  name: 'EnterName',
  data: function () {
    return {
      enteredName: ''
    }
  },
  validations: {
    enteredName: validName
  },
  watch: {
    enteredName: function () {
      if (this.$v.enteredName.$dirty && !this.$v.enteredName.$anyError) {
        this.$emit('set-name', this.enteredName)
      } else {
        this.$emit('set-name', null)
      }
    }
  }
}
</script>
