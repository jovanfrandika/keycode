import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Text } from "@chakra-ui/core";
import { selectFiles, getFileContent } from "../features/userSlice";

const Directory: React.FC = () => {
  const dispatch = useDispatch();
  const { files } = useSelector(selectFiles);

  return (
    <Box mx="auto" my={16} textAlign="center">
      {files.map((file: any, index: number) => (
        <Box
          key={`file-${file.path}`}
          cursor="pointer"
          display="inline-block"
          bg={file.type === "blob" ? "yellow.50" : "orange.500"}
          borderRadius="0.5rem"
          p="1rem"
          m="0.1rem"
          onClick={async () => {
            if (file.type === "blob") {
              dispatch(getFileContent({
                url: file.url
              }))
            }
          }}>
          <Text color={file.type === "blob" ? "orange.500" : "yellow.50"}>
            {file.path}
          </Text>
        </Box>
      ))}
    </Box>

  );
};

export default Directory;