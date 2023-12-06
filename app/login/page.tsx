//  ./app/login/page.tsx
"use client";
import { useRole } from "@/components/RoleContext"; // Import useRole

export default function Login() {
  const { userRole, setUserRole } = useRole(); // Access userRole and setUserRole

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(event.target.value); // Set the user's role
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
    <div className="p-16">
      
      <div className={"p-1"}>
        <div>
          <h1 className={"text-2xl font-semibold text-yellow-800 md:ml-[40vw] "}>Login Page</h1> 
        </div>
      </div>
  
      <label htmlFor="roleSelect">Select Role:</label>
      <select
        id="roleSelect"
        name="role"
        value={userRole}
        onChange={handleRoleChange}
      >
        {roleOptions.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <button>Login</button>
    </div>
  );
}
