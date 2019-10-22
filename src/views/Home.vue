<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h2 class="display-4">Home Page</h2>
    <p class="green--text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum dolorum neque deleniti quaerat et excepturi incidunt quam, consequuntur quae praesentium tempora sunt maiores architecto alias iste doloremque minima soluta officia?
      <v-btn class="hidden-sm-and-down">hide on sm-and-down</v-btn>
      <v-btn class="hidden-sm-only">hidden on sm only</v-btn>
    </p>

    <p class="red darken-2 pink--text text--lighten-5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat accusantium dolore saepe iste et! Est, facere sunt quam eveniet aspernatur incidunt possimus fuga quas nobis consequatur atque suscipit id laudantium.
      <v-btn class="hidden-md-and-up">hide on md-and-up</v-btn>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>
