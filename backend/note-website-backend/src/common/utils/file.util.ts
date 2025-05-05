import * as fs from 'fs';
import * as path from 'path';

export const removeFile = (filePath: string): void => {
  try {
    fs.unlinkSync(path.resolve(filePath));
  } catch (error) {
    console.error(`Error removing temp file: ${error.message}`);
  }
};
