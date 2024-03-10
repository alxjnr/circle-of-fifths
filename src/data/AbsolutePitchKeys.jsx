import cSound from "../sounds/absolute_pitch_samples/C.mp3";
import dBSound from "../sounds/absolute_pitch_samples/Db.mp3";
import dSound from "../sounds/absolute_pitch_samples/D.mp3";
import eBSound from "../sounds/absolute_pitch_samples/Eb.mp3";
import eSound from "../sounds/absolute_pitch_samples/E.mp3";
import fSound from "../sounds/absolute_pitch_samples/F.mp3";
import gBSound from "../sounds/absolute_pitch_samples/Gb.mp3";
import gSound from "../sounds/absolute_pitch_samples/G.mp3";
import aBSound from "../sounds/absolute_pitch_samples/Ab.mp3";
import aSound from "../sounds/absolute_pitch_samples/A.mp3";
import bBSound from "../sounds/absolute_pitch_samples/Bb.mp3";
import bSound from "../sounds/absolute_pitch_samples/B.mp3";

export const absolutePitchKeys = [
  {
    key_name: "C",
    key_selected: false,
    key_style: "piano-white-key",
    key_position: 0,
    key_sound: cSound,
  },
  {
    key_name: "D",
    key_selected: false,
    key_style: "piano-white-key",
    key_position: 12.5,
    key_sound: dBSound,
  },
  {
    key_name: "E",
    key_selected: false,
    key_style: "piano-white-key",
    key_position: 25,
    key_sound: dSound,
  },
  {
    key_name: "F",
    key_selected: false,
    key_style: "piano-white-key",
    key_position: 37.5,
    key_sound: eBSound,
  },
  {
    key_name: "G",
    key_selected: false,
    key_style: "piano-white-key",
    key_position: 50,
    key_sound: eSound,
  },
  {
    key_name: "A",
    key_selected: false,
    key_style: "piano-white-key",
    key_position: 62.5,
    key_sound: fSound,
  },
  {
    key_name: "B",
    key_selected: false,
    key_style: "piano-white-key",
    key_position: 75,
    key_sound: gBSound,
  },
  {
    key_name: "Db/C#",
    key_selected: false,
    key_style: "piano-black-key",
    key_position: 9,
    key_sound: gSound,
  },
  {
    key_name: "Eb",
    key_selected: false,
    key_style: "piano-black-key",
    key_position: 22,
    key_sound: aBSound,
  },
  {
    key_name: "Gb/F#",
    key_selected: false,
    key_style: "piano-black-key",
    key_position: 47,
    key_sound: aSound,
  },
  {
    key_name: "Ab",
    key_selected: false,
    key_style: "piano-black-key",
    key_position: 59.5,
    key_sound: bBSound,
  },
  {
    key_name: "Bb",
    key_selected: false,
    key_style: "piano-black-key",
    key_position: 71.5,
    key_sound: bSound,
  },
];
