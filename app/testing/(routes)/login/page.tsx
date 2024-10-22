import LoginForm from "@/features/testing/login/loginForm"
import UserLoginForm from "@/components/auth/userLogin";

export default function Login() {

    return (
        <div className='p-4 ml-4'>
            <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>LOGIN DEVELOPMENT</h1>
            <div className="flex justify-around my-4">
                <div className="flex gap-4">
                    
                    <LoginForm />
                    {/* <UserLoginForm /> */}
                    
                </div> 
            </div>
        </div>
    );
}
