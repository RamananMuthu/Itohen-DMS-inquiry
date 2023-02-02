import React, { Fragment, useState, useEffect } from "react";
import {
  Form,
  Label,
  Card,
  CardBody,
  Col,
  Row,
  Input,
  FormGroup,
  Container,
} from "reactstrap";
import axios from "axios";
import {
  getLoginCompanyId,
  getWorkspaceId,
  getLoginUserId,
  getWorkspaceType,
} from "../../../Constant/LoginConstant";
import Swal from "sweetalert2";
import { Breadcrumbs } from "../../../AbstractElements";
import { useTranslation } from "react-i18next";
import { ServerUrl } from "../../../Constant";
import Rating from "react-rating";

const FeedbackFormInquiry = () => {
  const [ratingLowestPrice, setRatingLowestPrice] = useState();
  const [ratingCommunication, setRatingCommunication] = useState();
  const [ratingOnTimeDelivery, setRatingOnTimeDelivery] = useState();
  const [ratingLessQuantityIssues, setRatingLessQuantityIssues] = useState();
  const [ratingVBRelationship, setRatingVBRelationship] = useState();
  const [ratingGoodSell, setRatingGoodSell] = useState();
  const [ratingOnTimeSampleSubmit, setRatingOnTimeSampleSubmit] = useState();
  const [ratingCollabrative, setRatingCollabrative] = useState();

  const [inquiryIds, setInquiryIds] = useState([]);
  const [inquiryID, setInquiryID] = useState("");
  const [factory, setFactory] = useState("");
  const [factoriesListData, setFactoriesListData] = useState([]);
  const [lowestPriceComment, setLowestPriceComment] = useState("");
  const [effiCommunicationComment, setEffiCommunicationComment] = useState("");
  const [onTimeDeliveryComment, setOnTimeDeliveryComment] = useState("");
  const [lessQuantityComment, setLessQuantityComment] = useState("");
  const [vbRelationshipComment, setVbRelationshipComment] = useState("");
  const [goodSellComment, setGoodSellComment] = useState("");
  const [onTimeSampleSubmitComment, setOnTimeSampleSubmitComment] =
    useState("");
  const [collabrativeComment, setCollabrativeComment] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);

  const { t } = useTranslation();

  var getInputParams = {};
  getInputParams["company_id"] = getLoginCompanyId;
  getInputParams["workspace_id"] = getWorkspaceId;
  getInputParams["user_id"] = getLoginUserId;

  useEffect(() => {
    if (
      getWorkspaceType == "Buyer" ||
      (getWorkspaceType == "PCU" && getWorkspaceType != "Factory")
    ) {
      setInquiryID(() => "");
      setFactory(() => "");
      setFactoriesListData(() => "");

      axios
        .post(ServerUrl + "/get-buyer-inquiry-list", getInputParams)
        .then((response) => {
          // response.data = apidecrypt(response.data);
          setInquiryIds(response.data.data);
        });
    } else {
      window.location.href = "/inquiry/factoryviewinquiry";
    }
  }, []);

  const factoryCall = (id) => {
    var getInquiryId = {};
    getInquiryId["inquiry_id"] = id;

    axios
      .post(ServerUrl + "/get-inquiry-factory-list", getInquiryId)
      .then((response) => {
        // response.data = apidecrypt(response.data);
        if (response.data.data.length == 0) {
          setBtnStatus(true);

          setFactoriesListData(() => "");
          setFactory(() => "");

          setRatingLowestPrice(() => "");
          setRatingCommunication(() => "");
          setRatingOnTimeDelivery(() => "");
          setRatingLessQuantityIssues(() => "");
          setRatingVBRelationship(() => "");
          setRatingGoodSell(() => "");
          setRatingOnTimeSampleSubmit(() => "");
          setRatingCollabrative(() => "");

          setLowestPriceComment(() => "");
          setEffiCommunicationComment(() => "");
          setOnTimeDeliveryComment(() => "");
          setFactoriesListData(() => "");
          setLessQuantityComment(() => "");
          setVbRelationshipComment(() => "");
          setGoodSellComment(() => "");
          setOnTimeSampleSubmitComment(() => "");
          setCollabrativeComment(() => "");
        } else {
          setFactoriesListData(response.data.data);
        }
      });
  };

  const feedbackFormDataApiCall = (factoryId) => {
    var feedbackFormDataInputParams = {};
    feedbackFormDataInputParams["inquiry_id"] = inquiryID;
    feedbackFormDataInputParams["factory_id"] = factoryId;

    axios
      .post(ServerUrl + "/check-factory-feedback", feedbackFormDataInputParams)
      .then((response) => {
        // response.data = apidecrypt(response.data);
        if (response.data.status_code == 201) {
          if (response.data.data.length > 0) {
            setBtnStatus(true);

            setRatingLowestPrice(response.data.data[0].lowest_price);
            setRatingCommunication(
              response.data.data[0].collaborative_approach
            );
            setRatingOnTimeDelivery(response.data.data[0].ontime_delivery);
            setRatingLessQuantityIssues(
              response.data.data[0].less_quality_issue
            );
            setRatingVBRelationship(
              response.data.data[0].vendor_buyer_relation
            );
            setRatingGoodSell(response.data.data[0].good_sell_through);
            setRatingOnTimeSampleSubmit(
              response.data.data[0].sample_submission
            );
            setRatingCollabrative(response.data.data[0].collaborative_approach);

            setLowestPriceComment(response.data.data[0].lowest_price_comments);
            setEffiCommunicationComment(
              response.data.data[0].communication_comments
            );
            setOnTimeDeliveryComment(
              response.data.data[0].ontime_delivery_comments
            );
            setLessQuantityComment(
              response.data.data[0].less_quality_issue_comments
            );
            setVbRelationshipComment(
              response.data.data[0].vendor_buyer_relation_comments
            );
            setGoodSellComment(
              response.data.data[0].good_sell_through_comments
            );
            setOnTimeSampleSubmitComment(
              response.data.data[0].sample_submission_comments
            );
            setCollabrativeComment(
              response.data.data[0].collaborative_approach_comments
            );
          } else {
            setBtnStatus(false);

            setRatingLowestPrice(() => "");
            setRatingCommunication(() => "");
            setRatingOnTimeDelivery(() => "");
            setRatingLessQuantityIssues(() => "");
            setRatingVBRelationship(() => "");
            setRatingGoodSell(() => "");
            setRatingOnTimeSampleSubmit(() => "");
            setRatingCollabrative(() => "");

            setLowestPriceComment(() => "");
            setEffiCommunicationComment(() => "");
            setOnTimeDeliveryComment(() => "");
            setFactoriesListData(() => "");
            setLessQuantityComment(() => "");
            setVbRelationshipComment(() => "");
            setGoodSellComment(() => "");
            setOnTimeSampleSubmitComment(() => "");
            setCollabrativeComment(() => "");
          }
        } else if (response.data.status_code == 200) {
          setBtnStatus(false);

          setRatingLowestPrice(() => "");
          setRatingCommunication(() => "");
          setRatingOnTimeDelivery(() => "");
          setRatingLessQuantityIssues(() => "");
          setRatingVBRelationship(() => "");
          setRatingGoodSell(() => "");
          setRatingOnTimeSampleSubmit(() => "");
          setRatingCollabrative(() => "");

          setLowestPriceComment(() => "");
          setEffiCommunicationComment(() => "");
          setOnTimeDeliveryComment(() => "");
          setLessQuantityComment(() => "");
          setVbRelationshipComment(() => "");
          setGoodSellComment(() => "");
          setOnTimeSampleSubmitComment(() => "");
          setCollabrativeComment(() => "");
        }
      });
  };

  const onSaveHandle = (e) => {
    var feedbackInputParams = {};

    feedbackInputParams["company_id"] = getLoginCompanyId;
    feedbackInputParams["workspace_id"] = getWorkspaceId;
    feedbackInputParams["user_id"] = getLoginUserId;

    feedbackInputParams["inquiry_id"] = inquiryID;
    feedbackInputParams["factory_id"] = factory;

    feedbackInputParams["lowest_price"] = ratingLowestPrice;
    feedbackInputParams["lowest_price_comments"] = lowestPriceComment;

    feedbackInputParams["communication"] = ratingCommunication;
    feedbackInputParams["communication_comments"] = effiCommunicationComment;

    feedbackInputParams["ontime_delivery"] = ratingOnTimeDelivery;
    feedbackInputParams["ontime_delivery_comments"] = onTimeDeliveryComment;

    feedbackInputParams["less_quality_issue"] = ratingLessQuantityIssues;
    feedbackInputParams["less_quality_issue_comments"] = lessQuantityComment;

    feedbackInputParams["vendor_buyer_relation"] = ratingVBRelationship;
    feedbackInputParams["vendor_buyer_relation_comments"] =
      vbRelationshipComment;

    feedbackInputParams["good_sell_through"] = ratingGoodSell;
    feedbackInputParams["good_sell_through_comments"] = goodSellComment;

    feedbackInputParams["sample_submission"] = ratingOnTimeSampleSubmit;
    feedbackInputParams["sample_submission_comments"] =
      onTimeSampleSubmitComment;

    feedbackInputParams["collaborative_approach"] = ratingCollabrative;
    feedbackInputParams["ollaborative_approach_comments"] = collabrativeComment;

    if (
      ratingLowestPrice == "" ||
      lowestPriceComment == "" ||
      ratingCommunication == "" ||
      effiCommunicationComment == "" ||
      ratingOnTimeDelivery == "" ||
      onTimeDeliveryComment == "" ||
      ratingLessQuantityIssues == "" ||
      lessQuantityComment == "" ||
      ratingVBRelationship == "" ||
      vbRelationshipComment == "" ||
      ratingGoodSell == "" ||
      goodSellComment == "" ||
      ratingOnTimeSampleSubmit == "" ||
      onTimeSampleSubmitComment == "" ||
      ratingCollabrative == "" ||
      collabrativeComment == ""
    ) {
      Swal.fire({
        title: " Please Complete the Feedback ",
        text: "Incomplete Data",
        icon: "warning",
        allowOutsideClick: false,
        timer: 2500,
      });
    } else {
      /*--------------- API CALL [ save-factory-feedback ] --------------- */
      axios
        .post(ServerUrl + "/save-factory-feedback", feedbackInputParams)
        .then((response) => {
          if (response.data.status_code == 200) {
            Swal.fire({
              title: t(response.data.message),
              // text: t(response.data.message),
              icon: "success",
              button: t("okLabel"),
              allowOutsideClick: false,
              timer: 2000,
            }).then((result) => {
              window.location.reload();
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        });
    }
  };

  return (
    <Fragment>
      <Row className="pgbgcolor">
        <Breadcrumbs
          mainTitle={t("feedBack")}
          parent="Inquiry"
          title="Inquiry"
        />
      </Row>
      <Container fluid={true} className="general-widget topaln">
        <Col md="12" sm="12" lg="12">
          <Card>
            <CardBody>
              <Form>
                <Col lg="12">
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>
                          {t("inquiryId")}
                        </Label>
                        <Input
                          className=""
                          name="Inquiry Id"
                          type="select"
                          defaultValue=""
                          onChange={(e) => {
                            setInquiryID(e.target.value),
                              factoryCall(e.target.value);
                          }}
                        >
                          <option value="" disabled>
                            {" "}
                            {t("selectInquiryId")}{" "}
                          </option>
                          {inquiryIds.map((inqryId) => (
                            <option value={inqryId.id}>
                              {"IN-" +
                                inqryId.id +
                                "(" +
                                inqryId.style_no +
                                ")"}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>
                          {" "}
                          {t("factory")}
                        </Label>
                        <Input
                          className=""
                          name="Factory"
                          placeholder="Select Factory"
                          type="select"
                          onChange={(e) => {
                            setFactory(e.target.value);
                            feedbackFormDataApiCall(e.target.value);
                          }}
                        >
                          <option value="" selected disabled>
                            {t("selectFactory")}
                          </option>
                          {factoriesListData.length > 0
                            ? factoriesListData.map((factry) => (
                                <option value={factry.id}>
                                  {factry.factory}
                                </option>
                              ))
                            : ""}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col lg="12">
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>
                          {t("lowestPrice")}
                        </Label>
                        <Row className="mb-2">
                          <Rating
                            readonly={btnStatus}
                            className="starColor"
                            initialRating={ratingLowestPrice}
                            emptySymbol={"fa fa-star-o fa-2x"}
                            fullSymbol="fa fa-star fa-2x"
                            onChange={(rate) => setRatingLowestPrice(rate)}
                          ></Rating>
                        </Row>
                        <Input
                          disabled={btnStatus}
                          className=""
                          placeholder="Comments"
                          defaultValue={lowestPriceComment}
                          onChange={(e) =>
                            setLowestPriceComment(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>
                          {t("effiCommunication")}
                        </Label>
                        <Row className="mb-2">
                          <Rating
                            readonly={btnStatus}
                            className="starColor"
                            initialRating={ratingCommunication}
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            onChange={(rate) => setRatingCommunication(rate)}
                          ></Rating>
                        </Row>
                        <Input
                          disabled={btnStatus}
                          className=""
                          placeholder="Comments"
                          defaultValue={effiCommunicationComment}
                          onChange={(e) =>
                            setEffiCommunicationComment(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col lg="12">
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>
                          {t("reliableTimeDelivery")}
                        </Label>
                        <Row className="mb-2">
                          <Rating
                            readonly={btnStatus}
                            className="starColor"
                            initialRating={ratingOnTimeDelivery}
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            onChange={(rate) => setRatingOnTimeDelivery(rate)}
                          ></Rating>
                        </Row>
                        <Input
                          disabled={btnStatus}
                          className=""
                          name="on Time"
                          placeholder="Comments"
                          defaultValue={onTimeDeliveryComment}
                          onChange={(e) =>
                            setOnTimeDeliveryComment(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>
                          {t("lessQuantityIssues")}
                        </Label>
                        <Row className="mb-2">
                          <Rating
                            readonly={btnStatus}
                            className="starColor"
                            initialRating={ratingLessQuantityIssues}
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            onChange={(rate) =>
                              setRatingLessQuantityIssues(rate)
                            }
                          ></Rating>
                        </Row>
                        <Input
                          disabled={btnStatus}
                          className=""
                          placeholder="Comments"
                          defaultValue={lessQuantityComment}
                          onChange={(e) =>
                            setLessQuantityComment(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col lg="12">
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>
                          {t("vbRelations")}
                        </Label>
                        <Row className="mb-2">
                          <Rating
                            readonly={btnStatus}
                            className="starColor"
                            initialRating={ratingVBRelationship}
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            onChange={(rate) => setRatingVBRelationship(rate)}
                          ></Rating>
                        </Row>
                        <Input
                          disabled={btnStatus}
                          className=""
                          name="on Time"
                          placeholder="Comments"
                          defaultValue={vbRelationshipComment}
                          onChange={(e) =>
                            setVbRelationshipComment(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>
                          {t("goodSell")}
                        </Label>
                        <Row className="mb-2">
                          <Rating
                            readonly={btnStatus}
                            className="starColor"
                            initialRating={ratingGoodSell}
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            onChange={(rate) => setRatingGoodSell(rate)}
                          ></Rating>
                        </Row>
                        <Input
                          disabled={btnStatus}
                          className=""
                          placeholder="Comments"
                          defaultValue={goodSellComment}
                          onChange={(e) => setGoodSellComment(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col lg="12">
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>
                          {t("onTimeSampleSub")}
                        </Label>
                        <Row className="mb-2">
                          <Rating
                            readonly={btnStatus}
                            className="starColor"
                            initialRating={ratingOnTimeSampleSubmit}
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            onChange={(rate) =>
                              setRatingOnTimeSampleSubmit(rate)
                            }
                          ></Rating>
                        </Row>
                        <Input
                          disabled={btnStatus}
                          className=""
                          name="on Time"
                          placeholder="Comments"
                          defaultValue={onTimeSampleSubmitComment}
                          onChange={(e) =>
                            setOnTimeSampleSubmitComment(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>
                          {t("collabApproach")}
                        </Label>
                        <Row className="mb-2">
                          <Rating
                            readonly={btnStatus}
                            className="starColor"
                            initialRating={ratingCollabrative}
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            onChange={(rate) => setRatingCollabrative(rate)}
                          ></Rating>
                        </Row>
                        <Input
                          disabled={btnStatus}
                          className=""
                          placeholder="Comments"
                          defaultValue={collabrativeComment}
                          onChange={(e) =>
                            setCollabrativeComment(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col lg="12" className="mt-20">
                  <Row className="mt-20">
                    <FormGroup>
                      <button
                        disabled={btnStatus}
                        type="button"
                        className="btn"
                        style={{ backgroundColor: "#4F90DE", color: "#FFFFFF" }}
                        onClick={() => {
                          onSaveHandle();
                        }}
                      >
                        {t("saveFeedback")}
                      </button>
                      {/* <Button className="btn"   onClick= {() => onSaveHandle()} > Save FeedBack </Button>  */}
                    </FormGroup>
                  </Row>
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </Fragment>
  );
};

export default FeedbackFormInquiry;
