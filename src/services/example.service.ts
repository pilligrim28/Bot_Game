export class ExampleService {
  static async getJoke(): Promise<string> {
    // Пример внешнего API
    return 'Колобок повесился.';
  }
}