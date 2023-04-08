import axios from "axios";

export const postForgotPassword = async (email) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/auth/local/forgot-password", 
        {
            email: email
        },
        {
          baseURL: process.env.REACT_APP_API_URL,
          headers: {
              Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
          },
        }).then(response => {
          // Handle success.
          console.log('Email sent.');
        })
    } catch (error) {
        console.log('An error occurred:', error.response);
    }
  };