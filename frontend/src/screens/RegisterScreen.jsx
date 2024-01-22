import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loading from '../components/Loading';
import { useRegisterMutation } from '../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfor } = useSelector((state)=>state.auth)
  const [register, {isLoading, error}] = useRegisterMutation()
  useEffect(()=>{
    if(userInfor) {
        navigate('/')
    }
},[navigate, userInfor])
  // chưa validate 
  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const res = await register({name, email, password, phoneNumber:numberPhone, address}).unwrap()
      toast(res.message);
      dispatch(setCredentials({...res}))
      navigate('/')
      } catch(err) {
          toast.error(`${err.data.message} không hợp lệ`)
      }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='phone'>
          <Form.Label>Number Phone</Form.Label>
          <Form.Control
            type='phone'
            placeholder='Enter Number phone'
            value={numberPhone}
            onChange={(e) => setNumberPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loading/>}
        <Button type='submit' variant='primary' className='mt-3'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;