import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectFiles, getFileContent, getFilesFromTrees } from "../features/userSlice";

interface Props {
  closeModal: () => void;
};

const Directory: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fileTree } = useSelector(selectFiles);

  return (
    <>
      <div className='mt-4 bg-gray-800'>
        {fileTree?.pathname[0] && <p>[u@keycode]$ pwd</p>}
        {fileTree?.pathname.map((path: string) => {
          return (
            <p key={`path-${path}`} className="inline">
              {path}/
            </p>
          )
        })}
        {fileTree?.pathname.length - 1 > 0 && <p>[u@keycode]$ echo "press the 'cd ..' to go to previous directory"</p>}
        {fileTree?.pathname.length - 1 > 0 && <p>press the 'cd ..' to go to previous directory</p>}
        {fileTree?.URLs.length - 1 > 0 &&
          <div>
            <p className='inline'>
              [u@keycode]$
              <p className='inline text-character-correct cursor-pointer'
                onClick={async () => {
                  setIsLoading(true);
                  await dispatch(getFilesFromTrees({
                    url: fileTree?.URLs[fileTree?.URLs.length - 2],
                    path: fileTree?.pathname[fileTree?.pathname.length - 2],
                    pop: true
                  }))
                  setIsLoading(false);
                }}>cd ..</p>
            </p>
          </div>}
      </div>
      {isLoading ? (
        <div className='mx-auto my-16 text-center'>
          {/* <Spinner color="normal" size="lg" /> */}
        </div>
      ) : (
          <div className='mx-auto my-16 text-center'>
            {fileTree?.files?.map((file: any, index: number) => (
              <div
                key={`file-${file.path}`}
                className={`inline m-1 p-1 rounded-xl cursor-pointer ${file.type === 'blob' ? 'bg-pink' : 'bg-blue'}`}
                onClick={async () => {
                  if (file.type === "blob") {
                    setIsLoading(true);
                    await dispatch(getFileContent({
                      url: file.url,
                      path: file.path,
                    }))
                    setIsLoading(false);
                    props.closeModal()
                  } else {
                    setIsLoading(true);
                    await dispatch(getFilesFromTrees({
                      url: file.url,
                      path: file.path
                    }))
                    setIsLoading(false);
                  }
                }}>
                <p className={file.type === "blob" ? "bg-blue" : "bg-pink"}>
                  {file.path}
                </p>
              </div>
            ))}
          </div>
        )}


    </>

  );
};

export default Directory;