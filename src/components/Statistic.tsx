import React from "react";

import { Flex, Text } from "@chakra-ui/core";

interface Props {
  title: string;
  amount: string;
};

const Statistic: React.FC<Props> = (props) => {
  return (
    <Flex flexDirection="row" justifyContent="space-evenly" alignItems="center" width="14rem">
      <Text fontSize="xl" opacity={0.8}>
        {props.title}:
      </Text>
      <Text fontSize="4xl" fontWeight="bold" opacity={0.8}>
        {props.amount}
      </Text>

    </Flex>
  );
};

export default Statistic;