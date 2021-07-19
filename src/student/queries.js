const getStudents = "SELECT * FROM students";
const getStudentsById = "SELECT * FROM students WHERE id = $1 ";
const checkEmailExist = "SELECT s FROM students s WHERE s.email = $1"
const addStudent = "INSERT INTO students ( name, email, age, date_of_birth ) VALUES ($1, $2, $3, $4)";
const deleteStudentById = "DELETE FROM students WHERE id = $1";
const updateStudent = "UPDATE students SET name = $1 WHERE id = $2"


module.exports = {
    getStudents,
    getStudentsById,
    checkEmailExist,
    addStudent,
    deleteStudentById,
    updateStudent
}