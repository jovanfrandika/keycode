import React from "react";

import { Box, Text, Input } from "@chakra-ui/core";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const GithubInput: React.FC<Props> = (props) => {
  return (
    <Box mx="auto" textAlign="center">
      <Text fontSize="2xl" mb={6}>Search Public Repositories <Text fontWeight="bold">@Github</Text></Text>
      <Input
        color="#000"
        value={props.value}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          props.setValue(String(event.currentTarget.value));
        }}
      />
    </Box>
  );
};

export default GithubInput;