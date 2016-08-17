import React, { PropTypes, Component } from 'react';
import styles from './Example.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/styles';

export default class Example extends Component {
  render() {
    const { title, code, description, children } = this.props;
    return (
      <div className="container">
        <div className={styles.example}>
          <h1>{title}</h1>
          <div className={styles.row}>
            <div className={styles.description}>
              {
                description ? (
                  <div style={{paddingBottom: 10}}>
                    {description}
                  </div>
                ) : null
              }

              <div>{children}</div>
            </div>
            <div>
              <SyntaxHighlighter
                language='javascript'
                style={vs}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Example.propTypes = {
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  description: PropTypes.string
};