import React from "react";

import { Repository } from "../constants/types";

import { useDispatch } from "react-redux";
import { getFilesFromRepository } from "../features/userSlice";

interface Props {
  value: string;
  repositories: Repository[]
  setRepositories: React.Dispatch<React.SetStateAction<Repository[]>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setIsAutoCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const GithubRepositories: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  return (
    <div className='absolute z-10 flex flex-col bg-white pb-1 w-full rounded-xl' >
      {props.repositories.map((repo, index) => (
        <div
          key={`${repo.name}-${index}`}
          className='cursor-pointer'
          onClick={() => {
            dispatch(getFilesFromRepository({
              owner: repo.owner,
              repo: repo.name,
            }));
            if (props.value !== repo.name) {
              props.setIsAutoCompleted(true);
              props.setValue(repo.name);
            }

            props.setRepositories([]);
          }}>
          <p className='ml-1 text-black'>
            {repo.name}
          </p>
        </div>
      ))}
    </div>
  )
};

export default GithubRepositories;