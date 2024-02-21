import { createContext, useState, ReactNode, useContext } from "react"


interface ContentOrderProps {
    section: number
    setSection: React.Dispatch<React.SetStateAction<number>>
}


export const ContentOrderContext = createContext<ContentOrderProps | undefined> (undefined)

const ContentOrderContextProvider = ({children}: {children: ReactNode}) => {
    const [section, setSection] = useState<number>(0)
    const value = {
        section,
        setSection
    }
    return (
        <ContentOrderContext.Provider value={value}> {children} </ContentOrderContext.Provider>
    )
}

export default ContentOrderContextProvider;

export const useContentOrderContext = () => {
    const context = useContext(ContentOrderContext)
    if(!context) {
        throw new Error("error in content order context")
    }
    return context
}