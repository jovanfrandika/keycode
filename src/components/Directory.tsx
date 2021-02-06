import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectFiles, getFileContent, getFilesFromTrees } from "../features/userSlice";

interface Props {
  closeModal: () => void;
};

interface FileProps {
  url: string;
  type: string;
  path: string;
}

const Directory: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fileTree } = useSelector(selectFiles);

  return (
    <>
      <div className='w-1/2 mt-4 px-2 text-left bg-gray-800 rounded-lg dark:bg-gray-800'>
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
              <span className='text-character-correct cursor-pointer'
                onClick={async () => {
                  setIsLoading(true);
                  await dispatch(getFilesFromTrees({
                    url: fileTree?.URLs[fileTree?.URLs.length - 2],
                    path: fileTree?.pathname[fileTree?.pathname.length - 2],
                    pop: true
                  }))
                  setIsLoading(false);
                }}>cd ..</span>
            </p>
          </div>}
      </div>
      {isLoading ? (
        <div className='mx-auto my-16 text-center'>
          {/* <Spinner color="normal" size="lg" /> */}
        </div>
      ) : (
          <div className='grid grid-cols-3 mx-auto my-8 text-center'>
            {fileTree?.files?.map(({ url, type, path }: FileProps, index: number) => {

              let isBlob = type === 'blob';
              let notAllowedFiles = [".md", ".json", ".pdf"];
              let regex = new RegExp("([a-zA-Z0-9_.:])+(" + notAllowedFiles.join('|') + ")$");

              if (regex.test(path)) {
                return <React.Fragment key={`file-${path}`} ></React.Fragment>
              }


              return <div
                key={`file-${path}`}
                className={`inline m-1 p-1 shadow-md rounded-3xl cursor-pointer bg-${isBlob ? 'gray-400' : 'blue-400'}`}
                onClick={async () => {
                  if (type === "blob") {
                    setIsLoading(true);
                    await dispatch(getFileContent({
                      url: url,
                      path: path,
                    }))
                    setIsLoading(false);
                    props.closeModal()
                  } else {
                    setIsLoading(true);
                    await dispatch(getFilesFromTrees({
                      url: url,
                      path: path
                    }))
                    setIsLoading(false);
                  }
                }}>
                <p className={`transition px-2 shadow-md rounded-xl bg-gray-${isBlob ? "600" : "800"} hover:bg-${isBlob ? 'gray-400' : 'blue-400'}`}>
                  {path}
                </p>
              </div>
            })}
          </div>
        )}


    </>

  );
};

export default Directory;