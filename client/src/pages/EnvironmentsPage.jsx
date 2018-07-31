import React, {Component, Fragment} from 'react'
import Loader from '../components/Loader'
import {environment, getConnections} from '../api'
import {Col, Row} from "reactstrap";
import EnvironmentCard from "../components/EnvironmentCard";
import {connect} from "react-redux";
import {environmentsAdd} from "../reducers/actions";


class EnvironmentsPage extends React.Component {


    componentDidMount() {
        this.fetchEnvironments(this.props.currentDaemon);
    }

    fetchEnvironments = (daemon) => {
        environment(daemon).then((data) => {
            this.props.dispatch(environmentsAdd(data));
        });
    };

    render() {

        const {environments,currentDaemon} = this.props;
        if (!environments) {
            return <Loader/>
        }
        return (
            <Fragment>
                <Row> {Object.keys(environments).length > 0 && Object.values(environments).map((item, index) => {


                    return (<Col lg="12" key={index}>
                            <EnvironmentCard
                                name={item.image}
                                instances={item.services}
                                fetchAll={this.fetchEnvironments(currentDaemon)}
                            />
                        </Col>

                    )
                })}
                </Row>
            </Fragment>

        )
    }


}

export default connect((state) => {
    const {environments} = state.dashStore;
    const{currentDaemon}=state.connectionStore;
    return {
        environments,
        currentDaemon
    }
})(EnvironmentsPage);