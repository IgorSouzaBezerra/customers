import { hash, compare } from "bcrypt";

import { IHashProvider } from "../IHashProvider";

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash);
  }
}

export { BCryptHashProvider };
