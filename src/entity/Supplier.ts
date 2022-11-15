import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { SupplierProductCategory } from "./SupplierProductCategory";

@Entity('supplier')
export class Supplier {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    cnpj: string;

    @Column({ nullable: true })
    razao_social: string;

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    username: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    link: string;

    @Column({ nullable: true })
    address: string;
    
    @Column({ nullable: true })
    email: string;
    
    @Column({ nullable: true })
    phones: string;

    @Column({ nullable: true })
    facebook: string;

    @Column({ nullable: true })
    instagram: string;

    @OneToMany(type => SupplierProductCategory, supplier_product_category => supplier_product_category.supplier_id)
    @JoinColumn({ name: 'id', referencedColumnName: "supplier_id" })
    categories: Promise<SupplierProductCategory[]>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}