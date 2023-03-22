import { tableSchema } from "@nozbe/watermelondb";

const userSchema = tableSchema({
  name: "users",
  columns: [
    {
      name: "user_id",
      type: "string",
    },
    {
      name: "name",
      type: "string",
    },
    {
      name: "email",
      type: "string",
    },
    {
      name: "access_token",
      type: "string",
    },
  ],
});

export { userSchema };
