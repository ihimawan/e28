<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-4 mb-3">
        <input type="text" class="form-control" :class="{'is-valid' : validName, 'is-invalid' : enteredName !== null && validName !== null && !validName}"
               id="username" placeholder="Give yourself a name" v-model=enteredName @keyup=updateName>
        <div class="valid-feedback">
          Hot name. Now select your gender.
        </div>
        <div class="invalid-feedback">
          Can't read this.. must be just alphabets and not too long please..
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as settings from '../../../helpers/intro/settings'

export default {
  name: 'EnterName',
  data: function () {
    return {
      enteredName: null,
      validName: null
    }
  },
  methods: {
    updateName: function () {
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
