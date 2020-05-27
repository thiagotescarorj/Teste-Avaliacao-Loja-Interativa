import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'car',
    title: 'Automóveis',
    subtitle: 'Cadastro de automóveis: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/automoveis'
const initialState = {
    automovel: {marca: '', modelo: '', versao:'' },
    list: []
}

export default class AutoCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ automovel: initialState.automovel })
    }

    save() {
        const automovel = this.state.automovel
        const method = automovel.id ? 'put' : 'post'
        const url = automovel.id ? `${baseUrl}/${automovel.id}` : baseUrl
        axios[method](url, automovel)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ automovel: initialState.automovel, list })
            })
    }

    getUpdatedList(automovel, add = true) {
        const list = this.state.list.filter(u => u.id !== automovel.id)
        if(add) list.unshift(automovel)
        return list
    }

    updateField(event) {
        const automovel = { ...this.state.automovel }
        automovel[event.target.name] = event.target.value
        this.setState({ automovel })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Marca</label>
                            <input type="text" className="form-control"
                                name="marca"
                                value={this.state.automovel.marca}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a marca..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Modelo</label>
                            <input type="text" className="form-control"
                                name="modelo"
                                value={this.state.automovel.modelo}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o modelo..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Versão</label>
                            <input type="text" className="form-control"
                                name="versao"
                                value={this.state.automovel.versao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a versão..." />
                        </div>
                    </div>
                </div>

                

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(automovel) {
        this.setState({ automovel })
    }

    remove(automovel) {
        axios.delete(`${baseUrl}/${automovel.id}`).then(resp => {
            const list = this.getUpdatedList(automovel, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>                        
                        <th>Nome</th>
                        <th>Modelo</th>
                        <th>Versão</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(automovel => {
            return (
                <tr key={automovel.id}>
                    <td>{automovel.marca}</td>
                    <td>{automovel.modelo}</td>
                    <td>{automovel.versao}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(automovel)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(automovel)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}