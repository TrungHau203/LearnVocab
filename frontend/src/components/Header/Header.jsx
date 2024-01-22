import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { logout } from '../../slices/authSlice';
import { useNavigation } from 'react-router-dom';
import "./Header.scss"
const Header = () => {
  const { userInfor } =  useSelector((state)=>state.auth)
  const { user } =  useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigation()
  const [logoutApiCall] = useLogoutMutation()
  const logoutHandler = async ()=>{
    try{
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch(e){
      console.log(e)
    }
  }
  return (
    <header className='header'>
      <Navbar className='header-bg' expand='sm' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>CamCam</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' className='navbar-tongle' />
          
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-4'>
              <LinkContainer to="/">
                <Nav.Link>
                  Ôn tập 
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className='ml-4'>
              <LinkContainer to="/courses">
                <Nav.Link>
                  Học từ mới
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className='ml-4'>
              <LinkContainer to="/word">
                <Nav.Link>
                  Sổ tay
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className='ms-auto'>
              { userInfor ? (
                <>
                  <NavDropdown title={userInfor?.data?.name} id='username'>
                    <NavDropdown.Item onClick={ logoutHandler }>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              
            </Nav>
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;