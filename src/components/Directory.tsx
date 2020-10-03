import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@chakra-ui/core";
import { selectFiles, getFileContent } from "../features/userSlice";

const Directory: React.FC = () => {
  const dispatch = useDispatch();
  const { files } = useSelector(selectFiles);

  return (
    <Box mx="auto" my={16} textAlign="center">
      {files.map((file: any, index: number) => (
        <Box key={`file-${file.path}`} display="inline-block" onClick={async () => {
          if (file.type === "blob") {
            dispatch(getFileContent({
              url: file.url
            }))
          }
        }}>
          {file.path} - {file.type} |
        </Box>
      ))}
    </Box>

  );
};

export default Directory;