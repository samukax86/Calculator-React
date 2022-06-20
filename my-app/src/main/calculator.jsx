import React, { Component } from "react";
import "./calculator.css";

import Button from "../components/button/button";
import Display from "../components/display/display";

const inicialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...inicialState };

  clearMemory() {
    this.setState({ ...inicialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const result = operation === "=";
      const currentOperation = this.state.operation;

      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: result ? null : operation,
        current: result ? 0 : 1,
        clearDisplay: !result,
        values,
      });
    }
  }

  addDigit(n) {
    // Regra para evitar que o usuário digite mais de um ponto:
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;

    this.setState({ displayValue, clearDisplay: false });

    // Seta o valor do display em um array de dois valores:
    if (n !== ".") {
      const indice = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[indice] = newValue;
      this.setState({ values });
    }
  }

  render() {
    const clearMemory = () => this.clearMemory();
    const addDigit = (n) => this.addDigit(n);
    const setOperation = (op) => this.setOperation(op);
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={clearMemory} triple />
        <Button label="/" click={setOperation} operation />
        <Button label="7" click={addDigit} />
        <Button label="8" click={addDigit} />
        <Button label="9" click={addDigit} />
        <Button label="*" click={setOperation} operation />
        <Button label="4" click={addDigit} />
        <Button label="5" click={addDigit} />
        <Button label="6" click={addDigit} />
        <Button label="-" click={setOperation} operation />
        <Button label="1" click={addDigit} />
        <Button label="2" click={addDigit} />
        <Button label="3" click={addDigit} />
        <Button label="+" click={setOperation} operation />
        <Button label="0" click={addDigit} double />
        <Button label="." click={addDigit} />
        <Button label="=" click={setOperation} operation />
      </div>
    );
  }
}
