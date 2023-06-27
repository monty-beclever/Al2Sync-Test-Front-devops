import { JsonConverter, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("ChangePasswordRequest")
export class ChangePasswordRequest {
  @JsonProperty("Password", String, true)
  password: string = "";
  @JsonProperty("NewPassword", String, true)
  newPassword: string = "";
}
