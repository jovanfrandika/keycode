import React from "react";
import { useSelector } from "react-redux";

import { Flex } from "@chakra-ui/core";

import Statistic from "./Statistic";

import { selectUser } from "../features/userSlice";

// import { current } from "@reduxjs/toolkit";

const Dashboard = () => {

  const user = useSelector(selectUser);

  return (
    <Flex color="normal" justifyContent="space-evenly" width="100%">
      <Statistic
        title="WPM"
        amount={user?.currentSession ? user?.sessions[user?.currentSession - 1].wpm : 0}
      />
      <Statistic
        title="CPM"
        amount={user?.currentSession ? user?.sessions[user?.currentSession - 1].cpm : 0}
      />
      <Statistic
        title="Errors"
        amount={user?.currentSession ? user?.sessions[user?.currentSession - 1].errors : 0}
      />
    </Flex>
  );
};

export default Dashboard;