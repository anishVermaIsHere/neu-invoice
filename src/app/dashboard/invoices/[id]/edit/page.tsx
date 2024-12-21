import Section from '@/components/common/section'
import DashboardLayout from '@/components/dashboard/dashboard-layout'

const EditInvoicePage = async ({ params }: { params: Promise<{ id: string }>}) => {
    const invoiceId = (await params).id;

  return (
    <DashboardLayout>
        <Section>
        <h2 className="text-xl font-bold mb-2">Edit Invoice no. {invoiceId}</h2>

        <div className='flex items-center justify-center'>
            
        </div>
            
        </Section>
    </DashboardLayout>
  )
}

export default EditInvoicePage