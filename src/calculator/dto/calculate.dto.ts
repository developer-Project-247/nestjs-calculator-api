import { IsIn, IsNumber } from 'class-validator';

export class CalculateDto {
  @IsIn(['add', 'subtract', 'multiply', 'divide'])
  operation!: 'add' | 'subtract' | 'multiply' | 'divide';

  @IsNumber()
  a!: number;

  @IsNumber()
  b!: number;
}
