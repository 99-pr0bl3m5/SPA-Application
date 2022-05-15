import { Component } from "react";
import axios from "axios";

class SessionAPI extends Component {
  static Login = async (payload) => {
    try {
      const result = await axios({
        method: "POST",
        url: "api/login",
        data: payload,
      });

      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  static Register = async (payload) => {
    try {
      const result = await axios({
        method: "POST",
        url: "api/register",
        data: payload,
      });

      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default SessionAPI;
