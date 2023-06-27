import { JsonConverter, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("ChangePasswordResponse")
export class ChangePasswordResponse {
  @JsonProperty("newPassword", String, true)
  newPassword: string = "";
  @JsonProperty("password", String, true)
  password: string = "";
}
