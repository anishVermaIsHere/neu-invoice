
import { prisma } from "./db";

const findUser = async (userId: string) => {
    try {
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
    } catch (error: any) {
        throw new Error(error.message);
    }

};

const getInvoices = async (userId: string)=>{
    try {
        return prisma.invoice.findMany({
            where: {
                userId: userId,
              },
              select: {
                id: true,
                invoiceNumber: true,
                clientName: true,
                quantity: true,
                rate: true,
                total: true,
                date: true,
                status: true,
                currency: true,
                createdAt: true,
              },
              orderBy: {
                createdAt: "desc",
              },
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
    
};

const getInvoice = async (invoiceId: string) => {
    try {
        return prisma.invoice.findUnique({
            where: {
                id: invoiceId,
              },
              select: {
                id: true,
                invoiceNumber: true,
                clientName: true,
                quantity: true,
                rate: true,
                total: true,
                date: true,
                status: true,
                currency: true,
                createdAt: true,
              }
        });
    }  catch (error: any) {
        throw new Error(error.message);
    }
    
};

export {
    findUser,
    getInvoices,
    getInvoice
}