'use client';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Icons } from '../ui/icons';

const CreateInvoiceButton = () => {
    const router = useRouter();
  return (
    <Button onClick={()=>router.push('/dashboard/invoices/create')}>
      <Icons.plus className='size-4'/>
      Add Invoice
    </Button>
  )
}

export default CreateInvoiceButton