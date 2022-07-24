import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm";
import { Category } from "./Category";

@Entity('subcategory')
export class Subcategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    ml_id: string;

    @Column()
    category_ml_id: string;

    @Column({ nullable: true })
    subcategory_ml_id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    permalink: string;

    @Column({ default: true })
    has_children: boolean;

    @OneToOne(type => Category)
    @JoinColumn({ name: 'category_ml_id', referencedColumnName: "ml_id" })
    category: Promise<Category>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}