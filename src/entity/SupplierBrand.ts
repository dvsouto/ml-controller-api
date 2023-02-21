import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Supplier } from "./Supplier";

@Entity('supplier_brand')
export class SupplierBrand {
    @PrimaryColumn({ type: "varchar", nullable: false })
    id: string;

    @Column({ type: "varchar" })
    supplier_id: string;

    @Column({ type: "varchar", nullable: true })
    code: string;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar", nullable: true })
    picture: string;

    @ManyToOne(type => Supplier)
    @JoinColumn({ name: 'supplier_id', referencedColumnName: "id" })
    supplier: Promise<Supplier>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}