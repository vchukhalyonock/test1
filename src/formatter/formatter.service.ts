import { Injectable } from '@nestjs/common';
import { ExchangeOfficeEntity } from '../exchange-office/entities/exchange-office.entity';
import { DataParserInterface } from './interfaces/data-parser.interface';
import { OfficeExchangerDataResultDto } from './dto/office-exchanger-data-result.dto';
import { NEST_SYMBOL, NEST_SYMBOLS_NUMBER } from './formatter.consts';

@Injectable()
export class FormatterService implements DataParserInterface {
  private lines: string[] = [];
  private index: number = 0;
  mapContent(content: string): OfficeExchangerDataResultDto {
    this.lines = this.makeLinesFromContent(content);

    const exchangeOfficeEntities: ExchangeOfficeEntity[] = [];
    let topLevelObject: ExchangeOfficeEntity = new ExchangeOfficeEntity();
    let arrayName: string;
    while (this.lines.length > this.index) {
      const currentLine = this.lines[this.index];
      if (currentLine.trim() === '') {
        this.index++;
        continue;
      }
      const currentLevel = this.nestLevel(currentLine);
      if (currentLevel % 2 == 0) {
        if (currentLevel === 0 && currentLine === 'exchange-offices') {
          this.index++;
        } else {
          if (currentLine.includes('=') && arrayName) {
            topLevelObject[arrayName].push(this.makeObject(currentLevel));
          } else {
            arrayName = currentLine.trim();
            this.index++;
          }
        }
      } else {
        if (currentLine.trim() === 'exchange-office') {
          topLevelObject = this.makeOffice(currentLevel);
          exchangeOfficeEntities.push(topLevelObject);
        } else {
          this.index++;
        }
      }
    }

    return {
      exchangeOffices: exchangeOfficeEntities,
      countries: [],
    };
  }

  private makeLinesFromContent(content: string): string[] {
    return content.split('\n');
  }

  private makeOffice(level: number): ExchangeOfficeEntity {
    const exchangeOfficeEntity = new ExchangeOfficeEntity();
    exchangeOfficeEntity.exchanges = [];
    exchangeOfficeEntity.rates = [];
    this.index++;
    const linesForObject = this.takeAllLinesForObject(level + 1);
    const obj = this.createObjectFromLines(linesForObject);
    return { ...exchangeOfficeEntity, ...obj };
  }

  private makeObject(currentLevel: number) {
    const objectLinesResult = this.takeAllLinesForObject(currentLevel);
    return this.createObjectFromLines(objectLinesResult);
  }

  private takeAllLinesForObject(level: number): string[] {
    const result = [];
    for (; this.index < this.lines.length; this.index++) {
      const line = this.lines[this.index];
      const currentLevel = this.nestLevel(line);
      if (currentLevel !== level) break;
      if (!line.includes('=')) break;
      result.push(line);
    }
    return result;
  }

  private nestLevel(line: string): number {
    let multiplier = 0;
    let nestString = '';
    let level = 0;
    while (line.startsWith(nestString)) {
      level++;
      multiplier += NEST_SYMBOLS_NUMBER;
      nestString = NEST_SYMBOL.repeat(multiplier);
    }
    return level - 1;
  }

  private createObjectFromLines(lines: string[]) {
    return lines.reduce((acc, line) => {
      const parts = line.split('=');
      acc[parts[0].trim()] = parts[1].trim();
      return acc;
    }, {});
  }
}
