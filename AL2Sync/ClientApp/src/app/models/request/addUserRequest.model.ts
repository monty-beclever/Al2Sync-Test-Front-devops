import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("AddUserRequest")
export class AddUserRequest {
  @JsonProperty("username", String, true)
  username: string = undefined;
  @JsonProperty("password", String, true)
  password: string = undefined;
  @JsonProperty("cuit", String, true)
  cuit: string = undefined;
  @JsonProperty("estado", Number, true)
  estado: number = undefined;
  @JsonProperty("name", String, true)
  name: string = undefined;
  @JsonProperty("lastName", String, true)
  lastName: string = undefined;
  @JsonProperty("cooperativaId", String, true)
  cooperativaId: string = undefined;
  @JsonProperty("acceso", String, true)
  acceso: string = undefined;
  @JsonProperty("cargo", String, true)
  cargo: string = undefined;
}
