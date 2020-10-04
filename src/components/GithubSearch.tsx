import React, { useState, useEffect, useRef } from "react";
import axios from "../axios";

import { useDispatch } from "react-redux";
import { HTTP_METHODS } from "../constants/enums";
import { FETCH_TIMEOUT } from "../constants/index";
import {
  Flex,
  Box,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button
} from "@chakra-ui/core";

import { Repository } from "../constants/types";
import { getFilesFromRepository } from "../features/userSlice";

import Directory from "./Directory";



const GithubSearch: React.FC = (props) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  };

  return (
    <>
      <Button onClick={onOpen}>Search</Button>
      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          bg="gray.600"
          borderRadius="0.5rem"
          px="25rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <ModalBody>
            <Box mt="3rem" w={["50rem", "40rem", "30rem"]} pb="5rem" mx="auto" color="normal" position="relative">
              <Box mx="auto" textAlign="center">
                <Text fontSize="2xl" mb={6}>Search Github Repository</Text>
                <Input
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
                    setRepositories([]);
                  }}>
                    <Text ml="1rem" color="black">
                      {repo.name}

                    </Text>
                  </Flex>
                ))}
              </Flex>
              <Directory closeModal={onClose} />

            </Box >
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GithubSearch;