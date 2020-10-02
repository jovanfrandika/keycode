import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/core";

import { CharacterState } from "../constants/enums";

import Character from "./Character";

const TEST_VALUE = `list_for_each_entry(sdata, &local->interfaces, list) {
  if (!ieee80211_sdata_running(sdata))
    continue;
  switch (sdata->vif.type) {
  case NL80211_IFTYPE_AP_VLAN:
  case NL80211_IFTYPE_MONITOR:
    continue;
  case NL80211_IFTYPE_STATION:
    ieee80211_mgd_quiesce(sdata);
    break;
  case NL80211_IFTYPE_WDS:
    /* tear down aggregation sessions and remove STAs */
    mutex_lock(&local->sta_mtx);
    sta = sdata->u.wds.sta;
    if (sta && sta->uploaded) {
      enum ieee80211_sta_state state;

      state = sta->sta_state;
      for (; state > IEEE80211_STA_NOTEXIST; state--)
        WARN_ON(drv_sta_state(local, sta->sdata,
                  sta, state,
                  state - 1));
    }
    mutex_unlock(&local->sta_mtx);
    break;
  default:
    break;
  }

  flush_delayed_work(&sdata->dec_tailroom_needed_wk);
  drv_remove_interface(local, sdata);
}
`;

const START = 0;
const END = TEST_VALUE.length;

const BLOCKED_KEYS = ["Shift"]

const Editor: React.FC = () => {
  const [value, setValue] = useState<string[]>([]);
  const [currentTyped, setCurrentTyped] = useState<{
    charCode: number;
    keyCode: number;
    key: string;
  } | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentCharacterState, setCurrentCharacterState] = useState<CharacterState>(CharacterState.NORMAL);
  // const [characterStates, setCharacterStates] = useState<CharacterState[]>([]);

  const [start, setStart] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [cpm, setCpm] = useState<number>(0);

  useEffect(() => {
    setValue(TEST_VALUE.split(""));
    editorListener();
  }, []);

  // useEffect(() => {
  //   setCharacterStates(Array(value.length).fill(CharacterState.CORRECT));
  // }, [value])

  useEffect(() => {
    if (currentTyped?.keyCode === 13) {
      if (value[currentIndex] === "\n") {
        setCurrentIndex(currentIndex + 1);
        setCurrentTyped(null);
      }
    }
    else {
      if (currentTyped !== null && currentTyped !== undefined) {

        /** If correct */
        if (value[currentIndex]?.charCodeAt(0) === currentTyped?.charCode) {
          setCurrentIndex(currentIndex + 1);
          setCurrentTyped(null);
          setCurrentCharacterState(CharacterState.NORMAL);
          console.log(start);
          if (currentIndex === END) {
            let stop = Date.now();
            let duration = stop - start;

            setWpm(END / (duration));
            setCpm(END / (duration));
          }
        }
        /** If not correct */
        else {
          setCurrentCharacterState(CharacterState.WRONG);
        };
      }
    }


  }, [currentIndex, currentTyped, value]);

  const editorListener = () => {
    window.addEventListener("keypress", (event: KeyboardEvent) => {
      BLOCKED_KEYS.forEach((key) => {

        if (currentIndex === START) {
          console.log("---- black magic ----");
          console.log(currentIndex);
          console.log(START);
          setStart(Date.now());
        }

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

  return (
    <Box>
      <Box style={{
        whiteSpace: "pre-line"
      }}>
        {/* {characterStates && */}
        <>
          {value.map(((val, index) => (
            <Character
              key={`value-${val}-${index}`}
              character={val || ""}
              typed={currentIndex === index ? currentTyped : null}
              currentIndex={currentIndex}
              characterIndex={index}
              setCurrentIndex={setCurrentIndex}
              showCursor={currentIndex === index}
              characterState={
                currentIndex === index ? currentCharacterState :
                  // All characters behind cursor must be correct                      
                  currentIndex >= index ? CharacterState.CORRECT : CharacterState.NORMAL}
            />
          )))}
        </>
        {/* } */}

      </Box>
    </Box>
  );
};

export default Editor;
