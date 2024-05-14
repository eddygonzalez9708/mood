import { prisma } from "@/utils/db"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const createNewUser = async () => {
    const user = await currentUser()
    console.log('user ', user)
    const match = await prisma.user.findUnique({
        where: {
            clerkId: user.id as string,
        }
    })

    if (!match) {
        const nwUser = await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
            }
        })
    }

    redirect('/journal')
}

const NewUser = async () => {
    await createNewUser()
    return <div>...loading</div>
}

export default NewUser