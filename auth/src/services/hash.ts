import {scrypt, randomBytes} from 'crypto';
import {promisify} from 'util';

const scryptAsync = promisify(scrypt);

export class Hash {
  static async toHash(text: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(text, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }
  /*REFATORAR!!! */
  static async compare(storedString: string, suppliedString: string) {
    const [hashedString, salt] = storedString.split('.');
    const buf = (await scryptAsync(suppliedString, salt, 64)) as Buffer; //REUTILIZAR toHash

    return buf.toString('hex') === hashedString;
  }
}
