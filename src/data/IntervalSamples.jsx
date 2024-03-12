import c3Sound from "../sounds/interval_samples/C3.mp3";
import db3Sound from "../sounds/interval_samples/Db3.mp3";
import d3Sound from "../sounds/interval_samples/D3.mp3";
import eb3Sound from "../sounds/interval_samples/Eb3.mp3";
import e3Sound from "../sounds/interval_samples/E3.mp3";
import f3Sound from "../sounds/interval_samples/F3.mp3";
import gb3Sound from "../sounds/interval_samples/Gb3.mp3";
import g3Sound from "../sounds/interval_samples/G3.mp3";
import ab3Sound from "../sounds/interval_samples/Ab3.mp3";
import a3Sound from "../sounds/interval_samples/A3.mp3";
import bb3Sound from "../sounds/interval_samples/Bb3.mp3";
import b3Sound from "../sounds/interval_samples/B3.mp3";
import c4Sound from "../sounds/interval_samples/C4.mp3";
import db4Sound from "../sounds/interval_samples/Db4.mp3";
import d4Sound from "../sounds/interval_samples/D4.mp3";
import eb4Sound from "../sounds/interval_samples/Eb4.mp3";
import e4Sound from "../sounds/interval_samples/E4.mp3";
import f4Sound from "../sounds/interval_samples/F4.mp3";
import gb4Sound from "../sounds/interval_samples/Gb4.mp3";
import g4Sound from "../sounds/interval_samples/G4.mp3";
import ab4Sound from "../sounds/interval_samples/Ab4.mp3";
import a4Sound from "../sounds/interval_samples/A4.mp3";
import bb4Sound from "../sounds/interval_samples/Bb4.mp3";
import b4Sound from "../sounds/interval_samples/B4.mp3";
import c5Sound from "../sounds/interval_samples/C5.mp3";

export const intervals = [
  "Unison/Octave",
  "Minor Second",
  "Major Second",
  "Minor Third",
  "Major Third",
  "Perfect Fourth",
  "Tritone",
  "Perfect Fifth",
  "Minor Sixth",
  "Major Sixth",
  "Minor Seventh",
  "Major Seventh",
  "Octave",
];

function getIntervalName(intervalNum) {
  // if the interval is larger than an octave, sum it down
  intervalNum = intervalNum % 12;

  // return the interval name
  return intervals[intervalNum];
}

export function generateInterval() {
  const notesArr = [
    c3Sound,
    db3Sound,
    d3Sound,
    eb3Sound,
    e3Sound,
    f3Sound,
    gb3Sound,
    g3Sound,
    ab3Sound,
    a3Sound,
    bb3Sound,
    b3Sound,
    c4Sound,
    db4Sound,
    d4Sound,
    eb4Sound,
    e4Sound,
    f4Sound,
    gb4Sound,
    g4Sound,
    ab4Sound,
    a4Sound,
    bb4Sound,
    b4Sound,
    c5Sound,
  ];
  // array of notes is copied and the copy is shuffled
  const shuffled = [...notesArr].sort(() => 0.5 - Math.random());
  // two values are selected at random from the shuffled array
  let selected = shuffled.slice(0, 2);
  // find the index of the two shuffled notes in the original array
  let firstInd = notesArr.findIndex((e) => e == selected[0]);
  let secondInd = notesArr.findIndex((e) => e == selected[1]);
  // calculate the difference between the two intervals
  const intervalNum = Math.abs(firstInd - secondInd);
  const intervalName = getIntervalName(intervalNum);

  return {
    sounds: selected,
    answer: intervalName,
  };
}

export let questions = [
  {
    question: generateInterval(),
  },
  {
    question: generateInterval(),
  },
  {
    question: generateInterval(),
  },
  {
    question: generateInterval(),
  },
  {
    question: generateInterval(),
  },
];

export function generateNewQuestions() {
  questions = [
    {
      question: generateInterval(),
    },
    {
      question: generateInterval(),
    },
    {
      question: generateInterval(),
    },
    {
      question: generateInterval(),
    },
    {
      question: generateInterval(),
    },
  ];
}
