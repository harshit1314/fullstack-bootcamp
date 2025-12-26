console.log("--- 1. Process Info ---");
console.log(`Process ID: ${process.pid}`);
console.log(`Node Version: ${process.version}`);
console.log(`Current Directory: ${process.cwd()}`);

console.log("\n--- 2. Environment Variables ---");
const user = process.env.USER || "Guest";
console.log(`Hello, ${user}!`);

console.log("\n--- 3. Command Line Arguments ---");
const args = process.argv.slice(2);
console.log(`You passed arguments: ${args.join(", ")}`);

if (args.includes("--error")) {
  console.error("Oops! Something went wrong.");
  process.exit(1);
} else {
  console.log("All good!");
  process.exit(0);
}
