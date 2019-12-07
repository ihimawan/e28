import { expect } from 'chai'
import CoreGame from "../../src/components/GamePage/CoreGame/CoreGame";
import Vuex from "vuex";
import {createLocalVue, mount} from "@vue/test-utils";

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

  it('shows one player card each time', () => {
    const wrapper = mount(CoreGame, {
      computed: {
        profileCollection: function () {
          return profileCollection
        }
      },
    })
    expect(wrapper.contains('ProfileCard')).to.be(true)
  })
})
