import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("UpdateUserRequest")
export class UpdateUserRequest {
  @JsonProperty("id", String, true)
  id: string = undefined;
  @JsonProperty("newPassword", String, true)
  newPassword: string = undefined;
  @JsonProperty("cuit", String, true)
  cuit: string = undefined;
  @JsonProperty("estado", Number, true)
  estado: number = undefined;
  @JsonProperty("name", String, true)
  name: string = undefined;
  @JsonProperty("lastName", String, true)
  lastName: string = undefined;
  @JsonProperty("cargo", String, true)
  cargo: string = undefined;
  @JsonProperty("acceso", String, true)
  acceso: string = undefined;
}
