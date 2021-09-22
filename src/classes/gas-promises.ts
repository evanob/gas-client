import { ignoredFunctionNames } from '../utils/ignored-function-names';
import { promisify } from '../utils/promisify';
import { FunctionHost } from './function-host';
import { FunctionMap, ServerFunctions } from '../types/functions';
import { ServerConfig } from '../types/config';

class GASPromises<FM extends FunctionMap> extends FunctionHost<FM> {
  constructor(private config?: ServerConfig) {
    super();
    this.promisifyGASFunctions(config);
  }

  private promisifyGASFunctions(config: ServerConfig = {}): void {
    const route = config.reroute ?? ((func: string) => func);

    this._serverFunctions = Object.keys(google.script.run).reduce(
      (acc, functionName) =>
        ignoredFunctionNames.includes(functionName)
          ? acc
          : {
              ...acc,
              [functionName]: promisify(route(functionName)),
            },
      {}
    ) as ServerFunctions<FM>;
  }
}

export { GASPromises };
