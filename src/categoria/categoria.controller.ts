import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './entities/categoria.entity';

@Controller('categorias')
export class CategoriaController {

  constructor(private readonly categoriaService: CategoriaService) {}

  // POST /categorias
  @Post()
  create(@Body() categoria: Categoria) {
    return this.categoriaService.create(categoria);
  }

  // GET /categorias
  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  // GET /categorias/:id
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.categoriaService.findById(+id);
  }

  // GET /categorias/nome/:nome
  @Get('nome/:nome')
  findByNome(@Param('nome') nome: string) {
    return this.categoriaService.findByNome(nome);
  }

  // PATCH /categorias/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() categoria: Categoria,
  ) {
    return this.categoriaService.update(+id, categoria);
  }

  // DELETE /categorias/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}
