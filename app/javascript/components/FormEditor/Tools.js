import React, { createElement } from 'react';
import { useEditor } from '@craftjs/core';
import cx from 'classnames';

import Tool from './Tool';

const Tools = () => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const classNames = cx('buttons are-medium', { 'is-invisible': !enabled });

  return (
    <nav className={classNames}>
      <Tool name="Text" icon={<i className="fas fa-keyboard" aria-hidden="true" />} />
      <Tool name="Dropdown" icon={<i className="fas fa-list-alt" aria-hidden="true" />} />
      <Tool name="Date" icon={<i className="fas fa-calendar-alt" aria-hidden="true" />} />
      <Tool name="Toggle" icon={<i className="fas fa-check-square" aria-hidden="true" />} />
      <Tool name="Columns" icon={<i className="fas fa-columns" aria-hidden="true" />} />
      <Tool name="Heading" icon={<i className="fas fa-heading" aria-hidden="true" />} />
      <Tool name="Paragraph" icon={<i className="fas fa-paragraph" aria-hidden="true" />} />
    </nav>
  );
};

export default Tools;
