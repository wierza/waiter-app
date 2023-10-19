import { Row, Col, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getTableById, editTableRequest, fetchTables } from "../../redux/tablesRedux";
import { useState, useEffect } from "react";


const SingleTable = () => {

    const { id } = useParams();
    
    const tableData = useSelector((state) => getTableById(state, id));

    const [status, setStatus] = useState("Free");
    const [peopleAmount, setPeopleAmount] = useState(0);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(1);
    const [bill, setBill] = useState(0);

    useEffect(() => {
        if (tableData) {
            setStatus(tableData.status);
            setPeopleAmount(tableData.peopleAmount);
            setMaxPeopleAmount(tableData.maxPeopleAmount);
            setBill(tableData.bill);
        }
    }, [tableData]);

    const dispatch = useDispatch();
    useEffect(() => dispatch(fetchTables()), [dispatch]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            editTableRequest({
                id,
                status,
                peopleAmount,
                maxPeopleAmount,
                bill
            })
        );
        navigate('/');
    };

    const handlePeopleAmountChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= maxPeopleAmount) {
            setPeopleAmount(value);
        }
    };

    const handleMaxPeopleAmountChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value >= peopleAmount) {
            setMaxPeopleAmount(value);
        }
    };

    const handleBillChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0) {
            setBill(value);
        } else {
            setBill(0);
        }
    };

    const renderBillField = () => {
        if (status === "Busy") {
            return (
                <Form.Group as={Row} className={"mb-3"}>
                    <Form.Label column sm={1}>
                        <strong> Bill: </strong>
                    </Form.Label>
                    <Col sm={2}>
                        <Row>
                            <Col sm={1}> $ </Col>
                            <Col sm={6}>
                                <Form.Control
                                    type="number"
                                    value={bill}
                                    onChange={handleBillChange}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Form.Group>
            );
        }
        return null;
    };

    return (
        <>
            <h2>Table {id}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className={"mb-3"}>
                    <Form.Label as='legend' column sm={1}>
                        <strong> Status: </strong>
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                            <option value='Busy'> Busy </option>
                            <option value='Free'> Free </option>
                            <option value='Cleaning'> Cleaning </option>
                            <option value='Reserved'> Reserved </option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={"mb-3"}>
                    <Form.Label column sm={1}>
                        <strong> People: </strong>
                    </Form.Label>
                    <Col sm={1}>
                        <Form.Control type='number'
                            value={peopleAmount}
                            onChange={handlePeopleAmountChange}
                        />
                    </Col>
                    <Col sm={1}> / </Col>
                    <Col sm={1}>
                        <Form.Control type='number'
                            value={maxPeopleAmount}
                            onChange={handleMaxPeopleAmountChange}
                        />
                    </Col>
                </Form.Group>

                {renderBillField()}

                <Form.Group as={Row} className={"mb-3"}>
                    <Col>
                        <Button type='submit' variant='primary'> Update </Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
};

export default SingleTable;