import { useState } from 'react';
import axios from 'axios';
import Loading from '../loading/Loading';
import {Chart as ChartJS} from "chart.js/auto";
import {Bar} from "react-chartjs-2"


const PrecoTeto = () => {
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState(null);
    const [proventos, setProventos] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchStockPrice = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/stock/${stock}`);
            setPrice(response.data.price);
            setProventos(response.data.proventos);
        } catch (error) {
            console.error('Erro ao encontrar o preço:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          fetchStockPrice();
        }
      };

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

    const sumProventos = calculateSum(proventos) / 6;

    // Cálculo de Preço Teto
    const precoTeto = sumProventos / 0.06;

    // Cálculo de Preço Justo
    const precoJusto = price && price.lpa && price.vpa ? Math.sqrt(22.5 * parseFloat(price.lpa.replace(',', '.')) * parseFloat(price.vpa.replace(',', '.'))) : null;

    return (
        <div className="pt-8 dark:bg-gray-900 flex flex-col justify-start items-center dark:text-gray-400 
    h-screen
       ">
            
            <div className=" mx-auto
            
            mb-4">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Ver Preço Teto</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input onKeyDown={handleKeyPress} onChange={(e) => setStock(e.target.value)} type="text" id="default-search" className="block 
                    xl:w-96 lg:w-96 md:w-96 sm:w-96 xs:w-16 p-4 ps-10 text-sm text-gray-900 
                    border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Insira o código da ação. ex: ITSA4" required />
                    <button onClick={fetchStockPrice} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver Preço</button>
                </div>
            </div>

            {loading && <Loading />}
            {!loading && price && (
                <div className='container flex flex-col justify-center'>
                     <h1 className='text-center font-bold text-lg text-orange-500'> {price.empresa} </h1>
                     <h2 className='text-center mb-4'>Setor {price.setor}</h2>
                    <div className=' text-center '> <p>Preço Atual : <span className='text-yellow-400'>R$ {parseFloat(price.element.replace(',', '.'))}</span> </p></div>
                    
                    <div className='text-center  mb-6'>
                       
                        <p> Preço Teto: <span className='text-green-500'>R$ {precoTeto.toFixed(2)}</span> </p>
                        {precoJusto !== null && <div className='text-center'> <p >Preço Justo: <span className='text-blue-500'> R$ {precoJusto.toFixed(2)}</span></p></div>}
                    </div>
                    {proventos && (
                        <div>
                         
                            <div className='container w-[40vw] flex justify-center '>
                                {/* <div className="relative overflow-x-auto sm:rounded-lg ">
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
                                </div> */}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className='w-96 '>
            { price && 
            <Bar
            data={{
                labels: ["Preço Atual","Preço Teto","Preço Justo"],
                datasets: [
                    {
                        label: "R$",
                        data: [parseFloat(price.element.replace(',', '.')),
                            Math.ceil(parseFloat(precoTeto) * 100) / 100, 
                            Math.ceil(parseFloat(precoJusto) * 100) / 100
                        ],
                        backgroundColor: [
                            'rgba(255, 165, 0, 0.8)',
                            'rgba(60, 179, 113, 0.8)',
                            'rgba(0, 0, 255, 0.8)',
                           
                          ],
                    }
                ]
                
            }
        
        }
        />
            }
            
            </div>

        </div>
    );
};

export default PrecoTeto;
