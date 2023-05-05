import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/exception/httpExceptionFilter';
import { Cat, CatsService } from './cats.service';
import { CreateCatDto } from './dto';
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
    this.catsService.create(createCatDto);
  }

  @Get()
  // 如果方法体内出现Http异常了，直接使用这个异常过滤器
  @UseFilters(new HttpExceptionFilter())
  async findAll(): Promise<Cat[]> {
    throw 1;
    // throw new ForbiddenException();
    // throw new HttpException(
    //   JSON.stringify({ name: 'xxxx' }),
    //   HttpStatus.FORBIDDEN,
    // );
    return this.catsService.findAll();
  }
}
