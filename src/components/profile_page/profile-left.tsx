

import { useSession } from "next-auth/react"
import Image from "next/image"
import defaultImage from  "public/picture/portrait1.jpg"

const ProfileLeft = () => {
    const {data: session} = useSession()
    const userImage = session?.user?.image
    const userName = session?.user?.name
    return (
        <div className="h-screen border-l mr-60 pl-14">
            <div className="flex h-20 w-20 items-center overflow-hidden mt-10">
                <Image
                src={userImage || defaultImage}
                width={100}
                height={100}
                alt="profileicture"
                className="h-full w-full rounded-full object-cover"
                ></Image>
            </div>
            <div className=" mt-5 text-nowrap text-xl font-semibold">
                {userName}
            </div>
        </div>
    )
}

export default ProfileLeft