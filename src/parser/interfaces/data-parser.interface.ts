import { OfficeExchangerDataResultDto } from '../dto/office-exchanger-data-result.dto';

export interface DataParserInterface {
  mapContent(content: string): OfficeExchangerDataResultDto;
}
