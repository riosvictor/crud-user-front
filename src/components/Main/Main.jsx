import {
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteUser, getUser, postUser, putUser } from "../../api";
import { saveDataToDB, showDataFromDB } from "../../helper/functions";
import { Div, DivRow, Form } from "./styles";

const Main = () => {
  const [idBusca, setIdBusca] = useState("");
  const initialValue = {
      id: '',
      nome: '',
      email: '',
      naturalidade: '',
      nacionalidade: '',
      cpf: '',
      dataNascimento: '',
      sexo: '',
  }
  const [user, setUser] = useState(initialValue);

  const [errorName, setErrorName] = useState(false);
  const [errorData, setErrorData] = useState(false);
  const [errorDataMessage, setErrorDataMessage] = useState("");
  const [errorCpf, setErrorCpf] = useState(false);
  const [errorCpfMessage, setErrorCpfMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const changeSexo = (event) => {
    setUser({...user, sexo: event.target.value});
  };
  const changeNome = (event) => {
    setUser({...user, nome: event.target.value});
  };
  const changeEmail = (event) => {
    setUser({...user, email: event.target.value});
  };
  const changeNatural = (event) => {
    setUser({...user, naturalidade: event.target.value});
  };
  const changeNacional = (event) => {
    setUser({...user, nacionalidade: event.target.value});
  };
  const changeCpf = (event) => {
    setUser({...user, cpf: event.target.value});
  };
  const changeDataNascimento = (event) => {
    setUser({...user, dataNascimento: event.target.value});
  };
  const changeIdBusca = (event) => {
    setIdBusca(event.target.value);
  };
  const invalidValue = "Valor inválido!";

  function validateFields() {
    let error = false;
    const aDate = moment(user.dataNascimento, "DD/MM/YYYY", true);
    const isValid = aDate.isValid();
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const validCpf = regexCpf.test(user.cpf);

    setErrorName(user.nome.length === 0);
    setErrorCpf(user.cpf.length < 11 || !validCpf);
    setErrorCpfMessage(user.cpf.length < 11 || !validCpf ? invalidValue : "");
    setErrorData(!isValid);
    setErrorDataMessage(!isValid ? invalidValue : "");

    error = user.nome.length === 0 || user.cpf.length < 11 || !isValid;

    if (user.email && user.email.length > 0) {
      const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
      const validEmail = regex.test(user.email);

      setErrorEmail(!validEmail);

      error = error || !validEmail;
      setErrorEmailMessage(!validEmail ? invalidValue : "");
    }

    return !error;
  }

  function handleNotify(message, success) {
    if (success) toast.success(message);
    else toast.error(message);
  }

  function loadData(data) {
    data.dataNascimento = showDataFromDB(data.dataNascimento)
    setUser(data);
  }

  const handleGetUser = async () => {
    if (idBusca) {
      const result = await getUser(idBusca);

      if (result.error) {
        handleNotify(result.message, false);
      } else {
        loadData(result.data);
      }
    }
  };
  const handleInsertUser = async () => {
    if (validateFields()) {
      const saveUser = {...user, dataNascimento: saveDataToDB(user.dataNascimento), id: null}
      const result = await postUser(saveUser);

      if (result.error) {
        handleNotify(result.message, false);
      } else {
        loadData(result.data);
        handleNotify('Usuário inserido com sucesso!', true);
      }
    }
  };
  const handleAlterUser = async () => {
    if (user.id && user.id.length > 0 && validateFields()) {
        const saveUser = {...user, dataNascimento: saveDataToDB(user.dataNascimento), id: null}
        const result = await putUser(user.id, saveUser);
  
        if (result.error) {
          handleNotify(result.message, false);
        } else {
          loadData(result.data);
          handleNotify('Usuário alterado com sucesso!', true);
        }
    }
  };
  const handleDeleteUser = async () => {
    if (user.id && user.id.length > 0) {
        const result = await deleteUser(user.id);
  
        if (result.error) {
          handleNotify(result.message, false);
        } else {
          handleClear();
          handleNotify('Usuário removido com sucesso!', true);
        }
    }
  };
  const handleClear = () => {
      setUser(initialValue)
  };

  useEffect(() => {}, []);

  return (
    <>
      <Form noValidate autoComplete="off">
        <Div>
          <TextField
            id="outlined-basic"
            label="ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.id} 
            disabled
          />
        </Div>

        {/* Required Fields */}

        <Div>
          <TextField
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.nome}
            onChange={changeNome}
            required
            error={errorName}
          />
        </Div>

        <Div>
          <InputMask
            mask="99/99/9999"
            value={user.dataNascimento}
            disabled={false}
            onChange={changeDataNascimento}
            maskChar=" "
            style={{ width: "100%" }}
          >
            {() => (
              <TextField
                id="outlined-basic"
                label="Data de Nascimento"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                error={errorData}
                helperText={errorDataMessage}
              />
            )}
          </InputMask>
        </Div>

        <Div>
          <InputMask
            mask="999.999.999-99"
            value={user.cpf}
            disabled={false}
            onChange={changeCpf}
            maskChar=" "
            style={{ width: "100%" }}
          >
            {() => (
              <TextField
                id="outlined-basic"
                label="CPF"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                error={errorCpf}
                helperText={errorCpfMessage}
              />
            )}
          </InputMask>
        </Div>

        {/* Others Fields */}
        <Divider />

        <Div>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.email}
            onChange={changeEmail}
            error={errorEmail}
            helperText={errorEmailMessage}
          />
        </Div>

        <Div>
          <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-outlined-label">Sexo</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={user.sexo}
              onChange={changeSexo}
              label="Sexo"
            >
              <MenuItem value="">
                <em>Nenhum</em>
              </MenuItem>
              <MenuItem value={"Masculino"}>Masculino</MenuItem>
              <MenuItem value={"Feminino"}>Feminino</MenuItem>
            </Select>
          </FormControl>
        </Div>

        <Div>
          <TextField
            id="outlined-basic"
            label="Naturalidade"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.naturalidade}
            onChange={changeNatural}
          />
        </Div>

        <Div>
          <TextField
            id="outlined-basic"
            label="Nacionalidade"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.nacionalidade}
            onChange={changeNacional}
          />
        </Div>

        <Divider />

        <Divider />

        <Div>
          <Button 
            variant="contained" 
            onClick={handleInsertUser}
            disabled={user.id.length > 0}
          >
            Inserir
          </Button>

          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAlterUser}
            disabled={user.id.length === 0}
          >
            Alterar
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteUser}
          >
            Remover
          </Button>

          <Button
            variant="contained"
            color="default"
            onClick={handleClear}
          >
            Limpar
          </Button>
        </Div>

        <DivRow>
          <Button variant="contained" onClick={handleGetUser}>
            Buscar
          </Button>

          <TextField
            id="outlined-basic"
            label="ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={idBusca}
            onChange={changeIdBusca}
          />
        </DivRow>

        <ToastContainer />
      </Form>
    </>
  );
};

export default Main;
