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
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';

@Controller('produtos')
export class ProdutoController {

  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() produto: Produto) {
    const produtoCriado = await this.produtoService.create(produto);
    return {
      message: 'Produto criado com sucesso',
      data: produtoCriado,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const produtos = await this.produtoService.findAll();
    return {
      message: 'Lista de produtos retornada com sucesso',
      data: produtos,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    const produto = await this.produtoService.findById(+id);
    return {
      message: 'Produto encontrado com sucesso',
      data: produto,
    };
  }

  @Get('nome/:nome')
  @HttpCode(HttpStatus.OK)
  async findByNome(@Param('nome') nome: string) {
    const produtos = await this.produtoService.findByNome(nome);
    return {
      message: 'Produtos filtrados por nome com sucesso',
      data: produtos,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() produto: Produto,
  ) {
    const produtoAtualizado = await this.produtoService.update(+id, produto);
    return {
      message: 'Produto atualizado com sucesso',
      data: produtoAtualizado,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.produtoService.remove(+id);
    return {
      message: 'Produto removido com sucesso',
    };
  }
}
