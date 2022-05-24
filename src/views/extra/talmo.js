import React, { Component } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionButton,
  CAccordionCollapse,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'

import { storys } from './story'

class Talmo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accordion: 0,
    }
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

  render() {
    return (
      <div>
        {storys.map((item, i) => {
          return (
            <CAccordion flush key={i}>
              <CAccordionItem>
                <CAccordionHeader>
                  <CAccordionButton
                    onClick={this.onClickAccordion}
                    collapsed={this.state.accordion !== i + 1}
                    id={i + 1}
                  >
                    {item.title}
                  </CAccordionButton>
                </CAccordionHeader>
                <CAccordionCollapse visible={this.state.accordion === i + 1}>
                  <CAccordionBody>
                    {item.content.split('\\n').map((line, line_i) => {
                      return (
                        <span key={line_i}>
                          {line}
                          <br />
                          <br />
                        </span>
                      )
                    })}
                  </CAccordionBody>
                </CAccordionCollapse>
              </CAccordionItem>
            </CAccordion>
          )
        })}
      </div>
    )
  }
}

export default React.memo(Talmo)
