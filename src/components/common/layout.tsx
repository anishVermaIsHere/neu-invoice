import { ReactNode } from "react";
import Header from "./header";
import MainContainer from "./main";
import Section from "./section";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <MainContainer>
        <Section classes="flex flex-col justify-center items-center">
          {children}
        </Section>
      </MainContainer>
    </>
  );
};

export default Layout;
