<template>
  <div v-if="playerData">
    <div class="row justify-content-center">
      <div class="col-sm">
        <img :src="playerPic.img" width="300" height="300" class="rounded mx-auto d-block img-thumbnail"/>
        <div class="row justify-content-center" id="player-pic-comment">
          <p class="text-muted">{{playerPic.comment}}</p>
        </div>
      </div>
      <div class="col-sm-8">
        <h4>Edit Your Profile</h4>
        <div class="alert alert-success fade show" role="alert" v-if="this.messages!==null">
          {{this.messages}}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true" @click="dismissAlert">&times;</span>
          </button>
        </div>
        <div class="form-group row">
          <label for="input-name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" :class="{'is-valid' : $v.newName.$dirty && !$v.newName.$anyError, 'is-invalid' : $v.newName.$anyError}"
                   id="input-name" placeholder="Name" v-model="$v.newName.$model" data-test="name-input">
            <div class="valid-feedback">
              Beautiful name you got.
            </div>
            <div class="invalid-feedback">
              <div v-if="!$v.newName.required">You must put your name!</div>
              <div v-if="!$v.newName.minLength">Name must have at least {{$v.newName.$params.minLength.min}} characters!</div>
              <div v-if="!$v.newName.maxLength">Name must be less than {{$v.newName.$params.maxLength.max}} characters!</div>
              <div v-if="!$v.newName.alpha">Must only be alphabetic name!</div>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="staticGender" class="col-sm-2 col-form-label">Gender</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="staticGender"
                   :value="playerData.selectedGender">
          </div>
        </div>
        <div class="form-group row">
          <label for="about-me" class="col-sm-2 col-form-label">Why me</label>
          <div class="col-sm-10">
            <textarea class="form-control" id="about-me" placeholder="I'm the best Alpaca around. Everyone is jealous."
                      v-model="newAbout" rows="3" data-test="about-me-input"/>
            <small class="form-text text-muted">
              Use something that will catch your next lover's eye..
            </small>
          </div>
        </div>
        <div class="form-group row">
          <label for="looking-for" class="col-sm-2 col-form-label">Looking for</label>
          <div class="col-sm-10">
            <textarea class="form-control" id="looking-for"
                      placeholder="An Alpaca that can love me the way my mother can't." v-model="newLookingFor"
                      rows="3" data-test="looking-for-input"/>
            <small class="form-text text-muted">
              Don't beat around the bush! Tell em what you want!
            </small>
          </div>
        </div>
        <div class="row float-right save-button">
          <button class="btn btn-primary" @click="saveChanges" :disabled="!this.validNewName" data-test="save-changes-button">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { playerPictures } from '../../../../helpers/intro/library'
import {validName} from '../../../../helpers/intro/settings'
import {
  copyJSONValues,
  getJSONFromLocalStorage,
  playerDataKey,
  setJSONToLocalStorage
} from '../../../../helpers/commons/constants'

export default {
  name: 'ProfilePage',
  data: function () {
    return {
      playerData: null,
      playerPic: null,
      newName: null,
      newAbout: null,
      newLookingFor: null,
      messages: null
    }
  },
  validations: {
    newName: validName
  },
  methods: {
    saveChanges: function () {
      if (this.hasDelta()) {
        this.playerDataUpdate({
          name: this.newName,
          about: this.newAbout,
          lookingFor: this.newLookingFor
        })
        this.messages = 'Changes Saved!'
        if (this.newName !== this.playerData.name) {
          this.$store.commit('setPlayerName', this.newName)
        }
        this.playerData.name = this.newName
        this.playerData.about = this.newAbout
        this.playerData.lookingFor = this.newLookingFor
      } else {
        this.messages = 'No new changes needed to be saved.'
      }
    },
    dismissAlert: function () {
      this.messages = null
    },
    hasDelta: function () {
      // eslint-disable-next-line no-console
      console.log(this.validNewName)
      return this.newName !== this.playerData.name ||
        this.newAbout !== this.playerData.about ||
        this.newLookingFor !== this.playerData.lookingFor
    },
    playerDataUpdate: function (newPlayerData) {
      const playerData = getJSONFromLocalStorage(playerDataKey)
      setJSONToLocalStorage(playerDataKey, copyJSONValues(playerData, newPlayerData))
    }
  },
  computed: {
    validNewName: function () {
      return this.$v.newName.$dirty && !this.$v.newName.$anyError
    }
  },
  mounted () {
    const playerData = getJSONFromLocalStorage(playerDataKey)
    this.playerData = playerData
    this.playerPic = playerPictures[playerData.selectedPictureIdx]
    this.newName = playerData.name
    this.newAbout = playerData.about
    this.newLookingFor = playerData.lookingFor
  }
}

</script>

<style scoped>
.save-button{
  margin-right: 15px;
}
#player-pic-comment{
  margin: 0 15px 0 10px;
}
</style>
