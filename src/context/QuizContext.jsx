import { createContext, useState } from "react";

const QuizContext = createContext();

export function QuizProvider({ children }) {

    const [result, setResult] = useState([]);

    const [roadmap, setRoadmap] = useState([]);

    const [progress, setProgress] = useState({});

    return (

        <QuizContext.Provider
            value={{
                result,
                setResult,

                roadmap,
                setRoadmap,

                progress,
                setProgress,
            }}
        >

            {children}

        </QuizContext.Provider>

    );

}

export default QuizContext;