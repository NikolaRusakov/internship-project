import React, {Component, Fragment} from 'react'
import Loader from '../components/Loader'
import {postConnection} from '../api'
import {Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label, Row} from "reactstrap";
import EnvironmentCard from "../components/EnvironmentCard";
import {connect} from "react-redux";
import {allAdd, environmentsAdd} from "../reducers/actions";
import {Field, reduxForm} from "redux-form";
import FormField from "../components/FormField";


class ConnectionPage extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        postConnection(data).then((res) => {
        });
    };

    render() {
        return (
            <Form method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">
            {/*<Form method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">*/}

                {/*<FormGroup row>*/}
                    {/*<Col sm={3}>*/}
                        {/*<Field*/}
                            {/*name="name"*/}
                            {/*component={Input}*/}
                            {/*type="text"*/}
                            {/*placeholder="enter name of connection."*/}
                            {/*// normalize={this.normalizeTLS}*/}
                            {/*// validation={false}*/}
                            {/*// size={5}*/}
                        {/*/>*/}

                        {/*<Field*/}
                            {/*name="address"*/}
                            {/*component={Input}*/}
                            {/*type="text"*/}
                            {/*placeholder="enter address of connection."*/}
                            {/*// size={5}*/}
                            {/*// validation={false}*/}
                        {/*/>*/}

                        {/*<Field*/}
                            {/*name="workdir"*/}
                            {/*component={Input}*/}
                            {/*type="text"*/}
                            {/*placeholder="enter name of working directory."*/}
                            {/*// validation={false}*/}
                            {/*// size={5}*/}
                        {/*/>*/}

                        {/*<Field*/}
                            {/*name="dockerTLSVerify"*/}
                            {/*component={Input}*/}
                            {/*type="text"*/}
                            {/*placeholder="enter value of of TLS verification."*/}
                            {/*// normalize={this.normalizeTLS}*/}
                            {/*// validation={false}*/}
                            {/*// size={5}*/}
                        {/*/>*/}
                    {/*</Col>*/}
                {/*</FormGroup>*/}


                <FormGroup row>
                    <Col sm={6}>
                        {/*<Label for="exampleEmail" sm={2}>Required</Label>*/}
                        {/*<Col sm={10}>*/}
                        {/*<Field*/}
                        {/*name="name"*/}
                        {/*component="input"*/}
                        {/*type="text"*/}
                        {/*placeholder="enter name of connection."*/}
                        {/*/>*/}
                        {/*<Field*/}
                        {/*name="address"*/}
                        {/*component="input"*/}
                        {/*type="text"*/}
                        {/*placeholder="enter address of connection."*/}
                        {/*/>*/}
                        {/*<Field*/}
                        {/*name="workdir"*/}
                        {/*component="input"*/}
                        {/*type="text"*/}
                        {/*placeholder="enter name of working directory."*/}
                        {/*/>*/}
  {/*<Field*/}
                        {/*name="dockerTLSVerify"*/}
                        {/*component="input"*/}
                        {/*type="text"*/}
                        {/*placeholder="TLS verification."*/}
                        {/*/>*/}
                        {/**/}
                        <Input type="text" name="name" placeholder="name"/>
                        <Input type="text" name="address" placeholder="address"/>
                        <Input type="text" name="workdir" placeholder="workdir"/>
                        <Input type="text" name="dockerTLSVerify" placeholder="dockerTLSVerify"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleFile" sm={2}>File</Label>
                    <Col sm={10}>
                        <Input type="file" name="file" id="exampleFile" multiple/>
                        <FormText color="muted">
                            You may select multiple files
                        </FormText>
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{size: 10, offset: 2}}>
                        <Button>Submit</Button>
                    </Col>
                </FormGroup>
            </Form>

        )
    }


}

export default reduxForm({
    form: 'certificateForm', // a unique identifier for this form
    // initialValues: {min: '1', max: '10'},
})(ConnectionPage)
// export default ConnectionPage;