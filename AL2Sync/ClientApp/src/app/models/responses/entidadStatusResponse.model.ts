import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("EntidadStatusResponse")
export class EntidadStatusResponse {
  @JsonProperty("id", Number, true)
  id: number = null;
  @JsonProperty("title", String, true)
  title: string = null;
  @JsonProperty("internalKey", String, true)
  internalKey: string = null;
}
