import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
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
  async create(@Body() categoria: Categoria) {
    const categoriaCriada = await this.categoriaService.create(categoria);

    return {
      message: 'Categoria criada com sucesso',
      data: categoriaCriada,
    };
  }

  // GET /categorias
  // 200 OK
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const categorias = await this.categoriaService.findAll();

    return {
      message: 'Lista de categorias retornada com sucesso',
      data: categorias,
    };
  }

  // GET /categorias/:id
  // 200 OK | 404 NOT FOUND
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    const categoria = await this.categoriaService.findById(+id);

    return {
      message: 'Categoria encontrada com sucesso',
      data: categoria,
    };
  }

  // GET /categorias/nome/:nome
  // 200 OK
  @Get('nome/:nome')
  @HttpCode(HttpStatus.OK)
  async findByNome(@Param('nome') nome: string) {
    const categorias = await this.categoriaService.findByNome(nome);

    return {
      message: 'Categorias filtradas por nome com sucesso',
      data: categorias,
    };
  }

  // PUT/categorias/:id
  // 200 OK | 404 NOT FOUND
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() categoria: Categoria,
  ) {
    const categoriaAtualizada = await this.categoriaService.update(+id, categoria);

    return {
      message: 'Categoria atualizada com sucesso',
      data: categoriaAtualizada,
    };
  }

  // DELETE /categorias/:id
  // 200 OK | 404 NOT FOUND
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.categoriaService.remove(+id);

    return {
      message: 'Categoria removida com sucesso',
    };
  }
}
