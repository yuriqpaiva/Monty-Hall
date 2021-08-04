import { useEffect, useState } from "react"
import Porta from "../../../components/Porta"
import { atualizarPortas, criarPortas } from "../../../functions/portas"
import styles from '../../../styles/Jogo.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Jogo() {
    
    const router = useRouter()

    const [valido, setValido] = useState(false)
    const [portas, setPortas] = useState(criarPortas(0, 0))

    useEffect(() => {
        const portas =  +router.query.portas
        const temPresente =  +router.query.temPresente

        const qtdePortaValida = portas >= 3 && portas <= 100
        const temPresenteValido = temPresente >= 1 && temPresente <= portas

        setValido(qtdePortaValida && temPresenteValido)

    }, [portas, router.query.portas, router.query.temPresente])


    // Setando o estado inicial do Componente:
    useEffect(() => {
        const portas =  +router.query.portas
        const temPresente =  +router.query.temPresente
        // Pegando os parâmetros que foram passados na Query da URL
        // Detalhe: o `+` está transformando o string da query em tipo Numérico
    
        setPortas(criarPortas(portas, temPresente))
    }, [router?.query])

    function renderizarPortas() {
        return portas.map(porta => {
            return <Porta key={porta.numero} value={porta} onChange={
                novaPorta => { setPortas(atualizarPortas(portas, novaPorta)) }
            } />
        })
    }

    return (
        <div id={styles.jogo}>
            <div className={styles.portas}>
                {
                valido 
                ? renderizarPortas() 
                : <h1>Valores Inválidos</h1>
                }
            </div>
            <div className={styles.botoes}>
                <Link href='/'>
                    <a>
                        <button>Reiniciar Jogo</button>
                    </a>
                </Link>
            </div>
        </div>
    )
}