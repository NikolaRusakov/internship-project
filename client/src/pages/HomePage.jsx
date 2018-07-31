import React, {Component} from 'react'
import {connect} from "react-redux";

import Connection from "../components/Connection";

class HomePage extends Component {


    render() {
        const {environments, listOfConnections} = this.props;
        return <div>BODY</div>

    }
}

export default HomePage;
