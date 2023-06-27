import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("IsAdminModel")
export class IsAdminModel {
  @JsonProperty("isadmin", Boolean, true)
  isadmin: boolean = false;
}
