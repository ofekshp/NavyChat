export interface IUser {
    email: string;
    password?: string;
    username: string;
    _id?: string;
}

export interface IloginUser {
    email: string;
    password: string;
}

class UserService {
   
    registerUser = async (user: IUser) => {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const apiUrl = `${baseURL}/auth/register`;
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          console.log("Response:", response);
          if (response.ok) {
            return true;
          } else {
            const errorData = await response.json();
            console.log("Error:", errorData);
            return false;
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      loginUser = async (user: IloginUser) => {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const apiUrl = `${baseURL}/auth/login`;
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
          console.log('Response:', response);
          if (response.ok) {
              return true;
            }
           else {
            const errorData = await response.json();
            console.log("Error:", errorData);
            return false;
          }
        
        } catch (error) {
          console.error('Login error:', error); // Log fetch error
        }
      };
}

export default UserService;