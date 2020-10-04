import React from "react";

import { Repository } from "../constants/types";

import { Flex, Text } from "@chakra-ui/core";
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
    <Flex
      position="absolute"
      zIndex={1}
      flexDirection="column"
      bg="white"
      pb={props.repositories.length ? "1rem" : ""}
      borderRadius="0 0 0.5rem 0.5rem"
      w="100%"
    >
      {props.repositories.map((repo, index) => (
        <Flex key={`${repo.name}-${index}`} cursor="pointer" onClick={() => {
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
          <Text ml="1rem" color="black">
            {repo.name}

          </Text>
        </Flex>
      ))}
    </Flex>
  )
};

export default GithubRepositories;