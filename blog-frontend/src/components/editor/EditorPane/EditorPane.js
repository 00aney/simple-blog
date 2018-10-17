import React, { Component } from 'react';
import styles from './EditorPane.scss';
import classnames from 'classnames/bind';

import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown'; //markdown syntax color
// code color in markdown
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

// css sytle for CodeMirror
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

const cx = classnames.bind(styles);

class EditorPane extends Component {

  editor = null // editor ref
  codeMirror = null // CodeMirror instance
  cursor = null // text cursor in editor

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true
    });
    this.codeMirror.on('change', this.handleChangeMarkdown);
  }

  componentDidMount() {
    this.initializeEditor();
  }

  handleChange = (e) => {
    const { onChangeInput } = this.props;
    const { value, name } = e.target;
    onChangeInput({name, value});
  }

  handleChangeMarkdown = (doc) => {
    const { onChangeInput } = this.props;
    this.cursor = doc.getCursor(); // current cursor
    onChangeInput({
      name: 'markdown',
      value: doc.getValue()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.markdown !== this.props.markdown) {
      const { codeMirror, cursor } = this;
      if(!codeMirror) return;
      codeMirror.setValue(this.props.markdown);
      if(!cursor) return;
      codeMirror.setCursor(cursor);
    }
  }

  render() {
    const { handleChange } = this;
    const { tags, title } = this.props;

    return (
      <div className={cx('editor-pane')}>
        <input
          className={cx('title')}
          placeholder="Input title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <div className={cx('code-editor')} ref={ref=>this.editor=ref}></div>
        <div className={cx('tags')}>
          <div className={cx('description')}>Tag</div>
          <input
            name="tags"
            placeholder="Enter tags(use , between tags)"
            value={tags}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EditorPane;