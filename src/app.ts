const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const cors = require('cors');
import InvoiceRouter from './routes/InvoiceRouter';
import ErrorUtils from './components/ErrorUtils';

export default class App {

    private express:any;
    private invoiceRoute:InvoiceRouter;
    private errorUtils:ErrorUtils;

    constructor() {
        this.invoiceRoute = new InvoiceRouter();
        this.errorUtils = new ErrorUtils();
        this.express = express();
        this.configMiddleware();
        this.configApi();
    }

    private configMiddleware(): void {
        this.express.use(bodyParser.json({limit: "50mb"}));
        this.express.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cors());
    }

    private configApi(): void {
        this.invoiceRoute.init(express);
        this.express.use('/api', this.invoiceRoute.getRoute());
        this.express.use(this.errorUtils.handleError);
    }

    public getExpress:Function = () => {
        return this.express;
    }
}

