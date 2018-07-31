import {Col, FormFeedback, FormGroup, FormText, Input} from "reactstrap";
import {Field} from "redux-form";
import React from "react";

class FormField extends React.Component {

    state = {
        valid: "",
    };
    // componentWillReceiveProps(nextProps) {
    //     this.setState({valid: nextProps.validation});
    // }

    setValidation = (event) => {
        this.setState({valid: this.normalizeTLS(event.target.value)});
    }
    normalizeTLS = (input) => {
        // console.log(input);
        const norm = new RegExp("^[0-1]{1}$"); //new RegExp("^.{1}$")
        // console.log(norm.test(input) ? input : false);
        return norm.test(input);
    };

    render() {
        const {name, component, type, placeholder, validation, size} = this.props;
        // console.log(this.props);
        console.log(this.state.valid);
        let normalizer = false;
        if (validation) {
            normalizer = true;
        }
        return (

                <Col sm={size}>
                    {/*<FormGroup row>*/}
                    <Field
                        name={name}
                        component={
                            props =>
                                <Input
                                    {...props}
                                    onChange={event => {
                                        props.input.onChange(event);
                                        // console.log(event.target.value);
                                        if (validation === true) {
                                            this.setValidation(event);
                                        }
                                    }
                                    }
                                    // valid={props.normalize}
                                />
                        }
                        type={type}
                        placeholder={placeholder}
                        // normalize={this.normalizeTLS}
                    />
                    {
                        // normalizer === true ?
                        //     (this.state.valid !==""?
                        //             (this.state.valid ? <div>
                        //                 <FormFeedback>Correct format</FormFeedback>
                        //                 <FormText>Proceed.</FormText>
                        //             </div>
                        //             :
                        //             <div>
                        //                 <FormFeedback>Oh noes! should only contain one numeral character</FormFeedback>
                        //                 <FormText>Correct the filed and proceed.</FormText>
                        //             </div>
                        //     )
                        //         : <div>
                        //             <FormFeedback>Fill field</FormFeedback>
                        //             {/*<FormText>Correct the filed and proceed.</FormText>*/}
                        //         </div>)
                        //     :<div>
                        //         <FormFeedback>Fill field</FormFeedback>
                        //         {/*<FormText>Correct the filed and proceed.</FormText>*/}
                        //     </div>
                    }
                </Col>
            // </FormGroup>
        )
    }
}

export default FormField;
