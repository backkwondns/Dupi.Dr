import React, { Component, createRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CFormControl,
  CHeaderDivider,
  CImage,
  CInputGroup,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'
import { CChartRadar } from '@coreui/react-chartjs'
import { Link, Redirect } from 'react-router-dom'
import html2canvas from 'html2canvas'
import axios from 'axios'
import { recommend } from './recommend'
import PropTypes from 'prop-types'

class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: this.props.location.state.result,
      editing: 0,
      editing_Memo: false,
      toast: 0,
      solution: false,
    }
    this.toaster = createRef()
    {
      axios
        .post('http://XXX.XXX.XX.X:31000/DB/solution', {
          Comment: this.state.result.Comment,
        })
        .then((res) => {
          this.setState({
            solution: res.data,
          })
        })
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (
      this.state.editing !== 0 &&
      this.state.editing_Memo !== nextState.editing_Memo &&
      nextState.editing_Memo !== false
    ) {
      return false
    }
    return true
  }

  inputHandler = (e) => {
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }))
  }

  clickToSave = () => {
    html2canvas(document.getElementById('saveTarget'))
      .then((canvas) => {
        this.Save(canvas.toDataURL('image/png'), `${this.state.result.Username}의 두피진단.png`)
      })
      .then(() => {
        this.sendToast('Save')
      })
  }

  solution_call = () => {}

  Save = (uri, filename) => {
    const link = document.createElement('a')
    document.body.appendChild(link)
    link.href = uri
    link.download = filename
    link.click()
    document.body.removeChild(link)
  }

  clickToMemo = (e) => {
    if (this.state.editing !== 0 && e.currentTarget.innerText === '저장') {
      this.setState((prevState) => ({
        editing: 0,
        result: {
          ...prevState.result,
          Memo: this.state.editing_Memo,
        },
      }))
      this.sendToast('Memo')
    } else {
      this.setState({
        editing: 1,
      })
    }
  }

  clickToCancle = () => {
    this.setState({
      editing: 0,
      editing_Memo: false,
    })
  }

  clickToServer = () => {
    const date = new Date()
    this.setState(
      (prevState) => ({
        editing: 0,
        result: {
          ...prevState.result,
          Date: date.toLocaleString(),
        },
      }),
      () => {
        axios
          .post('http://XXX.XXX.XX.X:31000/DB/upload_result', {
            result: this.state.result,
            Username: this.props.location.state.Username,
            disablePasswd: this.props.location.state.disablePasswd,
            Passwd: this.props.location.state.Passwd,
          })
          .then((res) => {
            this.sendToast('Server')
          })
          .then((res) => {
            this.setState({
              result: false,
            })
          })
      },
    )
  }

  clickToDelete = () => {
    this.sendToast('Delete')
  }

  sendToast = (action) => {
    let color = ''
    let mention = ''
    switch (action) {
      case 'Memo':
        color = 'primary'
        mention = '메모가 저장되었습니다.'
        break
      case 'Save':
        color = 'success'
        mention = '결과를 캡쳐하여 저장하였습니다.'
        break
      case 'Delete':
        color = 'danger'
        mention = '삭제하였습니다.'
        break
      case 'Server':
        color = 'info'
        mention = '서버에 저장되었습니다.'
        break
      default:
        break
    }
    this.setState({
      toast: (
        <CToast
          autohide={true}
          delay={3000}
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
    if (this.state.result === false) {
      return <Redirect to={{ pathname: '/head_skin/search' }} />
    } else {
      return (
        <>
          <CToaster ref={this.toaster} push={this.state.toast} placement="top-end" />
          <div className="bg-light h-auto d-flex flex-row align-items-center">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md="9" lg="7" xl="7">
                  <CCard className="mx-1" id={'saveTarget'}>
                    <CCardHeader>
                      <strong>{this.props.location.state.Username}</strong>의 결과{' '}
                      <Link to={'/head_skin/search'}>
                        <CButton
                          className={'float-right m-1'}
                          color={'danger'}
                          size={'sm'}
                          onClick={this.clickToDelete}
                        >
                          삭제
                        </CButton>
                      </Link>
                      <CButton
                        className={'float-right m-1'}
                        color={'info'}
                        onClick={this.clickToServer}
                        size={'sm'}
                      >
                        서버에 저장
                      </CButton>
                      <CButton
                        className={'float-right m-1'}
                        color={'success'}
                        onClick={this.clickToSave}
                        size={'sm'}
                      >
                        결과 다운
                      </CButton>
                    </CCardHeader>
                    <CCardBody>
                      <p className={'text-center text-medium-emphasis'}>
                        서버에 저장하지 않으면 기록이 남지 않습니다.
                      </p>
                      <CImage fluid align={'center'} rounded src={this.state.result.Image} />
                      <p className={'text-center text-medium-emphasis'}>
                        {this.props.location.state.Username}의 두피
                      </p>
                      <CHeaderDivider />
                      <CChartRadar
                        data={{
                          labels: [
                            '미세각질',
                            '피지과다',
                            '모낭사이홍반',
                            '모낭홍반농포',
                            '비듬',
                            '탈모',
                          ],
                          datasets: [
                            {
                              // label: this.state.Username,
                              backgroundColor: 'rgba(157,193,46,0.6)',
                              borderColor: 'rgba(119,147,35,1)',
                              pointBackgroundColor: 'rgba(119,147,35,1)',
                              pointBorderColor: 'rgba(119,147,35,1)',
                              pointHighlightFill: '#363da6',
                              pointHighlightStroke: 'rgba(220, 220, 220, 1)',
                              data: [
                                this.state.result[0],
                                this.state.result[1],
                                this.state.result[2],
                                this.state.result[3],
                                this.state.result[4],
                                this.state.result[5],
                              ],
                            },
                          ],
                        }}
                        options={{
                          scales: {
                            r: {
                              suggestedMin: 0,
                              suggestedMax: 3,
                              ticks: {
                                stepSize: 1,
                              },
                            },
                          },
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                        }}
                      />
                      <CHeaderDivider />
                      <p className={'text-center text-medium-emphasis'}>유형별 관리 방법</p>
                      <p>
                        <strong>미세각질</strong>
                      </p>
                      {this.state.result[0] > 0 ? (
                        recommend[0].content.split('\n').map((item, i) => {
                          return (
                            <span key={i}>
                              {item}
                              <br />
                            </span>
                          )
                        })
                      ) : (
                        <p>양호합니다</p>
                      )}
                      <br />
                      <p>
                        <strong>피지과다</strong>
                      </p>
                      {this.state.result[1] > 0 ? (
                        recommend[1].content.split('\n').map((item, i) => {
                          return (
                            <span key={i}>
                              {item}
                              <br />
                            </span>
                          )
                        })
                      ) : (
                        <p>양호합니다</p>
                      )}
                      <br />
                      <p>
                        <strong>모낭사이홍반</strong>
                      </p>
                      {this.state.result[2] > 0 ? (
                        recommend[2].content.split('\n').map((item, i) => {
                          return (
                            <span key={i}>
                              {item}
                              <br />
                            </span>
                          )
                        })
                      ) : (
                        <p>양호합니다</p>
                      )}
                      <br />
                      <p className={'text-medium-emphasis'}>모낭홍반농포</p>
                      {this.state.result[3] > 0 ? (
                        recommend[3].content.split('\n').map((item, i) => {
                          return (
                            <span key={i}>
                              {item}
                              <br />
                            </span>
                          )
                        })
                      ) : (
                        <p>양호합니다</p>
                      )}
                      <br />
                      <p>
                        <strong>비듬</strong>
                      </p>
                      {this.state.result[4] > 0 ? (
                        recommend[4].content.split('\n').map((item, i) => {
                          return (
                            <span key={i}>
                              {item}
                              <br />
                            </span>
                          )
                        })
                      ) : (
                        <p>양호합니다</p>
                      )}
                      <br />
                      <p>
                        <strong>탈모</strong>
                      </p>
                      {this.state.result[5] > 0 ? (
                        recommend[5].content.split('\n').map((item, i) => {
                          return (
                            <span key={i}>
                              {item}
                              <br />
                            </span>
                          )
                        })
                      ) : (
                        <p>양호합니다</p>
                      )}
                      <CHeaderDivider />
                      <p className={'text-center text-medium-emphasis'}>추천 관리 방법</p>
                      {this.state.solution ? (
                        this.state.solution.split('\n').map((item, i) => {
                          return (
                            <span key={i}>
                              {item}
                              <br />
                            </span>
                          )
                        })
                      ) : (
                        <p>loading...</p>
                      )}
                      <CHeaderDivider />
                      <p className={'text-center text-medium-emphasis'}>메모</p>
                      {this.state.editing !== 1 ? (
                        <p>{this.state.result.Memo}</p>
                      ) : (
                        <CInputGroup>
                          <CFormControl
                            component="textarea"
                            aria-label="With textarea"
                            name="editing_Memo"
                            onChange={this.inputHandler}
                          >
                            {this.state.result.Memo}
                          </CFormControl>
                        </CInputGroup>
                      )}
                    </CCardBody>
                    <CCardFooter className={'text-end'}>
                      {this.state.editing === 1 ? (
                        <CButton onClick={this.clickToCancle} color={'secondary'}>
                          취소
                        </CButton>
                      ) : (
                        <div />
                      )}
                      <CButton
                        className={'float-right m-1'}
                        color={'primary'}
                        onClick={this.clickToMemo}
                      >
                        {this.state.editing !== 1 ? '메모' : '저장'}
                      </CButton>
                    </CCardFooter>
                  </CCard>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </>
      )
    }
  }
}

Result.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object.isRequired,
  }).isRequired,
}
export default React.memo(Result)
