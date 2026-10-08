import { Body, Controller, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculateDto } from './dto/calculate.dto';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  calculate(@Body() dto: CalculateDto) {
    return {
      result: this.calculatorService.calculate(dto.operation, dto.a, dto.b),
    };
  }
}
