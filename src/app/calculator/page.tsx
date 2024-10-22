"use client";
import { useEffect, useState } from "react";
import { CalculatorState } from "../../../types";

export default function page() {
  const [state, setState] = useState<CalculatorState>({
    expression: "",
    result: "",
  });

  const operators = ["÷", "×", "-", "+", "%", "+/-", "."];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keys = [
        "%",
        ":",
        "/",
        "7",
        "8",
        "9",
        "*",
        "4",
        "5",
        "6",
        "-",
        "1",
        "2",
        "3",
        "+",
        ".",
        "0",
        "=",
        "Backspace",
        "Enter",
        ",",
      ];

      if (keys.includes(event.key)) {
        switch (event.key) {
          case ",":
            handleButtonClick(".");
            break;
          case "Enter":
            handleButtonClick("=");
            break;
          case "*":
            handleButtonClick("×");
            break;
          case "/":
            handleButtonClick("÷");
            break;
          case ":":
            handleButtonClick("÷");
            break;
          default:
            handleButtonClick(event.key);
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleButtonClick = (value: string) => {
    if (operators.includes(value)) {
      setState((prevState) => {
        if (operators.includes(prevState.expression.slice(-1))) {
          return {
            ...prevState,
            expression:
              prevState.expression.slice(0, -1) +
              `${value === "+/-" ? "×(-1)" : value}`,
          };
        } else if (value === "+/-") {
          return {
            ...prevState,
            expression: prevState.expression + "×(-1)",
          };
        } else {
          return {
            ...prevState,
            expression: prevState.expression + value,
          };
        }
      });
    } else {
      switch (value) {
        case "C":
          setState({ expression: "", result: "" });
          break;
        case "=":
          handleCalculate();
          break;

        case "Backspace": // Удаление последнего символа
          setState((prevState) => ({
            ...prevState,
            expression: prevState.expression.slice(0, -1),
          }));
          break;
        default:
          setState((prevState) => ({
            ...prevState,
            expression: prevState.expression + value,
          }));
          break;
      }
    }
  };

  const handleCalculate = () => {
    try {
      setState((prevState) => {
        if (operators.includes(prevState.expression.slice(-1))) {
          return {
            ...prevState,
            result: eval(
              prevState.expression
                .slice(0, -1)
                .replaceAll("×", "*")
                .replaceAll("÷", "/")
                .replaceAll("%", "/100*")
            ),
          };
        }
        return {
          ...prevState,
          result: String(
            eval(
              prevState.expression
                .replaceAll("×", "*")
                .replaceAll("÷", "/")
                .replaceAll("%", "/100*")
            )
          ),
        };
      });
    } catch (error) {
      setState({ ...state, result: "Ошибка" });
    }
  };
  return (
    <>
      <section>
        <div className="container flex justify-center">
          <div className="calculator">
            <div
              className="expression"
              style={{
                fontSize: state.expression.length >= 17 ? "20px" : "40px",
              }}>
              {state.expression.length > 33
                ? state.expression.slice(-33)
                : state.expression}
            </div>
            <div
              className="result"
              style={{
                fontSize: state.result.length >= 7 ? "30px" : "96px",
              }}>
              {state.result}
            </div>
            <div className="w-full grid grid-cols-4 grid-rows-5 gap-4">
              <button
                className="btn-calc btn-calc-gray"
                onClick={() => handleButtonClick("C")}>
                C
              </button>
              <button
                className="btn-calc btn-calc-gray"
                onClick={() => handleButtonClick("+/-")}>
                <svg
                  width="25"
                  height="22"
                  viewBox="0 0 25 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.3321 2.55469L19.8867 1.72264L18.2226 0.613235L17.6679 1.44529L5.66795 19.4453L5.11325 20.2773L6.77735 21.3867L7.33205 20.5547L19.3321 2.55469ZM5.5 0.999985V1.99998V3.99998H7.5H8.5V5.99998H7.5H5.5V7.99998V8.99998H3.5V7.99998V5.99998H1.5H0.5V3.99998H1.5H3.5V1.99998V0.999985H5.5ZM17.5 16H16.5V18H17.5H23.5H24.5V16H23.5H17.5Z"
                    fill="#000"
                  />
                </svg>
              </button>
              <button
                className="btn-calc btn-calc-gray"
                onClick={() => handleButtonClick("%")}>
                %
              </button>
              <button
                className="btn-calc btn-calc-primary"
                onClick={() => handleButtonClick("÷")}>
                ÷
              </button>
              <button
                className="btn-calc"
                onClick={() => handleButtonClick("7")}>
                7
              </button>
              <button
                className="btn-calc"
                onClick={() => handleButtonClick("8")}>
                8
              </button>
              <button
                className="btn-calc"
                onClick={() => handleButtonClick("9")}>
                9
              </button>
              <button
                className="btn-calc btn-calc-primary"
                onClick={() => handleButtonClick("×")}>
                ×
              </button>
              <button
                className="btn-calc"
                onClick={() => handleButtonClick("4")}>
                4
              </button>
              <button
                className="btn-calc"
                onClick={() => handleButtonClick("5")}>
                5
              </button>
              <button
                className="btn-calc"
                onClick={() => handleButtonClick("6")}>
                6
              </button>
              <button
                className="btn-calc btn-calc-primary"
                onClick={() => handleButtonClick("-")}>
                -
              </button>
              <button
                className="btn-calc"
                onClick={() => handleButtonClick("1")}>
                1
              </button>
              <button
                className="btn-calc"
                onClick={() => handleButtonClick("2")}>
                2
              </button>
              <button
                className="btn-calc"
                onClick={() => handleButtonClick("3")}>
                3
              </button>
              <button
                className="btn-calc btn-calc-primary"
                onClick={() => handleButtonClick("+")}>
                +
              </button>
              <button
                className="btn-calc"
                onClick={() => handleButtonClick(".")}>
                .
              </button>
              <button
                className="btn-calc"
                onClick={() => handleButtonClick("0")}>
                0
              </button>
              <button
                className="btn-calc"
                onClick={() => handleButtonClick("Backspace")}>
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.586 7H28v18H10.586l-.293-.293-8-8L1.586 16l.707-.707 8-8L10.586 7zm.828 2l-7 7 7 7H26V9H11.414zM15 11.586l.707.707L18 14.586l2.293-2.293.707-.707L22.414 13l-.707.707L19.414 16l2.293 2.293.707.707L21 20.414l-.707-.707L18 17.414l-2.293 2.293-.707.707L13.586 19l.707-.707L16.586 16l-2.293-2.293-.707-.707L15 11.586z"
                    fill="#000"
                  />
                </svg>
              </button>
              <button
                className="btn-calc btn-calc-primary"
                onClick={() => handleButtonClick("=")}>
                =
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
