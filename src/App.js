import React, {useEffect} from 'react';
import Home from './screens/Home';
import Chat from './screens/Chat';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, firebase} from "./firebase";
import Login from './screens/Login';
import Loading from "./components/Loading";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App(props) {

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user) {
      db.collection('users').doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL
      }, { merge: true})
    }
  }, [user])

  if(loading) return <Loading />

  if(!user) return <Login />

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/chat/:id" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;