import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from '../firebase/firebase.config';
export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);

    const createUser = (email, password, confirm) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password, confirm);
    }
    const signIn = (email, password) => {
        // setUser(email);
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log(currentUser);
        })
        return () => unsubscribe();
    }, [])
    const authInfo = { user, createUser, signIn, logOut, loading };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;