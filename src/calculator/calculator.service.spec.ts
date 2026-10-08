import { BadRequestException } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    service = new CalculatorService();
  });

  it('adds two numbers', () => {
    expect(service.calculate('add', 10, 5)).toBe(15);
  });

  it('subtracts two numbers', () => {
    expect(service.calculate('subtract', 10, 5)).toBe(5);
  });

  it('multiplies two numbers', () => {
    expect(service.calculate('multiply', 10, 5)).toBe(50);
  });

  it('divides two numbers', () => {
    expect(service.calculate('divide', 10, 5)).toBe(2);
  });

  it('rejects division by zero', () => {
    expect(() => service.calculate('divide', 10, 0)).toThrow(
      BadRequestException,
    );
  });
});
