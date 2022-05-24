import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { login } from '../../../redux/action/auth.action'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: undefined,
      loading: false,
      _i: {
        d1: '',
        d2: '',
      },
    }
  }

  inputHandler = (e) => {
    this.setState((prevState) => ({
      _i: {
        ...prevState._i,
        [e.target.name]: e.target.value,
      },
    }))
  }

  onSubmit = (e) => {
    const { dispatch, history } = this.props
    e.preventDefault()

    this.setState({
      loading: true,
    })

    const auth = {
      _id: this.state._i.d1,
      _passwd: this.state._i.d2,
    }

    //console.log(auth)
    console.log(this.props)
    // const { dispatch, history } = this.props
    // this.props.dispatch(login(this.state._i.d1, this.state._i.d2))
    // this.props.login()

    // axios
    //   .post('http://XXX.XXX.XX.X:31000/DB/authentication', auth)
    //   .then((res) => console.log(res.data))

    this.setState(
      {
        d1: undefined,
        d2: undefined,
      },

      () => {
        //window.location.href = 'http://XXX.XXX.XX.X:30000'
      },
    )
  }

  render() {
    const { isLoggedIn } = this.props
    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl
                          placeholder="Username"
                          autoComplete="username"
                          id="ID"
                          name="d1"
                          onChange={this.inputHandler}
                          value={this.state._i.d1}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                        <CFormControl
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="d2"
                          id="Passwd"
                          onChange={this.inputHandler}
                          value={this.state._i.d2}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton type="submit" color="primary" className="px-4">
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth
  //const { message } = state.message
  return {
    isLoggedIn,
    //message,
  }
}

const mapDispatchToProps = {
  login: login,
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
