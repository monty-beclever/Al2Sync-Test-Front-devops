export const environment = {
  production:true,
  api_url: window["env"]["api_url"] || "http://10.10.30.102:81/Al2Sync.Back/",  
  copyright: window["env"]["copyright"] || "Al2 Sync ©2021-2023",
  version: window["env"]["version"] || "2.0.0.0",
  maxCreditAmnt: window["env"]["maxCreditAmnt"] || 10000000000,
  tyc_url: window["env"]["tyc_url"] || "https://www.al2.com.ar/AL2%20-%20Terminos%20y%20Condiciones%20Al2Sync.pdf"
};
