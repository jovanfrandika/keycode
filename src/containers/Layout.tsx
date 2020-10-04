import React from "react";

import { Flex } from "@chakra-ui/core";

const Layout = (props: any) => {
  return (
    <>
      <Flex
        flexDirection="row"
        // alignItems="center"
        justifyContent="center"
        bg="gray.700"
        // height={["25rem", "50rem", "75rem", "100rem"]}
        minHeight="100vh"
        width={["100%"]}
      >
        {props.children}
      </Flex>
    </>
  );
};

export default Layout;
