import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserTemplate from "@/app/system/_components/manusers/usertemplate";


const ManageUsers = () => {
    return ( 
        <div className="p-2">
           <div className="flex flex-col md:grid md:grid-cols-3 mb-2 gap-3">
                {/* Select Dropdown */}
                <div className="justify-center lg:col-start-1">
                    <Select>
                    <SelectTrigger className="w-[180px] font-semibold text-lg pl-4">
                        <SelectValue placeholder="Select" defaultValue={"staff"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="wateruser">Wateruser</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                {/* h1 - User Management */}
                <h1 className="text-2xl font-semibold justify-self-center self-center order-first md:order-none animate-pulse text-yellow-950 dark:text-orange-300">
                    User Management
                </h1>

                {/* Add User Button */}
                <div className="md:col-start-3 md:justify-self-end">
                    <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"secondary"} className="w-[180px] text-lg">Add User</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                            Best practice login should be lower case first initial and last name.
                        </DialogDescription>
                        </DialogHeader>
                        <Input type="login" placeholder="Login" />
                        <Input type="first" placeholder="First Name" />
                        <Input type="last" placeholder="Last Name" />
                        <Input type="email" placeholder="Email" />
                    </DialogContent>
                    </Dialog>
                </div>
            </div>
            <UserTemplate />
            
        </div>
     );
}
 
export default ManageUsers;