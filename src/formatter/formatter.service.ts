import { Injectable } from '@nestjs/common';
import { ExchangeOfficeEntity } from '../exchange-office/entities/exchange-office.entity';
import {
  createObjectFromLines,
  nestLevel,
  takeAllLinesForObject,
} from './functions';

@Injectable()
export class FormatterService {
  mapFileContentToExchangeOfficesData(content: string): ExchangeOfficeEntity[] {
    const result: ExchangeOfficeEntity[] = [];
    let topLevelObject: ExchangeOfficeEntity;
    const contentLines = content.split('\n');

    let index = 0;
    let arrayName: string;
    while (contentLines.length > index) {
      const currentLine = contentLines[index];
      if (currentLine.trim() === '') {
        index++;
        continue;
      }
      const currentLevel = nestLevel(currentLine);
      if (currentLevel === 0) {
        topLevelObject = new ExchangeOfficeEntity();
        topLevelObject.exchanges = [];
        topLevelObject.rates = [];
        const topLevelObjectLinesResult = takeAllLinesForObject(
          contentLines,
          index + 2,
          currentLevel + 2,
        );
        index = topLevelObjectLinesResult.index;
        const exchangeOfficeObject = createObjectFromLines(
          topLevelObjectLinesResult.lines,
        );
        result.push({ ...topLevelObject, ...exchangeOfficeObject });
        continue;
      } else if (currentLevel % 2 != 0) {
        //object name
        if (currentLine.trim() === 'exchange-office') {
          topLevelObject = new ExchangeOfficeEntity();
          topLevelObject.exchanges = [];
          topLevelObject.rates = [];
          const topLevelObjectLinesResult = takeAllLinesForObject(
            contentLines,
            index + 1,
            currentLevel + 1,
          );
          index = topLevelObjectLinesResult.index;
          const exchangeOfficeObject = createObjectFromLines(
            topLevelObjectLinesResult.lines,
          );
          result.push({ ...topLevelObject, ...exchangeOfficeObject });
          continue;
        } else {
          index++;
          continue;
        }
      } else if (currentLine.includes('=')) {
        //property
        const objectLinesResult = takeAllLinesForObject(
          contentLines,
          index,
          currentLevel,
        );
        index = objectLinesResult.index;
        const object = createObjectFromLines(objectLinesResult.lines);
        if (topLevelObject && arrayName) {
          topLevelObject[arrayName].push(object);
        }
        continue;
      } else {
        //array name
        arrayName = currentLine.trim();
      }
      index++;
    }

    return result;
  }
}
