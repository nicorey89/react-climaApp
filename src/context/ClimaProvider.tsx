import { ChangeEvent, PropsWithChildren, createContext, useState } from "react";
import axios from "axios";

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
    busqueda: BusquedaPayload;
    resultado: ResultadoApi;
    actualizarDatosBusqueda: (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    consultarClima : (datos: BusquedaPayload) => void;
    cargando: boolean;
}
const ClimaContext = createContext<ClimaContextProps>({} as ClimaContextProps);

const ClimaProvider = ({children}: PropsWithChildren) => {

    const [ busqueda, setBusqueda ] = useState<BusquedaPayload>({
        ciudad: "",
        pais: ""
    })

    const [ resultado, setResultado ] = useState<ResultadoApi>({} as ResultadoApi);
    const [ cargando, setCargando ] = useState(false);

    const actualizarDatosBusqueda = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    } 


    const consultarClima = async (datos : BusquedaPayload) => {

        setCargando(true);

        try {

            const { ciudad, pais } = datos;
            const apiKey = import.meta.env.VITE_API_KEY;
            const { data } = await axios(`http://api.openweathermap.org/geo/1.0/direct?appid=${apiKey}&q=${ciudad},${pais}`);
            console.log(data);
            const { lat, lon } = data[0];

            const { data : datosClima } = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            setResultado(datosClima);

            
        } catch (error) {
            console.log(error);
            
        } finally {
            setCargando(false)
        }
    }

    return(
        <ClimaContext.Provider
            value={{
                busqueda,
                resultado,
                actualizarDatosBusqueda,
                consultarClima,
                cargando
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