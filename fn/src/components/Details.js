import React from "react";
import { Jumbotron, Table } from "react-bootstrap";

export default class Details extends React.Component {
  renderParams = () => {
    return this.props.parameters.map((param) => (
      <tr key={param.name}>
        <th scope="row">{param.name}</th>
        <td>{param.type}</td>
        <td>{param.required}</td>
        <td>{param.description}</td>
      </tr>
    ));
  };

  render() {
    return (
      <Jumbotron style={{ marginTop: "10px" }}>
        <h1 className="display-4">{this.props.title}</h1>
        <p className="lead">
          <em>{this.props.path}</em> &mdash; {this.props.description}
        </p>
        <hr className="my-4" />
        <div>
          <h2>Query Parameters</h2>
          <Table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">type</th>
                <th scope="col">Required</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>{this.renderParams()}</tbody>
          </Table>
        </div>
      </Jumbotron>
    );
  }
}
