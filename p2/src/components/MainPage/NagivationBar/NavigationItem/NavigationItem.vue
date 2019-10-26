<template>
  <li class="nav-item">
    <a class="nav-link" :class="{active: active}" href="#" @click="$emit('clicked')"><slot /></a>
  </li>
</template>

<script>
export default {
  name: 'NavigationItem',
  props: {
    active: Boolean
  }
}
</script>
