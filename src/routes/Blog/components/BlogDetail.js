import React from 'react';
import PropTypes from 'prop-types';
import Markdown from '../../../components/Markdowm/Markdown';

class BlogDetail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      ...props
    };
  }

  shouldComponentUpdate (nProps) {
    const { params } = nProps;
    const { detail } = this.props;
    const showUpdate = params.id !== detail.key;
    console.log('showUpdate:' + showUpdate);
    return showUpdate;
  }

  componentWillUpdate (nProps) {
    const { currentKey } = this.props;
    const { params = {} } = nProps;
    if (params.id !== currentKey) {
      this.props.setCurrentKey(params.id);
      this.props.getDetail({
        key: params.id
      });
    }
  }

  render () {
    const { detail } = this.props;
    let content;
    try {
      content = detail && detail.name && require('../../../../docs/' + detail.name + '.md');
    } catch (e) {
      console.log('Cannot find file \'../../../../docs/' + detail.name + '.md\' ');
    }
    if (content) {
      return <Markdown content={content}/>;
    }
    return <div>nothing</div>;
  }
}

BlogDetail.propTypes = {
  getDetail: PropTypes.func,
  setCurrentKey: PropTypes.func,
  currentKey: PropTypes.string,
  detail: PropTypes.object
};

export default BlogDetail;
