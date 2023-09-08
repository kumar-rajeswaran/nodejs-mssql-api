import sql from 'mssql'
import { DB_HOST, DB_NAME, DB_PWD, DB_USER } from '.';


export class DbConfig {
    config: any;
    connection: any;
    pool: any;
    result: Array<any>;
    constructor() {
        this.config = this.generateSqlConnectionString();
        this.result = [];
        console.log('DB connected');
    }

    private generateSqlConnectionString = () => {
        return {
            user: `${DB_USER}`,
            password: `${DB_PWD}`,
            server: `${DB_HOST}`,
            database: `${DB_NAME}`,
            options: {
                trustedConnection: true,
                encrypt: true,
                enableArithAbort: true,
                trustServerCertificate: true,
            }
        };
    }
    public Connection = async () => {
        let pool = await sql.connect(this.config);
        let req = await pool.request();
        return req;
    }
}