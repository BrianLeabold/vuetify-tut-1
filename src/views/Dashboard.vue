<template>
  <div id="dashboard">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1 class="subheading">Home Page</h1>
    <v-container class="my-5">
      <v-layout row justify-start class="mb-3">
        <div class="mr-2">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn small text color="primary pr-2" v-on="on" @click="sortBy('title')">
                <v-icon small left>mdi-folder</v-icon>
                <span class="caption text-lowercase">Project</span>
              </v-btn>
            </template>
            <span>Sort by project</span>
          </v-tooltip>
        </div>
        <div class="mr-2">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn small text color="primary" v-on="on" @click="sortBy('person')">
                <v-icon small left>mdi-account-circle</v-icon>
                <span class="caption text-lowercase">Person</span>
              </v-btn>
            </template>
            <span>Sort by person</span>
          </v-tooltip>
        </div>
      </v-layout>
      <v-card class="mb-1" v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`ml-0 py-3 project ${project.status}`">
          <v-flex xs12 md6 class="pl-2">
            <div class="caption grey--text">Project</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2 class="pl-2">
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2 class="ml-n2">
            <div class="caption grey--text">Due Date</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs4 sm4 md2 class="pl-2">
            <!-- <div class="caption grey--text">Status</div> -->
            <div>
              <v-chip
                outlined
                small
                :class="`px-2 my-2 caption ${project.status} `"
              >{{ project.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <h2>Carousel</h2>
    <v-container class="my-2">
      <v-layout row wrap>
        <v-flex xs12 sm6 class="text-center text-sm-right pl-1 mb-2">
          <v-btn large router color="primary" to="/projects">Projects</v-btn>
        </v-flex>
        <v-flex xs12 sm6 class="text-center text-sm-left pl-1 mb-2">
          <v-btn large router color="primary" to="/team">Team</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="projb in projbs"
              :key="projb.id"
              :src="projb.imageUrl"
              reverse-transition="fade-transition"
              transition="fade-transition"
              @click="loadProject(projb.id)"
            >
              <div class="title text-center">
                <div>{{projb.title}}</div>
                <div>{{projb.date | date}}</div>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-2">
        <v-flex xs12 class="text-center">
          <v-btn large color="info" class="indigo--text text--darken-4">Check out some of my work</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <h2>Playing around wigth Vuetify</h2>
    <v-container class="my-5">
      <v-layout row class="mb-2">
        <v-flex xs12 md6>
          <v-btn outlined block color="primary">1</v-btn>
        </v-flex>
        <v-flex xs4 md2>
          <v-btn outlined block color="primary">2</v-btn>
        </v-flex>
        <v-flex xs4 md2>
          <v-btn outlined block color="primary">3</v-btn>
        </v-flex>
        <v-flex xs4 md2>
          <v-btn outlined block color="primary">4</v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-space-around>
        <v-flex xs4 md3>
          <v-btn outlined block color="success">1</v-btn>
        </v-flex>
        <v-flex xs4 md3>
          <v-btn outlined block rounded color="success">2</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
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
import { db } from "@/main";
export default {
  name: "dashboard",
  data() {
    return {
      projects: []
    };
  },
  computed: {
    projbs() {
      return this.$store.getters.featuredProjects;
    }
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    loadProject(id) {
      this.$router.push("/project/" + id);
    }
  },
  created() {
    db.collection("projects").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script>
<style scoped>
.project.complete {
  border-left: 12px solid green;
}
.project.pending {
  border-left: 12px solid #2196f3;
}
.project.ongoing {
  border-left: 12px solid orange;
}
.project.overdue {
  border-left: 12px solid tomato;
}
.v-chip.complete {
  color: black;
  border: 1.5px solid green;
}
.v-chip.pending {
  color: black;
  border: 1.5px solid #2196f3;
}
.v-chip.ongoing {
  color: black;
  border: 1.5px solid orange;
}
.v-chip.overdue {
  background-color: tomato;
  color: black;
  border: 1.5px solid tomato;
}
.title {
  position: absolute;
  width: 100%;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 10px;
  font-size: 1.5rem;
}
</style>