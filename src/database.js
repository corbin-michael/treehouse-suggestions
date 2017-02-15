import Firebase from 'firebase'
// Initialize Firebase
var config = {
 apiKey: "AIzaSyANqgYDzqdL-caZSTKBnf_xRB6uMgUbuUE",
 authDomain: "treehouse-suggestions.firebaseapp.com",
 databaseURL: "https://treehouse-suggestions.firebaseio.com",
 storageBucket: "treehouse-suggestions.appspot.com",
 messagingSenderId: "946992714440"
};
const firebaseApp = Firebase.initializeApp(config);
export default firebaseApp;
