import React, {Component, Fragment} from 'react'
import Loader from '../components/Loader'
import {getAll} from '../api'
import {Col, Row} from "reactstrap";
import EnvironmentCard from "../components/EnvironmentCard";
import {connect} from "react-redux";
import {allAdd, environmentsAdd} from "../reducers/actions";


class InstancesPage extends React.Component {
    fetchAll = () => {
        getAll().then((data) => {
            this.props.dispatch(allAdd(data));
        });
    };
    componentDidMount(){
    this.fetchAll();
    }
    render() {

        const {all} = this.props;
        if (!all.others) {
            return <Loader/>
        }
        return (
            <Fragment>

                <Row> {Object.keys(all).length > 0 &&
                <Col lg="12" key="others">
                    <EnvironmentCard
                        name="others"
                        instances={all.others}
                        fetchAll={this.fetchAll}
                    />
                </Col>
                }
                </Row>
            </Fragment>

        )
    }


}

export default connect((state) => {
    const {all} = state.dashStore;
    return {
        all
    }
})(InstancesPage);