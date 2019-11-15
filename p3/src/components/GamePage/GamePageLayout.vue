<template>
  <DefaultLayout>
    <template #header>Llama or Alpaca Test</template>
    <template #subtext>Because we can't deal with Llamas. They're Llaaaaame (hehe)</template>

    <slot />

  </DefaultLayout>
</template>

<script>

import DefaultLayout from '../UI/DefaultLayout/DefaultLayout'

export default {
  name: 'GamePageLayout',
  components: {DefaultLayout}
}
</script>
