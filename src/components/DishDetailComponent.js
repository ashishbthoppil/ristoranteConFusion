import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />{" "}
        <CardTitle class="m-1"> {dish.name} </CardTitle>{" "}
        <CardBody>
          <p> {dish.description} </p>{" "}
        </CardBody>{" "}
      </Card>{" "}
    </div>
  );
}

function RenderComments({comments, addComment, dishId}) {
  return (
    <div className="col-12 col-md-5 m-1">
      <h3> Comments </h3>{" "}
      <p> Imagine all the eatables, living in conFusion! </p>{" "}
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>
            {" "}
            --{comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}{" "}
          </p>{" "}
          <p> {comment.comment} </p>{" "}
        </div>
      ))}{" "}
      <CommentForm dishId={dishId} addComment={addComment} />
    </div>
  );
}

function DishDetail(props) {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu"> Menu </Link>{" "}
            </BreadcrumbItem>{" "}
            <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>{" "}
          </Breadcrumb>{" "}
          <div className="col-12">
            <h3> {props.dish.name} </h3> <hr />
          </div>{" "}
          <RenderDish dish={props.dish} />{" "}
          <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />{" "}
        </div>{" "}
      </div>
    );
  } else {
    return <div> </div>;
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.name, values.message);
  }

  render() {
    return (
      <div className="col-12 col-md-9">
        <Button onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"> </span>
          Submit Comment{" "}
        </Button>{" "}
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>{" "}
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating{" "}
                </Label>{" "}
                <Col md={12}>
                  <div className="form-check p-0">
                    <Control.select
                      model=".rating"
                      name="rating"
                      id="rating"
                      className="form-control"
                    >
                      <option> 1 </option> <option> 2 </option>{" "}
                      <option> 3 </option> <option> 4 </option>{" "}
                      <option> 5 </option> <option> 6 </option>{" "}
                    </Control.select>{" "}
                  </div>{" "}
                </Col>{" "}
              </Row>{" "}
              <Row className="form-group">
                <Label htmlFor="name" md={12}>
                  Your Name{" "}
                </Label>{" "}
                <Col md={12}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />{" "}
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be less than 15 characters",
                    }}
                  />{" "}
                </Col>{" "}
              </Row>{" "}
              <Row className="form-group">
                <Label htmlFor="message" md={12}>
                  Comment{" "}
                </Label>{" "}
                <Col md={12}>
                  <Control.textarea
                    model=".message"
                    id="message"
                    name="message"
                    rows="6"
                    className="form-control"
                  />
                </Col>{" "}
              </Row>{" "}
              <Row className="form-group">
                <Col md={{ size: 5 }}>
                  <Button type="submit" color="primary">
                    Send Feedback{" "}
                  </Button>{" "}
                </Col>{" "}
              </Row>{" "}
            </LocalForm>{" "}
          </ModalBody>{" "}
        </Modal>{" "}
      </div>
    );
  }
}

export default DishDetail;
