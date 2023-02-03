import React, { useState } from "react";
import { Offcanvas, OffcanvasBody, Card, CardHeader, Collapse, Row, Col } from "reactstrap";
import { Btn, P, H4 } from "../../../AbstractElements";
import { getLoginCompanyId, getWorkspaceId } from "../../../Constant/LoginConstant";
import { useTranslation } from 'react-i18next';
import { Accordion } from 'react-bootstrap';
import Rating from 'react-rating';

const FactoryResponseRatingModal = ({ modal, toggle, factoryRatingData }) => {
    var lowestPriceRating = 0;
    var onTimeDeliveryRating = 0;
    var collaborativeRating = 0;
    var efficientCommunicationRating = 0;
    var goodSellRating = 0;
    var lessQuantityIssuesRating = 0;
    var OnTimeSampleSubmissionRating = 0;
    var vendorBuyerRelationshipRating = 0;

    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(null);
    const toggleAccordion = (id) => (isOpen === id ? setIsOpen(null) : setIsOpen(id));
    var getInputHolidays = {}
    getInputHolidays['company_id'] = getLoginCompanyId;
    getInputHolidays['workspace_id'] = getWorkspaceId;

    return (
        <Offcanvas
            isOpen={modal} toggle={toggle}
            direction={"end"}
            className="offcanvas-width ratingModel"
            style={{
                height: '75%', width: '500px', fontSize: '12px', marginTop: '7%',
                borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px'
            }}>
            <OffcanvasBody>
                <Accordion defaultActiveKey="0" className="m-t-25 m-l-10">
                    {Object.entries(factoryRatingData).map((mapData, key) =>
                    (
                        <div className="default-according" id="accordion">
                            <Card>
                                <CardHeader id={key} onClick={() => { toggleAccordion(key) }}>
                                    <H4 attrH4={{ className: 'mb-0' }} style={{ textAlign: 'left' }} >
                                        <Btn
                                            attrBtn={{
                                                as: Card.Header, className: 'btn btn-link paddingZero width-100', color: 'default',
                                            }}>
                                            <Row>
                                                <span
                                                    style={{ textAlign: 'left' }}>
                                                    {mapData[0] == "lowest_price" ? "Lowest Price" : ""}
                                                    {mapData[0] == "collaborative_approach" ? "Collaborative Approach" : ""}
                                                    {mapData[0] == "communication" ? "Communication" : ""}
                                                    {mapData[0] == "good_sell_through" ? "Good Sell Through" : ""}
                                                    {mapData[0] == "less_quality_issue" ? "Less Quality Issue" : ""}
                                                    {mapData[0] == "ontime_delivery" ? "Ontime Delivery" : ""}
                                                    {mapData[0] == "sample_submission" ? "Sample Submission" : ""}
                                                    {mapData[0] == "vendor_buyer_relation" ? "Vendor Buyer Relation" : ""}
                                                    {mapData[0] == "no_of_orders" ? "Number Of Orders" : ""}
                                                </span>
                                            </Row>

                                            <Row style={{ textAlign: 'left' }}>
                                                {mapData[0] == "lowest_price" ?
                                                    (mapData[1]).map((mapData, index) =>
                                                    (
                                                        lowestPriceRating += mapData.rating,
                                                        (index) + 1 == factoryRatingData.no_of_orders
                                                            ?
                                                            <>
                                                                <Col md="3">
                                                                    <Rating
                                                                        readonly
                                                                        className="starColor"
                                                                        initialRating={lowestPriceRating / factoryRatingData.no_of_orders}
                                                                        emptySymbol={"fa fa-star-o fa-1x"}
                                                                        fullSymbol="fa fa-star fa-1x">
                                                                    </Rating>
                                                                </Col>
                                                                <Col md="9">
                                                                    <P>
                                                                        {(lowestPriceRating / factoryRatingData.no_of_orders).toFixed(1)} Out Of 5 ({factoryRatingData.no_of_orders} Orders)
                                                                        <span className="f-right" id={key}>
                                                                            {(isOpen == key) ?
                                                                                <i className="fa fa-angle-up"></i>
                                                                                :
                                                                                <i className="fa fa-angle-down"></i>
                                                                            }
                                                                        </span>
                                                                    </P>
                                                                </Col>
                                                            </>
                                                            :
                                                            ""))
                                                    : ""}

                                                {mapData[0] == "ontime_delivery" ?
                                                    (mapData[1]).map((mapData, index) =>
                                                    (
                                                        onTimeDeliveryRating += mapData.rating,
                                                        (index) + 1 == factoryRatingData.no_of_orders
                                                            ?
                                                            <>
                                                                <Col md="3">
                                                                    <Rating
                                                                        readonly
                                                                        className="starColor"
                                                                        initialRating={onTimeDeliveryRating / factoryRatingData.no_of_orders}
                                                                        emptySymbol={"fa fa-star-o fa-1x"}
                                                                        fullSymbol="fa fa-star fa-1x"
                                                                    >
                                                                    </Rating>
                                                                </Col>
                                                                <Col md="9">
                                                                    <P>
                                                                        {(onTimeDeliveryRating / factoryRatingData.no_of_orders).toFixed(1)} Out Of 5 (
                                                                        {factoryRatingData.no_of_orders} Orders)
                                                                        <span className="f-right" id={key}>
                                                                            {(isOpen == key) ?
                                                                                <i className="fa fa-angle-up"></i>
                                                                                :
                                                                                <i className="fa fa-angle-down"></i>
                                                                            }
                                                                        </span>
                                                                    </P>
                                                                </Col>
                                                            </>
                                                            :
                                                            ""))
                                                    : ""}

                                                {mapData[0] == "collaborative_approach" ?
                                                    (mapData[1]).map((mapData, index) =>
                                                    (
                                                        collaborativeRating += mapData.rating,
                                                        (index) + 1 == factoryRatingData.no_of_orders
                                                            ?
                                                            <>
                                                                <Col md="3">
                                                                    <Rating
                                                                        readonly
                                                                        className="starColor"
                                                                        initialRating={collaborativeRating / factoryRatingData.no_of_orders}
                                                                        emptySymbol={"fa fa-star-o fa-1x"}
                                                                        fullSymbol="fa fa-star fa-1x"
                                                                    >
                                                                    </Rating>
                                                                </Col>
                                                                <Col md="9">
                                                                    <P>
                                                                        {(collaborativeRating / factoryRatingData.no_of_orders).toFixed(1)} Out Of 5 (
                                                                        {factoryRatingData.no_of_orders} Orders)
                                                                        <span className="f-right" id={key}>
                                                                            {(isOpen == key) ?
                                                                                <i className="fa fa-angle-up"></i>
                                                                                :
                                                                                <i className="fa fa-angle-down"></i>
                                                                            }
                                                                        </span>
                                                                    </P>
                                                                </Col>
                                                            </>
                                                            :
                                                            ""))
                                                    : ""}

                                                {mapData[0] == "communication" ?
                                                    (mapData[1]).map((mapData, index) =>
                                                    (
                                                        efficientCommunicationRating += mapData.rating,
                                                        (index) + 1 == factoryRatingData.no_of_orders
                                                            ?
                                                            <>
                                                                <Col md="3">
                                                                    <Rating
                                                                        readonly
                                                                        className="starColor"
                                                                        initialRating={efficientCommunicationRating / factoryRatingData.no_of_orders}
                                                                        emptySymbol={"fa fa-star-o fa-1x"}
                                                                        fullSymbol="fa fa-star fa-1x"
                                                                    >
                                                                    </Rating>
                                                                </Col>
                                                                <Col md="9">
                                                                    <P>
                                                                        {(efficientCommunicationRating / factoryRatingData.no_of_orders).toFixed(1)} Out Of 5 (
                                                                        {factoryRatingData.no_of_orders} Orders)
                                                                        <span className="f-right" id={key}>
                                                                            {(isOpen == key) ?
                                                                                <i className="fa fa-angle-up"></i>
                                                                                :
                                                                                <i className="fa fa-angle-down"></i>
                                                                            }
                                                                        </span>
                                                                    </P>
                                                                </Col>
                                                            </>

                                                            :
                                                            ""))
                                                    : ""}

                                                {mapData[0] == "good_sell_through" ?
                                                    (mapData[1]).map((mapData, index) =>
                                                    (
                                                        goodSellRating += mapData.rating,
                                                        (index) + 1 == factoryRatingData.no_of_orders
                                                            ?
                                                            <>
                                                                <Col md="3">
                                                                    <Rating
                                                                        readonly
                                                                        className="starColor"
                                                                        initialRating={goodSellRating / factoryRatingData.no_of_orders}
                                                                        emptySymbol={"fa fa-star-o fa-1x"}
                                                                        fullSymbol="fa fa-star fa-1x"
                                                                    >
                                                                    </Rating>
                                                                </Col>
                                                                <Col md="9">
                                                                    <P>
                                                                        {(goodSellRating / factoryRatingData.no_of_orders).toFixed(1)} Out Of 5 (
                                                                        {factoryRatingData.no_of_orders} Orders)
                                                                        <span className="f-right" id={key}>
                                                                            {(isOpen == key) ?
                                                                                <i className="fa fa-angle-up"></i>
                                                                                :
                                                                                <i className="fa fa-angle-down"></i>
                                                                            }
                                                                        </span>
                                                                    </P>
                                                                </Col>
                                                            </>

                                                            :
                                                            ""))
                                                    : ""}

                                                {mapData[0] == "less_quality_issue" ?
                                                    (mapData[1]).map((mapData, index) =>
                                                    (
                                                        lessQuantityIssuesRating += mapData.rating,
                                                        (index) + 1 == factoryRatingData.no_of_orders
                                                            ?
                                                            <>
                                                                <Col md="3">
                                                                    <Rating
                                                                        readonly
                                                                        className="starColor"
                                                                        initialRating={lessQuantityIssuesRating / factoryRatingData.no_of_orders}
                                                                        emptySymbol={"fa fa-star-o fa-1x"}
                                                                        fullSymbol="fa fa-star fa-1x"
                                                                    >
                                                                    </Rating>
                                                                </Col>
                                                                <Col md="9">
                                                                    <P>
                                                                        {(lessQuantityIssuesRating / factoryRatingData.no_of_orders).toFixed(1)} Out Of 5 (
                                                                        {factoryRatingData.no_of_orders} Orders)
                                                                        <span className="f-right" id={key}>
                                                                            {(isOpen == key) ?
                                                                                <i className="fa fa-angle-up"></i>
                                                                                :
                                                                                <i className="fa fa-angle-down"></i>
                                                                            }
                                                                        </span>
                                                                    </P>
                                                                </Col>
                                                            </>

                                                            :
                                                            ""))
                                                    : ""}


                                                {mapData[0] == "sample_submission" ?
                                                    (mapData[1]).map((mapData, index) =>
                                                    (
                                                        OnTimeSampleSubmissionRating += mapData.rating,
                                                        (index) + 1 == factoryRatingData.no_of_orders
                                                            ?
                                                            <>
                                                                <Col md="3">
                                                                    <Rating
                                                                        readonly
                                                                        className="starColor"
                                                                        initialRating={OnTimeSampleSubmissionRating / factoryRatingData.no_of_orders}
                                                                        emptySymbol={"fa fa-star-o fa-1x"}
                                                                        fullSymbol="fa fa-star fa-1x"
                                                                    >
                                                                    </Rating>
                                                                </Col>
                                                                <Col md="9">
                                                                    <P>
                                                                        {(OnTimeSampleSubmissionRating / factoryRatingData.no_of_orders).toFixed(1)} Out Of 5 (
                                                                        {factoryRatingData.no_of_orders} Orders)
                                                                        <span className="f-right" id={key}>
                                                                            {(isOpen == key) ?
                                                                                <i className="fa fa-angle-up"></i>
                                                                                :
                                                                                <i className="fa fa-angle-down"></i>
                                                                            }
                                                                        </span>
                                                                    </P>
                                                                </Col>
                                                            </>

                                                            :
                                                            ""))
                                                    : ""}

                                                {mapData[0] == "vendor_buyer_relation" ?
                                                    (mapData[1]).map((mapData, index) =>
                                                    (
                                                        vendorBuyerRelationshipRating += mapData.rating,
                                                        (index) + 1 == factoryRatingData.no_of_orders
                                                            ?
                                                            <>
                                                                <Col md="3">
                                                                    <Rating
                                                                        readonly
                                                                        className="starColor"
                                                                        initialRating={vendorBuyerRelationshipRating / factoryRatingData.no_of_orders}
                                                                        emptySymbol={"fa fa-star-o fa-1x"}
                                                                        fullSymbol="fa fa-star fa-1x"
                                                                    >
                                                                    </Rating>
                                                                </Col>
                                                                <Col md="9">
                                                                    <P>
                                                                        {(vendorBuyerRelationshipRating / factoryRatingData.no_of_orders).toFixed(1)} Out Of 5 (
                                                                        {factoryRatingData.no_of_orders} Orders)
                                                                        <span className="f-right" id={key}>
                                                                            {(isOpen == key) ?
                                                                                <i className="fa fa-angle-up"></i>
                                                                                :
                                                                                <i className="fa fa-angle-down"></i>
                                                                            }
                                                                        </span>
                                                                    </P>
                                                                </Col>
                                                            </>

                                                            :
                                                            ""))
                                                    : ""}
                                            </Row>
                                        </Btn>
                                    </H4>
                                </CardHeader>
                                <Collapse isOpen={isOpen === key}>
                                    <div className="table-responsive">
                                    {mapData[0] == "no_of_orders" ? 
                                        <Col className="p-2 m-l-15 f-16 m-t-5 m-b-5">
                                            {mapData[1]}  
                                        </Col>
                                    :
                                        <table className="table shadow shadow-showcase table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="centerAlign">{t("orderId")}</th>
                                                    <th className="centerAlign">{t("styleNo")}</th>
                                                    <th className="centerAlign">{t("rating")}</th>
                                                    <th className="centerAlign">{t("comments")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (mapData[0]) == "lowest_price"
                                                        ?
                                                        (mapData[1]).map((mapData, index) =>
                                                        (
                                                            <tr>
                                                                <td >{mapData.inquiry_id}</td>
                                                                <td >{mapData.style_no}</td>
                                                                <td className="centerAlign">{mapData.rating}</td>
                                                                <td className="centerAlign">{mapData.comments}</td>
                                                            </tr>
                                                        )
                                                        )
                                                        :
                                                        ""
                                                }

                                                {(mapData[0]) == "ontime_delivery" ?
                                                    (mapData[1]).map((mapData) =>
                                                    (
                                                        <tr>
                                                            <td >{mapData.inquiry_id}</td>
                                                            <td >{mapData.style_no}</td>
                                                            <td className="centerAlign">{mapData.rating}</td>
                                                            <td className="centerAlign">{mapData.comments}</td>
                                                        </tr>
                                                    )
                                                    )
                                                    :
                                                    ""
                                                }

                                                {(mapData[0]) == "vendor_buyer_relation" ?
                                                    (mapData[1]).map((mapData) =>
                                                    (
                                                        <tr>
                                                            <td >{mapData.inquiry_id}</td>
                                                            <td >{mapData.style_no}</td>
                                                            <td className="centerAlign">{mapData.rating}</td>
                                                            <td className="centerAlign">{mapData.comments}</td>
                                                        </tr>
                                                    )
                                                    )
                                                    :
                                                    ""
                                                }

                                                {(mapData[0]) == "sample_submission" ?
                                                    (mapData[1]).map((mapData) =>
                                                    (
                                                        <tr>
                                                            <td >{mapData.inquiry_id}</td>
                                                            <td >{mapData.style_no}</td>
                                                            <td className="centerAlign">{mapData.rating}</td>
                                                            <td className="centerAlign">{mapData.comments}</td>
                                                        </tr>
                                                    )
                                                    )
                                                    :
                                                    ""
                                                }

                                                {(mapData[0]) == "communication" ?
                                                    (mapData[1]).map((mapData) =>
                                                    (
                                                        <tr>
                                                            <td >{mapData.inquiry_id}</td>
                                                            <td >{mapData.style_no}</td>
                                                            <td className="centerAlign">{mapData.rating}</td>
                                                            <td className="centerAlign">{mapData.comments}</td>
                                                        </tr>
                                                    )
                                                    )
                                                    :
                                                    ""
                                                }

                                                {(mapData[0]) == "less_quality_issue" ?
                                                    (mapData[1]).map((mapData) =>
                                                    (
                                                        <tr>
                                                            <td >{mapData.inquiry_id}</td>
                                                            <td >{mapData.style_no}</td>
                                                            <td className="centerAlign">{mapData.rating}</td>
                                                            <td className="centerAlign">{mapData.comments}</td>
                                                        </tr>
                                                    )
                                                    )
                                                    :
                                                    ""
                                                }

                                                {(mapData[0]) == "good_sell_through" ?
                                                    (mapData[1]).map((mapData) =>
                                                    (
                                                        <tr>
                                                            <td >{mapData.inquiry_id}</td>
                                                            <td >{mapData.style_no}</td>
                                                            <td className="centerAlign">{mapData.rating}</td>
                                                            <td className="centerAlign">{mapData.comments}</td>
                                                        </tr>
                                                    )
                                                    )
                                                    :
                                                    ""
                                                }

                                                {(mapData[0]) == "collaborative_approach" ?
                                                    (mapData[1]).map((mapData) =>
                                                    (
                                                        <tr>
                                                            <td >{mapData.inquiry_id}</td>
                                                            <td >{mapData.style_no}</td>
                                                            <td className="centerAlign">{mapData.rating}</td>
                                                            <td className="centerAlign">{mapData.comments}</td>
                                                        </tr>
                                                    )
                                                    )
                                                    :
                                                    ""
                                                }
                                            </tbody>
                                        </table>
                                    }
                                    </div>
                                </Collapse>
                            </Card>
                        </div>
                    ))
                    }
                </Accordion>
            </OffcanvasBody>
        </Offcanvas>
    );
};
export default FactoryResponseRatingModal;