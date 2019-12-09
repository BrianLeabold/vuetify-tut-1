<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title class="primary--text">{{projb.title}}</v-card-title>
          <v-img class="white--text align-end" height="400px" :src="projb.imageUrl"></v-img>
          <v-card-text class="text--primary">
            <div class="grey--text">{{projb.date | date}}</div>
            <div>
              {{projb.details}}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum dolorem vitae vero perspiciatis aliquid itaque ab dignissimos
              facere pariatur ducimus.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn to="/schedule" color="primary">Schedule a Meeting Today</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    projb() {
      return this.$store.getters.loadProject(this.id);
    }
  }
};
</script>

<style scoped>
</style>