import React from "react";
import { useSelector } from "react-redux";

import { selectFiles, selectFile } from "../features/userSlice";

const Header: React.FC = () => {
  const { fileTree } = useSelector(selectFiles);
  const { file } = useSelector(selectFile);

  return (
    <>
      <p className='inline mr-1 text-white'>
        Current Session:
      </p>
      {fileTree?.pathname.map((path: string) => {
        return (
          <p key={`path-${path}`} className='inline text-character-normal'>
            {path}/
          </p>
        )
      })}
      <p className='inline text-white'>
        {file.path}
      </p>
    </>
  )
};

export default Header;