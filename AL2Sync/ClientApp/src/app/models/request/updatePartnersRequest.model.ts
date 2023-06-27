import { JsonConverter, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("UpdatePartnersRequest")
export class UpdatePartnersRequest {
  @JsonProperty("userName", String, true)
  userName: string = null;
  @JsonProperty("cuit", String, true)
  cuit: string = null;
  @JsonProperty("cooperativaId", String, true)
  cooperativaId: string = null;
  @JsonProperty("acuerdoCredito", Number, true)
  acuerdoCredito: number = null;
  @JsonProperty("cuentaCorriente", String, true)
  cuentaCorriente: string = null;
}
