import  sqlite3 from 'sqlite3'
import { readFileSync } from 'fs'
import { join } from 'path'

const db = new sqlite3.Database('./database/dr_sense.db')

const initSQL = readFileSync(join(process.cwd(), 'database/init.sql'), 'utf8')
db.exec(initSQL)

export default db
 