import { getAuth } from '@/auth';
import MainContainer from '@/components/common/main'
import { Login } from '@/components/login'
import { redirect } from 'next/navigation';

const LoginPage = async () => {

  const session = await getAuth();
  if(session?.user){
    return redirect('/dashboard');
  }

  return (
    <MainContainer classes='flex justify-center items-center'>
      <Login />
    </MainContainer>
  )
}

export default LoginPage