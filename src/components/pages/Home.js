import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTables, getAllTables } from '../../redux/tablesRedux';
import Table from '../features/Table';
import { Row, Col } from "react-bootstrap";
import Loader from '../features/Loader';

const Home = ({ id, status, peopleAmount, maxPeopleAmount, tableNumber, bill }) => {

    const dispatch = useDispatch();
    const tables = useSelector(getAllTables);
    const isLoading = useSelector((state) => state.loading);

    useEffect(() => {
        dispatch(fetchTables());
    }, [dispatch]);

    const sortedTables = tables.sort((a, b) => a.tableNumber - b.tableNumber);

    return (
        <>
        <Row>
            <Col>
                <h1> All tables </h1>
            </Col>
        </Row>
        {isLoading ? (
            <Loader />
        ) : (
            sortedTables.map((table) => <Table key={table.id} {...table} />)
        )}
    </>
    );
};
export default Home;