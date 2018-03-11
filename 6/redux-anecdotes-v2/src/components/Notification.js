import React from 'react';
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const { msg } = this.props; //.store.getState().notifications;
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
    };
    return (
      <div style={style}>
        { msg }
      </div>
    );
  }
}

const mapStateToProps = state => ({ msg: state.notifications.msg})

export default connect(mapStateToProps)(Notification)