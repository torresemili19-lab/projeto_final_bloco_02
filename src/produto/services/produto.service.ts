import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Injectable()
export class ProdutoService {

  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,

    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  // Criar Produto
  async create(produto: Produto): Promise<Produto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id: produto.categoria.id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    produto.categoria = categoria;
    return this.produtoRepository.save(produto);
  }

  // Buscar todos os Produtos
  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({
      relations: ['categoria'],
    });
  }

  // Buscar Produto por ID
  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return produto;
  }

  // Buscar Produto por Nome
  async findByNome(nome: string): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: { nome },
      relations: ['categoria'],
    });
  }

  // Atualizar Produto
  async update(id: number, produto: Produto): Promise<Produto> {
    const produtoExistente = await this.findById(id);

    if (produto.categoria) {
      const categoria = await this.categoriaRepository.findOne({
        where: { id: produto.categoria.id },
      });

      if (!categoria) {
        throw new NotFoundException('Categoria não encontrada');
      }

      produtoExistente.categoria = categoria;
    }

    this.produtoRepository.merge(produtoExistente, produto);
    return this.produtoRepository.save(produtoExistente);
  }

  // Deletar Produto
  async remove(id: number): Promise<void> {
    const produto = await this.findById(id);
    await this.produtoRepository.remove(produto);
  }
}
