import React, { useState, useEffect, useRef } from "react";
import axios from "../axios";

import { useDispatch } from "react-redux";
import { HTTP_METHODS } from "../constants/enums";
import { FETCH_TIMEOUT } from "../constants/index";
import { Flex, Box, Input, Text } from "@chakra-ui/core";

import { Repository } from "../constants/types";
import { getFilesFromRepository } from "../features/userSlice";

import Directory from "./Directory";



const GithubSearch: React.FC = (props) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>("");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const fetchRepoRef: any = useRef();

  useEffect(() => {
    clearTimeout(fetchRepoRef.current);
    fetchRepoRef.current = setTimeout(() => {
      if (value) {
        searchRepo(value);
      }
      else {
        setRepositories([]);
      }
    }, FETCH_TIMEOUT);
  }, [value]);

  const searchRepo = async (query: string) => {
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
  }
  return (
    <Box mx="auto" color="normal" w={["10rem", "30rem"]}>
      <Text fontSize="4xl" textAlign="center" >
        Github search
      </Text>
      <Box mx="auto">
        <Input
          placeholder="Search repository"
          color="#000"
          value={value}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setValue(String(event.currentTarget.value));
          }}
        />
      </Box>
      <Flex
        position="absolute"
        zIndex={1}
        flexDirection="column"
        bg="white"
        pb={repositories.length ? "1rem" : ""}
        borderRadius="0 0 0.5rem 0.5rem"
        w="100%"
      >
        {repositories.map((repo, index) => (
          <Flex key={`${repo.name}-${index}`} cursor="pointer" onClick={() => {
            dispatch(getFilesFromRepository({
              owner: repo.owner,
              repo: repo.name,
            }));
          }}>
            <Text ml="1rem" color="black">
              {repo.name}

            </Text>
          </Flex>
        ))}
      </Flex>
      <Directory />
    </Box >
  );
};

export default GithubSearch;