import React, { useState, useEffect } from "react";

import { Flex, Text } from "@chakra-ui/core";

interface Props {
  title: string;
  amount: number;
  previousAmount: number;
};

const Statistic: React.FC<Props> = (props) => {
  const [color, setColor] = useState<string>("normal");
  const gain = Math.trunc((props.amount || 0) - Number(props.previousAmount || 0));

  useEffect(() => {
    let gainColor: string = "normal";
    if (gain >= 0) {
      gainColor = "correct"
    }
    else {
      gainColor = "wrong"
    }
    setColor(gainColor);
  }, [gain]);

  return (
    <Flex justifyContent="space-between" alignItems="center" w="7.5rem">
      <Flex flexDirection="column" justifyContent="space-between">
        <Text fontSize="xl" opacity={0.8}>
          {props.title}:
        </Text>
        <Text mt="1rem">
          Gain:
        </Text>

      </Flex>
      <Flex flexDirection="column" alignItems="center" justifyContent="space-between" mb="1rem">
        <Text fontSize="4xl" fontWeight="bold" opacity={0.8} mb=".8rem">
          {props.amount || 0}
        </Text>
        <Text color={color}>
          {gain > 0 && "+"}{gain}
        </Text>

      </Flex>
    </Flex>
  );
};

export default Statistic;