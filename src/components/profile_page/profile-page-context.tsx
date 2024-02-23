import { createContext, useState, ReactNode, useContext } from "react"




interface ProfilePageProps {
    intro: boolean,
    setIntro: React.Dispatch<React.SetStateAction<boolean>>,
    userIntroContent: boolean,
    setUserIntroContent: React.Dispatch<React.SetStateAction<boolean>>,
}


export const ProfilePageContext = createContext<ProfilePageProps | undefined> (undefined)


const ProfilePageContextProvider = ({children} : {children: ReactNode}) => {
    const [intro, setIntro] = useState<boolean>(false)
    const [userIntroContent, setUserIntroContent] = useState<boolean>(false)
    const value = {
        intro,
        setIntro,
        userIntroContent,
        setUserIntroContent
    }
    return (
        <ProfilePageContext.Provider value={value}> {children} </ProfilePageContext.Provider>
    )
}

export default ProfilePageContextProvider

export const useProfilePageContext = () => {
    const context = useContext(ProfilePageContext)
    if (!context) {
        throw new Error("error in profile page context")
    }
    return context
}