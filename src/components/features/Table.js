import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";

import React from 'react';

const Table = ({ id, status }) => {
    

    return (
        <div>
             <Card className="mb-1">
        <Card.Body>
          <Row>
            <Col xs={6} md={2} className={"d-flex justify-content-start"}>
              <Card.Title as='h2'>
                <span className> Table </span>
                <span> {id} </span>
              </Card.Title>
            </Col>

            <Col xs={6} md={2} className={"d-flex justify-content-start"}>
              <Card.Text as='p'>
                <span><strong> Status: </strong></span>
                <span> {status} </span>
              </Card.Text>
            </Col>


            <Col className={"d-flex justify-content-end"}>
              <div>
                <Link to={"/table/" + id}>
                  <Button variant="primary"> Show more </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card >
        </div>
    )};

    export default Table;