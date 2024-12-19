import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MainContainer = ({ classes, children }: { classes?: string, children: ReactNode}) => {
  return (
    <main className={ cn(`w-full min-h-screen ${classes}`)}>
        {children}
    </main>
  )
}

export default MainContainer