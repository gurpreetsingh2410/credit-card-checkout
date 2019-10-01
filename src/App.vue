<template>
  <div>
    <Card></Card>
  </div>
</template>

<script>
  import Card from "./components/card/card.vue";
  export default {
    name: "App",
    components: {
      Card
    }
  };
</script>

<style lang="scss">
  body {
    overflow: hidden;
  }
</style>