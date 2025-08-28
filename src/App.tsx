import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

interface Card {
  id: number;
  sigla: string;
  comissao: string;
  presidente: string;
  vice_presidente: string;
  membro: string;
}

function App() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Generate 21 cards with varied content
  const cards: Card[] = Array.from({ length: 21 }, (_, i) => {
    const cardNumber = i + 1;

    const siglas = [
      'CA',
      'CCTES',
      'CCJR',
      'CCE',
      'CDC',
      'CDDM',
      'CDS',
      'CDRRHMP ',
      'CDHC',
      'CEB',
      'CFC',
      'CIDEC',
      'CIA',
      'CJUV ',
      'CMADS ',
      'COFT',
      'CPSS ',
      'CPSCF',
      'CTASP',
      'CTS',
      'CVTDU'
    ];

    const comissoes = [
      'Agropecuária',
      'Ciência, Tecnologia e Educação Superior',
      'Constituição, Justiça e Redação',
      'Cultura e Esportes',
      'Defesa do Consumidor',
      'Defesa e Direitos da Mulher',
      'Defesa Social',
      'Desenvolvimento Regional, Recursos Hídricos, Minas e Pesca',
      'Direitos Humanos e Cidadania',
      'Educação Básica',
      'Fiscalização e Controle',
      'Indústria, Desenvolvimento Econômico e Comércio',
      'Infância e Adolescência',
      'Juventude',
      'Meio Ambiente e Desenvolvimento do Semiárido',
      'Orçamento, Finanças e Tributação',
      'Previdência Social e Saúde',
      'Proteção Social e Combate à Fome',
      'Trabalho, Administração e Serviço Público',
      'Turismo e Serviços',
      'Viação, Transporte, Desenvolvimento Urbano'

    ];

    const presidentes = [
      ['Missias Dias, PT', 'Bruno Pedrosa, PT'],
      ['Cláudio Pinho, PDT', 'Queiroz Filho, PDT'],
      ['Salmito, PSB', 'Marcos Sobreira, PSB'],
      ['Emilia Pessoa, PSDB', 'Luana Régia, Cidadania'],
      ['Fernando Hugo, PSD', 'Simão Pedro, PSD'],
      ['Juliana Lucena, PT', 'Missias Dias, PT'],
      ['Leonardo Pinheiro, Progressistas', 'Júlio César Filho, PT'],
      ['Stuart Castro, Avante', 'Missias Dias, PT'],
      ['Renato Roseno, Psol', 'Nizo Costa, PT'],
      ['Marcos Sobreira, PSB', 'Guilherme Landin, PSB'],
      ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
      ['Firmo Camurça, União', 'Heitor Férrer, União'],
      ['Luana Régia, Cidadania', 'Emilia Pessoa, PSDB'],
      ['Antônio Henrique, PDT', 'Lucinildo Frota, PDT'],
      ['Bruno Pedrosa, PT', 'Missias Dias, PT'],
      ['Sérgio Aguiar, PSB', 'Guilherme Landim, PSB'],
      ['Alysson Aguiar, PCdoB', 'Missias Dias, PT'],
      ['Guilherme Landim, PSB', 'Marcos Sobreira, PSB'],
      ['Júlio César Filho, PT', 'Nizo Costa, PT'],
      ['Marta Gonçalves, PL', 'Luana Régia, Cidadania'],
      ['Lucinildo Frota, PDT', 'Queiroz Filho, PDT']


    ]

    const vice_presidentes = [
      ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
      ['Emilia Pessoa, PSDB', 'Marcos Sobreira, PSB'],
      ['Missias Dias, PT', 'Alysson Aguiar, PCdoB'],
      ['Bruno Pedrosa, PT', 'Missias Dias, PT'],
      ['Guilherme Landim, PSB', 'Luana Régia, Cidadania'],
      ['Jô Farias, PT', 'Nizo Costa, PT'],
      ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
      ['Guilherme Landim, PSB', 'Sérgio Aguiar, PSB'],
      ['Missias Dias, PT', 'Alysson Aguiar, PCdoB'],
      ['Jô Farias, PT', 'Júlio César Filho, PT'],
      ['Leonardo Pinheiro, Progressistas', 'Almir Bié, Progressistas'],
      ['Sérgio Aguiar, PSB', 'Guilherme Bismarck, PSB'],
      ['Jô Farias, PT', 'Guilherme Sampaio, PT'],
      ['Davi de Raimundão, MDB', 'Agenor Neto, MDB'],
      ['Stuart Castro, Avante', 'Guilherme Sampaio, PT'],
      ['Missias Dias, PT', 'Jô Farias, PT'],
      ['Guilherme Landim, PSB', 'Marcos Sobreira, PSB'],
      ['Missias Dias, PT', 'Nizo Costa, PT'],
      ['Guilherme Landim, PSB', 'Sérgio Aguiar, PSB'],
      ['Júlio César Filho, PT', 'Missias Dias, PT'],
      ['Bruno Pedrosa, PT', 'Missias Dias, PT']


    ];

    const membros = [
      [['Simão Pedro, PSD', 'Lucílvio Girão, PSD'],
      ['Salmito, PSB', 'Guilherme Bismarck, PSB'],
      ['Queiroz Filho, PDT', 'Antônio Henrique, PDT'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Guilherme Sampaio, PT', 'Jô Farias, PT'],
      ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
      ['Alysson Aguiar, PCdoB', 'Missias Dias, PT'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Guilherme Sampaio, PT', 'Jô Farias, PT'],
      ['Júlio César Filho, PT', 'Nizo Costa, PT'],
      ['Antonio Granja, PSB', 'Guilherme Landim, PSB'],
      ['Sargento Reginauro, União', 'Heitor-Férrer, União'],
      ['Queiroz Filho, PDT', 'Antônio Henrique, PDT'],
      ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
      ['Carmelo Neto, PL', 'Dra. Silvana, PL']],
      [['Almir Bié, Progressistas', 'Leonardo Pinheiro, Progressistas'],
      ['Guilherme Sampaio, PT', 'Nizo Costa, PT'],
      ['Guilherme Bismarck, PSB', 'Marcos Sobreira, PSB'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Jô Farias, PT', 'Missias Dias, PT'],
      ['Nizo Costa, PT', 'Júlio César Filho, PT'],
      ['Marcos Sobreira, PSB', 'Guilherme Bismarck, PSB'],
      ['Alysson Aguiar, PCdoB', 'Guilherme Sampaio, PT'],
      ['Lucinildo Frota, PDT', 'Queiroz Filho, PDT'],
      ['x', 'x'],
      ['x', 'x']],
      [['Emilia Pessoa, PSDB', 'Marcos Sobreira, PSB'],
      ['Marta Gonçalves, PSB', 'Guilherme Bismarck, PSB'],
      ['Luana Régia, Cidadania', 'Salmito, PSB'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Missias Dias, PT', 'Guilherme Sampaio, PT'],
      ['Luana Régia, Cidadania', 'Marta Gonçalves, PSB'],
      ['Sargento Reginauro, União', 'Heitor Férrer, União'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Bruno Pedrosa, PT', 'Guilherme Sampaio, PT'],
      ['Leonardo Pinheiro, Progressistas', 'Almir Bié, Progressistas'],
      ['Antônio Henrique, PDT', 'Queiroz Filho, PDT'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Guilherme Sampaio, PT', 'Júlio César Filho, PT'],
      ['Marcos Sobreira, PSB', 'Marta Gonçalves, PSB'],
      ['Claúdio Pinho, PDT', 'Queiroz Filho, PDT'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Guilherme Sampaio, PT', 'Alysson Aguiar, PCdoB'],
      ['Queiroz Filho, PDT', 'Antônio Henrique, PDT'],
      ['David Durand, Republicanos', 'Missias Dias, PT'],
      ['Juliana Lucena, PT', 'Nizo Costa, PT'],
      ['Salmito, PSB', 'Emilia Pessoa, PSDB'],
      ['x', 'x'],
      ['x', 'x']],
      [['Nizo Costa, PT', 'Júlio César Filho, PT'],
      ['Stuart Castro, Avante', 'Jô Farias, PT'],
      ['Guilherme Sampaio, PT', 'Alysson Aguiar, PCdoB'],
      ['Missias Dias, PT', 'Juliana Lucena, PT'],
      ['Guilherme Bismarck, PSB', 'Marcos Sobreira, PSB'],
      ['Sérgio Aguiar, PSB', 'Salmito, PSB'],
      ['Cláudio Pinho, PDT', 'Queiroz Filho, PDT']],
      [['Salmito, PSB', 'Marcos Sobreira, PSB'],
      ['Bruno Pedrosa, PT', 'Nizo Costa, PT'],
      ['Almir Bié, Progressistas', 'Leonardo Pinheiro, Progressistas'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Juliana Lucena, PT', 'Júlio César Filho, PT'],
      ['Alysson Aguiar, PCdoB', 'Nizo Costa, PT'],
      ['Queiroz Filho, PDT', 'Antônio Henrique, PDT'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Juliana Lucena, PT', 'Jô Farias, PT'],
      ['Guilherme Bismarck, PSB', 'Emilia Pessoa, PSDB'],
      ['Bruno Pedrosa, PT', 'Júlio César Filho, PT'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
      ['Renato Roseno, Psol', 'Simão Pedro, PSD'],
      ['Guilherme Bismarck, PSB', 'Sérgio Aguiar, PSB'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Guilherme Sampaio, PT', 'Alysson Aguiar, PCdoB'],
      ['Júlio César Filho, PT', 'Nizo Costa, PT'],
      ['Lucinildo Frota, PDT', 'Cláudio Pinho, PDT'],
      ['Tin Gomes, PSB', 'Marcos Sobreira, PSB'],
      ['Antônio Henrique, PDT', 'Queiroz Filho, PDT'],
      ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
      ['Dra. Silvana, PL', 'Alcides Fernandes, PL']],
      [['Heitor Férrer, União', 'Firmo Camurça, União'],
      ['Dra. Silvana, PL', 'Alcides Fernandes, PL'],
      ['Guilherme Sampaio, PT', 'Nizo Costa, PT'],
      ['Lucílvio Girão, PSD', 'Fernando Hugo, PSD'],
      ['Leonardo Pinheiro, Progressistas', 'Jô Farias, PT'],
      ['x', 'x'],
      ['x', 'x']],
      [['Jô Farias, PT', 'Guilherme Sampaio, PT'],
      ['Simão Pedro, PSD', 'Alysson Aguiar, PCdoB'],
      ['Renato Roseno, Psol', 'Luana Régia, Cidadania'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Guilherme Sampaio, PT', 'Alysson Aguiar, PCdoB'],
      ['Missias Dias, PT', 'Stuart Castro, Avante'],
      ['Tin Gomes, PSB', 'Marcos Sobreira, PSB'],
      ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
      ['Leonardo Pinheiro, Progressistas', 'Almir Bié, Progressistas'],
      ['x', 'x'],
      ['x', 'x']],
      [['Guilherme Bismarck, PSB', 'Marcos Sobreira, PSB'],
      ['Lucinildo Frota, PDT', 'Antônio Henrique, PDT'],
      ['Sérgio Aguiar, PSB', 'Emilia Pessoa, PSDB'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']],
      [['Nizo Costa, PT', 'Guilherme Sampaio, PT'],
      ['Júlio César Filho, PT', 'Stuart Castro, Avante'],
      ['Marta Gonçalves, PSB', 'Guilherme Bismarck, PSB'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x']]
    ];

    // for(let m in membros){
    //   console.log(membros[m].length)
    // }

    return {
      id: cardNumber,
      sigla: siglas[i],
      comissao: comissoes[i],
      presidente: presidentes[i],
      vice_presidente: vice_presidentes[i],
      membro: membros[i]
    };
  });

  useEffect(() => {
    var tudo = document.querySelectorAll('*');
    tudo.forEach((el) => {
      if (el.textContent == 'x' || el.innerHTML == 'x') {
        //el.style.display = 'none';
        el.classList.add('invisivel');
      }
    });
  });

  const nextCard = useCallback(() => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const previousCard = useCallback(() => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  const goToCard = (index: number) => {
    setCurrentCard(index);
  };

  const resetToFirst = () => {
    setCurrentCard(0);
    setIsAutoPlay(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(nextCard, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, nextCard]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextCard();
      } else if (event.key === 'ArrowLeft') {
        previousCard();
      } else if (event.key === ' ') {
        event.preventDefault();
        toggleAutoPlay();
      } else if (event.key === 'Home') {
        resetToFirst();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextCard, previousCard]);

  const currentCardData = cards[currentCard];
  const progress = ((currentCard + 1) / cards.length) * 100;

  //if(currentCardData.membro[2][1]){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-3">
      {/* Header */}
      <div className="w-full max-w-4xl mb-1">
        <h2 className="text-3xl md:text-2xl font-bold text-white text-center mb-2">
          Comissões Técnicas
        </h2>
      </div>

      {/* Card Display */}
      <div id='mc' className="relative w-full max-w-2xl h-96 mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            key={currentCard}
            className={`w-full h-full bg-gradient-to-br rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center text-center transform transition-all duration-500 ease-in-out`}
          >
            <div id='m' className=" bg-white/95 backdrop-blur-sm rounded-xl p-1 w-full h-full flex flex-col justify-center shadow-lg">
              {/* <span className={`text-1xl md:text-1xl font-bold tipo`}>
                {currentCardData.sigla}
              </span> */}
              <span className=''>
                {currentCardData.comissao}
              </span>
              <table border={1}>
                <thead>
                  <tr>
                    <th className='ts'>
                      Titular
                    </th>
                    <th className='ts'>
                      Suplente
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2} className='tipo px-4 py-1 border-b border-gray-200 bg-gray-100'>
                      Presidente
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {currentCardData.presidente[0]}
                    </td>
                    <td>
                      {currentCardData.presidente[1]}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='tipo px-4 py-1 border-b border-gray-200 bg-gray-100'>
                      Vice-Presidente
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {currentCardData.vice_presidente[0]}
                    </td>
                    <td>
                      {currentCardData.vice_presidente[1]}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='tipo px-4 py-1 border-b border-gray-200 bg-gray-100'>
                      Membros
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {currentCardData.membro[0][0]}
                    </td>
                    <td>
                      {currentCardData.membro[0][1]}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {currentCardData.membro[1][0]}
                    </td>
                    <td>
                      {currentCardData.membro[1][1]}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {currentCardData.membro[2][0]}
                    </td>
                    <td>
                      {
                        currentCardData.membro[2][1]
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {currentCardData.membro[3][0]}
                    </td>
                    <td>
                      {
                        currentCardData.membro[3][1]
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {currentCardData.membro[4][0]}
                    </td>
                    <td>
                      {
                        currentCardData.membro[4][1]
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {currentCardData.membro[5][0]}
                    </td>
                    <td>
                      {
                        currentCardData.membro[5][1]
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {currentCardData.membro[6][0]}
                    </td>
                    <td>
                      {
                        currentCardData.membro[6][1]
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
{currentCardData.id}
      </div>

      {/* Navigation Controls */}
      <div id='bt' className="flex items-center space-x-6 mb-3">
        <button
          onClick={previousCard}
          className="flex items-center space-x-2 px-6 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline font-medium"></span>
        </button>

        <div className="text-white font-mono text-xl">
          {String(currentCard + 1).padStart(2, '0')}
        </div>

        <button
          onClick={nextCard}
          className="flex items-center space-x-2 px-6 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
        >
          <span className="hidden sm:inline font-medium"></span>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Card Dots Indicator */}
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => goToCard(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentCard
              ? 'bg-indigo-400 scale-125'
              : 'bg-white/30 hover:bg-white/50'
              }`}
          />
        ))}
      </div>

      {/* Keyboard Shortcuts Info */}
    </div>
  );
  //} 

}

export default App;