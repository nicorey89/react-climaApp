import { ChangeEvent, PropsWithChildren, createContext, useState } from "react";

interface BusquedaPayload {
    ciudad: string;
    pais: string;
}
interface ResultadoApi {
    name: string;
    main: {
        temp: number;
        temp_max: number;
        temp_min: number;
    }
}

export interface ClimaContextProps {
    busqueda: BusquedaPayload,
    resultado: ResultadoApi,
    actualizarDatosBusqueda: (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
const ClimaContext = createContext<ClimaContextProps>({} as ClimaContextProps);

const ClimaProvider = ({children}: PropsWithChildren) => {

    const { busqueda, setBusqueda } = useState<BusquedaPayload>({
        ciudad: "",
        pais: ""
    })

    const { resultado, setResultado } = useState<ResultadoApi>({} as ResultadoApi)

    const actualizarDatosBusqueda = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    } 

    return(
        <ClimaContext.Provider
            value={{
                busqueda,
                resultado,
                actualizarDatosBusqueda
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