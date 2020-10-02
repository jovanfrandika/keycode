import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/core";

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

const BLOCKED_KEYS = ["Shift", "Tab"]

const Editor: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [currentTyped, setCurrentTyped] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    setValue(TEST_VALUE);
    editorListener();
  }, []);

  useEffect(() => {
    // If character matches.
    if (value[currentIndex] === currentTyped) {
      console.log("bener");
      setCurrentIndex((previousIndex) => previousIndex + 1);
      setCurrentTyped(null);
    }
    // If character was just initialized.
    else if (currentTyped === null) {
      console.log('baru masuk');
    }
    // If character was wrong.
    else {
      console.log("salah");
    };
  }, [currentIndex, currentTyped, value]);

  const editorListener = () => {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      BLOCKED_KEYS.forEach((key) => {
        if (event.key !== key) {
          setCurrentTyped(event.key)
        }
      })
    });
  };

  return (
    <Box>
      <Box style={{
        whiteSpace: "pre-line"
      }}>
        {value.split("").map(((val, index) => (
          <Character
            key={`value-${val}-${index}`}
            character={val}
            typed={index === currentIndex ? currentTyped : null}
            currentIndex={currentIndex}
            characterIndex={index}
            setCurrentIndex={setCurrentIndex}
            setCurrentTyped={setCurrentTyped}
            showCursor={currentIndex === index}
          />
        )))}
      </Box>
    </Box>
  );
};

export default Editor;
