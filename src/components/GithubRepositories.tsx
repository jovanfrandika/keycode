import React from "react";

import { Repository } from "../constants/types";

import { useDispatch } from "react-redux";
import { getFilesFromRepository } from "../features/userSlice";

interface Props {
  value: string;
  repositories: Repository[];
  displaySearch: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setRepositories: React.Dispatch<React.SetStateAction<Repository[]>>;
  setDisplaySearch: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAutoCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const GithubRepositories: React.FC<Props> = ({ value, repositories, displaySearch, setValue, setRepositories, setDisplaySearch, setIsAutoCompleted }) => {
  const dispatch = useDispatch();
  return (
    <div className={`z-10 flex flex-col text-gray-700 pb-1}`} >
      <p className="mb-6 text-2xl">Search Public Repositories <span className='font-bold'>@Github</span></p>
      <input
        className={`w-full px-2 text-black bg-white rounded-xl ${displaySearch ? 'rounded-b-none' : ''}`}
        value={value}
        onFocus={() => { setDisplaySearch(true) }}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setValue(String(event.currentTarget.value));
        }}
      />
      <div className='bg-white rounded-b-xl'>
        {displaySearch && repositories.map((repo, index) => (
          <div
            key={`${repo.name}-${index}`}
            className='text-left cursor-pointer'
            onClick={() => {
              dispatch(getFilesFromRepository({
                owner: repo.owner,
                repo: repo.name,
              }));
              if (value !== repo.name) {
                setIsAutoCompleted(true);
                setValue(repo.name);
              }
              setRepositories([]);
              setDisplaySearch(false);
            }}>
            <p className='ml-1 text-black hover:text-blue-400'> {repo.name} </p>
          </div>
        ))}
      </div>
    </div>
  )
};

export default GithubRepositories;