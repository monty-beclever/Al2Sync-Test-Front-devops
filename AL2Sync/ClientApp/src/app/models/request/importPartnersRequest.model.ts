import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("ImportPartnersRequest")
export class ImportPartnersRequest {
  @JsonProperty("cooperativaCuit", String, true)
  cooperativaCuit: string = null;
  @JsonProperty("coopCtaCorriente", String, true)
  coopCtaCorriente: string = null;
  @JsonProperty("externalId", String, true)
  externalId: string = null;
  @JsonProperty("cuit", String, true)
  cuit: string = null;
  @JsonProperty("nombre", String, true)
  nombre: string = null;
  @JsonProperty("apellido", String, true)
  apellido: string = null;
  @JsonProperty("activo", String, true)
  activo: string = null;
  @JsonProperty("acuerdoCredito", Number, true)
  acuerdoCredito: number = null;
  @JsonProperty("cuentaCorriente", String, true)
  cuentaCorriente: string = null;
  @JsonProperty("esccc", Number, true)
  esccc: number = null;
}
