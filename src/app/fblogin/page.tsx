'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';

// Define the type for the Facebook response
interface FBLoginStatusResponse {
    status: 'connected' | 'not_authorized' | 'unknown';
    authResponse?: {
        accessToken: string;
        expiresIn: number;
        signedRequest: string;
        userID: string;
    };
}

interface FBError {
    message: string;
}

interface FBUser {
    id: string;
    name: string;
    email?: string;
}

// Extend the Window interface to include Facebook-related properties
declare global {
    interface Window {
        fbAsyncInit: () => void;
        FB: {
            init: (params: {
                appId: string;
                cookie: boolean;
                xfbml: boolean;
                version: string;
            }) => void;
            AppEvents: {
                logPageView: () => void;
            };
            getLoginStatus: (callback: (response: FBLoginStatusResponse) => void) => void;
            login: (callback: (response: FBLoginStatusResponse) => void, options?: { scope: string }) => void;
            logout: (callback: (response: FBLoginStatusResponse) => void) => void;
            api: (path: string, callback: (response: any) => void) => void;
        };
    }
}

const FacebookLoginPage = () => {
    const [status, setStatus] = useState<FBLoginStatusResponse['status']>('unknown');
    const [userData, setUserData] = useState<FBUser | null>(null);
    const [isSdkLoaded, setIsSdkLoaded] = useState(false);

    // This function is the callback for getLoginStatus, login, and logout
    const handleResponse = (response: FBLoginStatusResponse) => {
        console.log('Facebook response:', response);
        setStatus(response.status);

        if (response.status === 'connected') {
            console.log('User is connected.');
            fetchUserData();
        } else {
            console.log('User is not connected.');
            setUserData(null);
        }
    };

    const fetchUserData = () => {
        if (window.FB) {
            window.FB.api('/me?fields=id,name,email', (user: FBUser & FBError) => {
                if (user && !user.message) {
                    console.log('Fetched user data:', user);
                    setUserData(user);
                } else {
                    console.error('Error fetching user data:', user);
                }
            });
        }
    };

    // Initialize the SDK
    useEffect(() => {
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: '1441811016993296',
                cookie: true,
                xfbml: true,
                version: 'v20.0',
            });
            setIsSdkLoaded(true);
            window.FB.getLoginStatus(handleResponse);
        };
    }, []);

    const handleLogin = () => {
        if (!window.FB) {
            console.error('Facebook SDK not loaded.');

            return;
        }
        window.FB.login(handleResponse, { scope: 'public_profile,email' });
    };

    const handleLogout = () => {
        if (!window.FB) {
            console.error('Facebook SDK not loaded.');

            return;
        }
        window.FB.logout(handleResponse);
    };

    const handleCheckStatus = () => {
        if (!window.FB) {
            console.error('Facebook SDK not loaded.');

            return;
        }
        window.FB.getLoginStatus(handleResponse);
    }

    return (
        <>
            <Script
                id="facebook-jssdk"
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() => {
                    console.log('Facebook SDK script has been loaded.');
                }}
            />
            <div style={{ padding: '20px', fontFamily: 'sans-serif', color: 'black', minHeight: '100vh' }}>
                <h1>Facebook Login Example</h1>
                <p>This page demonstrates a simple Facebook login integration using a custom button.</p>

                {!isSdkLoaded && <p>Loading Facebook SDK...</p>}

                {isSdkLoaded && (
                    <div>
                        <button onClick={handleLogin} disabled={status === 'connected'} style={{ marginRight: '10px', padding: '10px', cursor: 'pointer', color: 'black', background: 'lightgray', border: '1px solid black' }}>Login with Facebook</button>
                        <button onClick={handleLogout} disabled={status !== 'connected'} style={{ marginRight: '10px', padding: '10px', cursor: 'pointer', color: 'black', background: 'lightgray', border: '1px solid black' }}>Logout</button>
                        <button onClick={handleCheckStatus} style={{ padding: '10px', cursor: 'pointer', color: 'black', background: 'lightgray', border: '1px solid black' }}>Check Login Status</button>
                    </div>
                )}

                <h2 style={{ marginTop: '20px' }}>Current Status: <span style={{ textTransform: 'capitalize' }}>{status}</span></h2>

                {status === 'connected' && userData && (
                    <div>
                        <h3>Welcome, {userData.name}!</h3>
                        <p>Here's your data:</p>
                        <pre style={{ background: '#f0f0f0', color: 'black', padding: '10px', borderRadius: '5px' }}>
                            {JSON.stringify(userData, null, 2)}
                        </pre>
                    </div>
                )}

                {status === 'connected' && !userData && <p>Fetching user data...</p>}
            </div>
        </>
    );
};

export default FacebookLoginPage;
