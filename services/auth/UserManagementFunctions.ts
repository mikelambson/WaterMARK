import { useQuery, useMutation } from '@tanstack/react-query';


interface NewUserForm {
    login: string;
    fullname: string;
    email: string;
    password: string;
    tcidstaff: boolean;
    title: string;
    active: boolean;
    protected: boolean;
}

const usersRoute = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/manage/users`;

export const useUserData = (userType: string) => {
    return useQuery({
      queryKey: ['userData', userType],
      queryFn: () => fetchUserData(userType),
      retry: true,
      refetchOnWindowFocus: true,
    //   staleTime: 0,
    });
  };

export const useAddNewUser = () => {
    return useMutation({
        mutationFn: addNewUser,
        retry: true, // Retry on error
    });
};


const fetchUserData = async (userType?: string) => {
    const isStaff = userType === "staff";
    console.log(userType);
    let url = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/manage/users?tcid_staff=${isStaff}`;

    try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "https://backend.watermark.work",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        return data; // Update state with the fetched data
      } catch (error: any) {
        return error.message; // Set error if something goes wrong
      }
};

const addNewUser = async (newUser: NewUserForm) => {
    const response = await fetch(usersRoute, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

