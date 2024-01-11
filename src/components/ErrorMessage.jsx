
import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div class="alert alert-danger mt-2">
      <strong>Oops!</strong> {message}
    </div>
  );
};

export default ErrorMessage;
