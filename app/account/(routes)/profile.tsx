"use client"
import { useEffect, useState } from "react";


export const Profile = () => {
    const [profileData, setProfileData] = useState<Record<string, any> | null>(null); // Use a flexible type for dynamic data
    const profileRoute = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/profile`

    useEffect(() => {
        const fetchProfileData = async () => {
            const response = await fetch(profileRoute, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Origin': 'https://backend.watermark.work',
                },
                credentials: 'include',
            });
        
            if (!response.ok) {
                throw new Error('Login failed'); // Throw an error if the response is not ok
            }
            
            const data = await response.json();
            setProfileData(data);
        };

        fetchProfileData();
        
        
    }, []);

    console.log("Profile: ", profileData);

    return (
        <div>
            {profileData ? (
                <div>
                    <h1>Profile Data</h1>
                    <ul>
                        {Object.entries(profileData).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {typeof value === "object" ? JSON.stringify(value) : value.toString()}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}; 
