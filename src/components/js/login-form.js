import React from 'react';
import {Link} from 'react-router-dom'
import {Field, reduxForm, focus} from 'redux-form';
import {required, nonEmpty} from '../../validators';
import Input from './input'
import {login} from '../../actions/auth'

import '../css/login-form.css';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    onDemoSubmit = () => {
        return this.props.dispatch(login('demo_account', 'password'));
    }

    // onDemoSumbit(values)

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="login-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <div className="login-form">
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>

                {error}

                <fieldset>
                    <legend>Log In</legend>
                    <label htmlFor="username"></label>
                    <Field
                        component={Input}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        validate={[required, nonEmpty]}
                    />
                    <label htmlFor="password"></label>
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        validate={[required, nonEmpty]}
                    />
                    <button className="log-in" disabled={this.props.pristine || this.props.submitting}>
                        Log in
                    </button>
                    <button className="demo-log-in" onClick={()=>this.onDemoSubmit()}>Demo</button>               
                </fieldset>
            </form>
            <p>Don't have an account yet? Sign up <Link to={'/signup'}><span className="signup-here">here</span></Link>.</p>
            </div>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);