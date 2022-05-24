import React, { Component, createRef } from 'react'
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
  CRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disablePasswd: true,
      Username: '',
      Passwd: '',
      result: false,
    }
    this.toaster = createRef()
  }

  inputHandler = (e) => {
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }))
  }

  get_req = (passwd) => {
    axios
      .post('http://XXX.XXX.XX.X:31000/DB/use_passwd', {
        Username: this.state.Username,
        Passwd: passwd,
      })
      .then((res) => {
        if (res.data) {
          this.setState({ result: res.data })
        } else {
          passwd = prompt('Wrong Passwd!')
          this.get_req(passwd)
        }
      })
  }

  onSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://XXX.XXX.XX.X:31000/DB/check_passwd', { Username: this.state.Username })
      .then((res) => {
        if (res.data === 'nothing') {
          this.sendToast('Wrong_Username')
        } else if (res.data) {
          axios
            .post('http://XXX.XXX.XX.X:31000/DB/get_result', { Username: this.state.Username })
            .then((res) => {
              if (res.data) {
                this.setState({ result: res.data })
              } else {
                alert('Unknown Error occured!')
              }
            })
        } else {
          let passwd = prompt('Enter Passwd!')
          this.get_req(passwd)
        }
      })
  }

  sendToast = (action) => {
    let color = 'danger'
    let mention = ''
    switch (action) {
      case 'Wrong_Username':
        mention = '없는 이름입니다.'
        break
      default:
    }
    this.setState({
      toast: (
        <CToast
          autohide={true}
          delay={3500}
          color={color}
          className="text-white align-items-center"
        >
          <div className="d-flex">
            <CToastBody>{mention}</CToastBody>
            <CToastClose className="me-2 m-auto" white />
          </div>
        </CToast>
      ),
    })
  }

  render() {
    if (this.state.result) {
      return (
        <Redirect to={{ pathname: '/head_skin/history', state: { result: this.state.result } }} />
      )
    } else {
      return (
        <div className="bg-light h-auto d-flex flex-row align-items-center">
          <CToaster ref={this.toaster} push={this.state.toast} placement="top-end" />
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="9" lg="7" xl="6">
                <CCard className="mx-1">
                  <CCardBody className="p-4">
                    <CForm onSubmit={this.onSubmit}>
                      <h1>두피 분석 기록 검색</h1>
                      <p className="text-medium-emphasis">분석시 사용한 이름을 입력해주세요</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl
                          placeholder="Username"
                          autoComplete="username"
                          id="Username"
                          name="Username"
                          onChange={this.inputHandler}
                        />
                        <CButton type="submit" color="info">
                          검색
                        </CButton>
                      </CInputGroup>
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
}

export default Search
