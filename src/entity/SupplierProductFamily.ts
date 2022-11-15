import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { Supplier } from "./Supplier";
import { SupplierProductCategory } from "./SupplierProductCategory";

@Entity('supplier_product_family')
export class SupplierProductFamily {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    supplier_id: string;

    @Column()
    supplier_product_category_id: string;

    @Column()
    name: string;

    @Column()
    prettier_name: string;

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    link: string;

    @ManyToOne(type => Supplier)
    @JoinColumn({ name: 'supplier_id', referencedColumnName: "id" })
    supplier: Promise<Supplier>;

    @ManyToOne(type => SupplierProductCategory)
    @JoinColumn({ name: 'supplier_product_category_id', referencedColumnName: "id" })
    supplier_product_category: Promise<SupplierProductCategory>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}