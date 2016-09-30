var React = require('react');

class TestComponent extends React.Component {
  render() {
    var i = 0;
    var createItem = function(itemText) {
      return <li key={i++}>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
}

class TestApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }
  render() {
    return (
      <div className="container">
        <h3>Testing express-react-views: {this.state.text}</h3>
        <TestComponent items={this.state.items} />
      </div>
    );
  }
}

module.exports = TestApp;
