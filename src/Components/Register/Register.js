import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputName: '',
            inputEmail: '',
            inputPassword: ''
        }
    }

    onchangeInputName = (event) => {
        this.setState({ inputName: event.target.value })
    }

    onchangeInputEmail = (event) => {
        this.setState({ inputEmail: event.target.value })
    }

    onchangeInputPassword = (event) => {
        this.setState({ inputPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        const databody = {
            'name': this.state.inputName,
            'email':  this.state.inputEmail,
            'password': this.state.inputPassword
        }

        fetch('https://apifacerecognition.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(databody)
        })
        .then(response => response.json())
        .then(user => {
            this.props.onChangeRoute('home' , user);
        })
        .catch(console.log);

    }

    render() {
        const { onChangeRoute } = this.props;
        return (
            <div>
                <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                    <main className="pa4 black-80">
                        <div className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email"
                                        name="Name"
                                        id="Name"
                                        value={this.state.inputName}
                                        onChange={this.onchangeInputName} />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address"
                                        onChange={this.onchangeInputEmail}
                                        value={this.state.inputEmail}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password"
                                        onChange={this.onchangeInputPassword}
                                        value={this.state.inputPassword}
                                    />
                                </div>
                                <div className="mv3">
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" onClick={this.onSubmitSignIn} value="Register" />
                                </div>
                            </fieldset>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}


export default Register;