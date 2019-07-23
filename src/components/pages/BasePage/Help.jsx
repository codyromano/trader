import React from 'react';
import PlainButton from './PlainButton';
import Notice from './Notice';
import { PageWidthContainer, Row, Col } from './Grid';
import Image from './Image';
import { relative } from 'path';

const verticalAlignStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
};

const VerticalAlign = ({ children }) => (
  <div style={verticalAlignStyle}>{children}</div>
);

const modalStyle = {
  position: 'relative',
};

const Modal = ({ children }) => (
  <PageWidthContainer>
    <div style={modalStyle}>
        {children}
    </div>
  </PageWidthContainer>
);

const help = {
  display: 'inline-block',
};
const helpText = {
  position: 'fixed',
  zIndex: 1,
  top: '0px',
  left: '0px',
  height: '100%',
  width: '100%',
};

const blackOverlay = {
  position: 'absolute',
  top: '0',
  left: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  width: '100%',
  height: '100%',
};

const close = {
  position: 'absolute',
  top: '5px',
  right: '5px',
};

export default class Help extends React.Component {
  state = {
    helpTextVisible: false,
  };

  onClick = () => {
    this.setState({
      helpTextVisible: true
    });
  };

  onClose = () => {
    this.setState({
      helpTextVisible: false,
    })
  };

  render() {
    return (
      <div style={help}>
        <PlainButton style={{
          color: 'green',
          textDecoration: 'underline',
          padding: '5px',
        }} onClick={this.onClick}>

          <Image
            src="https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Information_icon.svg/1024px-Information_icon.svg.png"
            height="1rem"
            width="1rem"
          />
        </PlainButton>

        {this.state.helpTextVisible && (
          <div style={helpText}>
            <div style={blackOverlay} onClick={this.onClose} />
            <VerticalAlign>
              <Modal>
                <Notice>
                  <div style={{padding: '1rem' }}>
                    <div style={close}>
                      <PlainButton style={{
                        fontWeight: 'bold',
                        fontSize: '1.05rem'
                      }} onClick={this.onClose}>X</PlainButton>
                    </div>
                    {this.props.children}
                  </div>
                </Notice>
              </Modal>
            </VerticalAlign>
          </div>
        )}
      </div>
    )
  }
}