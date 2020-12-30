// FUNCIONES AUXILIARES (PETICIONES A LA BD, MANEJO DEL TOKEN Y VALIDACIÓN DE USUARIOS)
import axios from "axios";

const validator = require("email-validator");

const SERVER = 'http://localhost:8080/api/auth'

const instance = axios.create({ baseURL: SERVER })

export default {

    createUser: (user) => {
        return instance.post('/signup', user);
    },

    loginUser: (user) => {
        return instance.post('/signin', user);
    },

    retrieveAllUsers: () => {
        return instance.get(`/users`)
    },

    retrieveUser: (id) => {
        return instance.get(`/users/${id}`)
    },

    deleteUser: (id) => {
        return instance.delete(`/users/${id}`);
    },

    retrieveCoursesByUser: (id) => {
        return instance.get(`/users/${id}/courses`)
    },

    addCourseToUser: (id, course) => {
        return instance.post(`/users/${id}/addCourse`, course)
    },

    removeCourseToUser: (id, course) => {
        return instance.patch(`/users/${id}/removeCourse`, course)
    },

    setToken: (token) => {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    },

    getAuthToken() {
        return localStorage.getItem('jwt')
    },

    setAuthToken: (token) => {
        localStorage.setItem("jwt", token);
    },

    isLoggedIn() {
        let authToken = this.getAuthToken()
        return authToken
    },

    logout: () => {
        delete instance.defaults.headers.common['Authorization'];
        localStorage.clear();
    },

    validateUser: ({ username, email, password }) => {

        if (username.length < 3) {
            throw new Error("Enter at least 3 characters in Username");
        } else if (!validator.validate(email)) {
            throw new Error("Enter valid values in Email");
        } else if (!password) {
            throw new Error("Enter valid values in Password");
        } else if (password.length < 6) {
            throw new Error("Enter at least 6 characters in Password");
        }
        return { username, email, password };
    },

    storeUserData({ id, username, roles, courses, accessToken }) {
        localStorage.setItem('userId', id)
        localStorage.setItem('name', username)
        localStorage.setItem("role", roles[0]);
        localStorage.setItem("jwt", accessToken);
        localStorage.setItem("userCourses", JSON.stringify(courses))
        this.setToken(accessToken);
    },

}

