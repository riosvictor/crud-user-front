import axios from "axios";

const url = "http://localhost:8081/softplan/";

const auth = {
  username: "banana",
  password: "nanica123",
};

const notFound = "Usuário não Encontrado";
const commonMessage = "Ocorreu um erro nesta operação";

export async function getUser(userId) {
  let error = false;
  let message = commonMessage;
  let data = {};

  try {
    const request = `${url}users/${userId}`;
    const result = await axios.get(request, { auth: auth });

    data = result.data;
  } catch (e) {
    error = true;

    if (e.response) {
      const status = e.response.status;
      if (status === 404) {
        message = notFound;
      }
    } else if (e.request) {
      // The request was made but no response was received
      console.log(e.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", e.message);
    }
  } finally {
    return {
      error,
      data,
      message,
    };
  }
}

export async function postUser(user) {
  let error = false;
  let message = commonMessage;
  let data = {};

  try {
    const request = `${url}users`;
    const result = await axios.post(request, user, { auth: auth });

    data = result.data;
  } catch (e) {
    error = true;

    if (e.response) {
      const status = e.response.status;
      if (status === 404) {
        message = notFound;
      }
    } else if (e.request) {
      // The request was made but no response was received
      console.log(e.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", e.message);
    }
  } finally {
    return {
      error,
      data,
      message,
    };
  }
}

export async function putUser(userId, user) {
    let error = false;
    let message = commonMessage;
    let data = {};
  
    try {
      const request = `${url}users/${userId}`;
      const result = await axios.put(request, user, { auth: auth });
  
      data = result.data;
    } catch (e) {
      error = true;
  
      if (e.response) {
        const status = e.response.status;
        if (status === 404) {
          message = notFound;
        }
      } else if (e.request) {
        // The request was made but no response was received
        console.log(e.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", e.message);
      }
    } finally {
      return {
        error,
        data,
        message,
      };
    }
}

export async function deleteUser(userId) {
    let error = false;
    let message = commonMessage;
    let data = {};
  
    try {
      const request = `${url}users/${userId}`;
      const result = await axios.delete(request, { auth: auth });
  
      data = result.data;
    } catch (e) {
      error = true;
  
      if (e.response) {
        const status = e.response.status;
        if (status === 404) {
          message = notFound;
        }
      } else if (e.request) {
        // The request was made but no response was received
        console.log(e.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", e.message);
      }
    } finally {
      return {
        error,
        data,
        message,
      };
    }
}
