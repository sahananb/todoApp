import React, {useState} from 'react';
import {Input, Button, message} from 'antd';
import styles from './Login.module.css';
import {Link, useNavigate} from 'react-router-dom';
import login from '../../assets/login.png';
import { getErrorMessage } from '../../util/GetError';
import AuthServices from '../../services/authServices';

const Register = () => {

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");
  const [loading,setLoading] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async ()=>{
    try{
      setLoading(true);
      const data = {
        firstName,
        lastName,
        username,
        password
      }
      const response = await AuthServices.registerUser(data);
      console.log(response.data);
      setLoading(false);
      message.success("Registered Successfully");
      navigate('/login');

    }catch(err){
      console.log(err);
      message.error(getErrorMessage(err));
      setLoading(false);
    }
  }
  return (
    <div>
      <div className={styles.login_card}>
        <img src={login} alt='..'/>
        <h2>Register</h2>
        <div className={styles.input_wrapper}>
          <Input
          placeholder='First Name'
          value={firstName}
          onChange={(e)=>setFirstName(e.target.value)} />
        </div>
        <div className={styles.input_wrapper}>
          <Input
          placeholder='Last Name'
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)} />
        </div>
        <div className={styles.input_wrapper}>
          <Input
          placeholder='User Name'
          value={username}
          onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div className={styles.input_wrapper}>
          <Input.Password
          placeholder='Password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className={styles.input_info}>
          Already have an account ? <Link to='/login'>Login</Link>
        </div>
        <Button loading={loading} type='primary' size='large' disabled={!username||!password} onClick={handleSubmit}>Register</Button>
      </div>
    </div>
  )
}

export default Register