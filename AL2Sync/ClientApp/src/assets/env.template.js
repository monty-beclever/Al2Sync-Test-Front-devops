(function(window) {
  window.env = window.env || {};
  window["env"]["production"] = "${PRODUCTION}";
  window["env"]["api_url"] = "${API_URL}";
  window["env"]["copyright"] = "${COPYRIGHT}";
  window["env"]["version"] = "${VERSION}";
  window["env"]["maxCreditAmnt"] = "${MAX_CREDIT_AMNT}";
  window["env"]["tyc_url"] = "${TYC_URL}";
})(this);
