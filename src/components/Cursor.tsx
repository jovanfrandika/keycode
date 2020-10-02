import React, { useState, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/core";


interface Props {
  showCursor: boolean;
};

const SPEED = 500;

const Cursor: React.FC<Props> = (props) => {

  const [display, setDisplay] = useState(true);
  const displayRef: any = useRef();

  useEffect(() => {
    if (props.showCursor) {
      clearTimeout(displayRef.current);
      displayRef.current = setTimeout(() => {
        setDisplay(!display);
      }, SPEED)
    }
  }, [props.showCursor, display]);

  return (
    <Box
      display="inline-block"
      background={display && props.showCursor ? "white" : "none"}
    >
      {props.children}
    </Box>
  )
};

export default Cursor;