import React from 'react';
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router';
import PetCommentsStore from '../../stores/PetCommentsStore';
import PetCommentsActions from '../../actions/PetCommentsActions';

class PetComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = PetCommentsStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    PetCommentsStore.listen(this.onChange);
    PetCommentsActions.getPetComments(this.props.id, 0, 5);
  }

  componentWillUnmount() {
    PetCommentsStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) PetCommentsActions.getPetComments(this.props.id, 0, 5);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePageClick(data) {
    let selected = data.selected;
    this.setState(() => {
      PetCommentsActions.getPetComments(this.props.id, selected, 5);
    });
  };

  render() {
    if(this.state.comments.length) {
      var comment = this.state.comments.map((comment, index) => {
        return (
          <div key={comment.commentId} className='list-group-item animated fadeIn'>
            <div className='media'>
              <div className='media-body'>
                <strong><Link to={'/owner/' + comment.petOwnerId}>{comment.petOwnerName}</Link></strong> said:<p/>
                {comment.comment} <p/>
                {comment.time}
              </div>
            </div>
          </div>
        );
      });
    } else {
      comment = <div className='alert alert-warning' role='alert'>
                  <strong>There is no any comments yet.</strong>
                </div>;
    }

    return (
      <div>
        <div className='well'>
          {comment}
        </div>
        <ReactPaginate previousLabel={"previous"}
                 nextLabel={"next"}
                 breakLabel={<a href="">...</a>}
                 breakClassName={"break-me"}
                 pageCount={this.state.commentsPageCount}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 onPageChange={this.handlePageClick}
                 containerClassName={"pagination"}
                 subContainerClassName={"pages pagination"}
                 activeClassName={"active"} />
        </div>
    );
  }
}

export default PetComments;
