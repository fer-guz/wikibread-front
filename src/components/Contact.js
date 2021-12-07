import React, { Component } from 'react'
import pan from "../public/pan.jpg";
import pan2 from "../public/pan2.jpg";

export default class Contact extends Component {
    render() {
        return (

            <div className="container">
                
                <div className="row align-items-center" style={{height: "600px"}}>
                    <div className="col-3">
                        <div className="card" >
                            <img src={pan} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">Recibe un correo de información sobre los nuevos productos que los profesionales colombianos crean.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card card-body" style={{ zIndex: 1020 }}>


                            <form onSubmit={this.onSubmit}>
                                

                                
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Correo"
                                        name="title"
                                        required />
                                </div>
                                

                                {/* Note Content */}
                                <div className="form-group">
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        placeholder="Envianos tu opinion"
                                        name="content"
                                        style={{ height: "100px" }}
                                        required>
                                    </textarea>
                                </div>

                                <button className="btn btn-primary">
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card" >
                            <img src={pan2} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">Rellena este formulario y nos pondremos en contacto contigo para que empieces a recibir información y puedas disfrutar de nuestra web.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
