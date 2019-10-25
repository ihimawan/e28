<template>
  <div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">You will be presented with a profile of a existing
        users.
      </li>
      <li class="list-group-item">You will need to be able to
        determine if they are a <strong>Llama or Alpaca</strong> based on their
        profile.
        (Be careful, a lot of them will claim to be Alpacas but they are indeed NOT!)</li>
      <li class="list-group-item"> You will need an accuracy
        of <strong>70%</strong> (which is pretty low, so you should be able to do this
        if
        you're a real Alpaca.. or Alpaca lover.)</li>
      <li class="list-group-item"> You are NOT timed during this test. Take your time and
        observe.</li>
      <li class="list-group-item">You only need to pass the test <strong>ONCE</strong>. But
        you can still play this game after you've won.
      </li>
      <li class="list-group-item"> If you have no clue what you're doing, <a href="https://www.alpacadirect.com/blogs/alpaca-direct-blog/alpaca-vs-llama-7-ways-to-tell-the-difference"
                                                                             target="blank">read this article.</a></li>
    </ul>
    <button type="button" @click="$emit('return-to-home')" class=" btn btn-secondary">Nevermind,
      I want to go back to looking at Alpacas</button>
    <button type="button" @click="$emit('begin-game')" class="btn btn-primary">Start eligibility for
      this secret society</button>
  </div>
</template>

<script>
export default {
  name: 'Instructions'
}
</script>
