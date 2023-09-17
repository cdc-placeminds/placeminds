import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setalert] = useState(null)

    const showalert = (head, msg, type) => {
        setalert({
            head, msg, type
        });

        setTimeout(() => {
            setalert(null)
        }, 3000);
    }

    return (
        <AlertContext.Provider value={{showalert, alert}}>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext);
