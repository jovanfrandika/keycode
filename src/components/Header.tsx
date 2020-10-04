import React from "react";
import { useSelector } from "react-redux";

import { Text } from "@chakra-ui/core";
import { selectFiles, selectFile } from "../features/userSlice";

const Header: React.FC = () => {
  const { fileTree } = useSelector(selectFiles);
  const { file } = useSelector(selectFile);

  return (
    <>
      <Text color="white" display="inline-block" mr="1.4rem">
        Current Session:
      </Text>
      {fileTree?.pathname.map((path: string) => {
        return (
          <Text key={`path-${path}`} color="normal" display="inline-block">
            {path}/
          </Text>
        )
      })}
      <Text color="white" display="inline-block">
        {file.path}
      </Text>
    </>
  )
};

export default Header;