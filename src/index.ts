import * as i2c from "i2c-bus";

const i2cBus = i2c.openSync(1); // Use I2C bus 1

const startAddress = 0x00;
const endAddress = 0x77;

async function scanI2C() {
  for (let address = startAddress; address <= endAddress; address++) {
    try {
      // Read a byte from the I2C device to see if it responds
      i2cBus.receiveByteSync(address);
      console.log(`Device found at address 0x${address.toString(16)}`);
    } catch (err) {
      // Device did not respond, ignore
      console.warn(`Device did not respond at address 0x${address.toString(16)}`);
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
