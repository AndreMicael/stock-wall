import { useState } from 'react';
import axios from 'axios';
import Loading from '../loading/Loading';


const PrecoTeto = () => {
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState(null);
    const [proventos, setProventos] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchStockPrice = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/stock/${stock}`);
            setPrice(response.data.price);
            setProventos(response.data.proventos);
        } catch (error) {
            console.error('Erro ao encontrar o preço:', error);
        } finally {
            setLoading(false);
        }
    };

     // Capturar os dados do BackEnd
    // ToDo: Salvar dados capturados em algum lugar.

    // Filtrar os dados dos proventos: últimos 6 anos, excluindo o ano atual.
    const filterProventos = (proventos) => {
        if (!proventos) return [];

        const currentYear = new Date().getFullYear();
        const filtered = proventos.filter(prov => prov.ano >= currentYear - 6 && prov.ano < currentYear);
        return filtered.filter(prov => prov.ano !== currentYear); // Exclui o ano atual
    };

    // Calcular a média dos proventos dos últimos 6 anos.
    const calculateSum = (proventos) => {
        if (!proventos) return 0;

        const filteredProventos = filterProventos(proventos);
        if (filteredProventos.length === 0) return 0;

        const sum = filteredProventos.reduce((acc, prov) => acc + parseFloat(prov.valor.replace(',', '.')), 0);
        return sum;
    };

    const sumProventos = (calculateSum(proventos) / 6);
    // Cálculo de Preço Teto
    const precoTeto = (sumProventos / 0.06);

  return (
    <div className="dark:bg-gray-900 flex flex-col  justify-start  items-center dark:text-gray-400 h-screen">
    <h1 className='text-3xl text-center mb-4 dark:text-blue-600'>Calculadora de Preço Teto </h1>
    
    <div className='  w-1/2 flex flex-col gap-2  mb-4 whitespace-normal'>
    <p className=''>
    O preço teto médio é o valor máximo que se deve pagar por uma ação, considerando que o investidor deseja obter um 
    retorno de 6% em proventos, baseado no histórico de dividendos dos últimos seis anos.</p> <p className=''> Em outras palavras, comprar uma 
    ação acima do preço teto pode significar pagar caro demais por uma ação que não justifica o investimento.
    </p> 

<p>Busque sua ação pelo código. Ex.: "PETR4"</p>
    </div>

    <div className="max-w-md mx-auto mb-4 ">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Ver Preço Teto</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input  onChange={(e) => setStock(e.target.value)} type="text" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Insira o código da ação. ex: ITSA4" required />
         
            <button onClick={fetchStockPrice} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver Preço</button>
        </div>
    </div>

    {loading && <Loading />}
    {!loading && price && (
        <div className='container flex flex-col justify-center '>
            <div className=' text-center'> <p>Preço Atual: R$ {price}</p></div>                  
            <div className='text-center text-green-500 mb-6'>
               <p> Preço Teto: R$ {precoTeto.toFixed(2)}</p>
            </div>
            {proventos && (             
                <div> 
                <div className=' text-sm mb-2 w-[20vw] text-center'>Proventos dos últimos 6 anos.</div>
                <div className='container w-[40vw] flex justify-center '>                  
                    <div className="relative overflow-x-auto sm:rounded-lg ">
                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className='align-center justify-center'>                                    
                                </tr>
                                <tr>
                                    <th scope="col" className="px-6 py-3">Ano</th>
                                    <th scope="col" className="px-6 py-3">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterProventos(proventos).map((prov, index) => (
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <td className="px-6 py-4">{prov.ano}</td>
                                        <td className="px-6 py-4">{prov.valor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            )}
        </div>
    )}
</div>
  )
}

export default PrecoTeto