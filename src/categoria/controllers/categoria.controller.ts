import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../entities/categoria.entity';

@Controller('categorias')
export class CategoriaController {

  constructor(private readonly categoriaService: CategoriaService) {}

  // POST /categorias
  // 201 CREATED
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() categoria: Categoria) {
    return this.categoriaService.create(categoria);
  }

  // GET /categorias
  // 200 OK
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.categoriaService.findAll();
  }

  // GET /categorias/:id
  // 200 OK | 404 NOT FOUND
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string) {
    return this.categoriaService.findById(+id);
  }

  // GET /categorias/nome/:nome
  // 200 OK
  @Get('nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string) {
    return this.categoriaService.findByNome(nome);
  }

  // PATCH /categorias/:id
  // 200 OK | 404 NOT FOUND
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() categoria: Categoria,
  ) {
    return this.categoriaService.update(+id, categoria);
  }

  // DELETE /categorias/:id
  // 204 NO CONTENT | 404 NOT FOUND
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}
