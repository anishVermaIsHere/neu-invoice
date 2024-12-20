import React from "react";
import { Icons } from "./icons";
import Section from "../common/section";

const Empty = ({ message }: { message: string }) => (
  <Section classes="flex flex-col justify-center items-center gap-3 text-gray-500 text-md mt-5 p-4">
    <Icons.file className="size-6 me-2" />
    <span>{message}</span>
  </Section>
);

export default Empty;
