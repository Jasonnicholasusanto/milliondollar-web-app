import axios from "axios";

export const postSignIn = async (email, password, setToken) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/auth/local", 
        {
            identifier: email,
            password: password,
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
        setToken(response.data.jwt);
    } catch (error) {
      console.error(error);
    }
  };