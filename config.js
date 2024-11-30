class Config {
  get server() {
    return {
      port: process.env.PORT || 3446,
      secret: process.env.SECRET || 'te132x352yyh0be3454r45436164250',
      expiresIn: 18000000000,
    }
  }

  get mongo() {
    return {
      dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/task2',
    }
  }
  get postgres() {
    return {
      username: process.env.PG_USERNAME || 'postgres',
      password: process.env.PG_PASSWORD || 'postgres',
      host: process.env.PG_HOST || 'localhost',
      database: process.env.PG_DATABASE || 'task4',
      port: process.env.PG_PORT || 5432,
    }
  }

  get loggingLevel() {
    return 'debug'
  }

  get uploadFileLimits() {
    return {
      files: 500,
      fileSize: 100000000
    }
  }

  get longStackTraces() {
    return true
  }


}

module.exports = new Config();
