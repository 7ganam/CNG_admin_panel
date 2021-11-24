import React from 'react'
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './HomePageComponent.css'
import NewCarFormComponent from './NewCarFormComponent/NewCarFormComponent';
import { useHttpClient } from '../hooks/useHttpClient'
import { useEffect, useCallback, useState } from 'react';

import TableComponent from './TableComponent/TableComponent';
import CircularProgress from '@material-ui/core/CircularProgress';

function createData(name, calories, fat, carbs, protein) { return { name, calories, fat, carbs, protein }; }

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function HomePageComponent() {

    const maintainance_period = 30; // max time for maintainance gap in days TODO: fetch this value from the db



    const { isLoading: CarsIsLoading, error: CarsError, sendRequest: sendCarsRequest, clearError: clearCarsError } = useHttpClient();
    const [LoadedCars, setLoadedCars] = useState([]);
    const [PostedCar, setPostedCar] = useState(null);

    const fetchCars = useCallback(
        async () => {
            try {
                const responseData = await sendCarsRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/v1/cars`
                );
                setLoadedCars(responseData);
                console.log('fetched_Cars ', responseData)
            } catch (err) {
                console.log({ err })
            }
        },
        [sendCarsRequest],
    );


    useEffect(() => {
        fetchCars()
    }, [PostedCar])


    return (
        <div style={{}}>
            <div>
                <Container fluid style={{ marginTop: '50px', paddingTop: '100px' }}>
                    <Row>
                        <Col xs="12" md="4">
                            <div style={{ margin: '20px' }}>

                                <NewCarFormComponent setPostedCar={setPostedCar} />

                            </div>
                        </Col>

                        <Col xs="auto" md="8" >
                            <div style={{ margin: '20px' }}>
                                {CarsIsLoading || !LoadedCars?.data?.length > 0 ?
                                    <CircularProgress />
                                    :
                                    <TableComponent rows={LoadedCars.data} maintainance_period={maintainance_period} />
                                }
                            </div>
                        </Col>
                    </Row>

                </Container>

            </div>



        </div >
    )
}

export default HomePageComponent
