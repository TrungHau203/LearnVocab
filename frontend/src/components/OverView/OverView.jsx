import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

import * as icon from "../../assets/index";
import "./OverView.scss"
const OverView = ({ data,status }) => {
  console.log(data);
  return (
    <div className="overView">
      <div className="overView-img">
        <img  src={icon.overView}/>

      </div>
      <div className="limit-height">
        {data.map((data) => (
          <>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col xs={1}>
                    <div className="checkAnswer">
                    {
                      (status == "learned" &&<BsCheckCircle className="trueIcon"/>)||
                      data.review_status == "success" ? <BsCheckCircle className="trueIcon"/> : <BsXCircle className="falseIcon"/>
                    }
                      {/* <BsCheckCircle className="trueIcon"/>
                      <BsXCircle className="falseIcon"/> */}
                    </div>
                  </Col>
                  <Col>{data.content}</Col>
                  <Col xs={1}>({data.position})</Col>
                  <Col>({data.trans})</Col> 
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </>
        ))}
      </div>
    </div>
  );
};

export default OverView;
