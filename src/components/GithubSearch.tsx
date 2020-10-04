import React, { useState, useEffect, useRef } from "react";
import axios from "../axios";

import { HTTP_METHODS } from "../constants/enums";
import { FETCH_TIMEOUT } from "../constants/index";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  Spinner
} from "@chakra-ui/core";

import { Repository } from "../constants/types";

import Directory from "./Directory";
import GithubInput from "./GithubInput";
import GithubRepositories from "./GithubRepositories";

const GithubSearch: React.FC = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Button onClick={onOpen} color="gray.700">Search @Github</Button>
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
              <GithubInput value={value} setValue={setValue} />
              <GithubRepositories
                repositories={repositories}
                setRepositories={setRepositories}
                value={value}
                setValue={setValue}
                setIsAutoCompleted={setIsAutoCompleted}
              />
              <Directory closeModal={onClose} />
              <Box textAlign="center" mx="auto">
                {isLoading && <Spinner size="lg" />}
              </Box>
            </Box >
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GithubSearch;