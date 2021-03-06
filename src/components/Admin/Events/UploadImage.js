import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateEvent.css';
import axios from 'axios';

class UplaodImage extends React.Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            file: '',
            filename: 'Choose File',
        };
    }

    componentDidMount() {

    }

    onSubmit = async e => {
        e.preventDefault();
        this.props.setImagePath(`${this.state.filename}`);  //Path may change with the file structure

        const formData = new FormData();
        formData.append('event', this.state.file);

        try {
            await axios.post('https://ieeemock2.azurewebsites.net/upload/image/event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
        }
        catch (err) {
            if (err.response.status === 500) {
            alert('There was a problem with the server');
            console.log(err);
            } else {
            alert(err.response.data.msg);
            }
        }
    };

    changeHandler = (e) => {
        this.setState({
            file: e.target.files[0],
            filename: e.target.files[0].name
        });
    }

    render(){
        return(
            <form onSubmit={this.onSubmit} encType="multipart/form-data" id='form'>
              <div className="custom-file upload-row row">

                    <div className="col-9">
                        <input type="file" name="event" required={true} onChange={this.changeHandler} placeholder="Upload event poster" className='custom-file-input' />
                        <label className='custom-file-label' htmlFor='customFile'>
                            {this.state.filename}
                        </label>
                    </div>
                    <div className="col-3 upload-button">
                        <input type='submit' value='Upload' className='btn btn-success' />
                    </div>
          </div>
        </form>


        )
    }
}

export default UplaodImage;
