import React from "react";

import Layout from "../containers/Layout";

import {
  Box, Divider, Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from "@chakra-ui/core";

import Editor from "../components/Editor"
import Dashboard from "../components/Dashboard"
import GithubSearch from "../components/GithubSearch";

const Main: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <Box width="75rem" pt="12.5rem">
        <Button onClick={onOpen}>Search</Button>
        <Modal isCentered blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            bg="gray.600"
            borderRadius="0.5rem"
            // m="10rem"
            // py="1rem"
            px="5rem"
          >
            <GithubSearch />
          </ModalContent>
        </Modal>
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
          <Editor />
        </Box>
      </Box>
    </Layout >
  );
};



export default Main;
