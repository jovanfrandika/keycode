import React, { useState, useEffect, useRef } from "react";
import axios from "../axios";

import { HTTP_METHODS } from "../constants/enums";
import { FETCH_TIMEOUT } from "../constants/index";

import { Repository } from "../constants/types";

import Directory from "./Directory";
import GithubInput from "./GithubInput";
import GithubRepositories from "./GithubRepositories";

const GithubSearch: React.FC = (props) => {

  const [value, setValue] = useState<string>("");
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
      <div className='text-gray-700' onClick={() => { }}>Search @Github</div>
      <div className=''>
        <div className='flex justify-center align-center w-full px-24 bg-gray-600 rounded-xl'>
          <div>
            <div className='relative w-50 mx-auto mt-3 pb-5 text-character-normal'>
              <GithubInput value={value} setValue={setValue} />
              <GithubRepositories
                repositories={repositories}
                setRepositories={setRepositories}
                value={value}
                setValue={setValue}
                setIsAutoCompleted={setIsAutoCompleted}
              />
              <Directory closeModal={() => { }} />
              <div className="mx-auto align-center">
                {isLoading && <p>is loading</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GithubSearch;