import React from "react";

import { Flex } from "@chakra-ui/core";

const Layout = (props: any) => {
  return (
    <>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        bg="tomato"
        height={["25rem", "50rem", "75rem", "100rem"]}
        width={["100%"]}
      >
        {props.children}
      </Flex>
    </>
  );
};

export default Layout;
