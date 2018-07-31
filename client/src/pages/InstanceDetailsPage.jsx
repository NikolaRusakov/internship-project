import React, {Component, Fragment} from 'react'
import Loader from '../components/Loader'
import {Col, Row, Table, Button} from "reactstrap";
import {instanceGet} from "../api";
import * as _ from "lodash";
import {Link} from "react-router-dom";

class InstanceDetailsPage extends Component {
    state = {
        data: {},
    }

    componentDidMount() {
        const {match} = this.props;
        this.getDetails(match.params.id.slice(1, -1));
    }

    getDetails(id) {

        // this.setLoading(true);
        instanceGet("default",id).then((data) => {
            // this.setLoading(false);
            this.setState((prevState) => ({data: data}))
        });

    }

    render() {

        const {match} = this.props;
        const {data} = this.state;

        if (!match || !data || !data.Config) {
            return <Loader/>
        }

        const {Config, id, name, created} = data;
        const envObj = Config.Env.map((i, k) => i.split('='));
        const LabelsObj = Object.entries(Config.Labels).map((i, k) => i);
        const virtualHost = envObj.filter(i => i[0] === "VIRTUAL_HOST");
        const httpsMethod = envObj.filter(i => i[0] === "HTTPS_METHOD");
        let schema;
        if (httpsMethod.length > 0 && httpsMethod[0][1] === "noredirect") {
            schema = "http";
        } else {
            schema = "https"
        }
        return (
            <Fragment>
                <Row>
                    <Col lg="12" key="details">

                        <div className="details-table p-5">
                            <Button color="link" href={serverContextPath+"/"}>Zpět</Button>
                            <Table bordered>
                                <thead>
                                <tr>
                                    <th>
                                        <h5>{name.charAt(0)==="/"?name.slice(1):name}</h5>
                                    </th>
                                    {virtualHost.length > 0 ? <th>
                                            <h5>Link to the application</h5>
                                            <Button color={"link"} target="_blank"
                                                    href={schema + "://" + virtualHost[0][1]}>
                                                {schema + "://" + virtualHost[0][1]}
                                            </Button></th>
                                        :
                                        <th></th>
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <p>ID</p>
                                    </td>
                                    <td>
                                        <p><strong>{id}</strong></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Name</p>
                                    </td>
                                    <td>
                                        <p><strong>{name}</strong></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Created</p>
                                    </td>
                                    <td>
                                        <p><strong>{created}</strong></p>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" key="table">

                        <div className="details-table p-5">
                            <Table bordered>
                                <thead>
                                <tr>
                                    <th>ENV</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    envObj.map((i => <tr>
                                            <td>{i[0]}</td>
                                            <td>{((i[0] === "VIRTUAL_HOST") ? <Button color={"link"} target="_blank"
                                                                                      href={schema + "://" + virtualHost[0][1]}>
                                                {schema + "://" + virtualHost[0][1]}
                                            </Button> : i[1])}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                                <thead>
                                <tr>
                                    <th>Labels</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    LabelsObj.map((i => <tr>
                                        <td>{i[0]}</td>
                                        <td>{i[1]}</td>
                                    </tr>))
                                }
                                </tbody>

                            </Table>
                        </div>
                    </Col>
                </Row>
            </Fragment>

        )
    }
}

export default InstanceDetailsPage;
