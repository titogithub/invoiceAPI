import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";


@Entity('invoices')
export default class Invoice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({scale:2})
    net: Number;

    @Column({default: new Date()})
    date: Date;

    @Column({scale:2})
    tax: Number;

    @Column({scale:2})
    total: Number;

    @Column({name:'invoice_number'})
    invoiceNumber: Number;

}