import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { Subcategory } from "./Subcategory";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    ml_id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    permalink: string;

    @OneToMany(() => Subcategory, subcategory => subcategory.category)
    @JoinColumn({ name: 'ml_id', referencedColumnName: "category_ml_id" })
    subcategories: Promise<Subcategory[]>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}