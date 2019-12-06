import { expect } from 'chai'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import CoreGame from '../../src/components/GamePage/CoreGame/CoreGame.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CoreGame', () => {
  let profileCollection = [{
    id: 1,
    title: 'Carl',
    description: 'Hi!! My name is Carl and I\'m just looking for a friendly male don\'t worry Carl is girl alpaca name.',
    distance: 1,
    speciesId: 1
  },
  {
    id: 2,
    title: 'Billy Bob',
    description: 'My friend told me to use this website to find a man but idk how to take selfies with good lighting',
    distance: 2,
    speciesId: 1
  }]

  let state = {
    profileCollection
  }

  let store
  beforeEach(() => {
    store = new Vuex.Store({
      state
    })
  })

  it('shows one player card each time', () => {
    const wrapper = mount(CoreGame, {store, localVue})
    expect(wrapper.contains('ProfileCard')).to.be(true)
  })
})
