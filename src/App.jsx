import { useState } from 'react';
import "./App.css";
import axios from 'axios';
import Loading from './components/loading/Loading';

function App() {
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

    const filterProventos = (proventos) => {
        if (!proventos) return [];
        
        const currentYear = new Date().getFullYear();
        const filtered = proventos.filter(prov => prov.ano >= currentYear - 6 && prov.ano < currentYear);
        return filtered.filter(prov => prov.ano !== currentYear); // Exclui o ano atual
    };

    const calculateSum = (proventos) => {
        if (!proventos) return 0;

        const filteredProventos = filterProventos(proventos);
        if (filteredProventos.length === 0) return 0;

        const sum = filteredProventos.reduce((acc, prov) => acc + parseFloat(prov.valor.replace(',', '.')), 0);
        return sum;
    };

    const sumProventos = (calculateSum(proventos)/6);
    const precoTeto = (sumProventos/0.06);

    return (
        <div className="App">
            <h1 className='text-3xl font-bold'>Stock Wall</h1>
         

            <div className="max-w-md mx-auto">   
    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Ver Preço Teto</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input value={stock} onChange={(e) => setStock(e.target.value)}  type="text" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Insira o código da ação. ex: ITSA4" required />
        <button onClick={fetchStockPrice} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver Preço</button>
    </div>
    </div>

            {loading && <Loading />}
            {!loading && price && (
                <div>
                    <p className='text-blue-500'>Preço Atual: R$ {price}</p>
                    <div>
                    Preço Teto: R$ {precoTeto.toFixed(2)}
                    </div>
                    {proventos && (
                        <div>
                            <h2>Proventos (últimos 6 anos, exceto o atual):</h2>
                            <ul>
                                {filterProventos(proventos).map((prov, index) => (
                                    <li key={index}>
                                        Ano: {prov.ano}, Valor: {prov.valor}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
