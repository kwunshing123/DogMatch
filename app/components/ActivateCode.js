import React from 'react';
import Home from '../components/home/Home';
import ActivateCodeActions from '../actions/ActivateCodeActions';

class ActivateCode extends React.Component {
  componentDidMount() {
    if (this.props.params.activateCode) ActivateCodeActions.activate(this.props.params.activateCode);
  }

  render() {
    return (
      <Home />
    );
  }
}

export default ActivateCode;
