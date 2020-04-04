import React from "react";

export default class Details extends React.Component {
  renderParams = () => {
    return this.props.parameters.map((param) => (
      <tr key={param.name}>
        <td>{param.name}</td>
        <td>{param.type}</td>
        <td>{param.required.toString()}</td>
        <td>{param.description}</td>
      </tr>
    ));
  };

  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <div className="ui huge message page">
          <h1 className="ui huge header">{this.props.title}</h1>
          <div className="ui small header">
            <em>{this.props.path}</em> &mdash; {this.props.description}
          </div>
          <hr />
          <div>
            <h2>Query Parameters</h2>
            <table className="ui very basic striped celled table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">type</th>
                  <th scope="col">Required</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>{this.renderParams()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
