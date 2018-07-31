import React, {Component} from 'react';
import {NavLink, Route, withRouter} from 'react-router-dom'
import FontAwesome from "react-fontawesome";
import { Card, CardText, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, Row} from "reactstrap";
import HomePage from "../pages/HomePage";
import {connect} from "react-redux";
import {environment, getConnections} from "../api";
import {environmentsAdd, connectionsAdd, actions,connectionToggle} from "../reducers/actions";
import {connectionStore} from "../reducers/app";

class Connection extends Component {
    state = {
        toggle: false,
        name: "",
        pristine:true
    };

    componentWillMount() {
        const {environments, listOfConnections} = this.props;

        if(typeof listOfConnections!=="undefined")
            this.fetchConnections();
    }

    fetchConnections = () => {
        getConnections().then((data) => {
            this.props.dispatch(connectionsAdd(data));
        });
        // environment().then((data) => {
        //     this.props.dispatch(environmentsAdd(data));
        // });
    };

    toggle = () => {
        this.setState((prevState) => ({toggle: !prevState.toggle}));
    };

    onClickItemHandle(uuid,name) {
        console.log(uuid);
        this.props.dispatch(connectionToggle(uuid,name));
        this.setState((prevState) => ({name: name,pristine:false}));

    }

    render() {
        const {environments, listOfConnections,currentDaemon} = this.props;
        const {toggle, name,pristine} = this.state;
        return (
            <Row className="h-100 bg-dark">
                <Col className="mt-2">
                    {(listOfConnections !== undefined && Object.keys(listOfConnections).length > 0) &&
                    <Dropdown isOpen={toggle} toggle={this.toggle}>
                        <DropdownToggle caret>
                            {pristine?currentDaemon:name}
                        </DropdownToggle>
                        <DropdownMenu>
                            {Object.entries(listOfConnections).map((i, index) => {
                                    return (<div className="connection">
                                        <DropdownItem key={index} onClick={() => this.onClickItemHandle(i[0],i[1].name)}
                                        >{i[1].name}</DropdownItem>
                                        <div className="legend">
                                            <Card key={`card-${index}`} body outline color="info" className="pl-2">
                                                <CardTitle>{i[1].name}</CardTitle>
                                                <CardText>UUID: {i[0]}</CardText>
                                                <CardText>address: {i[1].Address}</CardText>
                                                {(i[1].WithTls !== null) &&
                                                <CardText>With Tls properties</CardText> &&
                                                <CardText>Certificate path: {i[1].WithTls.DockerCertPath}</CardText> &&
                                                <CardText>docker configuration: {i[1].WithTls.DockerConfig}</CardText> &&
                                                <CardText>TLS verify: {i[1].WithTls.DockerTLSVerify}</CardText>
                                                }
                                            </Card>
                                        </div>
                                    </div>)
                                }
                            )}
                        </DropdownMenu>
                    </Dropdown>}
                    <Nav className="nav flex-column pt-2">
                        <NavItem key="home">
                            <NavLink to="/"><FontAwesome name="home" className="pr-2"/>Home</NavLink>
                        </NavItem>
                        <NavItem key="environments">
                            <NavLink to="/environments"><FontAwesome name="server" className="pr-2"/>Environments</NavLink>
                        </NavItem>
                        <NavItem key="others">
                            <NavLink to="/others"><FontAwesome name="fw" className="pr-4"/>Others</NavLink>
                        </NavItem>
                        <NavItem>
                            <hr color="#fff"></hr>
                        </NavItem>
                        <NavItem>
                            <h5>Environments</h5>
                        </NavItem>
                        {(environments !== undefined && Object.keys(environments).length > 0) && Object.values(environments).map((environment, index) =>
                            <NavItem key={index}>
                                <NavLink
                                    to={`/environment:${environment.services[0].id}`}>
                                    {environment.services[0].labels["com.docker.compose.project"]}
                                </NavLink>
                            </NavItem>)
                        }
                    </Nav>
                </Col>
            </Row>
        );
    }
}

export default connect((state) => {
    const {environments, listOfConnections} = state.dashStore;
    const {currentDaemon} = state.connectionStore;
    return {
        environments,
        listOfConnections,
        currentDaemon
    }
})(Connection);
