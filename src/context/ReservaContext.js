import React, {aseState, useEffect, useCallback, useMemo, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVAS = '@reservas_Ingles';

export const ReservaContext = createContext(null);

export function ReservaProvider({children}) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(false);

    //cargar las reservas q tengo guardado si no devuelve un array vacio
    useEffect(() => {
        const cargar = async () => {
            try{
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if(guardado !== null){
                    setReservas(JSON.parse(guardado));
                }
            }catch(error){
                console.log('Error al cargar las reservas:', error);
            }finally{
                setCargando(false);
                };
            };
            cargar();   
        }, []);
    };

    //hacer guardado

    useEffect(() => {
        if(cargando) return;
          AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error) => {
            console.log('Error al guardar las reservas:', error);
          });
          [reservas, cargando]; //[] se llama matriz de dependencias, si no se pone nada se ejecuta una sola vez, si se pone algo se ejecuta cada vez que cambie ese algo
          
          const agregarReserva = useCallback((clase, horario) => {
            const nueva = {
                id: clase.id + '_' + horario,
                titulo: clase.titulo,
                nivel: clase.nivel,
                profesor: clase.profesor.nombre,
                precio: clase.precio,
                horario: horario,
                creadoEn: new Date().toISOString(),
            };
            let resultado = {ok:true};
            setReservas((prev) => {
                 if(prev.some((r) => r.id === nueva.id)){ //some() devuelve true si al menos un elemento del array cumple la condición, en este caso si ya existe una reserva con el mismo id
                    resutado = {ok:false}
                   return prev; //si ya existe una reserva con el mismo id, no se agrega y se devuelve el array original
                 } else {
                    return [...prev, nueva];// ... sirve para hacer una copia del array original y agregar el nuevo elemento al final, concatenar arrays
                 }
            }, []);// la matriz de dependencias vacía significa que la función no depende de ningún valor externo y se puede memorizar para evitar que se vuelva a crear en cada renderizado, osea que si requiere cargar varias veces el componente, no se vuelve a crear la función, sino que se reutiliza la misma función, lo que mejora el rendimiento
            const valor = useMemo(() => ({reservas, cargando, agregarReserva}), [reservas,agregarReserva,cargando]); //useMemo memoriza el valor de un cálculo y solo lo recalcula si cambian las dependencias, en este caso solo se recalcula si cambian las reservas, para evitar que se vuelva a crear el objeto cada vez que se renderiza el componente

            return <ReservaContext.Provider value={valor}>{children}</ReservaContext.Provider>
          });
    });