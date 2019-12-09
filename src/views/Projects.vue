<template>
  <div id="projects">
    <h1 class="subheading grey--text">Your Projects</h1>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in myProjects" :key="project.title">
          <v-expansion-panel-header class="py-1 justify-space-around">
            <div class="col-5">{{ project.title }}</div>
            <v-spacer></v-spacer>
            <div class="col-3">
              <v-chip
                outlined
                small
                :class="`px-2 my-2 caption ${project.status} `"
              >{{ project.status }}</v-chip>
            </div>
            <v-spacer></v-spacer>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card>
              <v-card-text class="px-4 grey--text">
                <div class="font-weight-bold">Due by {{ project.due }}</div>
                <div>{{ project.details }}</div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <v-card class="info mb-2" v-for="projb in projbs" :key="projb.id">
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 class="pl-3">
                  <v-img :src="projb.imageUrl" height="200px"></v-img>
                </v-flex>
                <v-flex xs7>
                  <span>
                    <v-card-title>{{projb.title}}</v-card-title>
                    <v-card-text class="mt-n2">{{projb.date | date }}</v-card-text>
                  </span>
                  <v-card-text class="text--primary">
                    {{projb.details}}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum dolorem vitae vero perspiciatis aliquid itaque ab dignissimos
                    facere pariatur ducimus.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :to="`/project/` + projb.id" text color="primary">
                      <v-icon left>mdi-arrow-right</v-icon>Learn More
                    </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  name: "projects",
  data() {
    return {
      projects: []
    };
  },
  computed: {
    myProjects() {
      return this.projects;
      // .filter(project => {
      //   return (
      //     project.person === "The Net Ninja" && project.status != "complete"
      //   );
      // });
    },
    projbs() {
      return this.$store.getters.loadProjects;
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
</style>