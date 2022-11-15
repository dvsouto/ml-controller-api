import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('supplier_product')
export class SupplierProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    sku: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    link: string;
   
    @Column({ precision: 4, nullable: false })
    supplier_value: number;

    @Column({ precision: 2, nullable: false, default: 50 })
    default_profit_percentage: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}