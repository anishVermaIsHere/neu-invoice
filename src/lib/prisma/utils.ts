import { prisma } from "./db";
import { getAuth } from "@/auth";
import { InvoiceType, OnboardUserType } from "@/interfaces";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getStartEndDates } from "@/shared/utils";


const user = (await getAuth())?.user as User;
const dates = getStartEndDates();

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
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateUser = async (userId: string, user: OnboardUserType) => {
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

const findInvoices = async (userId: string, query: string) => {
  try {
    // await prisma.invoice.findMany({
    //   where: {
    //     userId: userId,
    //     invoiceNumber:{
    //         search: query
    //     }
    //   },
    // });

    //     return await prisma.$queryRaw`
    //     SELECT * FROM "Invoice"
    //     WHERE to_tsvector('english', "clientName") @@ to_tsquery('english', ${query});
    //   `;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getInvoices = async (
  userId: string,
  startDate: Date | string = dates.startDate,
  endDate: Date | string = dates.endDate,
  limit: number = 25,
  skip: number = 0,
) => {
  try {
    startDate = new Date(startDate.toString());
    endDate = new Date(endDate.toString());

    return prisma.invoice.findMany({
      take: limit,
      skip,
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lt: endDate,
        }
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
        userId: user?.id,
      },
      select: {
        id: true,
        invoiceNumber: true,
        name: true,
        clientName: true,
        clientAddress: true,
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
      },
    });
  } catch (error: any) {
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
};

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
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteInvoice = async (invoiceId: string) => {
  try {
    await prisma.invoice.delete({
      where: {
        id: invoiceId,
        userId: user?.id,
      },
    });
    return revalidatePath("/dashboard/invoices");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const markedAsPaid = async (invoiceId: string) => {
  try {
    await prisma.invoice.update({
      where: {
        id: invoiceId,
        userId: user?.id,
      },
      data: {
        status: "PAID",
      },
    });
    return revalidatePath("/dashboard/invoices");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getDashboardData = async (userId: string, startDate: Date | string = dates.startDate, endDate: Date | string = dates.endDate) => {
  try {
    startDate = new Date(startDate.toString());
    endDate = new Date(endDate.toString());
  
    const [total, paid, unpaid] = await Promise.all([
      prisma.invoice.findMany({
        where: {
          userId: userId,
          date: {
            gte: startDate,
            lte: endDate
          },
        },
        select: {
          total: true,
        },
      }),
      prisma.invoice.findMany({
        where: {
          userId: userId,
          status: "PAID",
          date: {
            gte: startDate,
            lte: endDate
          },
        },
        select: {
          id: true,
        },
      }),
      prisma.invoice.findMany({
        where: {
          userId: userId,
          status: "PENDING",
          date: {
            gte: startDate,
            lte: endDate
          },
        },
        select: {
          id: true,
        },
      }),
    ]);

    return {
      total,
      paid,
      unpaid,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getPaidInvoices = async (userId: string, startDate: Date | string = dates.startDate, endDate: Date | string = dates.endDate) => {
  try {
    startDate = new Date(startDate.toString()) || new Date();
    endDate = new Date(endDate.toString()) || new Date();

    const paidInvoices = await prisma.invoice.findMany({
      where: {
        status: "PAID",
        userId: userId,
        date: {
          gte: startDate,
          lte: endDate
        }
        // createdAt: {
        //   lte: new Date(),
        //   gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        // },
      },
      select: {
        createdAt: true,
        total: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const aggregatedData = paidInvoices.reduce(
      (acc: { [key: string]: number }, curr) => {
        const date = new Date(curr.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        acc[date] = (acc[date] || 0) + curr.total;

        return acc;
      },
      {}
    );

    const finalInvoices = Object.entries(aggregatedData)
      .map(([date, amount]) => ({
        date,
        amount,
        originalDate: new Date(date + ", " + new Date().getFullYear()),
      }))
      .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
      .map(({ date, amount }) => ({
        date,
        amount,
      }));

    return finalInvoices;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {
  findUser,
  updateUser,
  findInvoices,
  getInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  markedAsPaid,
  getDashboardData,
  getPaidInvoices,
};
