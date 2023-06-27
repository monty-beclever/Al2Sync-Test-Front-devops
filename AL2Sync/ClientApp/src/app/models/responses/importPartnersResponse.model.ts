import { JsonObject, JsonProperty } from "json2typescript";
import { ImportPartnersRequest } from "../request/importPartnersRequest.model";
import { AddPartnersResponse } from "./addPartnersResponse.model";

@JsonObject("ImportPartnersResponse")
export class ImportPartnersResponse {
  @JsonProperty("errors", [Object], true)
  errors: Array<ImportPartnersRequest> = [];
  @JsonProperty("successful", [Object], true)
  successful: Array<AddPartnersResponse> = [];
  // @JsonProperty("Cooperativa", Cooperativa, true)
  // cooperativa: Cooperativa = null;
  // @JsonProperty("CuentaContable", CuentaContable, true)
  // cuentaContable: CuentaContable = null;
}
