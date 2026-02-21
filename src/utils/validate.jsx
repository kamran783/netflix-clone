export const validate = (email, password) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const ispasswordValid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password);
    

    if(!isEmailValid) return "Email not valid";
    if(!ispasswordValid) return "password should contain atleast one upperCase letter";
   

    return null;
}