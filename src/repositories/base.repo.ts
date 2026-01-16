import { DestroyOptions, FindOptions, Model, ModelStatic, UpdateOptions } from "sequelize";

export default abstract class Repository<T extends Model>{
    protected model: ModelStatic<T>;

    constructor(model: ModelStatic<T>){
        this.model = model;
    }

    async findById(id: string, options?: FindOptions): Promise<T | null>{
        return this.model.findByPk(id, options);
    }

    async findOne(options?: FindOptions): Promise<T | null>{
        return this.model.findOne(options);
    }

    async findAll(options?: FindOptions): Promise<T[]>{
        return this.model.findAll(options);
    }

    async create(data: Partial<T["_creationAttributes"]>): Promise<T>{
        return this.model.create(data as any);
    }

    async update(instance: T, data: Partial<T["_attributes"]>, options?: UpdateOptions): Promise<T>{
        return instance.update(data, options);
    }
    
    async destroy(instance: T, options?: DestroyOptions): Promise<void>{
        await instance.destroy(options);
    }
}