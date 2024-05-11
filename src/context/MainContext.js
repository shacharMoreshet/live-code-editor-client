import React, { useState } from 'react'

const MainContext = React.createContext()

const MainProvider = ({ children }) => {
    const [activeUser, setActiveUser] = useState({})

    return (
        <MainContext.Provider value={{ activeUser, setActiveUser}}>
            {children}
        </MainContext.Provider>
    )
}

export { MainContext, MainProvider } 