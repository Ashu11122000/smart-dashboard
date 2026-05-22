  export function calculate(expression) {
    try {
        if (!expression) return "";

        // basic safe validation
        const valid = /^[0-9+\-*/.() ]+$/.test(expression);

        if (!valid) {
            return "Error";
        }

        const result = Function(`return ${expression}`)();

        return result.toString();
    } catch {
        return "Error";
    }
}