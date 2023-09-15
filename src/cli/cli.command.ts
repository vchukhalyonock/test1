import { Injectable } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';
import { CliService } from './cli.service';

@Injectable()
export class CliCommand {
  constructor(private readonly cliService: CliService) {}
  @Command({
    command: 'file:apply <filename>',
    describe: 'apply file content',
  })
  async applyFile(
    @Positional({ name: 'filename', describe: 'filename', type: 'string' })
    filename: string,
  ) {
    await this.cliService.importDataFromFile(filename);
  }
}
