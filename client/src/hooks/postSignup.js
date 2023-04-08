import axios from "axios";

export const postSignup = async (firstName, lastName, username, email, hashedPassword, updates) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/auth/local/register", 
        {
            username: username,
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            updates: updates==="yes" ? true : false,
            blocked: false,
            confirmed: false,
            // role: process.env.REACT_APP_DEFAULT_ROLE,
        },
        {
          baseURL: process.env.REACT_APP_API_URL,
          headers: {
              Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
          },
        }).then(response => {
          // Handle success.
          console.log('Well done!');
          console.log('User profile', response.data.user);
          console.log('User token', response.data.jwt);
        })
    } catch (error) {
      console.error(error);
    }
  };