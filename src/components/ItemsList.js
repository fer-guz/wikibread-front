import React, { Component } from 'react'
import axios from 'axios'
import { format, register } from 'timeago.js';
import { Redirect } from 'react-router-dom'

// the local dict example is below.
const localeFunc = (number, index, total_sec) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // total_sec: total seconds between date to be formatted and today's date;
    return [
        ['justo ahora', 'en un rato'],
        ['hace %s segundos', 'en %s segundos'],
        ['hace 1 minuto', 'en 1 minuto'],
        ['hace %s minutos', 'en %s minutos'],
        ['hace 1 hora', 'en 1 hora'],
        ['hace %s horas', 'en %s horas'],
        ['hace 1 día', 'en 1 día'],
        ['hace %s días', 'en %s días'],
        ['hace 1 semana', 'en 1 semana'],
        ['hace %s semanas', 'en %s semanas'],
        ['hace 1 mes', 'en 1 mes'],
        ['hace %s meses', 'en %s meses'],
        ['hace 1 año', 'en 1 año'],
        ['hace %s años', 'en %s años'],
    ][index];
};
// register your locale with timeago
register('es_ES', localeFunc);


export default class ItemList extends Component {

    state = {
        redirect: false,
        items: [],
        id: '',
        title: '',
        category: '',
        country: '',
        content: '',
        imgurl: '',
        filename: '',
        textoBusqueda: '',
        searchResult: []
    }


    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={'/edit/' + this.state.id} />
        }
    }

    async componentDidMount() {
        this.getItems();
    }

    getItems = async () => {
        const res = await axios.get('https://wikibread-back.herokuapp.com/api/items')
        this.setState({
            items: res.data
        });
    }

    onClick = async (id, name, content, country, imgurl, filename) => {
        await this.setState({
            id: id,
            title: name,
            content: content,
            country: country,
            imgurl: imgurl,
            filename: filename
        })
        // console.log(this.state.title);
    }

    onChange = e => {

        const texto = e.target.value
        this.setState({
            textoBusqueda: texto,

        })

        const search = this.state.items.filter(item => {
            return `${item.name}
            ${item.category}
            ${item.country} 
            ${item.content} `
                .toLowerCase()
                .includes(texto.toLowerCase())
        })
        // console.log(search);

        this.setState({ searchResult: search })
    }

    deleteNote = async (noteId) => {
        await axios.delete('https://wikibread-back.herokuapp.com/api/items/' + noteId);
        this.getItems();
    }


    noSearch = () => {



        return (
            <div className="row">

                {
                    this.state.items.map(item => (

                        <div className="col-md-3 p-2 itemHover " key={item._id}>
                            <div className="card " >
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{item.name}</h5>

                                </div>
                                <img src={item.imgurl}
                                    className="card-img-top "
                                    alt={item.filename}
                                    max-width="100%"
                                    height="auto"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => this.onClick(item._id, item.name, item.content, item.country, item.imgurl, item.filename)} data-toggle="modal" data-target="#exampleModal"
                                />

                                <div className="card-body">
                                    <p>
                                        <strong>Pais: </strong>{item.country}

                                    </p>
                                    <p>
                                        <strong>Categoria: </strong>{item.category}

                                    </p>
                                    <p>
                                        <strong>{format(item.created_at, 'es_ES')}</strong>

                                    </p>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>

        );
    }

    result = () => {

        if (this.state.searchResult.length) {

            return (
                <div className="row">

                    {
                        this.state.searchResult.map(item => (

                            <div className="col-md-3 p-2 itemHover " key={item._id}>
                                <div className="card " >
                                    <div className="card-header d-flex justify-content-between">
                                        <h5>{item.name}</h5>

                                    </div>
                                    <img src={item.imgurl}
                                        className="card-img-top "
                                        alt={item.filename}
                                        max-width="100%"
                                        height="auto"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => this.onClick(item._id, item.name, item.content, item.country, item.imgurl, item.filename)} data-toggle="modal" data-target="#exampleModal"
                                    />

                                    <div className="card-body">
                                        <p>
                                            <strong>Pais: </strong>{item.country}

                                        </p>
                                        <p>
                                            <strong>Categoria: </strong>{item.category}

                                        </p>
                                        <p>
                                            <strong>{format(item.created_at, 'es_ES')}</strong>

                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            );

        } else {

            return (
                <div class="row justify-content-md-center p-5">

                    <div class="col-md-auto">
                        <h2 style={{ color: "#ffefd5" }}>
                            No hay resultados para "{this.state.textoBusqueda}".
                        </h2>

                    </div>

                </div>
            );

        }


    }


    ////////////////render
    render() {


        const search = this.state.textoBusqueda.length;



        return (
            <div className="container">
                {/* < !--Modal -- > */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header ">
                                <h5 className="modal-title" id="exampleModalLabel">{this.state.title}</h5>


                                {/* <Link to={"/edit/" + this.state.id} className="btn btn-secondary" data-dismiss="modal" >
                                    <i className="material-icons">
                                        Edit
                                        </i>
                                </Link> */}
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <img src={this.state.imgurl} className="card-img-top " alt={this.state.filename} max-width="100%" height="auto" />

                            <div className="modal-body">
                                {
                                    this.state.content
                                }
                            </div>
                            <div className="modal-footer">

                                {this.renderRedirect()}
                                <button type="button" onClick={this.setRedirect} className="btn btn-primary" data-dismiss="modal">Modificar</button>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-md-center sticky-top p-4" style={{ width: "400px", margin: "auto" }}>
                    <div className="col-md-8">
                        <form className="search">
                            <input
                                placeholder="Explorar..."
                                type="text"
                                onChange={this.onChange}

                            />

                        </form>
                    </div>
                </div>

                {search
                    ? <this.result />
                    : <this.noSearch />
                }


            </div>

        )
    }
}