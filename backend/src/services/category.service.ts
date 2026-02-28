import { CategoryRepository } from '../repositories/category.repository';

const categoryRepo = new CategoryRepository();

export class CategoryService {
  async getAllCategories() {
    return categoryRepo.findAll();
  }

  async getCategoryById(id: string) {
    return categoryRepo.findById(id);
  }

  async getCategoryBySlug(slug: string) {
    return categoryRepo.findBySlug(slug);
  }
}
