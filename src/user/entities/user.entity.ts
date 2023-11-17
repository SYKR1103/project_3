import { BaseEntity } from "src/common/base.entity";

import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

import { Role } from "./role.eum";

import * as bcrypt from 'bcryptjs';

import { InternalServerErrorException } from '@nestjs/common';

@Entity()

export class User extends BaseEntity {


    @Column()
    public name : string;

    @Column({unique:true})
    public email : string;

    @Column()
    public password : string;

    @Column({

        type : 'enum',
        enum : Role,
        array : true,
        default : [Role.USER]

    }) public roles : Role[]


    @BeforeInsert()
    async hashedpassword(): Promise<void> {

        try{
        const saltValue = await bcrypt.genSalt(10);
        this.password = bcrypt.hash(saltValue, this.password)}
        catch(e) {
            console.log(e)
            throw new InternalServerErrorException();
        }
    }

    async checkPassword(aPassword : string) : Promise<any> {
        try{
            const isMatched = await bcrypt.checkPassword(aPassword, this.password)
            return isMatched
        } catch(e) {
            console.log(e)
        throw new InternalServerErrorException()}



    }





    }









