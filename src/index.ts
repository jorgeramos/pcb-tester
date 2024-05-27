import chalk from "chalk";
import * as i2c from "i2c-bus";

const i2cBus = i2c.openSync(1); // Use I2C bus 1

const startAddress = 0x00;
const endAddress = 0x77;
const startPin = 1;
const endPin = 5;

const totalPermutations = (endAddress - startAddress + 1) * (endPin - startPin + 1);
console.log(`Total permutations to test: ${totalPermutations}\n`);

let currentStep = 0;

async function scanI2C() {
  for (let address = startAddress; address <= endAddress; address++) {
    for (let pin = startPin; pin <= endPin; pin++) {
      currentStep++;
      console.log(`Step ${currentStep}:`);
      console.log(`  Testing Address: 0x${address.toString(16).padStart(2, "0").toUpperCase()}`);
      console.log(`  Testing Pin: ${pin}`);
      try {
        // Attempt to read a byte from the I2C device to see if it responds
        i2cBus.receiveByteSync(address);
        console.log(
          chalk.green(
            `  --> Device FOUND at address 0x${address.toString(16).padStart(2, "0").toUpperCase()} on pin ${pin}\n`
          )
        );
      } catch (err) {
        console.log(
          chalk.red(
            `  --> No device at address 0x${address.toString(16).padStart(2, "0").toUpperCase()} on pin ${pin}\n`
          )
        );
      }
      console.log(`Step ${currentStep} completed\n`);
    }
  }
  console.log("Scan complete.");
}

async function main() {
  console.log("Starting I2C scan...\n");
  await scanI2C();
  i2cBus.closeSync();
  console.log("I2C bus closed.");
}

main().catch((err) => {
  console.error("Error:", err);
  i2cBus.closeSync();
});
