import { expect } from 'chai'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import CoreGame from '../../src/components/GamePage/CoreGame/CoreGame.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CoreGame', () => {
  let profileCollection = [{
    id: 1,
    title: 'name1',
    description: 'text1',
    distance: 1,
    speciesId: 1
  },
  {
    id: 2,
    title: 'name2',
    description: 'text2',
    distance: 2,
    speciesId: 1
  }]

  let store
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        profileCollection
      }
    })
  })

  it('shows one player card each time', () => {
    const wrapper = mount(CoreGame, {store, localVue})
    expect(wrapper.contains('ProfileCard')).to.be(true)
  })
})
