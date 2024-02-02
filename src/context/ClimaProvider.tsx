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
    const [cargando, setCargando ] = useState(false);

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
            const urlGeolocation = "http://example.com/";
            const { data } = await axios(`${urlGeolocation}?appid=${apiKey}&q=${ciudad},${pais}`);
            const { lat, lon } = data[0];

            const urlRequestClima = "http://example2.com/";
            const { data : datosClima } = await axios(`${urlRequestClima}?lat=${lat}&lon=${lon}&appid${apiKey}`);
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