import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import './NewCarFormComponent.css'
import DateView from 'react-datepicker'
import { Container, Row, Col } from 'reactstrap';

import { useHttpClient } from '../../hooks/useHttpClient'



function NewCarFormComponent(props) {


    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const submit_form = async (fields) => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/v1/cars`, 'POST', JSON.stringify(fields), { "Content-Type": "application/json" });
            console.log('responseData ', responseData)
            props.setPostedCar(responseData)
        } catch (err) {
            console.log({ err })
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    plate_no: '',
                    plate_str: '',
                    last_maintenance_date: '',
                }}
                // validationSchema={Yup.object().shape({
                //     firstName: Yup.string().required('First Name is required'),
                //     lastName: Yup.string().required('Last Name is required'),
                //     email: Yup.string().email('Email is invalid') .required('Email is required'),

                // })}
                onSubmit={fields => {
                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    submit_form(fields)
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <Card>
                            <CardHeader style={{ height: "100px", display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '22px', backgroundColor: "white" }}>Add new car to the database</CardHeader>
                            <CardBody>
                                {/* <CardTitle tag="h5">Enter plate data</CardTitle> */}
                                {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
                                <div className="plate_card_all" >
                                    <div className="plate_card_top">
                                        <div style={{ display: 'flex', height: '100%', flexDirection: 'row' }}>
                                            <div style={{ flexGrow: '1', display: 'flex', marginLeft: "20px", alignItems: 'center', fontSize: '50px' }} >
                                                EGYPT
                                            </div>
                                            <div style={{ flexGrow: '1', display: 'flex', marginLeft: "20px", alignItems: 'center', fontSize: '50px' }} >
                                                <div style={{ marginBottom: "25px", marginRight: "-60px" }}>مصر</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="plate_card_bottom">
                                        <div style={{ display: 'flex', height: '100%', flexDirection: 'row' }}>
                                            <div style={{ width: '50%', display: 'flex', alignItems: 'center', fontSize: '70px' }} >
                                                <div className="form-group">
                                                    <Field name="plate_no" type="text" className={'plate_input form-control' + (errors.plate_no && touched.plate_no ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="plate_no" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div style={{ width: '50%', display: 'flex', alignItems: 'center', fontSize: '70px' }} >
                                                <div className="form-group">
                                                    <Field name="plate_str" type="text" className={'plate_input form-control' + (errors.plate_str && touched.plate_str ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="plate_str" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <Container>

                                    <Row className="justify-content-end my-5 date_card" style={{ maxWidth: '400px', margin: '20px auto 20px auto' }}>
                                        <Col md="7" lg="12">
                                            <label className="form_text form_label">
                                                Last maintainance date
                                            </label>
                                        </Col>
                                        <Col md="5" lg="12" className="mb-3" >
                                            <Field name={`last_maintenance_date`} className="form-control in_field" >
                                                {({ form, field }) => {
                                                    const { setFieldValue } = form
                                                    const { value } = field
                                                    return (
                                                        <DateView className="form-control in_field"
                                                            style={{
                                                                textAlign: "end"
                                                            }}
                                                            id={`last_maintenance_date`}
                                                            {...field}
                                                            selected={value}
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            dateFormat="dd/MM/yyyy"
                                                            onChange={val => setFieldValue(`last_maintenance_date`, val)}
                                                        />
                                                    )
                                                }}
                                            </Field>
                                            {/* <ErrorMessage name='birth_date' component={TextError} /> */}
                                        </Col>
                                    </Row>
                                </Container>


                            </CardBody>
                            <CardFooter style={{ display: 'flex' }}>
                                <button type="submit" className='add_car_button' >Add car to databases</button>
                            </CardFooter>
                        </Card>
                    </Form>
                )}
            />
        </div>
    )
}

export default NewCarFormComponent
