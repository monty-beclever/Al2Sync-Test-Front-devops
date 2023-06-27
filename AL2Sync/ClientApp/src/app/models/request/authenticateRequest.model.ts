import { JsonConverter, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("AuthenticateRequest")
export class AuthenticateRequest {
  @JsonProperty("username", String, true)
  username: string = "";
  @JsonProperty("password", String, true)
  password: string = "";
  @JsonProperty("domain", String, true)
  domain: string = "AL2";
  @JsonProperty("dack", String, true)
  pack: string = "AL2";
}
