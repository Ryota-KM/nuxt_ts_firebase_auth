<template>
  <v-container>
    <div><v-btn @click="logout">ログアウト</v-btn></div>
    <p v-for="(user, index) in userRef" :key="index">{{ user.name }}</p>
    <PasswordCredentialSet />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import firebase from '@/plugins/firebase';
import { mapGetters } from 'vuex';
import PasswordCredentialSet from '@/components/PasswordCredentialSet.vue';

const Super = Vue.extend({
  computed: {
    ...mapGetters({ userRef: 'user/userRef', email: 'user/email' }),
  },
});

@Component({
  components: {
    PasswordCredentialSet,
  },
})
export default class IndexPage extends Super {
  async logout() {
    await firebase.auth().signOut();
    this.$router.push('/signin');
  }

  created() {
    this.$store.dispatch('user/vuexfireInit', this.email);
  }
}
</script>
