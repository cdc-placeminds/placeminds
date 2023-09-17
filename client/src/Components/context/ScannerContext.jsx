import { createContext, useContext, useState } from "react";

const ScannerContext = createContext();

export const ScannerProvider = ({ children }) => {
    const [selectedDrive, setSelectedDrive] = useState(""); // To store selected drive
    const [isOpenForAll, setIsOpenForAll] = useState(false);

    return (
        <ScannerContext.Provider value={{selectedDrive, setSelectedDrive, isOpenForAll, setIsOpenForAll }}>
            {children}
        </ScannerContext.Provider>
    )
}

export const useScannerData = () => useContext(ScannerContext);
