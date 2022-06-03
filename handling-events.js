class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        // if you didn't bind "this", it would be "undefined"
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((prevState) => ({
            isToggleOn: !prevState.isToggleOn,
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? "ON" : "OFF"}
            </button>
        );
    }
}

// Using arrow function can easily solve this problem
class LoggingButton extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
    handleClick = () => {
        console.log("this is:", this);
    };

    render() {
        return <button onClick={this.handleClick}>Click me</button>;
    }
}

// Not recommended, but it works.
class LoggingButton extends React.Component {
    handleClick() {
        console.log("this is:", this);
    }

    render() {
        // This syntax ensures `this` is bound within handleClick
        return <button onClick={() => this.handleClick()}>Click me</button>;
    }
}

// Passing Arguments to Event Handlers

// Inside a loop, it is common to want to pass an extra parameter to an event handler. For example, if id is the row ID, either of the following would work:

// <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

// <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

// In both cases, the e argument representing the React event will be passed as a second argument after the ID. With an arrow function, we have to pass it explicitly, but with bind any further arguments are automatically forwarded.