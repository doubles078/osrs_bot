import robotjs = require("robotjs");

export const sleep = (ms: number) => {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
};

// Helper to find what color the robotjs sees, since it can be different
// than using the eyedropped in photoshop or gimp
export const findRobotColor = (x: number, y: number) => {
  sleep(2000);
  // Uncomment this to check exactly where we are looking
  // robotjs.moveMouseSmooth(x, y);
  console.log("Pixel color: ", robotjs.getPixelColor(x, y));
};

export const dropInventoryItems = (color: string) => {
  // Distance to the right the mouse moves to click the drop menu
  const DROP_OFFSET = 70;
  // @TODO: update the x, y
  const inventory = {
    x: 1291,
    y: 621,
  };

  let pixel_color = robotjs.getPixelColor(inventory.x, inventory.y);
  console.log("Inventory pixel color: ", pixel_color);

  let waitCycle = 0;
  const waitCycleMax = 9;

  while (pixel_color !== color && waitCycle < waitCycleMax) {
    // wait longer to see if the action finishes
    sleep(3000);
    // when tree/asset/item dissapears, double check that pixels color
    pixel_color = robotjs.getPixelColor(inventory.x, inventory.y);

    // dont wait too long
    waitCycle++;
  }
  // Distance away to click the drop controls
  if (pixel_color.toLocaleLowerCase() === color.toLocaleLowerCase()) {
    console.log("Trying to drop stuff: ");
    robotjs.moveMouse(inventory.x, inventory.y);
    robotjs.mouseClick("right");
    sleep(500);
    robotjs.moveMouse(inventory.x, inventory.y + DROP_OFFSET);
    robotjs.mouseClick();
    sleep(4000);
  }
};

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const rotateCamera = () => {
  // Rotating camera 📷
  robotjs.keyToggle("right", "down");
  sleep(1000);
  robotjs.keyToggle("right", "up");
};
