import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const loginUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser({});
  };

  const updateProfile = async (newName, newEmail) => {
    try {
      const formData = new FormData();
      formData.append("name", newName);
      formData.append("email", newEmail);

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/company/changeInformation/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      setUser({
        id: response.data.id,
        name: response.data.companyName,
        email: response.data.email,
        registrationStatus: response.data.registrationStatus,
        role: "company",
      });

      return { ok: true, status: response.status, data: response.data };
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        return {
          ok: false,
          status: error.response.status,
          data: error.response.data,
        };
      } else {
        // Network error or other issues
        return { ok: false, status: 500, data: { error: error.message } };
      }
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loginUser, logoutUser, updateProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};
