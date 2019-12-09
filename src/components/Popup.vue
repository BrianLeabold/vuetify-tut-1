<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn outlined v-on="on" dark class="success text--white">Add New Project</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2 class="grey--text">Add a New Project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field v-model="title" label="Title" prepend-icon="mdi-folder"></v-text-field>
          <v-text-field v-model="person" label="Person" prepend-icon="mdi-account"></v-text-field>
          <v-textarea v-model="details" label="Details" prepend-icon="mdi-information"></v-textarea>
          <v-text-field v-model="status" label="Status" prepend-icon="mdi-clock-start"></v-text-field>
          <v-menu v-model="menu" :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                :value="formattedDate"
                clearable
                label="Due date"
                prepend-icon="mdi-calendar"
              ></v-text-field>
            </template>
            <v-date-picker v-model="due" @change="menu = false"></v-date-picker>
          </v-menu>

          <v-spacer></v-spacer>
          <v-btn
            @click="submit"
            class="success mx-0 mt-3"
            :disabled="loading"
            :loading="loading"
          >Add Project</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "@/main";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
export default {
  name: "popup",
  data() {
    return {
      title: "",
      person: "",
      details: "",
      status: "",
      due: null,
      menu: false,
      loading: false,
      dialog: false
      //   inputRules: [
      //     v => !!v || "This field is required",
      //     v => v.length >= 3 || "Minimum length is 3 characters"
      //   ]
    };
  },
  methods: {
    submit() {
      this.loading = true;
      const project = {
        title: this.title,
        person: this.person,
        details: this.details,
        status: this.status,
        due: format(parseISO(this.due), "do MMM yyyy")
      };
      db.collection("projects")
        .add(project)
        .then(() => {
          this.loading = false;
          this.dialog = false;
          this.$emit("projectAdded");
        });
      //   }
    }
  },
  computed: {
    formattedDate() {
      //   console.log(this.due);
      return this.due ? format(parseISO(this.due), "do MMM yyyy") : "";
    }
  }
};
</script>

<style scoped>
</style>