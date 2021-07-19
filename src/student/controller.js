const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

const getStudentsById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentsById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    })
};

const addStudent = (req, res) => {
    const { name, email, age, date_of_birth } = req.body;
    console.log(email);
    // check if email exist
    pool.query(queries.checkEmailExist, [email], (error, results) => {
        if(results.rows.length) {
            res.send("Email already exist.");
        } else {
            // create new student
            pool.query(queries.addStudent, [ name, email, age, date_of_birth], (error, results) => {
                if(error) throw error
                res.status(201).send("Student successfully created");
            })
        }
    })  
};

const deleteStudentById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentsById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if(noStudentFound) {
            res.send("A student with such id does not exist");
        } else {
            // Delete student
            pool.query(queries.deleteStudentById, [ id ], (error, results) => {
                if(error) throw error
                res.status(200).send("Student's data successfully deleted");
            })
        }
    })
};

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    pool.query(queries.getStudentsById, [ id ], (error, results) => {
       const noStudentFound = !results.rows.length;
        if(noStudentFound) {
            res.send("A student with such id does not exist");
        } else {
            // Update students data
            pool.query(queries.updateStudent, [ name, id ], (error, results) => {
                if(error) throw error
                res.status(200).send("Student's data successfully updated");
            })
        }
    })
}


module.exports = {
    getStudents,
    getStudentsById,
    addStudent,
    deleteStudentById,
    updateStudent
}