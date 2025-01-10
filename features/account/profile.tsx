"use client"
import { useEffect, useState } from "react";

interface ProfileProps {
    className?: string;
}

const renderField = (key: string, value: any, level: number = 0): JSX.Element => {
    const indentStyle = { paddingLeft: `${level * 20}px` }; // Indentation for hierarchy

    if (Array.isArray(value)) {
        // Handle arrays
        return (
            <div key={key} style={indentStyle}>
                <strong>{key}:</strong>
                <div>
                    {value.map((item, index) =>
                        typeof item === "object" ? (
                            <div key={`${key}-${index}`} style={{ paddingLeft: `${(level + 1) * 20}px` }}>
                                {renderField(`${key}[${index}]`, item, level + 1)}
                            </div>
                        ) : (
                            <div key={`${key}-${index}`} style={{ paddingLeft: `${(level + 1) * 20}px` }}>
                                {item.toString()}
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    } else if (typeof value === "object" && value !== null) {
        // Handle objects
        return (
            <div key={key} style={indentStyle}>
                <strong>{key}:</strong>
                <div>
                    {Object.entries(value).map(([nestedKey, nestedValue]) =>
                        renderField(nestedKey, nestedValue, level + 1)
                    )}
                </div>
            </div>
        );
    } else {
        // Handle primitive values
        return (
            <div key={key} style={indentStyle}>
                <strong>{key}:</strong> {value?.toString()}
            </div>
        );
    }
};

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

    return (
        <div className={className}>
             {profileData ? (
                <div>
                    <h1>Profile Data</h1>
                    <div>
                        {Object.entries(profileData).map(([key, value]) => renderField(key, value))}
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}; 
