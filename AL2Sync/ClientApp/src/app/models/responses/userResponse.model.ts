import { JsonConverter, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("UserResponse")
export class UserResponse {
  @JsonProperty("id", String, true)
  id: string = "";
  @JsonProperty("nombre", String, true)
  nombre: string = "";
  @JsonProperty("apellido", String, true)
  apellido: string = "";
  @JsonProperty("user", String, true)
  user: string = "";
  @JsonProperty("cuit", String, true)
  cuit: string = "";
  @JsonProperty("status", Number, true)
  status: number = 0;
  @JsonProperty("cargo", String, true)
  cargo: string = "";
  @JsonProperty("cooperativasid", String, true)
  cooperativaid: string = "";
  @JsonProperty("acceso", String, true)
  acceso: string = "";
  @JsonProperty("cooperativa", Object, true)
  cooperativa: any = null;
}
