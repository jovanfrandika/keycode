import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className='flex flex-row justify-center items-center bg-gray-200 min-h-screen dark:bg-gray-700'>
        {children}
      </div>
    </>
  );
};

export default Layout;
