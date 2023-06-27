import { JsonConverter, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("AddPartnersRequest")
export class AddPartnersRequest {
  @JsonProperty("CooperativaId", String, true)
  cooperativaId: string = "";
  @JsonProperty("Cuit", String, true)
  cuit: string = "";
  @JsonProperty("Nombre", String, true)
  nombre: string = "";
  @JsonProperty("Apellido", String, true)
  apellido: string = "";
  @JsonProperty("Activo", Boolean, true)
  activo: boolean = true;
  @JsonProperty("AcuerdoCredito", Number, true)
  acuerdoCredito: number = 0;
  @JsonProperty("CuentaCorriente", String, true)
  cuentaCorriente: string = "";
  @JsonProperty("Esccc", Boolean, true)
  esccc: boolean = true;
}
