import React from "react";

export default function FocusComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full sm:w-auto">{children}</div>;
}
