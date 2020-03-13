/*eslint @typescript-eslint/no-explicit-any:off */

type Payload = { [key: string]: any };
export default function makeActionCreator<P extends Payload>(type: string) {
  return function(payload?: P): { type: string } & P {
    payload = payload || ({} as P);
    const action: Payload = { type };
    for (const key of Object.keys(payload)) {
      action[key] = payload[key];
    }
    return action as { type: string } & P;
  };
}
