import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { Supplier } from "./Supplier";
import { SupplierProductFamily } from "./SupplierProductFamily";
import { SupplierProduct } from "./SupplierProduct";

@Entity('supplier_product_category')
export class SupplierProductCategory {
    @PrimaryColumn()
    id: string;

    @Column()
    supplier_id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    link: string;

    @ManyToOne(type => Supplier)
    @JoinColumn({ name: 'supplier_id', referencedColumnName: "id" })
    supplier: Promise<Supplier>;

    @OneToMany(type => SupplierProductFamily, supplier_product_family => supplier_product_family.supplier_product_category_id)
    @JoinColumn({ name: 'id', referencedColumnName: "supplier_product_category_id" })
    product_families: Promise<SupplierProductFamily[]>;

    @OneToMany(type => SupplierProduct, supplier_product => supplier_product.supplier_product_category_id)
    @JoinColumn({ name: 'id', referencedColumnName: "supplier_product_category_id" })
    products: Promise<SupplierProduct[]>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}