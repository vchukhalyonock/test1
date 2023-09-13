import { Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';

@Injectable()
export class FileService {
  async readContent(filename: string): Promise<string> {
    return readFile(filename, { encoding: 'utf-8' });
  }
}
