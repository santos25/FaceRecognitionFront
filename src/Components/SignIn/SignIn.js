import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputEmail: '',
            inputPassword: ''
        }
    }

    onchangeInputEmail = (event) => {
        this.setState({ inputEmail: event.target.value })
    }

    onchangeInputPassword = (event) => {
        this.setState({ inputPassword: event.target.value })
    }

    onSubmitSignin = () => {
        fetch('https://apifacerecognition.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': this.state.inputEmail, 'password': this.state.inputPassword })
        })
            .then(response => response.json())
            .then(user => {
                 if(user.user_id)   
                    this.props.onChangeRoute('home', user);
            })
            .catch(console.log);
    }

    render() {
        return (
            <div>
                <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                    <main className="pa4 black-80">
                        <div className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address"
                                        value={this.state.inputEmail}
                                        onChange={this.onchangeInputEmail} />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password"
                                        value={this.state.inputPassword}
                                        onChange={this.onchangeInputPassword} />
                                </div>
                                <div className="mv3">
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                                        onClick={this.onSubmitSignin} value="Sign in" />
                                </div>
                                <div className="mv3">
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" onClick={() => this.props.onChangeRoute('register')} value="Register" />
                                </div>
                            </fieldset>
                        </div>
                    </main>
                </article>
            </div>
        );

    }

}

export default SignIn;