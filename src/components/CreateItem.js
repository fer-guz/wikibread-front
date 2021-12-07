import React, { Component } from 'react'

import axios from 'axios'

export default class CreateItem extends Component {

    state = {
        image: '',
        title: '',
        category: '',
        country: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: '',
        preview: ''
    }

    async componentDidMount() {



        if (this.props.match.params.id) {
            // console.log(this.props.match.params.id)
            const res = await axios.get('https://wikibread-back.herokuapp.com/api/items/' + this.props.match.params.id);
            // console.log(res.data)
            this.setState({
                image: res.data.imgurl,
                title: res.data.name,
                category: res.data.category,
                country: res.data.country,

                content: res.data.content,
                _id: res.data._id,
                editing: true
            });
        } else {
            this.setState({
                country: 'Colombia',
                category: 'Dulce'
            })
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedNote = {
                title: this.state.title,
                category: this.state.category,
                country: this.state.country,
                content: this.state.content,
            };
            await axios.put('https://wikibread-back.herokuapp.com/api/items/' + this.state._id, updatedNote);
        } else {

            const { image, title, country, category, content, } = this.state;
            let formData = new FormData();

            formData.append('image', image);
            formData.append('title', title);
            formData.append('category', category);
            formData.append('country', country);
            formData.append('content', content);
            formData.append('date', Date.now());


            // const newNote = {

            //     title: this.state.title,
            //     country: this.state.country,
            //     content: this.state.content,

            // };
            await axios.post('https://wikibread-back.herokuapp.com/api/items', formData);
        }
        window.location.href = '/';

    }

    onInputChange = (e) => {

        switch (e.target.name) {
            case 'image':
                this.setState({
                    image: e.target.files[0],
                    preview: URL.createObjectURL(e.target.files[0])
                });
                // console.log(e.target.name, e.target.files[0]);
                break;
            default:
                // console.log(e.target.name, e.target.value);
                this.setState({ [e.target.name]: e.target.value });
        }
    }


    render() {
        const isediting = this.state.editing;
        return (

            <div className="col-md-6 offset-md-3" >
                <div className="card card-body" style={{ zIndex: 1020 }}>
                    {
                        this.state.editing
                            ? <h4>Modificar producto</h4>
                            : <h4>Nuevo producto</h4>

                    }

                    <form onSubmit={this.onSubmit}>
                        {/* SELECT THE image */}
                        {
                            isediting
                                ? <div className="form-group">
                                    <img src={this.state.image} className="card-img-top " alt={this.state.title} max-width="100%" height="auto" />

                                </div>

                                : <div className="form-group">
                                    <img src={this.state.preview} className="card-img-top " alt={this.state.preview} max-width="100%" height="auto" />
                                    <div className="input-group mb-3">
                                        <div className="custom-file">
                                            <input type="file"
                                                name="image"
                                                className="custom-file-input"
                                                onChange={this.onInputChange}
                                                id="inputGroupFile02"
                                                required />
                                            <label
                                                className="custom-file-label"
                                                htmlFor="inputGroupFile02"
                                                aria-describedby="inputGroupFileAddon02">
                                                {this.state.image.name}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                        }

                        {/* Note Title */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="nombre"
                                onChange={this.onInputChange}
                                name="title"
                                value={this.state.title}
                                required />
                        </div>
                        {/* Note category */}
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.category}
                                onChange={this.onInputChange}
                                name="category"
                                required>
                                <option value={this.state.category} hidden>{this.state.category}</option>
                                <option value="Panes de Corteza" >Panes de Corteza</option>
                                <option value="Integral">Integral</option>
                                <option value="Aliñados">Aliñados</option>
                                <option value="Pan de molde" >Pan de molde</option>
                                <option value="Relleno de queso">Relleno de queso</option>
                                <option value="Dulce">Dulce</option>
                                <option value="Hojaldrados" >Hojaldrados</option>


                            </select>
                        </div>
                        {/* Note country */}
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.country}
                                onChange={this.onInputChange}
                                name="country"
                                required>
                                <option value={this.state.country} hidden>{this.state.country}</option>
                                <option value="Colombia" >Colombia</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Grecia">Grecia</option>
                                <option value="Peru" >Peru</option>
                                <option value="Francia">Francia</option>
                                <option value="Italia">Italia</option>
                                <option value="Brazil" >Brazil</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Uruguay">Uruguay</option>


                            </select>
                        </div>
                        {/* Note Content */}
                        <div className="form-group">
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Descripcion"
                                name="content"
                                onChange={this.onInputChange}
                                value={this.state.content}
                                style={{ height: "100px" }}
                                required>
                            </textarea>
                        </div>
                        {/* Note Date */}

                        <button className="btn btn-primary">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}