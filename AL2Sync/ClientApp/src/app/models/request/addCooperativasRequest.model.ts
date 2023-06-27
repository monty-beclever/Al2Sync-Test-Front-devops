import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Contracts")
export class Contracts {
  @JsonProperty("titulo", String, true)
  titulo: string = undefined;
  @JsonProperty("docNombre", String, true)
  docNombre: string = undefined;
  @JsonProperty("docTamano", Number, true)
  docTamano: number = undefined;
  @JsonProperty("tipoMime", String, true)
  tipoMime: string = undefined;
  @JsonProperty("docContenido", String, true)
  docContenido: string = undefined;
  @JsonProperty("estado", Number, true)
  estado: number = undefined;
}

@JsonObject("AddCooperativaRequest")
export class AddCooperativaRequest {
  @JsonProperty("name", String, true)
  name: string = undefined;
  @JsonProperty("cuit", String, true)
  cuit: string = undefined;
  @JsonProperty("active", Boolean, true)
  active: boolean = undefined;
  @JsonProperty("contracts", [String], true)
  contracts: Array<Contracts> = [];
  @JsonProperty("acct_number", String, true)
  acct_number: string = undefined;
  @JsonProperty("provincia", String, true)
  provincia: string = undefined;
  @JsonProperty("localidad", String, true)
  localidad: string = undefined;
  @JsonProperty("phone", String, true)
  phone: string = undefined;
  @JsonProperty("email", String, true)
  email: string = undefined;
  @JsonProperty("users", [Object], true)
  users: Array<any> = [];
  @JsonProperty("credit_amnt", Number, true)
  credit_amnt: number = undefined;
  @JsonProperty("tipo", Number, true)
  tipo: number = undefined;
}
