<template>
  <v-toolbar dark class="toolbar">
    <v-row class="align-center">
      <v-col cols="2">
        <v-toolbar-title class="headline" @click="changeRoute('/')">
          Book Library
        </v-toolbar-title>
      </v-col>

      <v-spacer></v-spacer>

      <nav class="nav-menu">
        <ul>
          <li v-if="!isAuthorized"><router-link :to="'login'">Login</router-link></li>
          <li v-if="!isAuthorized"><router-link :to="'registration'">Register</router-link></li>
          <li v-if="isAuthorized" @click="makeLogout">Logout</li>
        </ul>
      </nav>
    </v-row>
  </v-toolbar>
</template>

<script>
import { changeRoute } from '@/utils/helpers/router'
import { getNotification } from '@/utils/helpers/notification'
import axios from '@/http'

export default {
  methods: {
    changeRoute,
    async makeLogout() {
      await axios.delete(`/api/auth/logout`)
      localStorage.clear()
      changeRoute('/login')
      getNotification({ message: "Logout is successful!", variant: "success" })
    }
  },
  computed: {
    isAuthorized() {
      return localStorage.getItem('isAuthorized')
    }
  },
  name: "Header",
};
</script>

<style scoped lang='scss'>
@import "@/styles/_variables.scss";

.toolbar {
  max-height: 64px;
  height: 64px;
}
.nav-menu {
  margin-right: 15px;
}
.headline {
  cursor: pointer;
  width: fit-content;
}
ul {
  list-style-type: none;
  display: flex;
  li {
    cursor: pointer;
    &:last-child {
      margin-left: 15px;
    }
    a {
      color: $white;
      text-decoration: none;
      transition: color 0.1s ease-in-out;
      &:hover {
        color: lighten($black, 40%);
      }
    }
  }
}
</style>