import { JsonConverter, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("ConsultarTransaccionResponse")
export class ConsultarTransaccionResponse {
  @JsonProperty("trnid", Number, true)
  trnid: number = null;
  @JsonProperty("trnInternalId", String, true)
  trnInternalId: string = null;
  @JsonProperty("cuit", String, true)
  cuit: string = null;
  @JsonProperty("cuitDebito", String, true)
  cuitDebito: string = null;
  @JsonProperty("cuitCredito", String, true)
  cuitCredito: string = null;
  @JsonProperty("fecha", String, true)
  fecha: string = null;
  @JsonProperty("importe", Number, true)
  importe: number = null;
  @JsonProperty("tipo", String, true)
  tipo: string = null;
  @JsonProperty("detalle", String, true)
  detalle: string = null;
  @JsonProperty("trnStatus", Number, true)
  trnStatus: number = null;
  @JsonProperty("socio", String, true)
  socio: string = null;
  @JsonProperty("cooperativa", String, true)
  cooperativa: string = null;

  status: string = "";
}
