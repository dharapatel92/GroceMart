import { AES, enc, lib } from 'crypto-js';
import { environment } from "../../../environments/environment";

const ENCRYPTION_TOKEN = environment.ENCRYPTION_TOKEN;

export const Encrypt = (value: string | lib.WordArray): string => {
  return AES.encrypt(value, ENCRYPTION_TOKEN).toString();
};

export const Decrypt = (value: string | lib.CipherParams): string => {
  if (!value) {
    return '';
  }

  const bytes = AES.decrypt(value, ENCRYPTION_TOKEN);
  const originalText = bytes.toString(enc.Utf8);

  return originalText;
};
