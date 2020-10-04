import React, { useState } from "react";

import Layout from "../containers/Layout";

import {
  Box, Divider, Text,
} from "@chakra-ui/core";

import Editor from "../components/Editor"
import Dashboard from "../components/Dashboard"
import GithubSearch from "../components/GithubSearch";

const Main: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(true);
  return (
    <Layout>
      <Box onClick={() => {
        if (isListening) {
          setIsListening(false)
        }
      }}
        width="75rem"
        pt="12.5rem"
      >
        <GithubSearch />
        <Text fontSize="4xl" textAlign="center" color="normal" marginBottom={24}>Keycode</Text>
        <Box
          width="75rem"
          py="10rem"
          bg="gray.600"
          p="4rem"
          borderRadius=".25rem"
        >
          <Dashboard />
          <Divider />
          <Editor isListening={isListening} setIsListening={setIsListening} />

        </Box>
      </Box>
      <Box>
      </Box>

    </Layout >
  );
};



export default Main;
