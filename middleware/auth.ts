import { Middleware } from '@nuxt/types';
import firebase from '../plugins/firebase';

const middleware: Middleware = ({ route, redirect }) => {
  firebase.auth().onAuthStateChanged(user => {
    if (!user && route.name !== 'signin') redirect('/signin');
  });
};
export default middleware;
