import * as bcrypt from 'bcrypt';
import { config } from './constants/settings';

export const encryption = async (dato: string): Promise<string> => {
  return await bcrypt.hash(dato, config.round);
};

export const isMatch = async (
  dato: string,
  isMatch: string,
): Promise<boolean> => {
  const result = await bcrypt.compare(dato, isMatch);
  return result;
};
