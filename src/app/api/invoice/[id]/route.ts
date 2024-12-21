import { getInvoice } from "@/lib/prisma/utils";
import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import { formatCurrency } from "@/shared/utils";
import fs from "fs";
import path from "path";
import { format } from "date-fns";
import { CurrencyType } from "@/interfaces";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const invoiceId = (await params).id;

    const invoice = await getInvoice(invoiceId);

    if(!invoice){
        return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const pdf = new jsPDF({
        orientation: 'portrait',
        format: "a4",
        unit: "mm"
    });

    
  // set font
  pdf.setFont("helvetica");

  const imagePath = path.join(process.cwd(), "public", "neu-invoice.png");
  const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
  
  // Add the image to the PDF (image type PNG, and coordinates on the PDF)
  pdf.addImage(`data:image/png;base64,${imageBase64}`, 'PNG', 20, 10, 30, 10); 

 
  //set header
  pdf.setFontSize(24);
  pdf.text(invoice.name, 20, 30);

  // From Section
  pdf.setFontSize(12);
  pdf.text("FROM", 20, 40);
  pdf.setFontSize(10);
  pdf.text([invoice.fromName, invoice.fromEmail, invoice.fromAddress], 20, 45);

  // Client Section
  pdf.setFontSize(12);
  pdf.text("TO", 20, 70);
  pdf.setFontSize(10);
  pdf.text([invoice.clientName, invoice.clientEmail, invoice.clientAddress], 20, 75);

  // Invoice details
  pdf.setFontSize(10);
  pdf.text(`INVOICE No.: #${invoice.invoiceNumber}`, 120, 40);
  pdf.text(
    `Date: ${new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(invoice.date)}`,
    120,
    45
  );
  pdf.text(`Due Date: ${new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(invoice.date)}`, 120, 50);

  // Item table header
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("DESCRIPTION", 20, 100);
  pdf.text("QUANTITY", 100, 100);
  pdf.text("RATE", 130, 100);
  pdf.text("TOTAL", 160, 100);

  // draw header line
  pdf.line(20, 102, 190, 102);

  // Item Details
  pdf.setFont("helvetica", "normal");
  pdf.text(invoice.description, 20, 110);
  pdf.text(invoice.quantity.toString(), 100, 110);
  pdf.text(
    formatCurrency({
      amount: invoice.rate,
      currency: invoice.currency as CurrencyType,
    }),
    130,
    110
  );
  pdf.text(
    formatCurrency({ amount: invoice.total, currency: invoice.currency as CurrencyType }),
    160,
    110
  );

  // Total Section
  pdf.line(20, 115, 190, 115);
  pdf.setFont("helvetica", "bold");
  pdf.text(`TOTAL (${invoice.currency})`, 130, 130);
  pdf.text(
    formatCurrency({ amount: invoice.total, currency: invoice.currency as CurrencyType }),
    160,
    130
  );

  //Additional Note 
  if (invoice.note) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("ADDITIONAL NOTES:", 20, 150);
    pdf.text(invoice.note, 20, 155);
  }

  pdf.setFont("helvetica", "bold");
  pdf.text("For any enquires, email us on davidpaul@example.com", 20, 160);
  // generate pdf as buffer
  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));
  
  //return pdf as download

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=Neu_Invoice_${invoice.name}_${format(invoice.date, 't')}.pdf`,
    },
  });

}
