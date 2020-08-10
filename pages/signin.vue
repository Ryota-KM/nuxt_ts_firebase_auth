<template>
  <v-form>
    <v-container>
      <v-text-field label="Email" v-model="user.email"></v-text-field>
      <v-text-field label="Password" v-model="user.password"></v-text-field>
      <v-btn color="primary" @click="login">ログイン</v-btn>
      <v-btn color="primary" @click="googleAuth">Googleでログイン</v-btn>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import firebase from '@/plugins/firebase';
import { mapGetters, mapActions } from 'vuex';

const Super = Vue.extend({
  methods: {
    ...mapActions({ setEmail: 'user/setEmail' }),
  },
});

@Component
export default class Singin extends Super {
  user = {
    email: '',
    password: '',
  };

  redirectToTop() {
    this.$router.push('/');
  }

  // Email/Password Credential
  login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
        this.setEmail(this.user.email);
        this.redirectToTop();
      })
      .catch(e => alert(e.message));
  }

  // Google OAuth
  async googleAuth() {
    const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().languageCode = 'ja';
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setEmail(result.user?.email);
        console.log(result.user?.displayName);
        this.redirectToTop();
      })
      .catch(e => console.log(e));
  }
}
</script>
