import ProfileSettings from '@/features/account/settings/ProfileSettings';

export default function UserSettings() {
    
    return (
        <div className="px-2">
            <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center pt-4"}>
                User Settings
            </h1>
            <ProfileSettings />
            <div className="mt-14 mb-2 text-center text-foreground/50">
                Profile Management
            </div>
        </div>  
    );
}