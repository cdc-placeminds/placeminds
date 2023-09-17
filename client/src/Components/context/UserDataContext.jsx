import { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [userData, setuserData] = useState({
        name:"", email: "", contact: "", enrollment: "", branch: "", year: "", gender: "", dob: "", drives: []
    })

    return (
        <UserDataContext.Provider value={{ userData, setuserData }}>
            {children}
        </UserDataContext.Provider>
    )
}

export const useUserData = () => useContext(UserDataContext);
