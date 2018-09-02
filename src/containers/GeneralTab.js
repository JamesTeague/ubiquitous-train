import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';

class GeneralTab extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  render () {
    console.log(this.props);
    return (
      <div>
        <Input
          type={'text'}
          value={this.props.displayName}
          readOnly={true}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  displayName: state.session.authUser.displayName
});

export default connect(mapStateToProps)(GeneralTab)
