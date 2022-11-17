import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany, OneToOne, ManyToMany } from "typeorm";
import { Category } from "./Category";
import { Subcategory } from "./Subcategory";
import { Supplier } from "./Supplier";
import { SupplierProductFamily } from "./SupplierProductFamily";

@Entity('supplier_product_family_ml_category')
export class SupplierProductFamilyMLCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    supplier_id: string;

    @Column()
    supplier_product_family_id: string;

    @Column({ nullable: true })
    supplier_product_family_name: string;

    @Column()
    category_ml_id: string;

    @Column()
    subcategory_ml_id: string;

    @Column({ nullable: true })
    ml_category_name: string;

    @Column({ nullable: true })
    ml_subcategory_name: string;

    @Column({ nullable: true })
    ml_domain_id: string;

    @Column({ nullable: true })
    ml_domain_name: string;

    @ManyToOne(type => Supplier)
    @JoinColumn({ name: 'supplier_id', referencedColumnName: "id" })
    supplier: Promise<Supplier>;

    @OneToOne(type => SupplierProductFamily)
    @JoinColumn({ name: 'supplier_product_family_id', referencedColumnName: "id" })
    supplier_product_family: Promise<SupplierProductFamily>;

    @ManyToOne(type => Category, category => category.ml_id)
    @JoinColumn({ name: 'category_ml_id', referencedColumnName: "ml_id" })
    category: Promise<Category[]>;

    @ManyToOne(type => Subcategory, subcategory => subcategory.ml_id)
    @JoinColumn({ name: 'subcategory_ml_id', referencedColumnName: "ml_id" })
    subcategory: Promise<Subcategory[]>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}