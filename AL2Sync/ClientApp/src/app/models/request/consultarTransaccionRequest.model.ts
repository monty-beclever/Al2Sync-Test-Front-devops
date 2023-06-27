import { JsonConverter, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("ConsultarTransaccionRequest")
export class ConsultarTransaccionRequest {
  @JsonProperty("FechaDesde", String, true)
  fechaDesde: string = null;
  @JsonProperty("FechaHasta", String, true)
  fechaHasta: string = null;
  @JsonProperty("TrnStatus", Number, true)
  trnStatus: number = 0;
  @JsonProperty("TrnId", Number, true)
  trnId: number = null;
  @JsonProperty("TrnInternalId", String, true)
  trnInternalId: string = null;
  @JsonProperty("CooperativaId", String, true)
  cooperativaId: string = null;
  @JsonProperty("UserName", String, true)
  userName: string = null;
}
