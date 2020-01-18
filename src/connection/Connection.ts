import "reflect-metadata";
import {Connection, createConnection} from "typeorm";
import Weather from '../entity/Invoice';

export class ConnectORM {

    private static connection: Connection;

    public static createConnection = async () : Promise<Connection> => {
        if(!ConnectORM.connection) {
            if(ConnectORM.connection) {
                return ConnectORM.connection;
            } else {
                let options:any = {
                    type: 'postgres',
                    host: 'ec2-23-21-70-66.compute-1.amazonaws.com',
                    port: 5432,
                    username: 'efrstwgapqonou',
                    password: '49d5df73a466d9e1dcf9502831268c67a23c9ec33c4379799a3bb294554ea0a7',
                    database: 'd6riqu1nmjvi3g',
                    entities : [
                        Weather,
                    ],
                    extra: {
                      ssl: true
                    },
                    synchronize : false,
                    logging : true
                }
                const myConnection = await createConnection(options);
                ConnectORM.connection = myConnection;
            }
        }
        return ConnectORM.connection;
    }

    public static getConnection = async () => {
        const connection = await ConnectORM.createConnection();
        return connection;
    }
}

