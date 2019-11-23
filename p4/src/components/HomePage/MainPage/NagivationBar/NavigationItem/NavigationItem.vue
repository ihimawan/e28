<template>
  <li class="nav-item">
    <router-link :to="{name: routeName}" class="nav-link" exact>
      <slot/>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'NavigationItem',
  props: {
    active: Boolean,
    routeName: String
  }
}
</script>
