<template>
  <div class="app-main scroll-bar">
    <!-- <el-button @click="jumpTo('Statistics')">statistics</el-button> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  methods: {
    jumpTo (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>