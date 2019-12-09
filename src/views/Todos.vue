<template>
  <div id="todos">
    <h1 class="subheading grey--text">Todo Page</h1>
    <v-container class="my-5">
      <v-layout row justify-start class="mb-3">
        <div class="mr-2">
          <!-- <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn small text color="primary pr-2" v-on="on" @click="sortBy('title')">
                <v-icon small left>mdi-folder</v-icon>
                <span class="caption text-lowercase">Project</span>
              </v-btn>
            </template>
            <span>Sort by project</span>
          </v-tooltip>-->
        </div>
        <div class="mr-2">
          <!-- <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn small text color="primary" v-on="on" @click="sortBy('person')">
                <v-icon small left>mdi-account-circle</v-icon>
                <span class="caption text-lowercase">Person</span>
              </v-btn>
            </template>
            <span>Sort by person</span>
          </v-tooltip>-->
        </div>
      </v-layout>
      <v-card class="mb-1" v-for="todo in allTodos" :key="todo.title">
        <v-layout row wrap :class="`ml-0 py-3 todo ${todo.status}`">
          <v-flex xs12 md6 class="pl-2">
            <div class="caption grey--text">Project</div>
            <div>{{ todo.title }}</div>
          </v-flex>
          <!-- <v-flex xs6 sm4 md2 class="pl-2">
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div> 
          </v-flex>-->
          <v-flex xs6 sm4 md2 class="ml-2">
            <div class="caption grey--text">Due Date</div>
            <div>{{ todo.due }}</div>
          </v-flex>
          <v-flex xs4 sm4 md2 class="pl-2">
            <div>
              <div class="caption grey--text">Status</div>
              <v-chip outlined small :class="`px-2 my-2 caption ${todo.status} `">{{ todo.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Todos",
  methods: {
    ...mapActions(["fetchTodos"])
  },
  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  }
};
</script>

<style scoped>
.todo.complete {
  border-left: 12px solid green;
}
.todo.pending {
  border-left: 12px solid #2196f3;
}
.todo.ongoing {
  border-left: 12px solid orange;
}
.todo.overdue {
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
</style>