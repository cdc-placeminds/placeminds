import { createContext, useContext, useState } from "react";

const DriveDataContext = createContext();

export const DriveDataProvider = ({ children }) => {
    const [driveData, setdriveData] = useState({data: ""})

    return (
        <DriveDataContext.Provider value={{ driveData, setdriveData }}>
            {children}
        </DriveDataContext.Provider>
    )
}

export const useDriveData = () => useContext(DriveDataContext);
