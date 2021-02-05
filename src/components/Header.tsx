import React from "react";
import { useSelector } from "react-redux";

import { selectFiles, selectFile } from "../features/userSlice";

const Header: React.FC = () => {
  const { fileTree } = useSelector(selectFiles);
  const { file } = useSelector(selectFile);

  return (
    <div className='ml-1'>
      <p className='inline text-gray-600'> Current Session: </p>
      <div className='inline mx-2 px-2 rounded-xl bg-blue-400'>
        {fileTree?.pathname.map((path: string) => {
          return (
            <p key={`path-${path}`} className='inline text-blue-50'> {path}/ </p>
          )
        })}
        <p className='inline text-gray-100'> {file.path} </p>
      </div>
    </div>
  )
};

export default Header;