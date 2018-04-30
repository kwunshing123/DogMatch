import React from 'react';
import SupportStore from '../stores/SupportStore';
import SupportActions from '../actions/SupportActions';
import NavbarActions from '../actions/NavbarActions';
import NavbarStore from '../stores/NavbarStore';
import Home from '../components/home/Home';

class Support extends React.Component {
  constructor(props) {
    super(props);
    this.state = SupportStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SupportStore.listen(this.onChange);
    NavbarActions.authenticate();
  }

  componentWillUnmount() {
    SupportStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let subject = this.state.subject.trim();
    let content = this.state.content;
    let type = this.state.type;

    if (!subject || !content || !type) {
      SupportActions.invalidInfo();
      return;
    }

    if (subject && content && type) SupportActions.post(subject, type, content);
  }

  render() {
    return (
    (NavbarStore.state.isAuthorized == false) ? (<Home/>) : (
      <div className='container'>
        <div className='row'>
          <div className='col-md-offset-2 col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Any questions you are facing?</div>
              <div className='panel-body'>
                <span className='help-block alert alert-warning'>After you leave the message, we will reply you <strong> on your registration email </strong> as soon as possible.</span>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className='form-group'>
                    <label className='control-label'>Subject:</label>
                    <input type='text' className='form-control' ref='subjectTextField' value={this.state.subject} onChange={SupportActions.updateSubject} autoFocus/>
                  </div>
                  <div className='form-group'>
                    <label className='control-label'>Type:</label>
                    <select value={this.state.type} onChange={SupportActions.updateType} style={{width: '100%'}}>
                      <option value="technical">Technical Problems</option>
                      <option value="account">Account Problems</option>
                      <option value="suggestion">Any Suggestions</option>
                    </select>
                  </div>
                  <div className='form-group'>
                    <label className='control-label'>Content:</label>
                    <textarea className="form-control" rows="6" style={{resize: 'none'}} value={this.state.content} onChange={SupportActions.updateContent}></textarea>
                  </div>
                  <button type='submit' className='btn btn-info'>Post</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    );
  }
}

export default Support;
