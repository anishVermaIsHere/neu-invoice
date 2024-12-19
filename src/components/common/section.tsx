import { ReactNode, CSSProperties } from 'react'

const Section = ({ children, style, classes }: { children: ReactNode, style?: CSSProperties, classes?: string }) => {
  return (
    <section className={`w-full ${classes}`} style={style}>{children}</section>
  )
}

export default Section