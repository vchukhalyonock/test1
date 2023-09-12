import { Injectable } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';

@Injectable()
export class CliCommand {
  @Command({
    command: 'file:apply <filename>',
    describe: 'apply file content',
  })
  async applyFile(
    @Positional({ name: 'filename', describe: 'filename', type: 'string' })
    filename: string,
  ) {
    console.log('Run applyFile');
    console.log({ filename });
  }
}
