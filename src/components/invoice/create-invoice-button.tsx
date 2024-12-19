'use client';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const CreateInvoiceButton = () => {
    const router = useRouter();
  return (
    <Button onClick={()=>router.push('/dashboard/invoices/create')}>Add Invoice</Button>
  )
}

export default CreateInvoiceButton