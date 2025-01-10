"use client";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface ProfileObject {
    id: string;
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    title?: string;
    active: boolean;
    tcid_staff: boolean;
    // protected: boolean;
}

interface ProfileField {
    key: keyof ProfileObject;
    label: string;
    editable: boolean;
}
  
const profileFields: ProfileField[] = [
{ key: "id", label: "ID", editable: false },
{ key: "email", label: "Email", editable: true },
{ key: "firstName", label: "First Name", editable: true },
{ key: "middleName", label: "Middle Name", editable: true },
{ key: "lastName", label: "Last Name", editable: true },
{ key: "title", label: "Title", editable: false },
{ key: "active", label: "Active", editable: false },
{ key: "tcid_staff", label: "TCID Staff", editable: false },
// { key: "protected", label: "Protected", editable: false },
];

const ProfileSettings = () => {
    const [profileData, setProfileData] = useState<Record<string, any> | null>(null); 
    const [editableValues, setEditableValues] = useState<Partial<ProfileObject>>({});
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


    const defaultProfile: ProfileObject = {
        id: "",
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        title: "",
        active: false,
        tcid_staff: false,
        // protected: false,
    };

    // Convert userData object into an array of key-value pairs
    const profile: ProfileObject = {
        ...defaultProfile,
        ...(profileData as Partial<ProfileObject>),
    };

    const handleInputChange = (key: string, newValue: string) => {
        setEditableValues((prev) => ({
          ...prev,
          [key]: newValue,
        }));
    };
  
    const handleUpdate = (key: string, newValue: string) => {
        // Update logic here
        alert(`Updated ${key} with value ${newValue}`);
        // Optionally update the local profile data after a successful API response
        setProfileData((prev) => ({
            ...prev,
            [key]: newValue,
        }));
    };

    return (
        <div className="profile-settings">
            <div className="my-4">
                <Button variant="default" onClick={() => alert("Update Password")}>
                    Update Password
                </Button>
            </div>
            <h2 className="text-center">Profile Settings</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Setting</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {profileFields.map((field) => {
                        const value = profile[field.key];
                        const isEditable = field.editable;
                        return (
                        <TableRow key={field.key}>
                            <TableCell className="font-medium">{field.label}</TableCell>
                            <TableCell>
                            {isEditable ? (
                                <input
                                type="text"
                                value={
                                    editableValues[field.key] !== undefined
                                      ? String(editableValues[field.key])
                                      : value !== null && value !== undefined
                                      ? String(value)
                                      : ""
                                  }
                                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                                className="w-full p-2 border rounded"
                                />
                            ) : (
                                <input
                                type="text"
                                value={
                                    value !== null && value !== undefined ? String(value) : ""
                                }
                                readOnly
                                className="w-full p-2 border rounded bg-gray-100"
                                />
                            )}
                            </TableCell>
                            <TableCell>
                            {isEditable && (
                                <Button
                                onClick={() => handleUpdate(field.key, String(editableValues[field.key] || ""))}
                                variant={"default"}
                                className=""
                                >
                                Update
                                </Button>
                            )}
                            </TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default ProfileSettings;



