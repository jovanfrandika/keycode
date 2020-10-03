import React, { useState, useEffect, useRef } from "react";
import axios from "../axios";

import { useDispatch } from "react-redux";
import { HTTP_METHODS } from "../constants/enums";
import { FETCH_TIMEOUT } from "../constants/index";
import { Box, Input, Text } from "@chakra-ui/core";

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
    <Box mx="auto" color="normal">
      <Text fontSize="4xl" textAlign="center" >
        Github search
          </Text>
      <Box w="50%" mx="auto">
        <Input
          placeholder="Search repository"
          color="#000"
          value={value}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setValue(String(event.currentTarget.value));
          }}
        />
      </Box>
      <Box mx="auto" textAlign="center">
        {repositories.map((repo, index) => (
          <Box key={`${repo.name}-${index}`} onClick={() => {
            dispatch(getFilesFromRepository({
              owner: repo.owner,
              repo: repo.name,
            }));
          }}>
            {repo.name}
          </Box>
        ))}
      </Box>
      <Directory />
    </Box >
  );
};

export default GithubSearch;