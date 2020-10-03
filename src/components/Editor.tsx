import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Text } from "@chakra-ui/core";
import { useSelector } from "react-redux";

import { CharacterState } from "../constants/enums";

import Character from "./Character";
import { addSession, selectUser, selectFileContent } from "../features/userSlice";

const TEST_VALUES = [
  `list_for_each_entry
  yes`,
  `def hackMe():`,
  `chizuru best girl
  hai`
];

// const START = 0;
// const END_VALUES = TEST_VALUES.map((END) => {
//   return END.length - 1;
// })

const BLOCKED_KEYS = ["Shift"];

const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { currentSession } = useSelector(selectUser);
  const { fileContent, fileEnd } = useSelector(selectFileContent);


  const [value, setValue] = useState<string[][]>([]);
  const [currentTyped, setCurrentTyped] = useState<{
    charCode: number;
    keyCode: number;
    key: string;
  } | null>(null);
  const [currentCharacterState, setCurrentCharacterState] = useState<CharacterState>(CharacterState.NORMAL);

  const [start, setStart] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);

  const [col, setCol] = useState<number>(0);
  const [row, setRow] = useState<number>(0);



  useEffect(() => {
    editorListener();
  }, [])

  useEffect(() => {
    if (fileContent) {
      const content = fileContent.split("");
      // setValue(content);
      setValue(transformValue(content));
    }
  }, [fileContent])

  // useEffect(() => {
  //   if (currentSession < fileContent) {
  //     // setValue(TEST_VALUES[currentSession]);

  //     setCurrentIndex(0);
  //     setCurrentTyped(null);
  //     setStart(0);
  //     setErrors(0);
  //     setCurrentCharacterState(CharacterState.NORMAL);
  //   }

  // }, [currentSession]);

  useEffect(() => {
    if (row === 0 && col === 0) {
      setStart(Date.now());
    }

    if (currentTyped?.keyCode === 13) {
      if (value[row][col] === "\n") {
        setCol(0);
        setCurrentTyped(null);
        setRow(row + 1);
        setCurrentCharacterState(CharacterState.NORMAL);
      }
    }
    else {
      if (currentTyped !== null && currentTyped !== undefined) {
        let correct = Number(value[row][col]?.charCodeAt(0) === Number(currentTyped?.charCode));

        /** If correct */
        if (correct) {
          setCol(col + 1);
          setCurrentTyped(null);
          setCurrentCharacterState(CharacterState.NORMAL);
          if (col === fileEnd) {
            let stop = Date.now();
            let duration = stop - start;
            let perMinute = duration / 60000;
            console.log(duration);

            let cpm, wpm, payload;

            cpm = Math.trunc(
              fileEnd / (perMinute)
            );
            wpm = Math.trunc(
              fileEnd / (5 * perMinute)
            );

            payload = {
              "cpm": cpm,
              "wpm": wpm,
              "errors": errors,
            }
            dispatch(addSession(payload));
          }
        }
        /** If not correct */
        else if (!correct) {
          setCurrentCharacterState(CharacterState.WRONG);
          setErrors((error) => error + 1);
        };
      }
    }
  }, [col, currentTyped])

  const editorListener = () => {
    window.addEventListener("keypress", (event: KeyboardEvent) => {
      BLOCKED_KEYS.forEach((key) => {
        if (event.charCode === 32 || event.key === "Enter" || event.key === "Tab") {
          event.preventDefault();
        };
        setCurrentTyped({
          charCode: event.charCode,
          keyCode: event.keyCode,
          key: event.key
        })
      })
    });
  };

  // const updateLine = () => {
  //   setLine(line + 1);
  // return <Text color="yellow.300" display="inline-block" fontSize="xl"> {line} </Text>
  // }

  const transformValue = (content: string[]) => {
    const transformedValue = [];

    let line: string[] = [];
    for (let character of content) {
      line.push(character);
      if (character === "\n") {
        transformedValue.push(line);
        line = [];
      }
    };
    return transformedValue;
  };

  return (
    <Box>
      {value.map(((array, rowIndex) => {
        return array.map((val, colIndex) => (
          <React.Fragment
            key={`#currentSession:${currentSession}-line-${rowIndex}-value-${val}-${colIndex}`}
          >
            {colIndex === 0 && <Text color="yellow.300" display="inline-block" fontSize="xl"> {rowIndex} </Text>}
            <Character
              // key={`#currentSession:${currentSession}-line-${rowIndex}-value-${val}-${colIndex}`}
              character={val || ""}
              typed={col === row ? currentTyped : null}
              colIndex={colIndex}
              rowIndex={rowIndex}
              setCurrentIndex={setCol}
              showCursor={col === colIndex && rowIndex === row}
              characterState={
                row === rowIndex && col === colIndex ? currentCharacterState : // cursor
                  row > rowIndex ? CharacterState.CORRECT : // up  of  cursor
                    row >= rowIndex && col >= colIndex ? CharacterState.CORRECT : CharacterState.NORMAL} // correct at left of cursor, normal on right of cursor
            />
          </React.Fragment>
        )
        )
      }))}
    </Box>
  );
};



export default Editor;
