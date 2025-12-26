import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().min(18)
});

// TypeScript automatically infers the type from the schema!
type User = z.infer<typeof UserSchema>;

function processUser(user: User) {
  console.log(`Processing ${user.email} (Age: ${user.age})`);
}

// Simulate data
const validData = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "test@example.com",
  age: 25
};

// Parse checks if the data matches the rules
try {
  const user = UserSchema.parse(validData);
  processUser(user);
  console.log("Success!");
} catch (e) {
  console.error("Validation failed", e);
}
