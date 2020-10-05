import { useState, useEffect, useRef } from "react";

export const useFetch = (url) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null});

    useEffect( () => {
        // Cuando el componente se desmonta isMounted es false
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        //se manda a llamar el state origen para que se vea el efecto loading...
        setState({ data: null, loading: true, error: null});

        fetch( url )
            .then( resp => resp.json())
            .then( data => {

                // setTimeout(() => {
                //     if( isMounted.current ) {
                //         setState({
                //             loading: false,
                //             error: null,
                //             data
                //         })
                //     }else{
                //         console.log('setState no se llamo');
                //     }
                // }, 4000);
                if ( isMounted.current ) {

                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                    
                }

            });

    }, [url])

    return state;

}
