import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { calculate } from "../../utils/calculatorHelpers";

export default function Calculator() {
    const [input, setInput] = useState("");

    function appendValue(value) {
        setInput((prev) => prev + value);
    }

    function clearInput() {
        setInput("");
    }

    function handleCalculate() {
        setInput(calculate(input));
    }

    const buttons = [
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        "0", ".", "=", "+"
    ];

    return (
        <Card>
            <h2 className="text-xl font-bold mb-4">Calculator</h2>

            <input
                type="text"
                value={input}
                readOnly
                className="w-full p-3 mb-4 rounded bg-gray-100 text-black"
            />

            <div className="grid grid-cols-4 gap-2">
                {buttons.map((btn) => (
                    <Button
                        key={btn}
                        onClick={() =>
                        btn === "=" ? handleCalculate() : appendValue(btn)
                    }
                        className="bg-blue-500 hover:bg-blue-600"
                    >
                        {btn}
                    </Button>
                ))}
            </div>

            <Button
                onClick={clearInput}
                className="bg-red-500 hover:bg-red-600 mt-4 w-full"
            >
                Clear
            </Button>
        </Card>
    );
}