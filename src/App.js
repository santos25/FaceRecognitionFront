import React from 'react';
import Nav from './Components/Nav/Nav';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import InputImageForm from './Components/InputImageForm/InputImageForm';
import ImageRecognition from './Components/Imagerecognition/ImageRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';




const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputImage: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {}
    }
  }

  calculateBoxingimage = (response) => {

    const data = response.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(data);
    const imageUrl = document.getElementById('inputimage');

    const box = {
      topRow: data.top_row * Number(imageUrl.height),
      rightCol: Number(imageUrl.width) - (data.right_col * Number(imageUrl.width)),
      bottomRow: Number(imageUrl.height) - (data.bottom_row * Number(imageUrl.height)),
      leftCol: data.left_col * Number(imageUrl.width)
    }

    fetch('http://apifacerecognition.herokuapp.com/image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userid : this.state.user.user_id})
    })
      .then(response => response.json())
      .then(entries => {        
        this.setState({ box , user : {...this.state.user , entries : entries}});
      })
      .catch(console.log);
  }


  onchangeInputImage = (event) => {
    this.setState({ inputImage: event.target.value })
  }

  onSubmitDetect = () => {
    this.setState({ imageUrl: this.state.inputImage })
    fetch('http://apifacerecognition.herokuapp.com/imageRecognition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({inputImage : this.state.inputImage})
    }).then(response => response.json())
    .then(data => this.calculateBoxingimage(data))
    .catch(error => console.log(error));
    
  
  }

  onChangeRoute = (route, user) => {
    if (route === 'home') this.setState({ isSignedIn: true , inputImage:'' , imageUrl : '' })
    else { this.setState({ isSignedIn: false }) }
    this.setState({ route, user })
  }

  render() {
    const { route, isSignedIn } = this.state;
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Nav isSignedIn={isSignedIn} onChangeRoute={this.onChangeRoute} />
        {
          route === 'SignIn' ? (<SignIn onChangeRoute={this.onChangeRoute} />)
            :
            route === 'register' ? <Register onChangeRoute={this.onChangeRoute} />
              :
              (<div>
                <Logo />
                <Rank user={this.state.user} />
                <InputImageForm onchangeInputImage={this.onchangeInputImage}
                  onSubmitDetect={this.onSubmitDetect} />
                <ImageRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
              </div>
              )
        }
      </div>
    ); 
  }

}

export default App;
