import React, { useState, useCallback, useEffect } from "react";
import { identity } from "ramda";
import Snudown from "snuownd";
import { withRouter } from "react-router-dom";

const interceptClicks = identity;
const parser = Snudown.getParser();

export const useEditText = ({ value: valueProp = "", isRequired = true, maxLength = 10000 } = {}) => {
  const [value, setValue] = useState(valueProp);
  let error = null;
  if (isRequired && !value.trim()) error = "this field is required";
  if (maxLength && value.length > maxLength) error = `must be less than ${maxLength} characters`;

  const onChange = useCallback(evt => {
    setValue(evt.target.value);
  }, []);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return { value, onChange, error, setValue };
};

const MarkdownBase = ({ body, html, onClick, className = "usertext-body may-blank-within md-container" }) =>
  html
    ? (
      <div
        className={className}
        onClick={onClick}
        dangerouslySetInnerHTML={{__html: html }}
      />
    ) : (
      <div className={className} onClick={onClick}>
        <div className="md" dangerouslySetInnerHTML={{__html: parser.render(body || "")}} />
      </div>
    );

export const Markdown = withRouter(interceptClicks(MarkdownBase));
