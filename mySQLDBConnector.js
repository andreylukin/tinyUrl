var mysql      = require('mysql2/promise');

class mySQLDBConnector {

  // Connect to mySQL Database
  constructor(host, user, password, database) {
    this.mysqlPool = mysql.createPool({
      host: host,
      user: user,
      password: password,
      database: database
    });
  }

  // Preform any query on db (for debug)
  async queryDatabase(query) {
    const conn = await this.mysqlPool.getConnection();
    const rows = await conn.execute(query);
    conn.release();
    return rows;
  }

  async insertUrl(params) {
    var query = "INSERT INTO main VALUES(NULL, ?, ?)";
    console.log(params);
    var values = [params.url, params.code];
    const conn = await this.mysqlPool.getConnection();
    const [rows] = await conn.execute(query, values);
    conn.release();
    return rows;
  }

  async getRedirected(params) {
    var query = "SELECT submitted_url as url FROM main WHERE url_code = ?";
    var values = [params.url];
    const conn = await this.mysqlPool.getConnection();
    const [rows] = await conn.execute(query, values);
    conn.release();
    return rows;
  }

  async checkCode(params) {
    var query = "SELECT url_code FROM main WHERE url_code = ?";
    var values = [params.url_code];
    const conn = await this.mysqlPool.getConnection();
    const [rows] = await conn.execute(query, values);
    conn.release();
    return rows;
  }
}

module.exports = mySQLDBConnector;