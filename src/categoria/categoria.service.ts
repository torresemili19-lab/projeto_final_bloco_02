import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {

  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  //  Criar Categoria
  async create(categoria: Categoria): Promise<Categoria> {
    const novaCategoria = this.categoriaRepository.create(categoria);
    return this.categoriaRepository.save(novaCategoria);
  }

  //  Buscar todas as Categorias
  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  // Buscar Categoria por ID
  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return categoria;
  }

  // Buscar Categoria por Nome
  async findByNome(nome: string): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      where: { nome },
    });
  }

  //  Atualizar Categoria
  async update(id: number, categoria: Categoria): Promise<Categoria> {
    const categoriaExistente = await this.findById(id);
    this.categoriaRepository.merge(categoriaExistente, categoria);
    return this.categoriaRepository.save(categoriaExistente);
  }

  // Deletar Categoria
  async remove(id: number): Promise<void> {
    const categoria = await this.findById(id);
    await this.categoriaRepository.remove(categoria);
  }
}
