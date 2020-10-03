import React from "react";

import Layout from "../containers/Layout";

import { Box, Divider, Text } from "@chakra-ui/core";

import Editor from "../components/Editor"
import Dashboard from "../components/Dashboard"

const Main: React.FC = () => {
  return (
    <Layout>
      <Box width="75rem" pt="12.5rem">
        <Text fontSize="4xl" textAlign="center" color="normal" marginBottom={24}>Keycode</Text>
        <Box
          width="75rem"
          py="10rem"
          bg="gray.600"
          p="4rem"
          borderRadius=".25rem"
        // display="flex"
        // flexDirection="column"
        // justifyContent="space-between"
        // alignItems="center"
        >
          <Dashboard />
          <Divider />
          <Editor />
        </Box>
      </Box>
    </Layout >
  );
};



export default Main;
