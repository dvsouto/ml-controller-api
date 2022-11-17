import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { Supplier } from "./Supplier";
import { SupplierProductCategory } from "./SupplierProductCategory";
import { SupplierProductFamily } from "./SupplierProductFamily";

@Entity('supplier_product')
export class SupplierProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
	supplier_id: string;

    @Column()
    sku: string;

    @Column()
    name: string;

    @Column()
    prettier_name: string;

    @Column({ nullable: true })
    supplier_product_category_id: string;

    @Column({ nullable: true })
	supplier_product_family_id: string;

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    link: string;
   
    @Column({ precision: 4, nullable: false })
    supplier_price: number;

    @Column({ precision: 4, nullable: true })
    supplier_promotional_price: number;

    @Column({ precision: 2, nullable: false, default: 50 })
    default_profit_percentage: number;

    @Column({ nullable: true })
    tax_classification: string;

    @Column({ nullable: true })
    package_code: string;

    @ManyToOne(type => Supplier)
    @JoinColumn({ name: 'supplier_id', referencedColumnName: "id" })
    supplier: Promise<Supplier>;

    @ManyToOne(type => SupplierProductCategory)
    @JoinColumn({ name: 'supplier_product_category_id', referencedColumnName: "id" })
    supplier_product_category: Promise<SupplierProductCategory>;

    @ManyToOne(type => SupplierProductFamily)
    @JoinColumn({ name: 'supplier_product_family_id', referencedColumnName: "id" })
    supplier_product_family: Promise<SupplierProductFamily>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}