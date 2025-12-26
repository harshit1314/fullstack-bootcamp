import fs from 'fs';
import path from 'path';

const src = path.join(process.cwd(), 'big-file.txt');
const dest = path.join(process.cwd(), 'big-file-copy.txt');

// 1. Setup: Create a somewhat big file (approx 1MB)
// We repeat "Hello World " 100,000 times.
console.log("Generating big file...");
fs.writeFileSync(src, "Hello World ".repeat(100000));

// 2. Create the Streams
console.log("\n--- Starting Stream Transfer ---");

// ReadStream: The Source
// highWaterMark: 16384 means "read 16KB at a time"
const reader = fs.createReadStream(src, { highWaterMark: 16384 });

// WriteStream: The Destination
const writer = fs.createWriteStream(dest);

let chunkCount = 0;

// 3. Listen for "data" events (This fires every time a piece arrives)
reader.on('data', (chunk) => {
  chunkCount++;
  // 'chunk' is a Buffer (raw binary data)
  process.stdout.write('.'); // Print a dot for every chunk
});

// 4. Pipe connects them: Reader -> Writer
// Think of this like plumbing.
reader.pipe(writer);

// 5. Listen for completion
reader.on('end', () => {
  console.log("\n\n✅ Done!");
  console.log(`Total Chunks Processed: ${chunkCount}`);
  
  // Cleanup
  fs.unlinkSync(src);
  fs.unlinkSync(dest);
  console.log("(Cleaned up temporary files)");
});
