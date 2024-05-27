import * as i2c from "i2c-bus";

const i2cBus = i2c.openSync(1); // Use I2C bus 1

const startAddress = 0x00;
const endAddress = 0x77;
const startPin = 1;
const endPin = 5;

const totalPermutations = (endAddress - startAddress + 1) * (endPin - startPin + 1);
console.log(`Total permutations to test: ${totalPermutations}`);

let currentStep = 0;

async function scanI2C() {
  for (let address = startAddress; address <= endAddress; address++) {
    for (let pin = startPin; pin <= endPin; pin++) {
      currentStep++;
      console.log(`Step ${currentStep} - Address: 0x${address.toString(16)}, Pin: ${pin}`);
      try {
        // Attempt to read a byte from the I2C device to see if it responds
        i2cBus.receiveByteSync(address);
        console.log(`Device found at address 0x${address.toString(16)} on pin ${pin}`);
      } catch (err) {
        console.log(`No device at address 0x${address.toString(16)} on pin ${pin}`);
      }
      console.log(`Step ${currentStep} completed`);
    }
  }
  console.log("Scan complete.");
}

async function main() {
  console.log("Starting I2C scan...");
  await scanI2C();
  i2cBus.closeSync();
  console.log("I2C bus closed.");
}

main().catch((err) => {
  console.error("Error:", err);
  i2cBus.closeSync();
});
