import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("UpdateCooperativasResponse")
export class UpdateCooperativasResponse {
  @JsonProperty("id", String, true)
  id: string = undefined;
  @JsonProperty("phone", String, true)
  phone: string = undefined;
  @JsonProperty("email", String, true)
  email: string = undefined;
  @JsonProperty("credit_amnt", Number, true)
  credit_amnt: number = undefined;
}
