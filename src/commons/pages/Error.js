import React, { Component } from 'react';
import loadable from '@loadable/component';
//지연로딩형태로 에러 발생했을때만 발생

const ErrorDisplay = loadable(() => import('../components/ErrorDisplay'));

class ErrorPage extends Component {
  state = {
    message: '',
  };
  componentDidCatch(error, info) {
    if (error) {
        this.setState({message : error.message});
        console.error(error, info);
    }
  }
  render() {
    const {children} = this.props;
    const {message} = this.state;
    return message ? <ErrorDisplay>{message}</ErrorDisplay> : children;
  }
}

export default React.memo(ErrorPage);
