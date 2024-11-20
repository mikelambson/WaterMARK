"use client";
import { useRoleStore } from "@/components/nav/RoleContext"; // Import useRole
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


export default function Login() {
    const { userRole, setUserRole } = useRoleStore((state) => state); // Access userRole and setUserRole
    
    const handleRoleChange = (role: string) => {
        setUserRole([role]); // Update userRole when the role changes
    };

    // Define an array of role options
    const roleOptions = [
        "Admin",
        "Staff",
        "Watermaster",
        "Scheduler",
        "Ditchrider",
        "Senior Analyst",
        "Analyst",
        "Anonymous",
        
        // Add other roles as needed
    ];

    return (
        <div className="px-2">
            <div className={"pt-4"}>
                <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>
                    Profile/Login Page
                </h1> 
            </div>
            <div className="flex flex-col gap-4 mt-8 justify-center">
                <h2 className="text-xl text-center"> 
                    {userRole.includes("Anonymous") ? "Please login to view your profile" : `Welcome ${userRole.join(", ")}`}
                    
                </h2>
                
                <h3 className="text-center">You are currently using viewing as: {userRole.join(", ")}</h3>
            
            </div>
            <div className="mt-24 flex flex-col gap-2 text-center justify-center items-center">
                <h3 className="text-xl">Veiw as:</h3>
                <Select onValueChange={handleRoleChange}>
                    <SelectTrigger className="w-48 border-foreground/80" value={userRole}>
                        <SelectValue id="selectedRole" placeholder={userRole} />
                    </SelectTrigger>
                    <SelectContent>
                        {roleOptions.map((role) => (
                            <SelectItem
                                key={role}
                                value={role}                                
                            >
                                {role}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
            </div>
        </div>  
    );
}