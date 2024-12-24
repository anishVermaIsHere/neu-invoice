import { prisma } from "./db";
import { getAuth } from "@/auth";
import { InvoiceType, OnboardUserType } from "@/interfaces";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";



const user = (await getAuth())?.user as User;

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

const updateUser = async (userId:string, user: OnboardUserType) => {
    try {
        return await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              firstName: user.firstName,
              lastName: user.lastName,
              address: user.address,
            },
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
        return await prisma.invoice.findUnique({
            where: {
                id: invoiceId,
                userId: user?.id
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
                dueDate: true,
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

const addInvoice = async (invoice: InvoiceType) => {
    try {
        return await prisma.invoice.create({
            data: {
              clientAddress: invoice.clientAddress,
              clientEmail: invoice.clientEmail,
              clientName: invoice.clientName,
              currency: invoice.currency,
              date: invoice.date,
              dueDate: invoice.dueDate,
              fromAddress: invoice.fromAddress,
              fromEmail: invoice.fromEmail,
              fromName: invoice.fromName,
              description: invoice.description,
              quantity: invoice.quantity,
              rate: invoice.rate,
              name: invoice.name,
              invoiceNumber: invoice.invoiceNumber,
              status: invoice.status,
              total: invoice.total,
              note: invoice.note,
              userId: user?.id,
            },
          });
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}

const updateInvoice = async (invoiceId: string, invoice: InvoiceType) => {
    try {
        return await prisma.invoice.update({
            where: {
              id: invoiceId,
              userId: user?.id,
            },
            data: {
              clientAddress: invoice.clientAddress,
              clientEmail: invoice.clientEmail,
              clientName: invoice.clientName,
              currency: invoice.currency,
              date: invoice.date,
              dueDate: invoice.dueDate,
              fromAddress: invoice.fromAddress,
              fromEmail: invoice.fromEmail,
              fromName: invoice.fromName,
              description: invoice.description,
              quantity: invoice.quantity,
              rate: invoice.rate,
              name: invoice.name,
              invoiceNumber: invoice.invoiceNumber,
              status: invoice.status,
              total: invoice.total,
              note: invoice.note,
            },
          });
        
    } catch (error: any ) {
        throw new Error(error.message);
    }
}

const deleteInvoice = async (invoiceId: string)=>{
    try {
        await prisma.invoice.delete({
            where: {
                id: invoiceId,
                userId: user?.id,
            }
        });
        return revalidatePath('/dashboard/invoices');
    } catch (error: any) {
        throw new Error(error.message);
    }
}

const markedAsPaid = async (invoiceId: string) => {
    try {
        await prisma.invoice.update({
            where: {
                id: invoiceId,
                userId: user?.id,
            },
            data: {
                status: "PAID"
            }
        });
        return revalidatePath('/dashboard/invoices');
    } catch (error: any) {
        throw new Error(error.message);
    }

}

const getDashboardData = async(userId: string)=>{
    try {
        return await prisma.invoice.findMany({
            where:{
                userId: userId,
            },
            select: {
                id: true,
                quantity: true,
                total: true,
                status: true,
                currency: true,
                createdAt: true,
            }
        })
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export {
    findUser,
    updateUser,
    getInvoices,
    getInvoice,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    markedAsPaid,
    getDashboardData
}