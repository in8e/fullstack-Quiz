require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER ,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PW,
  port: process.env.PORT,
})

const getQuestions = (request, response) => {
    pool.query('SELECT * FROM questions ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
    }
const getQuestionsById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM questions WHERE id =$1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
module.exports = {
    getQuestions,
    getQuestionsById
}