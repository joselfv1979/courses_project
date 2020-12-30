// FUNCIONES ACCESORIAS (PETICIONES A LA BD Y VALIDACIÓN DE CURSOS)
import axios from "axios";

const SERVER = 'http://localhost:8080/api/auth'

const instance = axios.create({ baseURL: SERVER })

export default {

    retrieveAllCourses: () => {
        return instance.get(`/courses`);
    },

    retrieveFilteredCourses: (parameters) => {
        return instance.get(`/courses${parameters}`);
    },

    retrieveCourse: (id) => {
        return instance.get(`/courses/${id}`)
    },

    retrieveUsersByCourse: (id) => {
        return instance.get(`/courses/${id}/users`)
    },

    validateCourse: ({ id, description, language, format, price }) => {
        if (!description) {
            throw new Error("Enter at least 5 characters in Description")
        } 
        else if (!language) {
            throw new Error('Enter valid values in Language')
        } 
        else if (!format) {
            throw new Error('Choose one format')
        } 
        else if (!price) {
            throw new Error('Enter valid values in Price')
        } 
        else if (isNaN(price)) {
            throw new Error('Enter a number value in Price')
        }
        else if (price >= 1000) {
            throw new Error('Price must be less than 1000')
        }
        return { id, description, language, format, price }
    },

    updateCourse: (id, course) => {
        return instance.put(`/courses/${id}`, course);
    },

    createCourse: (course) => {
        return instance.post(`/courses`, course);
    },

    deleteCourse: (id) => {
        return instance.delete(`/courses/${id}`);
    },

}