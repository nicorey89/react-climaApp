import { useClima } from "../hooks/useClima"

const Resultado = () => {
    
    const {resultado : {name, main}} = useClima()

    return (
        <div className="contenedor clima">
            <h2>El Clima de { name } es: </h2>

            <p>
               { main.temp } <span>&#x2103;</span>
            </p>
            <div className="temp_min_max">
                <p>
                Mín: { main.temp_min } <span>&#x2103;</span>
                </p>
                <p>
                Máx: { main.temp_max } <span>&#x2103;</span>
                </p>
            </div>
 
          
        </div>
    )
}

export default Resultado