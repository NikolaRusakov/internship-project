import React, {Component, Fragment} from 'react'
import InstanceCard from "./InstanceCard";
import Loader from './Loader'
import {
    Col, DropdownItem, DropdownToggle, Row, DropdownMenu,
} from "reactstrap";
import PropTypes from 'prop-types'
import {environmentStop, environmentRestart, environmentStart} from "../api";
import classNames from "classnames"
import {UncontrolledButtonDropdown} from "reactstrap/lib/Uncontrolled";
import {connect} from "react-redux";

const propTypes = {
    name: PropTypes.string,
    instances: PropTypes.array,
    fetchAll: PropTypes.func

};


class EnvironmentCard extends React.Component {
    state = {
        toggle: false,
        loading: false,
        dropdownOpen: false,
    };

    setLoading = (status) => {
        this.setState({loading: status});
    };

    handleStop = (daemon,id) => {
        this.setLoading(true);
        environmentStop(daemon,id).then(() => {
            this.setLoading(false);
            // this.props.fetchAll()
        });

    };

    handleStart = (daemon,id) => {
        this.setLoading(true);
        environmentStart(daemon,id).then(() => {
            this.setLoading(false);
            // this.props.fetchAll()
        });
    };

    handleRestart = (daemon,id) => {
        this.setLoading(true);
        environmentRestart(daemon,id).then(() => {
            this.setLoading(false);
            // this.props.fetchAll()
        });
    };

    toggle = () => {
        this.setState((prevState) => ({toggle: !prevState.toggle}));
    };

    render() {
        const {instances, noDropdown, name,currentDaemon} = this.props;
        if (!instances) {
            return <Loader/>

        }
        const label = instances[0]&&instances[0].labels["com.docker.compose.project"] || name;
        const columns = instances && instances.length >= 3;
        return (
            <Fragment>
                <Row>
                    {!noDropdown && <Col xs={"auto"} className={"pr-0"}>
                        {!this.state.loading ? <UncontrolledButtonDropdown className="mt-1">
                                <DropdownToggle caret color="default">
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => this.handleStart(currentDaemon,label)}>Start</DropdownItem>
                                    <DropdownItem onClick={() => this.handleStop(currentDaemon,label)}>Stop</DropdownItem>
                                    <DropdownItem onClick={() => this.handleRestart(currentDaemon,label)}>Restart</DropdownItem>
                                    {/*<DropdownItem onClick={() => this.handleDelete(label)}>Delete</DropdownItem>*/}
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                            : <Loader/>
                        }
                    </Col>}
                    <Col><h2>{label}</h2></Col>
                </Row>
                <Row className={"pb-3"}>
                    <Col className={classNames({"card-columns":columns})}>
                        {columns ? instances.map((item, index) => <InstanceCard
                            statusColor={status}
                            header={item.name}
                            mainText={item.image}
                            status={item.status}
                            instanceId={item.id}
                            fetchAll={this.props.fetchAll}
                        />) : <Row>
                            {instances && instances.map((item, index) => <Col key={index} md={4}>
                                <InstanceCard
                                    statusColor={status}
                                    header={item.name}
                                    mainText={item.image}
                                    status={item.status}
                                    instanceId={item.id}
                                    fetchAll={this.props.fetchAll}
                                />
                            </Col>)}
                        </Row>}
                    </Col>
                </Row>
            </Fragment>)

    }
}

EnvironmentCard.propTypes = propTypes;

// export default EnvironmentCard;
export default connect((state) => {
    const{currentDaemon}=state.connectionStore;
    return {
        currentDaemon
    }
})(EnvironmentCard);