import React, { Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
//import store from '../../../store'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: '',
      _passwd: '',
      _gender: 'male',
      _age: '',
      _height: '',
      _weight: '',
      isSigned: false,
      items: [
        { id: 'id', name: '_id', icon: freeSet.cilUser },
        { id: 'passwd', name: '_passwd', icon: freeSet.cilLockLocked },
        { id: 'gender', name: '_gender', icon: freeSet.cilInfo },
        { id: 'age', name: '_age', icon: freeSet.cilPlus },
        { id: 'height', name: '_height', icon: freeSet.cilResizeHeight },
        { id: 'weight', name: '_weight', icon: freeSet.cilResizeWidth },
      ],
    }
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const registered = {
      _id: this.state._id,
      _passwd: this.state._passwd,
      _gender: this.state._gender,
      _age: this.state._age,
      _height: this.state._height,
      _weight: this.state._weight,
    }
    axios
      .post('http://XXX.XXX.XX.X:31000/DB/signup', registered)
      .then((res) => this.setState({ isSigned: true }))

    this.setState({
      _id: undefined,
      _passwd: undefined,
      _gender: undefined,
      _age: undefined,
      _height: undefined,
      _weight: undefined,
    })
  }

  render() {
    if (this.state.isSigned === true) {
      alert('Registerd!')
      return <Redirect to={{ pathname: '/login', state: { isSigned: true } }} />
    }
    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={this.onSubmit}>
                    <h1>Register</h1>
                    <p className="text-medium-emphasis">Create your account</p>
                    {this.state.items.map((item, i) => {
                      if (item.id === 'passwd') {
                        return (
                          <CInputGroup key={item.id} className="mb-3">
                            <CInputGroupText>
                              <CIcon content={item.icon} />
                            </CInputGroupText>
                            <CFormControl
                              required
                              type="password"
                              placeholder={item.id}
                              autoComplete={item.id}
                              name={item.name}
                              onChange={this.inputHandler}
                              value={this.state._passwd}
                            />
                          </CInputGroup>
                        )
                      } else if (item.id === 'gender') {
                        return (
                          <CInputGroup key={item.id} className="mb-3">
                            <CInputGroupText>
                              <CIcon content={item.icon} />
                            </CInputGroupText>
                            <CFormSelect
                              aria-label="Default select example"
                              onChange={this.inputHandler}
                              name={item.name}
                            >
                              <option value="male">남</option>
                              <option value="female">여</option>
                            </CFormSelect>
                          </CInputGroup>
                        )
                      }
                      return (
                        <CInputGroup key={item.id} className="mb-3">
                          <CInputGroupText>
                            <CIcon content={item.icon} />
                          </CInputGroupText>
                          <CFormControl
                            required
                            placeholder={item.id}
                            autoComplete={item.id}
                            name={item.name}
                            onChange={this.inputHandler}
                            value={this.state.values}
                          />
                        </CInputGroup>
                      )
                    })}
                    <CButton type="submit" color="success" block>
                      Create Account
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}

export default Register
