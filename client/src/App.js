import React, { useState, useEffect } from 'react'
import { Switch, useLocation } from 'react-router-dom';

import { AuthContext, PhotoContext, TextContext } from './context';
import { ProtectedRoute, AuthRoute } from './Routes'
import Landing from './components/Landing'
import Home from './components/Home'
import Sketchbook from './components/Sketchbook'
import Signup from './components/auth/Signup'
import Moodboard from './components/Moodboard'
import {setPhotos} from './state'

const App = () => {
    let location = useLocation();
    const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [otherUserId, setOtherUserId] = useState(null);
    const [currentTextBox, setCurrentTextBox] = useState('')
    const [currentPhoto, setCurrentPhoto] = useState(null)
    const [text, setText] = useState('enter text')

    const authContextValue = {
        fetchWithCSRF,
        currentUserId,
        setCurrentUserId,
        otherUserId,
        setOtherUserId
    }

    useEffect(() => {
        async function restoreCSRF() {
            const response = await fetch('/api/csrf/restore', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const authData = await response.json();
                setFetchWithCSRF(() => {
                    return (resource, init) => {
                        if (init.headers) {
                            init.headers['X-CSRFToken'] = authData.csrf_token;
                        } else {
                            init.headers = {
                                'X-CSRFToken': authData.csrf_token,
                            };
                        }
                        return fetch(resource, init);
                    };
                });
                if (authData.current_user_id) {
                    setCurrentUserId(authData.current_user_id);
                }
            }
            setLoading(false);
        }
        restoreCSRF();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <AuthContext.Provider value={authContextValue}>
                <Switch >
                    <AuthRoute path='/landing' component={Landing} />
                    <AuthRoute
                        path="/Signup"
                        component={Signup}
                        currentUserId={currentUserId}
                    />
                    <ProtectedRoute
                        path="/"
                        exact
                        component={Home}
                        currentUserId={currentUserId}
                    />
                    <ProtectedRoute
                        path="/moodboard"
                        exact
                        component={Moodboard}
                        currentUserId={currentUserId}
                    />
                    <ProtectedRoute
                        path="/sketchbook/:id/:title"
                        exact
                        component={Sketchbook}
                        currentUserId={currentUserId}
                    />
                    <ProtectedRoute
                        path="/sketchbook/new-board/:id/:sketchbookTitle/:boardTitle"
                        exact
                        component={Moodboard}
                        currentUserId={currentUserId}
                    />
                </Switch>
        </AuthContext.Provider>
    )
}


export default App;
