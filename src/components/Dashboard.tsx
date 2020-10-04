import React from "react";
import { useSelector } from "react-redux";

import { Flex } from "@chakra-ui/core";

import Statistic from "./Statistic";

import { selectUser } from "../features/userSlice";

const Dashboard = () => {

  const user = useSelector(selectUser);

  const statusSelector = (index: number) => {
    return user?.currentSession ?
      user?.sessions[user?.currentSession - index] ?
        user?.sessions[user?.currentSession - index]
        : 0
      : 0;
  };

  return (
    <Flex color="normal" justifyContent="space-evenly" width="100%">
      <Statistic
        title="WPM"
        amount={statusSelector(1).wpm}
        previousAmount={statusSelector(2).wpm}
      />
      <Statistic
        title="CPM"
        amount={statusSelector(1).cpm}
        previousAmount={statusSelector(2).cpm}
      />
      <Statistic
        title="Errors"
        amount={statusSelector(1).errors}
        previousAmount={statusSelector(2).errors}
      />
    </Flex>
  );
};

export default Dashboard;