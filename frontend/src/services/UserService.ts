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
    baseURL = import.meta.env.VITE_API_BASE_URL;
    registerUser = async (user: IUser) => {
        const apiUrl = `${this.baseURL}/auth/register`;
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
        console.log("Base URL:", this.baseURL);
        const apiUrl = `${this.baseURL}/auth/login`;
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

      searchUser = async (searchUseName: string) => {
        const apiUrl = `${this.baseURL}/auth/search`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: searchUseName}),
            });
    
            const result = await response.json();
    
            // Check if the response indicates user not found
            if (result.message === 'User do not exist') {
                throw new Error('User not found');
            }
    
            return result;
        } catch (error) {
            throw error;
        }
    };
   
}

export default UserService;