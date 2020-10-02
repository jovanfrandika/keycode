import React from "react";

import Layout from "../containers/Layout";

import { Flex, Box } from "@chakra-ui/core";
import Editor from "../components/Editor"

const Main: React.FC = () => {
  return (
    <Layout>
      <Box>
        <Flex background="#718096" width="30rem" p="4rem">
          <Editor />
        </Flex>
      </Box>
    </Layout >
  );
};

export default Main;
