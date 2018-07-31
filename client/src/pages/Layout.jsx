import React from "react"
import {Button, Col, Container, Nav, Navbar, NavbarBrand, NavItem, Row} from "reactstrap";
import Connection from "../components/Connection";
import {Redirect, Route, Switch} from "react-router-dom";
import GetAllPage from "./GetAllPage";
import EnvironmentsPage from "./EnvironmentsPage";
import InstanceDetailsPage from "./InstanceDetailsPage";
import InstancesPage from "./InstancesPage";
import ConnectionPage from "./ConnectionPage";

class Layout extends React.Component {
    render() {
        return <Container fluid>
            <Row className="h-100 ml-1">
                <Col md={2} className="bg-dark mh-100">
                <Connection key="connection" />
                </Col>
                <Col md={10}>
                    <Row>
                        <Col id="content" className="h-100 mt-5" md={12}>
                            <Switch>
                                <Route path="/others" name="others" component={InstancesPage}/>
                                <Route path="/connection" name="connection" component={ConnectionPage}/>
                                <Route path="/environments" name="environments" component={EnvironmentsPage}/>
                                <Route path="/instance:id" name="instance" component={InstanceDetailsPage}/>
                                <Route name="Home" component={GetAllPage}/>
                            </Switch>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Container>
    }
}

export default Layout