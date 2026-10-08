import { BadRequestException, Injectable } from '@nestjs/common';

export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

@Injectable()
export class CalculatorService {
  calculate(operation: Operation, a: number, b: number): number {
    switch (operation) {
      case 'add':
        return a + b;

      case 'subtract':
        return a - b;

      case 'multiply':
        return a * b;

      case 'divide':
        if (b === 0) {
          throw new BadRequestException('Division by zero is not allowed');
        }
        return a / b;

      default:
        throw new BadRequestException(`Unsupported operation: ${operation}`);
    }
  }
}
