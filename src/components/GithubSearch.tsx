import React, { useState, useEffect, useRef, Dispatch } from "react";
import Axios from "axios";

import { Box, Input, Text, Spinner } from "@chakra-ui/core";

import Directory from "./Directory";

const baseURL = "http://localhost:4000"

interface Props {
  setEditorValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface Repository {
  name: string;
  description: string;
  owner: string;
};

interface File {
  path: string;
  url: string;
  type: string;
}

const FETCH_TIMEOUT = 500;

const GithubSearch: React.FC<Props> = (props) => {
  const [value, setValue] = useState<string>("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


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
    setIsLoading(true);
    const response = await Axios({
      method: "GET",
      url: `${baseURL}/search/repo?q=${query}`,
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
  }

  const getFilesFromRepo = async (owner: string, repo: string) => {
    const response = await Axios({
      method: "GET",
      url: `${baseURL}/search/files?owner=${owner}&repo=${repo}`,
    });
    const fetchedFiles = response.data.tree.map((file: any) => {
      return {
        path: file.path,
        url: file.url,
        type: file.type
      }
    });
    setFiles(fetchedFiles);
    // const fetchedFiles = response.data.items.slice(0, 5).map((repo: any) => { })
  };

  const getFileContent = async (url: string) => {
    const response = await Axios({
      method: "GET",
      url: `${baseURL}/file?url=${url}`
    })
    const fileContent = String(response.data.content);
    props.setEditorValue(fileContent)
  };


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
      {isLoading ? (
        <Spinner color="red.500" size="lg" />
      ) : (
          <Box mx="auto" textAlign="center">
            {repositories.map((repo, index) => (
              <Box key={`repo-${repo.name}-${index}`} onClick={async () => {
                // alert(`url: ${repo.url}\nowner:${repo.owner}`)
                await getFilesFromRepo(repo.owner, repo.name)
              }}>
                {repo.name}
              </Box>
            ))}
          </Box>
        )}
      <Box mx="auto" my={16} textAlign="center">
        {files.map((file, index) => (
          <Box key={`file-${file.path}`} display="inline-block" onClick={async () => {
            if (file.type === "blob") {
              await getFileContent(file.url);
            }
          }}>
            {file.path} - {file.type}
          </Box>
        ))}
      </Box>

    </Box >
  );
};

export default GithubSearch;