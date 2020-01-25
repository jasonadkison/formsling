import React, { useEffect } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import cx from 'classnames';

const RenderNode = ({ render }) => {
  const { query } = useEditor();
  const {
    id,
    isEditorEnabled,
    isSelected,
    isHovered,
    dom,
    name,
  } = useNode((node) => ({
    isEditorEnabled: query.getOptions().enabled,
    isSelected: node.events.selected,
    isHovered: node.events.hovered,
    dom: node.dom,
    name: node.data.displayName,
  }));

  const isRoot = query.node(id).isRoot();
  const isCanvas = query.node(id).isCanvas();

  // adds a class for nested canvases so we can style them later with a border
  useEffect(() => {
    if (dom) {
      if (!isRoot && isCanvas) {
        dom.classList.add('is-canvas');
      } else {
        dom.classList.remove('is-canvas');
      }
    }
  }, [dom, isRoot, isCanvas]);

  const classNames = cx('user-component', {
    'is-enabled-component': isEditorEnabled,
    'is-hovered-component': isHovered,
    'is-selected-component': isSelected
  });

  return (
    <>
      {isRoot || isCanvas ? render : (
        <div className={classNames} data-component-name={name}>
          {render}
        </div>
      )}
    </>
  );
};

export default RenderNode;
