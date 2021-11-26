export class Product {
    constructor(
    public id: number = 0,
    public name: string = '',
    public category: string = '',
    public description?: string,
    public price: number = 0) { }
}