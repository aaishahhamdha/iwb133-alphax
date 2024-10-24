import { Message } from "@mui/icons-material";
import { isValid } from "date-fns";
import { Form } from "react-router-dom";


const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const mailFormat = "@example.com";

export const validateName = (name) => {
    if (!name.trim()) {
        return { isValid: false, Message: "Name Required!." };
    }
    if (/\d/.test(name)) {
        return { isValid: false, Message: "Name should not contain numbers." };
    }
    return { isValid: true, Message: "" };
}

export const validateEmail = (email) => {
    if (!email.trim()) {
        return { isValid: false, Message: "Email is required!." };
    }
    else if (!emailRegex.test(email)){
        return { isValid: false, Message: "Invalid email address." };
    }
    else if (!email.endsWith(mailFormat)) { // New validation for ending with "example.com"
        return { isValid: false, Message: "Invalid, Email must end with " +  mailFormat };
    }
    return { isValid: true, Message: "" };
}

export const validatePassword = (password) => {
    if (!password.trim()){
        return { isValid: false, Message: "Password is required!." };
    }
    else if (password.length < 6){
        return { isValid: false, Message: "Password must be at least 6 characters long." };
    }
    return { isValid: true, Message: "" };
}

