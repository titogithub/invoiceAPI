import { ConnectORM } from "../connection/Connection";
import Invoice from "../entity/Invoice";
import { Between } from "typeorm";
import { start } from "repl";

export default class InvoiceService {

    public getInvoice = async () => {
        const invoiceRepository = await this.getRepository()
        const res = await invoiceRepository.findAndCount();
        return res;
    }

    public getInvoiceById = async (id:number) => {
      const invoiceRepository = await this.getRepository()
      const res = await invoiceRepository.find({where: {id}});
      return res;
    }

    public deleteInvoice = async (id:number) => {
      const invoiceRepository = await this.getRepository()
      const res = await invoiceRepository.delete(id);
      return res;
    }

    public createInvoice = async (invoice:any) => {
      const validTax = this.taxValidation(invoice.tax);
      if (validTax) {
        const invoiceRepository = await this.getRepository()
        const res = await invoiceRepository.save(invoice)
        return res;
      } else {
        return null;
      }
    }

    public getInvoiceByDateRange = async (startDate:string, endDate:string) => {
      const invoiceRepository = await this.getRepository()
      const res = await invoiceRepository.find({where: {date: Between(new Date(startDate), new Date(endDate))}});
      return res;
    }
    
    private taxValidation = (tax:number) => {
      const taxes = new Set();
      taxes.add('0');
      taxes.add('10.50');
      taxes.add('21');
      taxes.add('27.00');
      const decimal = ((tax - Math.floor(tax)) !== 0)? true : false; 
      if (decimal){
        const numberOfDecimals = tax.toString().split('.')[1].length;
        if (numberOfDecimals !== 2){
          return false
        } else {
          return taxes.has(tax.toString());
        }
      } else {
        return taxes.has(tax.toString());
      }
    }

    private getRepository = async () => {
        const connection  = await ConnectORM.getConnection();
        return connection.getRepository(Invoice);
    }

}