import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className='flex flex-row justify-center bg-gray-700 min-h-full'>
        {children}
      </div>
    </>
  );
};

export default Layout;
