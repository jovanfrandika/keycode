import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Text, Spinner } from "@chakra-ui/core";
import { selectFiles, getFileContent, getFilesFromTrees } from "../features/userSlice";

interface Props {
  closeModal: () => void;
};

const Directory: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fileTree } = useSelector(selectFiles);

  return (
    <>
      <Box bg="gray.900" mt="0.5rem">
        {fileTree?.pathname[0] && <Text>[u@keycode]$ pwd</Text>}
        {fileTree?.pathname.map((path: string) => {
          return (
            <Text key={`path-${path}`} display="inline-block">
              {path}/
            </Text>
          )
        })}
        {fileTree?.pathname.length - 1 > 0 && <Text>[u@keycode]$ echo "press the 'cd ..' to go to previous directory"</Text>}
        {fileTree?.pathname.length - 1 > 0 && <Text>press the 'cd ..' to go to previous directory</Text>}
        {fileTree?.URLs.length - 1 > 0 &&
          <Box>
            <Text display="inline-block">
              [u@keycode]$ <Text
                display="inline-block"
                color="correct"
                cursor="pointer"
                onClick={async () => {
                  setIsLoading(true);
                  await dispatch(getFilesFromTrees({
                    url: fileTree?.URLs[fileTree?.URLs.length - 2],
                    path: fileTree?.pathname[fileTree?.pathname.length - 2],
                    pop: true
                  }))
                  setIsLoading(false);
                }}>cd ..</Text>
            </Text>
          </Box>}
      </Box>
      {isLoading ? (
        <Box mx="auto" my={16} textAlign="center">
          <Spinner color="normal" size="lg" />
        </Box>
      ) : (
          <Box mx="auto" my={16} textAlign="center">
            {fileTree?.files?.map((file: any, index: number) => (
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
                    setIsLoading(true);
                    await dispatch(getFileContent({
                      url: file.url,
                      path: file.path,
                    }))
                    setIsLoading(false);
                    props.closeModal()
                  } else {
                    setIsLoading(true);
                    await dispatch(getFilesFromTrees({
                      url: file.url,
                      path: file.path
                    }))
                    setIsLoading(false);
                  }
                }}>
                <Text color={file.type === "blob" ? "orange.500" : "yellow.50"}>
                  {file.path}
                </Text>
              </Box>
            ))}
          </Box>
        )}


    </>

  );
};

export default Directory;