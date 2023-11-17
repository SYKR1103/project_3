

import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {

    @PrimaryGeneratedColumn()
    public id : string;

    @CreateDateColumn()
    public createdAt : string;

    @UpdateDateColumn()
    public updatedAt : string;

}