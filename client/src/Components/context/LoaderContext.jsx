import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [loadingcont, setLoadingcont] = useState(false)

    return (
        <LoaderContext.Provider value={{setLoadingcont, loadingcont}}>
            {children}
        </LoaderContext.Provider>
    )
}

export const useLoader = () => useContext(LoaderContext);
