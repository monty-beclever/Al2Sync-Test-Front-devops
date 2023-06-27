import { JsonConverter, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("AddPartnersResponse")
export class AddPartnersResponse {
  @JsonProperty("cuit", String, true)
  cuit: string = "";
  @JsonProperty("al2id", String, true)
  al2id: string = "";
  @JsonProperty("esnuevo", Boolean, true)
  esnuevo: boolean = true;
  // @JsonProperty("Cooperativa", Cooperativa, true)
  // cooperativa: Cooperativa = null;
  // @JsonProperty("CuentaContable", CuentaContable, true)
  // cuentaContable: CuentaContable = null;
}
