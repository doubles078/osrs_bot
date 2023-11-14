import { dropInventoryItems, rotateCamera } from "./utils";
import { cutTree, findTree } from "./skills/woodcutting";

const main = () => {
  // use ctrl-c to cancel out of this
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const tree = findTree();
    if (!tree) {
      rotateCamera();
      continue;
    }
    cutTree(tree, 2000);
    const LOG_COLOR = "5b4021";

    // Drop logs
    dropInventoryItems(LOG_COLOR);
  }
};

main();
