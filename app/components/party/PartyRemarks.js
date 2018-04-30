import React from 'react';
import PartyDetailsStore from '../../stores/PartyDetailsStore';

class PartyRemarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = PartyDetailsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PartyDetailsStore.listen(this.onChange);
  }

  componentWillUnmount() {
    PartyDetailsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    if(this.state.remarks.length) {
      var remarks = this.state.remarks.map((remark, index) => {
        return (
          <div key={index}>
            {index + 1} - {remarks}
          </div>
        );
      });
    } else {
      remarks = <div className='alert alert-warning' role='alert'>
                  <strong>This party is no remarks.</strong> 
                </div>;
    }

    return (
      <div className='well'>
        <strong>
          {remarks}
        </strong>
      </div>
    );
  }
}

export default PartyRemarks;
