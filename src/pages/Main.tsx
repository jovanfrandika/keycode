import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilesFromRepository, getFileContent } from "../features/userSlice";
import Layout from "../containers/Layout";

import {
  Flex, Box, Divider, Image, Text, Spinner
} from "@chakra-ui/core";

import Editor from "../components/Editor"
import Dashboard from "../components/Dashboard"
import GithubSearch from "../components/GithubSearch";
import Header from "../components/Header";

import logo from "../assets/images/keycode.png";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    initializeRepo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initializeRepo = async () => {
    setIsLoading(true);
    await dispatch(getFilesFromRepository({
      owner: "formium",
      repo: "formik"
    }));

    await dispatch(getFileContent({
      url: "https://api.github.com/repos/formium/formik/git/blobs/d6c33b4958e64e589fe99a8d55225af2e8d45d1c",
      path: ".eslintrc.js"
    }));

    setIsLoading(false);
  };

  return (
    <Layout>
      {isLoading ? (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          mx="auto"
          color="normal"
          mt="1rem">
          <Box w="250px">
            <Image src={logo} />
          </Box>
          <Box marginBottom="3rem" textAlign="center">
            <Text letterSpacing="1rem" fontSize="5xl" mb=".9rem">KEYCODES</Text>
            <Text fontSize="lg" >become a touch typing chad.</Text>
          </Box>
          <Spinner mt="4rem" mr="1.3rem" size="xl" />
        </Flex>
      ) : (
          <>
            <Box onClick={() => {
              if (isListening) {
                setIsListening(false)
              }
            }}
              width="75rem"
              pt="2.5rem"
              pb="10rem"
            // px="10rem"
            >
              <Box textAlign="center" color="normal" marginBottom={24}>
                <Text fontSize="4xl" marginBottom={6}>Keycodes</Text>
                <Text fontSize="lg">become a touch typing chad</Text>
                <Box mt="2rem">
                  <GithubSearch />
                </Box>
              </Box>

              <Box
                width="75rem"
                py="10rem"
                bg="gray.600"
                p="4rem"
                borderRadius=".25rem"
              >
                <Header />
                <Divider my="1.2rem" />
                <Dashboard />
                <Divider my="1.2rem" />
                <Editor isListening={isListening} setIsListening={setIsListening} />

              </Box>
            </Box>
            <Box>
            </Box>
          </>

        )}
    </Layout >
  );
};

export default Main;
