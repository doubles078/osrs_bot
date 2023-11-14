import robotjs = require("robotjs");
import { getRandomInt, sleep } from "../utils";

export type TREE = {
  x: number;
  y: number;
};

// A handful of hex colors of trees grabbed with robotjs
// Unfortunately i think other items have these colors sometimes as well
const TREE_HEX_COLORS = [
  "5f4322",
  "6b4b26",
  "52391d",
  "322311",
  "1a1309",
  "78552b",
];

export const findTree = () => {
  // Where the screen cap begins
  const x = 300;
  const y = 300;
  // Screen cap dimensions
  const width = 800;
  const height = 405;
  const number_of_pixels_to_sample = 1000;
  const image = robotjs.screen.capture(x, y, width, height);

  for (let i = 0; i < number_of_pixels_to_sample; i++) {
    const random_x = getRandomInt(width - 1);
    const random_y = getRandomInt(height - 1);
    const sample_color = image.colorAt(random_x, random_y);

    if (TREE_HEX_COLORS.includes(sample_color)) {
      const screen_x = random_x + x;
      const screen_y = random_y + y;
      console.log(
        "Found a 🌲 at: ",
        screen_x,
        screen_y,
        " with color: ",
        sample_color
      );
      // move mouse to coords
      robotjs.moveMouse(screen_x, screen_y);
      if (confirmTree()) {
        return { x: screen_x, y: screen_y };
      }
    }
  }

  console.log("Could not find a tree 🌳.");
  return false;
};

export const cutTree = (tree: TREE, sleep_ms: number) => {
  const { x, y } = tree;
  console.log("Trying to cut tree at x: ", x, " y: ", y);
  robotjs.mouseClick();
  sleep(sleep_ms);
};

export const confirmTree = () => {
  const THE_WORD_TREE_COLOR = "00ffff";

  // wait a bit
  sleep(1000);

  // check the color of the action text
  // @TODO update this location to be the top left corner of the screen
  const text_x = 100;
  const text_y = 73;

  const pixel_color = robotjs.getPixelColor(text_x, text_y);

  console.log("tree conf pxi", pixel_color);
  console.log("tree confirmed", pixel_color === THE_WORD_TREE_COLOR);
  return pixel_color === THE_WORD_TREE_COLOR;
};
