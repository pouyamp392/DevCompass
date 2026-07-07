import { createContext, useState } from "react";

const QuizContext = createContext();

export function QuizProvider({ children }) {

    const [result, setResult] = useState([]);

    return (

        <QuizContext.Provider
            value={{
                result,
                setResult
            }}
        >

            {children}

        </QuizContext.Provider>

    );

}

export default QuizContext;