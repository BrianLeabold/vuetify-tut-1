<template>
  <v-container>
    <v-layout row mb-2>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Create new Project</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 ml-1 mr-1>
        <form @submit.prevent="onCreateProject">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                v-model="title"
                name="title"
                label="Title"
                id="title"
                required
                autofocus
                outlined
              ></v-text-field>
              <v-text-field
                v-model="imageUrl"
                name="imageUrl"
                label="Image"
                id="image-Url"
                required
                outlined
              ></v-text-field>
              <v-img src alt="previewImage"></v-img>
              <v-text-field
                v-model="person"
                name="person"
                label="Person"
                id="person"
                required
                outlined
              ></v-text-field>
              <v-textarea
                v-model="details"
                name="details"
                label="Details"
                id="details"
                required
                auto-grow
                outlined
              ></v-textarea>
              <v-text-field
                v-model="status"
                name="status"
                label="Status"
                id="status"
                required
                outlined
              ></v-text-field>
              <!-- <v-text-field v-model="date" name="date" label="Due Date" id="date" required outlined></v-text-field> -->
              <v-date-picker full-width v-model="date"></v-date-picker>
              <p>{{ date }}</p>
              <!-- <v-time-picker v-model="time" format="24hr"></v-time-picker>
              <p>{{ time }}</p>-->
              <v-dialog ref="dialog" v-model="modal2" persistent width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="time" label="Time" v-on="on"></v-text-field>
                </template>
                <v-time-picker v-if="modal2" v-model="time" full-width ampm-in-title>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
              <v-btn
                class="primary mx-0 mt-3"
                :disabled="!formIsValid"
                type="submit"
                :loading="loading"
              >Add Project</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "NewProject",
  data() {
    return {
      title: "",
      imageUrl: "",
      person: "",
      details: "",
      status: "",
      date: "",
      time: "",
      modal2: false,
      loading: false
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.imageUrl !== "" &&
        this.person !== "" &&
        this.details !== "" &&
        this.status !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        let hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    }
  },
  methods: {
    onCreateProject() {
      this.loading = true;
      if (!this.formIsValid) {
        return;
      }
      const projectData = {
        title: this.title,
        imageUrl: this.imageUrl,
        person: this.person,
        details: this.details,
        status: this.status,
        date: this.submittableDateTime
      };
      this.$store.dispatch("createProject", projectData);
      this.$router.push("/projects");
    }
  }
};
</script>

<style scoped>
</style>