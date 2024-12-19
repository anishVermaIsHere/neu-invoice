
import { prisma } from "./db";

const findUser = async (userId: string) => {
    return prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            firstName: true,
            lastName: true,
            address: true,
            email: true,
        }
    });
};


export {
    findUser
}