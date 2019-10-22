<template>
  <nav>
    <v-toolbar flat dark color="indigo darken-4">
      <v-app-bar-nav-icon class="grey--text" @click.stop="drawer = !drawer" temporary></v-app-bar-nav-icon>
      <!--  TODO adjust font color  -->
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Consult</span>
        <span>Brian</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>Link 1</v-btn>
        <v-spacer></v-spacer>
        <v-btn text>Link 2</v-btn>
        <v-spacer></v-spacer>
        <v-btn text>Contact</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn text>
        <span>sign out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app class="indigo darken-4">
      <p class="grey--text">Test</p>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      drawer: false
    };
  }
};
</script>

<style scoped>
</style>