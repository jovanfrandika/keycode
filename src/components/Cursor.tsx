import React, { useState, useEffect, useRef, ReactNode } from "react";
import { CharacterState } from "../constants/enums";


interface Props {
  children: ReactNode;
  showCursor: boolean;
  character: string;
  characterState: CharacterState;
};

const BLINK_SPEED = 500;

const Cursor: React.FC<Props> = ({ children, showCursor, character, characterState }) => {

  const [display, setDisplay] = useState<boolean>(true);
  const displayRef: any = useRef();

  useEffect(() => {
    if (showCursor) {
      clearTimeout(displayRef.current);
      displayRef.current = setTimeout(() => {
        setDisplay(!display);
      }, BLINK_SPEED)
    }
    return () => {
      clearTimeout(displayRef.current);
    }
  }, [showCursor, display]);

  return (
    <div className={`h-8 w-6 text-center align-middle ${display && showCursor ? 'bg-character-' + characterState.toLowerCase() : ''}`}>
      {character !== "\n" && children}
    </div>
  )
};

export default Cursor;