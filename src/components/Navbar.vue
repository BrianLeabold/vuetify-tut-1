<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="10000" bottom color="success">
      <span>Awesome! You added a new project.</span>
      <v-btn color="white" text @click="snackbar = false">X</v-btn>
    </v-snackbar>
    <v-app-bar flat app dark color="primary">
      <v-app-bar-nav-icon
        class="grey--text hidden-md-and-up"
        @click.stop="drawer = !drawer"
        temporary
      ></v-app-bar-nav-icon>
      <v-spacer class="hidden-xs-only hidden-md-and-up"></v-spacer>
      <!--  TODO adjust font color  -->
      <router-link to="/" tag="span" style="cursor: pointer">
        <v-toolbar-title class="text-uppercase grey--text ml-sm-6">
          <span class="font-weight-light">Consult</span>
          <span>Brian</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text color="info" v-for="item in menuItems" :key="item.title" :to="item.route">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text color="info" class="hidden-xs-only">
            <v-icon>mdi-folder-account</v-icon>
          </v-btn>
        </template>
        <v-list flat>
          <v-list-item-group>
            <v-list-item v-for="item in accountItems" :key="item.title">
              <v-btn block outlined :to="item.route" color="primary">
                <v-icon class="mr-3">{{ item.icon }}</v-icon>
                <span>{{ item.text }}</span>
              </v-btn>
            </v-list-item>
            <v-list-item  v-if="userIsAuthenticated" @click="onLogout">
              <v-btn>
                <v-icon class="mr-3">mdi-exit-to-app</v-icon>
                <span>sign out</span>
              </v-btn>
            </v-list-item>
            <!-- <v-list-item>
              <v-btn block outlined to="/register" color="primary">
                <v-icon class="mr-3">mdi-account-plus</v-icon>
                <span class>register</span>
              </v-btn>
            </v-list-item>-->
            <!-- <v-list-item>
              <v-btn block outlined to="/login" color="primary">
                <v-icon class="ml-n6 mr-3">mdi-account</v-icon>
                <span class>login</span>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn block to="/logout" color="primary">
                <v-icon class="mr-3">mdi-exit-to-app</v-icon>
                <span class>sign out</span>
              </v-btn>
            </v-list-item>-->
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer app temporary v-model="drawer" class="primary xl">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img class="text-lg-center" alt="avatar" src="../assets/avatar-2.png" />
          </v-avatar>
          <p class="white--text subheading mt-1 text-center">Brian</p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <Popup @projectAdded="snackbar = true" />
        </v-flex>
      </v-layout>
      <v-list shaped>
        <v-list-item-group dark color="primary">
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
            class="white--text"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            {{ link.text }}
          </v-list-item>
          <v-list-item v-if="userIsAuthenticated"
          @click="onLogout">
            <v-list-item-icon>mdi-exit-to-app</v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup";
export default {
  components: { Popup },
  name: "navbar",
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        {
          icon: "mdi-format-list-bulleted-type",
          text: "Projects",
          route: "/projects"
        },
        // { icon: "", text: "Todo List", route: "/todo" },
        // { icon: "mdi-account-multiple", text: "Team", route: "/team" },
        // {
        //   icon: "mdi-account-card-details",
        //   text: "Profile",
        //   route: "/user/profile"
        // },
        { icon: "mdi-account-plus", text: "register", route: "/register" },
        { icon: "mdi-account", text: "login", route: "/login" },
        // { icon: "mdi-exit-to-app", text: "sign out", route: "/logout" }
      ],
      snackbar: false
    };
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    menuItems() {
      let menuItems = [
        { icon: "mdi-view-dashboard", text: "Home", route: "/" },
        { icon: "mdi-account-plus", text: "Services", route: "/register" },
        { icon: "mdi-account", text: "What's New", route: "/login" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "mdi-format-list-bulleted-type",
            text: "Projects",
            route: "/projects"
          },
          { icon: "", title: "New Project", link: "/projects/new" },
          {
            icon: "mdi-account-card-details",
            text: "Profile",
            route: "/user/profile"
          }
        ];
      }
      return menuItems;
    },
    accountItems() {
      let accountItems = [
        { icon: "mdi-account-plus", text: "register", route: "/register" },
        { icon: "mdi-account", text: "login", route: "/login" }
      ];
      if (this.userIsAuthenticated) {
        accountItems = [
          {
            icon: "mdi-account-card-details",
            text: "Profile",
            route: "/user/profile"
          },
          { icon: "mdi-exit-to-app", text: "sign out", route: "/logout" }
        ];
      }
      return accountItems;
    }
  }
};
</script>

<style scoped>
</style>