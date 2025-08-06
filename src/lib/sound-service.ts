import { Howl } from "howler";

// 共有の音声インスタンス
const sharedHowlOver = new Howl({
  src: ["/sounds/tap_03.wav"],
  volume: 0.33,
});
const sharedHowlClick = new Howl({
  src: ["/sounds/toggle_on.wav"],
  volume: 0.5,
});

const sharedHowlTransitionUp = new Howl({
  src: ["/sounds/transition_up.wav"],
  volume: 0.33,
});
const sharedHowlTransitionDown = new Howl({
  src: ["/sounds/transition_down.wav"],
  volume: 0.5,
});

// 音声サービスを作成する関数
export function playClickSound() {
  sharedHowlClick.play();
}
export function playMouseOverSound() {
  sharedHowlOver.play();
}
export function playTransitionUpSound() {
  sharedHowlTransitionUp.play();
}
export function playTransitionDownSound() {
  sharedHowlTransitionDown.play();
}
