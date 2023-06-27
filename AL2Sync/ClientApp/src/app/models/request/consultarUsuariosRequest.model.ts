import { JsonConverter, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("ConsultarUsuariosRequest")
export class ConsultarUsuariosRequest {
  @JsonProperty("CooperativaId", String, true)
  cooperativaId: string = null;
  @JsonProperty("nombre", String, true)
  nombre: string = null;
  @JsonProperty("apellido", String, true)
  apellido: string = null;
}
