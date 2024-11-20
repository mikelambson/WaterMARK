"use client"
import { useEffect, useState } from "react";

interface ProfileProps {
    className?: string;
}

export const Profile = ({ className }:ProfileProps) => {
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

     // Recursive function to render nested fields
     const renderField = (key: string, value: any, level: number = 0): JSX.Element => {
        if (Array.isArray(value)) {
            return (
                <li key={key} style={{ marginLeft: `${level * 20}px` }}>
                    <strong>{key}:</strong>
                    <ul>
                        {value.map((item, index) =>
                            typeof item === "object" ? (
                                <li key={index}>{renderField(`${key}[${index}]`, item, level + 1)}</li>
                            ) : (
                                <li key={index} style={{ marginLeft: `${(level + 1) * 20}px` }}>
                                    {item.toString()}
                                </li>
                            )
                        )}
                    </ul>
                </li>
            );
        } else if (typeof value === "object" && value !== null) {
            return (
                <li key={key} style={{ marginLeft: `${level * 20}px` }}>
                    <strong>{key}:</strong>
                    <ul>
                        {Object.entries(value).map(([nestedKey, nestedValue]) =>
                            renderField(nestedKey, nestedValue, level + 1)
                        )}
                    </ul>
                </li>
            );
        } else {
            return (
                <li key={key} style={{ marginLeft: `${level * 20}px` }}>
                    <strong>{key}:</strong> {value?.toString()}
                </li>
            );
        }
    };

    return (
        <div className={className}>
             {profileData ? (
                <div>
                    <h1>Profile Data</h1>
                    <ul>
                        {Object.entries(profileData).map(([key, value]) => renderField(key, value))}
                    </ul>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}; 
