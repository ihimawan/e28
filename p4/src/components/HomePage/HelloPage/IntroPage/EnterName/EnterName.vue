<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-4 mb-3">
        <input type="text" class="form-control" :class="{'is-valid' : validName, 'is-invalid' : enteredName !== null && validName !== null && !validName}"
               id="username" placeholder="Give yourself a name" v-model=enteredName data-test="enter-name-input">
        <div class="valid-feedback">
          <slot name="valid-feedback-text">Beautiful name you got.</slot>
        </div>
        <div class="invalid-feedback">
          Can't read this.. must be just alphabets and not too long please..
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as settings from '../../../../../helpers/intro/settings'

export default {
  name: 'EnterName',
  data: function () {
    return {
      enteredName: null,
      validName: null
    }
  },
  watch: {
    enteredName: function () {
      this.validName = settings.validateName(this.enteredName)
      if (this.validName) {
        this.$emit('set-name', this.enteredName)
      } else {
        this.$emit('set-name', null)
      }
    }
  }
}
</script>
