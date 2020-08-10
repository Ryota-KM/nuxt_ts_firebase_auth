<template>
  <v-form>
    <v-container>
      <v-text-field label="Password" v-model="password"></v-text-field>
      <v-btn color="primary" @click="setPassword">{{ context }}</v-btn>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import firebase from '@/plugins/firebase';
import { mapGetters, mapActions } from 'vuex';

const Super = Vue.extend({
  computed: {
    ...mapGetters({ userRef: 'user/userRef', email: 'user/email' }),
  },
});

@Component
export default class Singin extends Super {
  password = '';

  async setPassword() {
    const email = firebase.auth().currentUser?.email as string;
    const credential = await firebase.auth.EmailAuthProvider.credential(
      email,
      this.password
    );
    await firebase
      .auth()
      .currentUser?.linkWithCredential(credential)
      .then(() => alert(`パスワードを${this.context}しました`))
      .catch(e => alert(e.message));
  }

  get context(): string {
    return !!firebase.auth().currentUser?.emailVerified ? '変更' : '設定';
  }
}
</script>
