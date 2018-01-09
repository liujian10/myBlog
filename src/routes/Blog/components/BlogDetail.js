import './BlogDetail.less';

import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import { getItemByKey } from '../../../util';
import { Markdown } from '../../../components/Markdowm/Markdown';

class BlogDetail extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    const { params = {}, getDetail, menuItems } = this.props;
    if (params.key && menuItems.length > 0) {
      const item = getItemByKey(params.key, menuItems);
      getDetail({
        ...params,
        file: item.file
      });
    }
  }

  shouldComponentUpdate (nProps) {
    const { detail, getDetail } = this.props;
    const { params = {}, menuItems = [] } = nProps;
    const { pending, currentKey } = detail;

    if (menuItems.length === 0) {
      return false;
    } else {
      const { key } = params;
      const item = getItemByKey(key, menuItems);
      !pending && currentKey !== key && getDetail({
        ...params,
        file: item.file
      });
      return true;
    }
  }

  render () {
    const { detail = {}, params } = this.props;
    const { currentKey, content } = detail;
    const { key } = params;
    return (
      currentKey === key && content
        ? <Markdown key='content' content={content}/>
        : <QueueAnim type='top' duration={1000}>
          <div key='loading' className='blog-detail-loading'/>
        </QueueAnim>
    );
  }
}

BlogDetail.propTypes = {
  getDetail: PropTypes.func,
  menuItems: PropTypes.array,
  params: PropTypes.object,
  detail: PropTypes.object
};

export default BlogDetail;
