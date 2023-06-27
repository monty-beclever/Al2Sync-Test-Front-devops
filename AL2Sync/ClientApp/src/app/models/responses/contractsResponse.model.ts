import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("ContractsResponse")
export class ContractsResponse {
  @JsonProperty("id", Number, true)
  id: number = undefined;
  @JsonProperty("recordGuid", String, true)
  recordGuid: string = undefined;
  @JsonProperty("fechaAlta", String, true)
  fechaAlta: string = undefined;
  @JsonProperty("fechaMod", String, true)
  fechaMod: string = undefined;

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
}
