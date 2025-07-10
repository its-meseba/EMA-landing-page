'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { LogIn, LogOut, RefreshCw, UserCheck, UserX } from 'lucide-react';


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
        // This logic ensures the SDK is initialized only once.
        if (window.FB) {
            setIsSdkLoaded(true);
            handleCheckStatus();

            return;
        }

        window.fbAsyncInit = () => {
            window.FB.init({
                appId: '1441811016993296', // Your App ID
                cookie: true,
                xfbml: true,
                version: 'v20.0', // Latest Graph API version
            });
            setIsSdkLoaded(true);
            // Check the login status once the SDK is loaded
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

    const getStatusIcon = () => {
        switch (status) {
            case 'connected':
                return <UserCheck className="mr-2 h-5 w-5 text-green-500" />;
            case 'not_authorized':
                return <UserX className="mr-2 h-5 w-5 text-red-500" />;
            default:
                return <RefreshCw className="mr-2 h-5 w-5 text-gray-500 animate-spin" />;
        }
    }

    return (
        <>
            <Script
                id="facebook-jssdk"
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() => {
                    console.log('Facebook SDK script has been loaded.');
                    // fbAsyncInit is called automatically by the SDK upon load
                }}
            />
            <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Facebook Integration</CardTitle>
                        <CardDescription>Login to your account to continue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center p-6 rounded-lg bg-secondary">
                            {getStatusIcon()}
                            <span className="font-semibold capitalize">{status}</span>
                        </div>

                        {status === 'connected' && userData && (
                            <div className="mt-4 text-center">
                                <h3 className="text-lg font-semibold">Welcome, {userData.name}!</h3>
                                <pre className="mt-2 text-left text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
                                    {JSON.stringify(userData, null, 2)}
                                </pre>
                            </div>
                        )}
                        {!isSdkLoaded && <p className='text-center mt-4'>Loading Facebook SDK...</p>}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button onClick={handleLogin} disabled={status === 'connected' || !isSdkLoaded} className="w-full">
                            <LogIn className="mr-2 h-4 w-4" /> Login with Facebook
                        </Button>
                        <Button onClick={handleLogout} disabled={status !== 'connected' || !isSdkLoaded} className="w-full" variant="destructive">
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                        <Button onClick={handleCheckStatus} className="w-full" variant="outline">
                            <RefreshCw className="mr-2 h-4 w-4" /> Check Status
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </>
    );
};

export default FacebookLoginPage;
