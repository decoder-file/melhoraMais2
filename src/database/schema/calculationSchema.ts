import { tableSchema } from "@nozbe/watermelondb";

const calculationSchema = tableSchema({
  name: "calculations",
  columns: [
    {
      name: "entryWeight",
      type: "string",
    },
    {
      name: "title",
      type: "string",
    },
    {
      name: "dailyCost",
      type: "string",
    },
    {
      name: "priceAtPurchase",
      type: "string",
    },
    {
      name: "gmd",
      type: "string",
    },
    {
      name: "timeOfStay",
      type: "string",
    },
    {
      name: "outputWeight",
      type: "string",
    },
    {
      name: "rcInitial",
      type: "string",
    },
    {
      name: "rcFinal",
      type: "string",
    },
    {
      name: "atSalePrice",
      type: "string",
    },
    {
      name: "purchasePrice",
      type: "string",
    },
    {
      name: "priceAtProduced",
      type: "string",
    },
    {
      name: "returnOnCapital",
      type: "string",
    },
    {
      name: "result",
      type: "string",
    },
    {
      name: "bash",
      type: "string",
    },
    {
      name: "description",
      type: "string",
    },
  ],
});

export { calculationSchema };
