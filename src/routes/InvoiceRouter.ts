import InvoiceController from '../controller/InvoiceController';

export default class InvoiceRouter {

    private route: any;
    private invoiceController: InvoiceController

    constructor(){
      this.invoiceController = new InvoiceController();
    }

    public init(express: any) {
        this.route = express.Router();

        this.route.route('/invoice/getInvoiceByDateRange')
        .get(this.invoiceController.getInvoiceByDateRange);

        this.route.route('/invoice')
        .get(this.invoiceController.getInvoice)
        .post(this.invoiceController.createInvoice);

        this.route.route('/invoice/:id')
        .get(this.invoiceController.getInvoiceById)
        .delete(this.invoiceController.deleteInvoice);
    }

    public getRoute(){
        return this.route;
    }

}

