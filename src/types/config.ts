type AllowedDevelopmentDomains = string | ((origin: string) => boolean);

interface ServerConfig {
  allowedDevelopmentDomains?: AllowedDevelopmentDomains;
  reroute?: (functionName: string) => string;
}

export { AllowedDevelopmentDomains, ServerConfig };
