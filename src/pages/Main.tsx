import React from "react";

import Layout from "../containers/Layout";

import { Box } from "@chakra-ui/core";
import Editor from "../components/Editor"

const Main: React.FC = () => {
  return (
    <Layout>
      <Box>
        <Box background="#718096" width="50rem" p="4rem" mt="100rem">
          <Editor />
        </Box>
      </Box>
    </Layout >
  );
};

export default Main;
