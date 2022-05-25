import axios from "axios";

class SessionAPI {
  static Login = async (payload) => {
    try {
      const result = await axios({
        method: "POST",
        url: "http://localhost:5001/api/signin",
        data: payload,
      });

      return result.data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  static Register = async (payload) => {
    try {
      const result = await axios({
        method: "POST",
        url: "http://localhost:5001/api/signup",
        data: payload,
      });

      return result.resMessage === "Success" || false;
    } catch (error) {
      console.log(error.message);
    }
  };

  static Logout = async (token) => {
    try {
      const result = await axios({
        method: "POST",
        url: "http://localhost:5001/api/signout",
        headers: { token: token },
      });

      return result.data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
}

export default SessionAPI;
