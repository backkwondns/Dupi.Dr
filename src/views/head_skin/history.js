import React, { Component, createRef } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionButton,
  CAccordionCollapse,
  CAccordionHeader,
  CAccordionItem,
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
import PropTypes from 'prop-types'
import { recommend } from './recommend'

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: this.props.location.state.result,
      accordion: 0,
      editing: 0,
      editing_Image: false,
      editing_Memo: false,
      toast: 0,
    }
    this.toaster = createRef()
    {
      for (let x in this.state.result.History) {
        axios
          .post('http://XXX.XXX.XX.X:31000/DB/solution', {
            Comment: this.state.result.History[x].Comment,
          })
          .then((res) => {
            let changeStateOfSolution = this.state.result
            changeStateOfSolution.History[x].solution = res.data
            this.setState(() => ({
              result: changeStateOfSolution,
            }))
          })
      }
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

  onClickAccordion = (e) => {
    this.setState({
      accordion:
        this.state.accordion !== 0
          ? Number(e.target.id) === this.state.accordion
            ? 0
            : Number(e.target.id)
          : Number(e.target.id),
    })
  }

  clickToSave = () => {
    html2canvas(document.getElementById('saveTarget'))
      .then((canvas) => {
        this.Save(
          canvas.toDataURL('image/png'),
          `${this.props.location.state.result.Username}의 두피진단.png`,
        )
      })
      .then(() => {
        this.sendToast('Save')
      })
  }

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
      this.UpdateMemo()
    } else if (this.state.editing !== 0 && e.currentTarget.innerText === '메모') {
      this.setState({
        editing: Number(e.target.id),
        editing_Image:
          this.state.editing === 0
            ? this.props.location.state.result.History[Number(e.target.id) - 1].Image
            : false,
        editing_Memo:
          this.state.editing === 0
            ? this.props.location.state.result.History[Number(e.target.id) - 1].Memo
            : false,
      })
    } else {
      this.setState({
        editing: this.state.editing === 0 ? Number(e.target.id) : 0,
        editing_Image:
          this.state.editing === 0
            ? this.props.location.state.result.History[Number(e.target.id) - 1].Image
            : false,
        editing_Memo:
          this.state.editing === 0
            ? this.props.location.state.result.History[Number(e.target.id) - 1].Memo
            : false,
      })
    }
  }

  clickToCancle = () => {
    this.setState({
      editing: 0,
      editing_Image: false,
      editing_Memo: false,
    })
  }

  UpdateMemo = () => {
    let changeStateOfMemo = this.state.result
    changeStateOfMemo.History[this.state.editing - 1].Memo = this.state.editing_Memo
    axios
      .post('http://XXX.XXX.XX.X:31000/DB/memo_update', {
        Username: this.state.result.Username,
        Image: this.state.editing_Image,
        Memo: this.state.editing_Memo,
      })
      .then((res) => {
        this.setState((prevState) => ({
          result: changeStateOfMemo,
          editing: 0,
        }))
      })
      .then((res) => {
        this.sendToast('Memo')
      })
  }

  clickToDelete = async (e) => {
    await this.setState({
      editing_Image: this.state.result.History[Number(e.target.id) - 1].Image,
    })
    axios
      .post('http://XXX.XXX.XX.X:31000/DB/delete_result', {
        Username: this.state.result.Username,
        Image: this.state.editing_Image,
      })
      .then((res) => {
        let return_History = this.state.result.History
        return_History.splice([Number(e.target.id) - 1], 1)
        this.setState((prevState) => ({
          result: { ...prevState.result, History: return_History },
        }))
      })
      .then(this.sendToast('Delete'))
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
            <CToastClose className="me-2 m-auto" white></CToastClose>
          </div>
        </CToast>
      ),
    })
  }

  render() {
    if (this.props.location.state) {
      return (
        <>
          <CToaster ref={this.toaster} push={this.state.toast} placement="top-end" />
          <div className="bg-light h-auto d-flex flex-row align-items-center">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md="9" lg="7" xl="7">
                  <CCard className="mx-1" id={'saveTarget'}>
                    <CCardHeader>
                      {this.state.result.Username}의 결과{' '}
                      <Link to={'/head_skin/search'}>
                        <CButton className={'float-right m-1'} color={'secondary'} size={'sm'}>
                          뒤로
                        </CButton>
                      </Link>
                    </CCardHeader>

                    {this.state.result.History.map((item, i) => {
                      return (
                        <CAccordion flush key={i + 1}>
                          <CAccordionItem>
                            <CAccordionHeader>
                              <CAccordionButton
                                id={i + 1}
                                collapsed={this.state.accordion !== i + 1}
                                onClick={this.onClickAccordion}
                              >
                                {i + 1}
                                {'.'} {item.Date.replace('T', ' ').substring(0, 22)}
                                {this.state.accordion === i + 1 ? (
                                  <div>
                                    <CButton
                                      className={'float-right m-1'}
                                      color={'danger'}
                                      onClick={this.clickToDelete}
                                      variant={'outline'}
                                      id={i + 1}
                                    >
                                      삭제
                                    </CButton>
                                    <CButton
                                      className={'float-right m-1'}
                                      color={'success'}
                                      onClick={this.clickToSave}
                                      variant={'outline'}
                                    >
                                      결과 다운
                                    </CButton>
                                  </div>
                                ) : (
                                  <div />
                                )}
                              </CAccordionButton>
                            </CAccordionHeader>
                            <CAccordionCollapse visible={this.state.accordion === i + 1}>
                              <CAccordionBody>
                                <CCardBody>
                                  <CImage fluid align={'center'} rounded src={item.Image} />
                                  <p className={'text-center text-medium-emphasis'}>
                                    {item.Date.replace('T', ' ').substring(0, 22)}{' '}
                                    {this.state.result.Username}의 두피
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
                                            item[0],
                                            item[1],
                                            item[2],
                                            item[3],
                                            item[4],
                                            item[5],
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
                                  <p className={'text-center text-medium-emphasis'}>
                                    유형별 관리 방법
                                  </p>
                                  <p>
                                    <strong>미세각질</strong>
                                  </p>
                                  {item[0] > 0 ? (
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
                                  {item[1] > 0 ? (
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
                                  {item[2] > 0 ? (
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
                                  <p>
                                    <strong>모낭홍반농포</strong>
                                  </p>
                                  {item[3] > 0 ? (
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
                                  {item[4] > 0 ? (
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
                                  {item[5] > 0 ? (
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
                                  <p className={'text-center text-medium-emphasis'}>
                                    추천 관리 방법
                                  </p>
                                  {item.solution ? (
                                    item.solution.split('\n').map((line, line_i) => {
                                      return (
                                        <span key={line_i}>
                                          {line}
                                          <br />
                                        </span>
                                      )
                                    })
                                  ) : (
                                    <p>loading...</p>
                                  )}
                                  <CHeaderDivider />
                                  <p className={'text-center text-medium-emphasis'}>메모</p>
                                  {this.state.editing !== i + 1 ? (
                                    <p>{item.Memo}</p>
                                  ) : (
                                    <CInputGroup>
                                      <CFormControl
                                        component="textarea"
                                        aria-label="With textarea"
                                        name="editing_Memo"
                                        onChange={this.inputHandler}
                                      >
                                        {item.Memo}
                                      </CFormControl>
                                    </CInputGroup>
                                  )}
                                </CCardBody>
                                <CCardFooter className={'text-end'}>
                                  {this.state.editing === i + 1 ? (
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
                                    id={i + 1}
                                  >
                                    {this.state.editing !== i + 1 ? '메모' : '저장'}
                                  </CButton>
                                </CCardFooter>
                              </CAccordionBody>
                            </CAccordionCollapse>
                          </CAccordionItem>
                        </CAccordion>
                      )
                    })}
                  </CCard>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </>
      )
    } else {
      return <Redirect to={{ pathname: '/head_skin/search' }} />
    }
  }
}

History.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object.isRequired,
  }).isRequired,
}
export default React.memo(History)
