import { appSchema } from "@nozbe/watermelondb";

import { userSchema } from "./userSchema";
import { calculationSchema } from "./calculationSchema";

const schemas = appSchema({
  version: 3,
  tables: [userSchema, calculationSchema],
});

export { schemas };
