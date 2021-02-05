import React, { useState, useEffect, useRef } from "react";
import axios from "../axios";

import { HTTP_METHODS } from "../constants/enums";
import { FETCH_TIMEOUT } from "../constants/index";

import { Repository } from "../constants/types";

import Directory from "./Directory";
import GithubRepositories from "./GithubRepositories";

const GithubSearch: React.FC = (props) => {

  const [display, setDisplay] = useState<boolean>(false);
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isAutoCompleted, setIsAutoCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchRepoRef: any = useRef();

  useEffect(() => {
    clearTimeout(fetchRepoRef.current);
    fetchRepoRef.current = setTimeout(() => {
      if (value && !isAutoCompleted) {
        searchRepo(value);
      }
      else {
        setRepositories([]);
        setIsAutoCompleted(false);
      }
    }, FETCH_TIMEOUT);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const searchRepo = async (query: string) => {
    setIsLoading(true);
    const response = await axios({
      method: HTTP_METHODS.GET,
      url: `search/repo?q=${query}`,
    });
    const fetchedRepos = response.data.items.slice(0, 5).map((repo: any) => {
      return {
        name: repo.name,
        description: repo.description,
        owner: repo.owner.login
      };
    });
    setRepositories(fetchedRepos);
    setIsLoading(false);
  };

  return (
    <>
      <div className='transition transform w-48 text-white bg-gray-400 shadow-lg rounded-lg cursor-pointer delay-50 hover:-translate-y-1 hover:bg-blue-400 dark:bg-gray-200' onClick={() => { setDisplay(true) }}>Search @Github</div>
      <div className={`${display ? '' : 'hidden'}`}>
        <div className='fixed top-0 left-0 w-screen h-full bg-black bg-opacity-75' onClick={() => { setDisplay(false) }} />
        <div className='fixed transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center top-1/2 left-1/2 z-20 w-1/2 py-4 text-gray-200 bg-gray-200 rounded-xl'>
          <GithubRepositories
            repositories={repositories}
            setRepositories={setRepositories}
            value={value}
            setValue={setValue}
            displaySearch={displaySearch}
            setDisplaySearch={setDisplaySearch}
            setIsAutoCompleted={setIsAutoCompleted}
          />
          <Directory closeModal={() => { setDisplay(false) }} />
          <div className="mx-auto align-middle">
            {isLoading && <p>is loading</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default GithubSearch;