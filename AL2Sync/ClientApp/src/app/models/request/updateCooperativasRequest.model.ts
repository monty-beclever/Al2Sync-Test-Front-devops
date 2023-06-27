import { JsonObject, JsonProperty } from "json2typescript";
import { Contracts } from "./addCooperativasRequest.model";

@JsonObject("UpdateCooperativaRequest")
export class UpdateCooperativaRequest {
  @JsonProperty("id", String, true)
  id: string = undefined;
  @JsonProperty("phone", String, true)
  phone: string = undefined;
  @JsonProperty("email", String, true)
  email: string = undefined;
  @JsonProperty("credit_amnt", Number, true)
  credit_amnt: number = undefined;
  @JsonProperty("contracts", [String], true)
  contracts: Array<Contracts> = [];
}
