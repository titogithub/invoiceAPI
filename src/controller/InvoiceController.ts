import {Request, Response} from "express";
import InvoiceService from '../services/InvoiceService';

export default class InvoiceController {

    private service: InvoiceService;

    constructor() {
        this.service = new InvoiceService();
    }

    public getInvoice = (req: Request , res: Response, next: any ) => {
        this.service.getInvoice()
        .then((response:any) => {
            const payload:any = {};
            payload.weather = response[0];
            payload.metadata = {};
            payload.metadata.total = response[1]
            res.status(200).send(payload);
        })
        .catch((err) => {
          console.log(err);
          const error:any = new Error('Failed to load invoices');
          error.statusCode = 500;
          next(error);
        });
    }

    public getInvoiceById = (req: Request , res: Response, next: any ) => {
      this.service.getInvoiceById(parseInt(req.params.id))
      .then((response:any) => {
          res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        const error:any = new Error('Failed to load invoices');
        error.statusCode = 500;
        next(error);
      });
    }

    public getInvoiceByDateRange = (req: Request , res: Response, next: any ) => {
      const {startDate, endDate} = req.query;
      this.service.getInvoiceByDateRange(startDate, endDate)
      .then((response:any) => {
          res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        const error:any = new Error('Failed to load invoices');
        error.statusCode = 500;
        next(error);
      });
    }

    public deleteInvoice = (req: Request , res: Response, next: any ) => {
      this.service.deleteInvoice(parseInt(req.params.id))
      .then((response:any) => {
          res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        const error:any = new Error('Failed to delete invoice');
        error.statusCode = 500;
        next(error);
      });
    }

    public createInvoice = (req: Request , res: Response, next: any ) => {
      const {invoice} = req.body;        
      
      this.service.createInvoice(invoice)
      .then((response:any) => {
        if (response){
          res.status(200).send(response);
        } else {
          const error:any = new Error('Failed to create invoice. Invalid Tax.');
          error.statusCode = 406;
          next(error);       
         }
      })
      .catch((err) => {
        console.log(err);
        const error:any = new Error('Failed to create invoice');
        error.statusCode = 500;
        next(error);
      });
    }


}
