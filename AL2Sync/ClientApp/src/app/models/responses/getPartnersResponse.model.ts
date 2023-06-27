import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("CuentaContable")
export class CuentaContable {
  @JsonProperty("NumeroCuenta", String, true)
  NumeroCuenta: string = undefined;
  @JsonProperty("alias", String, true)
  alias: string = undefined;
  @JsonProperty("credito", Number, true)
  credito: number = undefined;
  @JsonProperty("cuit", String, true)
  cuit: string = undefined;
  @JsonProperty("socioId", String, true)
  socioId: string = undefined;
  @JsonProperty("tipoCuenta", Number, true)
  tipoCuenta: number = undefined;
  @JsonProperty("valid", Boolean, true)
  valid: boolean = false;
}
@JsonObject("GetPartnersResponse")
export class GetPartnersResponse {
  @JsonProperty("cuit", String, true)
  cuit: string = "";
  @JsonProperty("id", String, true)
  id: string = "";
  @JsonProperty("externalid", String, true)
  externalid: string = "";
  @JsonProperty("nombre", String, true)
  nombre: string = "";
  @JsonProperty("apellido", String, true)
  apellido: string = "";
  @JsonProperty("activo", Boolean, true)
  activo: boolean = true;
  @JsonProperty("acuerdocredito", Number, true)
  acuerdoCredito: number = 0;
  @JsonProperty("cuentaCorrientePropia", String, true)
  cuentaCorrientePropia: string = "";
  @JsonProperty("numeroCuenta", String, true)
  numeroCuenta: string = "";
  @JsonProperty("esccc", Number, true)
  esccc: number = 0;
  @JsonProperty("feccre", String, true)
  fechaCreacion: string = "";
  @JsonProperty("xstatus", Object, true)
  xstatus: any = null;
  @JsonProperty("cooperativa", Object, true)
  cooperativa: any = null;
  @JsonProperty("cuentacontable", [Object], true)
  cuentacontable: Array<CuentaContable> = null;
}
