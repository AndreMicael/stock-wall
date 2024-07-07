import React from 'react'

const Aprenda = () => {
  return (
    <div className='bg-white h-max pb-10 dark:bg-gray-800 flex flex-col pt-10 items-center'>
        <h1 className='text-gray-900 dark:text-gray-300 text-2xl pb-10'></h1>
 <div id="accordion-collapse"  className='w-1/2  ' data-accordion="open">
  <h2 id="accordion-collapse-heading-1">
    <button
      type="button"
      className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 
      rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 
      dark:hover:bg-gray-800 gap-3"
      data-accordion-target="#accordion-collapse-body-1"
      aria-expanded="true"
      aria-controls="accordion-collapse-body-1"
    >
      <span>O que é Preço Teto Médio?</span>
      <svg
        data-accordion-icon
        className="w-3 h-3 rotate-180 shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5 5 1 1 5"
        />
      </svg>
    </button>
  </h2>

  <div
    id="accordion-collapse-body-1"
    className="hidden"
    aria-labelledby="accordion-collapse-heading-1"
  >
    <div className="p-5 border text-gray-800 dark:text-gray-400 border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-2 ">
      O preço teto médio é o valor máximo que se deve pagar por uma ação, considerando que o investidor deseja obter um 
      retorno de 6% em proventos, baseado no histórico de dividendos dos últimos seis anos. 
      <br/><br/>
      Em outras palavras, comprar uma 
      ação acima do preço teto pode significar pagar caro demais por uma ação que não justifica o investimento.
      </p>
 
    </div>
  </div>
  <h2 id="accordion-collapse-heading-2">
    <button
      type="button"
      className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 
      focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
      data-accordion-target="#accordion-collapse-body-2"
      aria-expanded="false"
      aria-controls="accordion-collapse-body-2"
    >
      <span>O que é Preço Justo?</span>
      <svg
        data-accordion-icon
        className="w-3 h-3 rotate-180 shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5 5 1 1 5"
        />
      </svg>
    </button>
  </h2>
  <div
    id="accordion-collapse-body-2"
    className="hidden"
    aria-labelledby="accordion-collapse-heading-2"
  >
    <div className="p-5 border text-gray-800 dark:text-gray-400 border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-2">
      O preço justo é o valor intrínseco de um ativo. Em outras palavras, o preço justo é uma estimativa que, muitas vezes, pode ser consideravelmente maior ou menor do que o valor pelo qual o ativo é negociado. São nessas ocasiões que surgem oportunidades para comprar ou vender ativos.
      </p>
      <p>Fórmula do Preço Justo</p>
      <p>VI = √ (22,5 x LPA x VPA)
      VI: Valor intrínseco a ser encontrado <br/>
         22,5: Constante de Graham<br/>
    LPA: Lucro por Ação<br/>
    VPA: Valor Patrimonial por Ação<br/>

      </p>
     
    </div>
  </div>
  <h2 id="accordion-collapse-heading-3">
    <button
      type="button"
      className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
      data-accordion-target="#accordion-collapse-body-3"
      aria-expanded="false"
      aria-controls="accordion-collapse-body-3"
    >
      <span>O preço justo e o preço medio são suficientes para a compra de uma ação?</span>
      <svg
        data-accordion-icon
        className="w-3 h-3 rotate-180 shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5 5 1 1 5"
        />
      </svg>
    </button>
  </h2>
  <div
    id="accordion-collapse-body-3"
    className="hidden"
    aria-labelledby="accordion-collapse-heading-3"
  >
    <div className="p-5 border text-gray-800 dark:text-gray-400 border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-2">
      O preço justo e o preço teto médio são importantes indicadores, mas não são suficientes, por si só, para determinar a compra de uma ação. Outros fatores também devem ser considerados, como:
      </p>

      <ol className=' list-decimal list-inside m-4'>
        <li>Análise Fundamentalista: Avaliar os fundamentos da empresa, como lucro, receita, dívida, e perspectivas de crescimento.</li>
        <li>Análise Técnica: Examinar gráficos e tendências de preços para identificar pontos de entrada e saída.</li>
        <li>Situação Econômica: Considerar o contexto econômico geral, que pode afetar o desempenho das ações.</li>
        <li>Diversificação: Garantir que o investimento em ações faz parte de uma estratégia diversificada para minimizar riscos.</li>
        <li>Perfil do Investidor: Avaliar se a ação se adequa ao perfil de risco e aos objetivos do investidor.</li>
       
      </ol>
        <p>Assim, uma decisão de investimento deve ser baseada em uma análise abrangente que considera múltiplos fatores além do preço justo e do preço teto médio.</p>
      
    </div>
  </div>
</div>














    </div>
  )
}

export default Aprenda