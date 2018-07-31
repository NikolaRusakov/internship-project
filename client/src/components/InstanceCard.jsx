import React, {Component} from "react"
import PropTypes from 'prop-types'
import {
    Button, ButtonDropdown, ButtonGroup, Card, CardBlock, DropdownItem, DropdownMenu,
    DropdownToggle, UncontrolledButtonDropdown
} from 'reactstrap'
import {instanceStop, instanceRestart, instanceStart, instanceDelete, instanceGet} from '../api'
import Loader from "./Loader";
import {Link} from "react-router-dom";
import FontAwesome from "react-fontawesome"
import {connect} from "react-redux";

class InstanceCard extends Component {

    static propTypes = {
        header: PropTypes.string,
        mainText: PropTypes.string,
        smallText: PropTypes.string,
        key: PropTypes.string,
        instanceId: PropTypes.string,
        fetchAll: PropTypes.func,
    };

    static defaultProps = {
        header: '',
        mainText: '',
        smallText: '',
        status: '',
        value: "",
        variant: ""
    };

    state = {
        loading: false,
        details: [],
        showDetails: false,
        url: ""
    };


    setLoading = (status) => {
        this.setState({loading: status});
    };

    handleStop = (daemon,id) => {
        this.setLoading(true);
        instanceStop(daemon,id).then(() => {
            this.setLoading(false);
            // this.props.fetchAll()
        });

    };

    handleStart = (daemon,id) => {
        this.setLoading(true);
        instanceStart(daemon,id).then(() => {
            this.setLoading(false);
            // this.props.fetchAll()
        });
    };

    handleRestart = (daemon,id) => {
        this.setLoading(true);
        instanceRestart(daemon,id).then(() => {
            this.setLoading(false);
            // this.props.fetchAll()
        });
    };

    handleDelete = (daemon,id) => {
        this.setLoading(true);
        instanceDelete(daemon,id).then(() => {
            this.setLoading(false);
            // this.props.fetchAll()
        });
    };
    handleRedirect = (daemon,id) => {
        instanceGet(daemon,id).then((data) => {
                const {Config} = data;
                const envObj = Config.Env.map((i, k) => i.split('='));
                const httpsMethod = envObj.filter(i => i[0] === "HTTPS_METHOD");
                const virtualHost = envObj.filter(i => i[0] === "VIRTUAL_HOST");
                let schema;
                if (virtualHost.length > 0) {
                    if (httpsMethod.length > 0 && httpsMethod[0][1] === "noredirect") {
                        schema = "http";
                    } else {
                        schema = "https"
                    }
                    window.open(schema + "://" + virtualHost[0][1],"_blank");

                }
                else {
                    alert("odkaz neexistuje!");
                }
            }
        )
        ;
    };


    render() {

        const {header, mainText, key, instanceId, status,currentDaemon} = this.props;
        const {dropdownOpen, loading} = this.state;
        let color;

        if (status.indexOf("Up") !== -1) {
            color = 'success';
        }
        else if (status.indexOf("Exited") !== -1) {
            color = 'danger';
        }
        return (
            <Card className={"text-white bg-" + color}>
                <CardBlock className="card-body p-2">
                    <ButtonGroup className="float-right">
                        {!loading ? <UncontrolledButtonDropdown id={key}>
                            <DropdownToggle caret color="default">
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem> <Link to={`/instance:${instanceId}`} style={{color: 'black'}}>
                                    <div className="h6 m-0">details</div>
                                </Link> </DropdownItem>
                                <DropdownItem onClick={() => this.handleStart(currentDaemon,instanceId)}>Start</DropdownItem>
                                <DropdownItem onClick={() => this.handleStop(currentDaemon,instanceId)}>Stop</DropdownItem>
                                <DropdownItem onClick={() => this.handleRestart(currentDaemon,instanceId)}>Restart</DropdownItem>
                                {/*<DropdownItem onClick={() => this.handleDelete(currentDaemon,instanceId)}>Delete</DropdownItem>*/}
                            </DropdownMenu>
                        </UncontrolledButtonDropdown> : <Loader/>}
                    </ButtonGroup>
                    <Button color="primary" className="float-right mr-1" onClick={()=>this.handleRedirect(instanceId)}>
                        <FontAwesome name="globe"/> Odkaz
                    </Button>
                    <Link to={`/instance:${instanceId}`} style={{color: 'white'}}>
                        <div className="h6 m-0">{header.charAt(0) === "/" ? header.slice(1) : header}</div>
                    </Link>
                    <div className={"text-truncate"}>{mainText}</div>
                    <small className="text-light">{status}</small>
                </CardBlock>
            </Card>


        )
    }

}

// export default InstanceCard;
export default connect((state) => {
    const {all} = state.dashStore;
    const{currentDaemon}=state.connectionStore;
    return {
        all,
        currentDaemon
    }
})(InstanceCard);