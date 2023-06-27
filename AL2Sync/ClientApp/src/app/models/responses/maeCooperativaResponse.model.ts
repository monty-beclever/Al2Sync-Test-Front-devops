import { JsonConverter, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("MaeCooperativaResponse")
export class MaeCooperativaResponse {
  @JsonProperty("id", String, true)
  id: string = undefined;
  @JsonProperty("cuentaCorriente", String, true)
  cuentaCorriente: string = "";
  @JsonProperty("tipo", Number, true)
  tipo: number = 0;
  @JsonProperty("nombre", String, true)
  nombre: string = "";
  @JsonProperty("cuit", String, true)
  cuit: string = "";
  @JsonProperty("localidad", String, true)
  localidad: string = "";
}
