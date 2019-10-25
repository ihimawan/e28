<template>
  <!-- Modal -->
  <div v-if="modalShow">
    <div class="modal-backdrop show fade"></div>
    <div class="modal show in" id="playerModal" tabindex="-1" role="dialog" aria-hidden="true"
         style="display:block;">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{modalData.title}}</h5>
            <button type="button" class="close" @click="dismissModalHandler" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <img class="modal-img" :src="modalData.img">
            <p>{{modalData.text}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="dismissModalHandler"><slot name="dismissText">{{modalData.disagree}}</slot></button>
            <button type="button" class="btn btn-primary" @click="agreeHandler"><slot name="agreeText">{{modalData.agree}}</slot></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modalShow: Boolean,
    modalData: Object
  },
  methods: {
    dismissModalHandler: function () {
      this.$emit('update:modal-show', false)
    },
    agreeHandler: function () {
      this.$emit('agree-action')
    }
  }
}
</script>

<style>
  .modal-img {
    max-width:200px;
    margin-bottom: 15px;
  }
</style>
