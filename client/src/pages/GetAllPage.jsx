import React, {Component, Fragment} from 'react'
import Loader from '../components/Loader'
import {getAll, getConnections} from '../api'
import {Col, Row} from "reactstrap";
import EnvironmentCard from "../components/EnvironmentCard";
import {connect} from "react-redux";
import {allAdd} from "../reducers/actions";


class GetAllPage extends React.Component {
    componentDidMount() {
        this.fetchAll();
    }

    fetchAll = () => {
        const{currentDaemon}=this.props;
        getAll(currentDaemon).then((data) => {
            this.props.dispatch(allAdd(data));
        });
    };

    render() {

        const {all} = this.props;
        if (!all) {
            return <Loader/>

        }
        return (
            <Fragment>
                {all.environments && all.environments.filter(i => i && i.services && i.services.length > 0).map((item, index) => <EnvironmentCard key={index}
                    name={item.image}
                    instances={item.services}
                    fetchAll={this.fetchAll}
                />)}
                {all.others && <EnvironmentCard
                    name="Others"
                    noDropdown
                    instances={all.others}
                    fetchAll={this.fetchAll}
                />}
            </Fragment>

        )
    }

}

export default connect((state) => {
    const {all} = state.dashStore;
    const{currentDaemon}=state.connectionStore;
    return {
        all,
        currentDaemon
    }
})(GetAllPage);