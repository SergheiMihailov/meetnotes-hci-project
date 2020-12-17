import React, { FunctionComponent } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FaLink, FaEnvelope, FaFilePdf, FaUpload } from "react-icons/fa";

const Share: FunctionComponent = () => {
  const history = useHistory();
  return (
    <div>
      <ButtonGroup style={{ width: "100%" }}>
        <Button
          variant="secondary"
          style={{ border: "1px solid white", margin: 3 }}
        >
          <FaLink />
          Copy Link
        </Button>
        <Button
          disabled
          variant="secondary"
          style={{ border: "1px solid white", margin: 3 }}
        >
          <FaEnvelope />
          Email
        </Button>
        <Button
          disabled
          variant="secondary"
          style={{ border: "1px solid white", margin: 3 }}
        >
          <FaFilePdf />
          PDF
        </Button>
        <Button
          disabled
          variant="secondary"
          style={{ border: "1px solid white", margin: 3 }}
        >
          <FaUpload />
          Export
        </Button>
      </ButtonGroup>
      <div style={{ padding: 20 }}>
        <b>Copy link: </b>
        <a
          href={window.location.href}
          style={{ backgroundColor: "#EEEEEE", borderRadius: 5, padding: 5 }}
        >
          {window.location.href}
        </a>
      </div>
    </div>
  );
};

export default Share;
