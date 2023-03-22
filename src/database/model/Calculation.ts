import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class Calculation extends Model {
  static table = "calculations";

  @field("entryWeight")
  entryWeight!: string;

  @field("title")
  title!: string;

  @field("dailyCost")
  dailyCost!: string;

  @field("priceAtPurchase")
  priceAtPurchase!: string;

  @field("gmd")
  gmd!: string;

  @field("timeOfStay")
  timeOfStay!: string;

  @field("outputWeight")
  outputWeight!: string;

  @field("rcInitial")
  rcInitial!: string;

  @field("rcFinal")
  rcFinal!: string;

  @field("atSalePrice")
  atSalePrice!: string;

  @field("purchasePrice")
  purchasePrice!: string;

  @field("priceAtProduced")
  priceAtProduced!: string;

  @field("returnOnCapital")
  returnOnCapital!: string;

  @field("result")
  result!: string;

  @field("bash")
  bash!: string;

  @field("description")
  description!: string;
}

export { Calculation } 