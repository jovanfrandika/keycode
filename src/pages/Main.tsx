import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilesFromRepository, getFileContent } from "../features/userSlice";
import Layout from "../containers/Layout";

import Editor from "../components/Editor"
import Dashboard from "../components/Dashboard"
import GithubSearch from "../components/GithubSearch";
import Header from "../components/Header";

import logo from "../assets/images/keycode.png";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    initializeRepo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initializeRepo = async () => {
    setIsLoading(true);
    await dispatch(getFilesFromRepository({
      owner: "formium",
      repo: "formik"
    }));

    await dispatch(getFileContent({
      url: "https://api.github.com/repos/formium/formik/git/blobs/d6c33b4958e64e589fe99a8d55225af2e8d45d1c",
      path: ".eslintrc.js"
    }));

    setIsLoading(false);
  };

  return (
    <Layout>
      {isLoading ? (
        <div className='flex flex-col justify-center align-center w-full mx-auto mt-1 text-character-normal'>
          <div className="w-10">
            <div style={{ backgroundImage: `url(${logo})` }} />
          </div>
          <div className='mb-3 align-center'>
            <p className="tracking-widest mb-1 text-5xl">KEYCODES</p>
            <p className="text-xl" >become a touch typing chad.</p>
          </div>
        </div>
      ) : (
          <>
            <div
              className='w-75 pt-2 pb-10'
              onClick={() => {
                if (isListening) {
                  setIsListening(false)
                }
              }}
            >
              <div className='mb-24 text-character-normal align-center'>
                <p className='mb-6 text-4xl'>Keycodes</p>
                <p className="font-xl">become a touch typing chad</p>
                <div className="mt-2">
                  {/* <GithubSearch /> */}
                </div>
              </div>

              <div className='w-75 py-10 px-4 bg-gray-600 rounded-xl' >
                <Header />
                <div className="border-t-8 my-1.2" />
                <Dashboard />
                <div className="border-t-8 my-1.2" />
                <Editor isListening={isListening} setIsListening={setIsListening} />
              </div>
            </div>
          </>

        )}
    </Layout >
  );
};

export default Main;
