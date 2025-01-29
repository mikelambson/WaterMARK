import { useRole } from "@/lib/context/RoleContext"; // Import useRole

export const navbarLinks = () => {

const { userRole } = useRole();
const onlineScheduleName =
        Array.isArray(userRole) &&
        userRole.some((role) => role === "Anonymous" || role === "any")
            ? "Schedule"
            : "Public";


const dynamicReportLinks = Math.random() > 0.5 
    ? Array.from({ length: 10 }, (_, i) => `/reports/${i + 1}`)
    : Math.random().toString(36).substring(2, 42);

const roleBasedLinks = [
    {
            id: 0o0,
            link: "/",
            allowedRoles: ["any"],
            name: "Home",
            children: ["/"],
    },
    {
            id: 11,
            link: "/admin",
            allowedRoles: ["Staff", "Watermaster", "Analyst", "Senior Analyst", "administrator", "sysadmin", "Scheduler"],
            name: "Admin",
            children: ["/admin", "/admin/lookup", "/admin/callout", "/admin/adjustments", "/admin/post"],
    },
    {
            id: 22,
            link: "/meters",
            allowedRoles: ["any"],
            name: "Meters",
            children: ["/meters", "/meters/west", "/meters/central", "/meters/east", "/meters/truckee"],
    },
    {
            id: 33,
            link: "/scheduling",
            allowedRoles: ["Watermaster", "Scheduler", "administrator", "sysadmin", "Senior Analyst"],
            name: "Scheduling",
            children: [
                    "/scheduling",
                    "/scheduling/daily",
                    "/scheduling/board",
                    "/scheduling/schedule-orders",
                    "/scheduling/ditchrider-tasks",
                    "/scheduling/ditchrider-schedule",
                    "/scheduling/settings",
            ],
    },
    {
            id: 44,
            link: "/deliveries",
            allowedRoles: ["Watermaster", "Scheduler", "Ditchrider", "administrator", "sysadmin", "Senior Analyst"],
            name: "Deliveries",
            children: ["/deliveries", "/deliveries/schedule", "/deliveries/tasks", "/deliveries/ditchrider-schedule"],
    },
    {
            id: 55,
            link: "/analysis",
            allowedRoles: ["Scheduler", "administrator", "sysadmin", "Analyst", "Senior Analyst", "Watermaster"],
            name: "Analysis",
            children: [
                    "/analysis",
                    "/analysis/master",
                    "/analysis/meters",
                    "/analysis/adjustments",
                    "/analysis/settings",
            ],
    },
    {
            id: 66,
            link: "/reports",
            allowedRoles: ["Watermaster", "Senior Analyst", "administrator", "sysadmin", "Staff"],
            name: "Reports",
            children: ["/reports", ...dynamicReportLinks],
    },
    {
            id: 77,
            link: "/online-schedule",
            allowedRoles: ["any"],
            name: onlineScheduleName,
            children: [
                    "/online-schedule",
                    "/online-schedule/west",
                    "/online-schedule/central",
                    "/online-schedule/east",
                    "/online-schedule/truckee",
            ],
    },
];

const iconLinks = [
  {
      id: 88,
      link: "/system",
      allowedRoles: ["administrator", "sysadmin"],
      name: "System Administration",
      children: ["/system", "/system/users", "/system/meters", "/testing", "/testing/login", "/testing/scheduling"],
  },
];

return { roleBasedLinks, iconLinks };
}

export default navbarLinks;