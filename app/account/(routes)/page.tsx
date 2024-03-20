//  ./app/login/page.tsx
"use client";
import { useRole } from "@/components/nav/RoleContext"; // Import useRole

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
    <div className="">
      
      <div className={"p-1 flex-col text-center"}>
        <div>
          <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>Profile/Login Page</h1> 
        </div>
      
        <div className="mt-10">
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
      </div>
    </div>
  );
}
