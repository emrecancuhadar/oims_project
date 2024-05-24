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
      const updatedCompany = await axios.put(
        `${process.env.REACT_APP_API_URL}/company/changeInformation/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser({
        id: updatedCompany.data.id,
        name: updatedCompany.data.companyName,
        email: updatedCompany.data.email,
        registrationStatus: updatedCompany.data.registrationStatus,
        role: "company",
      });
    } catch (error) {
      console.log("Error updating profile:", error);
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
