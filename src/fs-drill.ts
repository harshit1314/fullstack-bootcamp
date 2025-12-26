import fs from 'fs/promises';
import path from 'path';

async function runFileOperations() {
  const filePath = path.join(process.cwd(), 'secret-message.txt');

  console.log("--- 1. Writing File ---");
  // equivalent to "Save"
  await fs.writeFile(filePath, "Hello, this is a Node.js file!");
  console.log("File created successfully.");

  console.log("\n--- 2. Reading File ---");
  // 'utf-8' turns the raw bytes into a readable string
  const content = await fs.readFile(filePath, 'utf-8');
  console.log("File Content:", content);

  console.log("\n--- 3. Appending Data ---");
  // Add more text to the end without erasing the old text
  await fs.appendFile(filePath, "\nThis line was added later.");
  const newContent = await fs.readFile(filePath, 'utf-8');
  console.log("Updated Content:\n" + newContent);

  console.log("\n--- 4. Checking Info ---");
  // Get file metadata (size, creation time)
  const stats = await fs.stat(filePath);
  console.log(`File Size: ${stats.size} bytes`);
}

runFileOperations().catch(err => {
  console.error("Error:", err);
});
