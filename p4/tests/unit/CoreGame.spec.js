import { expect } from "chai";
import CoreGame from "../../src/components/GamePage/CoreGame/CoreGame";
import Vuex from "vuex";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CoreGame", () => {
  let profileCollection = [
    {
      id: 1,
      title: "name1",
      description: "text1",
      distance: 1,
      speciesId: 1
    },
    {
      id: 2,
      title: "name2",
      description: "text2",
      distance: 2,
      speciesId: 1
    }
  ];

  let store;
  let options;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        profileCollections: profileCollection
      }
    });

    options = {
      localVue,
      store
    };
  });

  it("displays error message if API throws error", async () => {
    const storeFailedFetch = new Vuex.Store({
      state: {
        profileCollections: null
      },
      actions: {
        setProfileCollections: () => {
          return new Promise((resolve, reject) => {
            reject(new Error("error test"));
          });
        }
      }
    });
    const wrapper = shallowMount(CoreGame, {
      localVue,
      store: storeFailedFetch
    });

    await new Promise(resolve => setTimeout(resolve));
    expect(wrapper.vm.error).to.equal(true);
    expect(wrapper.vm.loading).to.equal(false);
    expect(wrapper.text()).to.include("Error");
  });

  it("Shows one profile by random from the profile list", async () => {
    const wrapper = shallowMount(CoreGame, options);
    await new Promise(resolve => setTimeout(resolve));
    expect(wrapper.vm.error).to.equal(false);
    expect(wrapper.vm.loading).to.equal(false);
    expect(wrapper.vm.state.currentIndex !== 0).to.equal(true);
  });

  it("Shows another profile by random from the profile list, but will not repeat the ones before", () => {
    const wrapper = mount(CoreGame, options);
    const names = profileCollection.map(profile => profile.title);
    const firstProfile = wrapper.text();
    wrapper.find('[data-test = "llama-button"]').trigger("click");
    const secondProfile = wrapper.text();

    const profiles = [firstProfile, secondProfile];
    const claimedNames = new Set();
    names.forEach(name => {
      profiles.forEach(profile => {
        if (profile.includes(name)) {
          claimedNames.add(name);
        }
      });
    });
    expect(claimedNames.size).to.equal(names.length);
  });

  it("adds profile to the left when llama button is clicked", () => {
    const wrapper = mount(CoreGame, options);
    wrapper.find('[data-test = "llama-button"]').trigger("click");
    expect(wrapper.vm.state.leftChoiceIndexes.length).to.equal(1);
  });

  it("adds profile to the right when alpaca button is clicked", () => {
    const wrapper = mount(CoreGame, options);
    wrapper.find('[data-test = "alpaca-button"]').trigger("click");
    expect(wrapper.vm.state.rightChoiceIndexes.length).to.equal(1);
  });

  it("evaluates score based on choices", () => {
    const wrapper = mount(CoreGame, options);
    wrapper.setData({
      state: {
        maxChoices: 2
      }
    });
    wrapper.find('[data-test = "alpaca-button"]').trigger("click");
    wrapper.find('[data-test = "alpaca-button"]').trigger("click");
    expect(wrapper.vm.state.modal.status).to.not.null;
  });
});
