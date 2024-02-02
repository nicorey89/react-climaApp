import { PropsWithChildren, createContext } from "react";

export interface ClimaContextProps {
    busqueda: {
        ciudad: string;
        pais: string;
    },
    resultado: {
        name: string;
        main: {
            temp: number;
            temp_max: number;
            temp_min: number;
        }
    }
}
const ClimaContext = createContext<ClimaContextProps>({} as ClimaContextProps);

const ClimaProvider = ({children}: PropsWithChildren) => {
    return(
        <ClimaContext.Provider
            value={{
                busqueda: {
                    ciudad: "",
                    pais: ""
                },
                resultado: {
                    name: "",
                    main: {
                        temp: 0,
                        temp_max: 0,
                        temp_min: 0
                    }
                }
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}
export default ClimaContext;