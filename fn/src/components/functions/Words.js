import React from "react";

import Details from "../Details";

export default class Words extends React.Component {
  static definition = {
    title: "words",
    description: "Generate anagrams using subsets from a list of letters.",
    parameters: [
      {
        name: "letters",
        required: true,
        type: "string",
        description: "the set of letters (no spaces or separators)",
      },
      {
        name: "min",
        required: true,
        type: "int",
        description:
          "minimum word size (e.g. 3 will only produce 3+ letter words)",
      },
    ],
  };

  state = { min: 3, letters: "", words: null };

  changed(value) {
    return (e) => {
      this.setState({ [value]: e.target.value });
    };
  }

  get = async () => {
    var url = new URL("/fn/words", window.location.origin);
    url.searchParams.append("letters", this.state.letters);
    url.searchParams.append("min", this.state.min);

    const response = await fetch(url);
    const data = await response.json();
    this.setState({ words: data });
  };

  renderWords = () => {
    if (this.state.words === null) return null;

    const rows = this.state.words.map((word) => (
      <div className="column" key={word}>
        {word}
      </div>
    ));

    return (
      <div
        className="ui stackable four column grid centered"
        style={{ fontSize: "1.5em", paddingTop: "10px" }}
      >
        {rows}
      </div>
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.get();
  };

  render() {
    return (
      <div className="container">
        <Details
          path={`/fn/${Words.definition.title}`}
          title={Words.definition.title}
          description={Words.definition.description}
          parameters={Words.definition.parameters}
        />
        <form className="ui form" onSubmit={this.handleSubmit}>
          <input type="submit" style={{ display: "none" }} />
          <div className="field">
            <label>letters</label>
            <input
              type="text"
              name="letters"
              placeholder="letters"
              value={this.state.letters}
              onChange={this.changed("letters")}
            />
          </div>
          <div className="field">
            <label>min</label>
            <select
              className="ui fluid dropdown"
              value={this.state.min}
              onChange={this.changed("min")}
            >
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </form>
        {this.renderWords()}
      </div>
    );
  }
}
