import pg from 'pg';
const { Client } = pg;

const client = new Client({
  user: 'data',
  password: 'postgres',
  host: 'localhost',
  database: 'namegator',
  port: 5432,
});

client.connect();

export async function execute(query, values: any = ''): Promise<any[]> {
  return new Promise(function (resolve, reject) {
    client.query(query, values, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    });
  });
}
