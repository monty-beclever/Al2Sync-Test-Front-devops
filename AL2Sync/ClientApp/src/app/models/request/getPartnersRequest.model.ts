import { JsonConverter, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("GetPartnersRequest")
export class GetPartnersRequest {
  @JsonProperty("CooperativaId", String, true)
  cooperativaId: string = "";
  @JsonProperty("Nombre", String, true)
  nombre: string = "";
  @JsonProperty("Apellido", String, true)
  apellido: string = "";
  @JsonProperty("Cuit", String, true)
  cuit: string = "";
  @JsonProperty("ExternalId", String, true)
  externalId: string = "";
  @JsonProperty("Activo", Boolean, true)
  activo: boolean = true;
  @JsonProperty("Strict", Boolean, true)
  strict: boolean = true;
}
