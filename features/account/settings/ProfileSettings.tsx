"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuthStore } from "@/lib/store/authStore";

const ProfileSettings: React.FC = () => {
    const { userData } = useAuthStore();

    // Convert userData object into an array of key-value pairs
    const profile = userData
        ? Object.entries(userData).map(([key, value]) => ({ key, value }))
        : [];

    const handleUpdate = (key: string, newValue: string) => {
        // Update logic here
        console.log(`Updated ${key} with value ${newValue}`);
    };

    return (
        <div className="profile-settings">
            <h2>Profile Settings</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Setting</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {profile.map((item) => (
                        <TableRow key={item.key}>
                            <TableCell className="max-w-16">
                                {item.key}
                            </TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    defaultValue={item.value as string}
                                    onBlur={(e) => handleUpdate(item.key, e.target.value)}
                                    className={item.key == "id" ? "w-full" : "input w-full"}
                                />
                            </TableCell>
                            <TableCell>
                                <button
                                    onClick={() => handleUpdate(item.key, item.value as string)}
                                    className="button"
                                >
                                    Update
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ProfileSettings;
