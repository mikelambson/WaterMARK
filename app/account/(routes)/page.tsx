"use client";
import { useRole } from "@/components/nav/RoleContext"; // Import useRole
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";



export default function Login() {
  const { userRole, setUserRole } = useRole(); // Access userRole and setUserRole

  const handleRoleChange = (role:string) => {
    setUserRole(role); // Set the user's role
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

            <Button disabled>
                    Login
                </Button>
        
            <div className="mt-24 flex gap-2 text-center justify-center items-center">
                <label className="text-xl">Veiw as:</label>
                <Select onValueChange={handleRoleChange}>
                    <SelectTrigger className="w-48 border-foreground/80">
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