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
        <div className='flex flex-col justify-center items-center w-full mx-auto mt-1 text-gray-700 dark:text-gray-200'>
          <div className="w-10">
            <div className='w-50 h-50' style={{ backgroundImage: `url(${logo})` }} />
          </div>
          <div className='mb-3 align-center'>
            <p className="tracking-widest mb-1 font-bold text-5xl">KEYCODE</p>
            <p className="text-xl" >become a touch typing chad.</p>
          </div>
        </div>
      ) : (
          <>
            <div
              className='w-1/2 pb-10'
              onClick={() => {
                if (isListening) {
                  setIsListening(false)
                }
              }}
            >
              <div className='flex flex-col mb-24 align-middle text-center text-gray-700 dark:text-gray-200'>
                <p className="tracking-widest mb-1 font-bold text-5xl">KEYCODE</p>
                <p className="text-xl" >become a touch typing chad.</p>
                <div className="mt-16"> <GithubSearch /> </div>
              </div>

              <Header />
              <div className='my-1 bg-white rounded-t-xl'>
                <Dashboard />
              </div>

              <div className='px-4 pb-8 bg-gray-500 rounded-b-xl dark:bg-gray-300' >
                <Editor isListening={isListening} setIsListening={setIsListening} />
              </div>
            </div>
          </>

        )}
    </Layout >
  );
};

export default Main;
