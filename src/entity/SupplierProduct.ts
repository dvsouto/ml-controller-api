import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { Supplier } from "./Supplier";
import { SupplierProductCategory } from "./SupplierProductCategory";
import { SupplierProductFamily } from "./SupplierProductFamily";

@Entity('supplier_product')
export class SupplierProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar" })
	supplier_id: string;

    @Column({ type: "varchar" })
    sku: string;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    prettier_name: string;

    @Column({ type: "varchar",nullable: true })
    supplier_product_category_id: string;

    @Column({ type: "varchar",nullable: true })
	supplier_product_family_id: string;

    @Column({ type: "varchar", nullable: true })
    picture: string;

    @Column({ type: "varchar", nullable: true })
    link: string;
   
    @Column({ type: "decimal", precision: 4, nullable: false })
    supplier_price: number;

    @Column({ type: "decimal", precision: 4, nullable: true })
    supplier_promotional_price: number;

    @Column({ type: "decimal", precision: 2, nullable: false, default: 50 })
    default_profit_percentage: number;

    @Column({ type: "varchar", nullable: true })
    tax_classification: string;

    @Column({ type: "varchar", nullable: true })
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