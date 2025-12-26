import "dotenv/config"; // This loads the .env file immediately

const secret = process.env.API_SECRET;

if (!secret) {
  console.error("❌ Error: API_SECRET is missing from .env");
  process.exit(1);
}

console.log("✅ Config loaded successfully.");
console.log(`The secret is length: ${secret.length}`);
// We rarely log the actual secret, just proof we have it!
