
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
                clientEmail: true,
                quantity: true,
                rate: true,
                total: true,
                date: true,
                dueDate: true,
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
                name: true,
                clientName: true,
                clientAddress:true,
                clientEmail: true,
                fromName: true,
                fromAddress: true,
                fromEmail: true,
                description: true,
                quantity: true,
                rate: true,
                total: true,
                date: true,
                status: true,
                currency: true,
                note: true,
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