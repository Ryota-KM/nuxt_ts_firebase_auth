import { firestoreAction } from 'vuexfire';
import firebase from '@/plugins/firebase';

export const state = () => ({
  userRef: [],
  email: '',
});

export const getters = {
  ['userRef'](state: any) {
    return state.userRef;
  },
  ['email'](state: any) {
    return state.email;
  },
};

export const mutations = {
  ['setEmail'](state: any, payload: string) {
    state.email = payload;
  },
};

export const actions = {
  vuexfireInit: firestoreAction(({ bindFirestoreRef }, payload) => {
    bindFirestoreRef(
      'userRef',
      firebase.firestore().collection('users').where('email', '==', payload)
    );
  }),
  ['setEmail']({ commit }: any, payload: string) {
    commit('setEmail', payload);
  },
};
