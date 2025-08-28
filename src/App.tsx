import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Importe os módulos necessários

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Seus dados de cartão (mantidos por clareza)
const cardsData = [
  // ... (seus dados de cartão aqui)
  {
    id: 1,
    sigla: 'CA',
    comissao: 'Agropecuária',
    presidente: ['Missias Dias, PT', 'Bruno Pedrosa, PT'],
    vice_presidente: ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
    membro: [
      ['Simão Pedro, PSD', 'Lucílvio Girão, PSD'],
      ['Salmito, PSB', 'Guilherme Bismarck, PSB'],
      ['Queiroz Filho, PDT', 'Antônio Henrique, PDT'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
      ['x', 'x'],
    ],
  },
  // ... (o restante dos 21 cartões)
];

// O resto dos seus dados de cartão
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
  'CVTDU',
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
  'Viação, Transporte, Desenvolvimento Urbano',
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
  ['Lucinildo Frota, PDT', 'Queiroz Filho, PDT'],
];

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
  ['Bruno Pedrosa, PT', 'Missias Dias, PT'],
];

const membros = [
  [
    ['Simão Pedro, PSD', 'Lucílvio Girão, PSD'],
    ['Salmito, PSB', 'Guilherme Bismarck, PSB'],
    ['Queiroz Filho, PDT', 'Antônio Henrique, PDT'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Guilherme Sampaio, PT', 'Jô Farias, PT'],
    ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
    ['Alysson Aguiar, PCdoB', 'Missias Dias, PT'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Guilherme Sampaio, PT', 'Jô Farias, PT'],
    ['Júlio César Filho, PT', 'Nizo Costa, PT'],
    ['Antonio Granja, PSB', 'Guilherme Landim, PSB'],
    ['Sargento Reginauro, União', 'Heitor-Férrer, União'],
    ['Queiroz Filho, PDT', 'Antônio Henrique, PDT'],
    ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
    ['Carmelo Neto, PL', 'Dra. Silvana, PL'],
  ],
  [
    ['Almir Bié, Progressistas', 'Leonardo Pinheiro, Progressistas'],
    ['Guilherme Sampaio, PT', 'Nizo Costa, PT'],
    ['Guilherme Bismarck, PSB', 'Marcos Sobreira, PSB'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Jô Farias, PT', 'Missias Dias, PT'],
    ['Nizo Costa, PT', 'Júlio César Filho, PT'],
    ['Marcos Sobreira, PSB', 'Guilherme Bismarck, PSB'],
    ['Alysson Aguiar, PCdoB', 'Guilherme Sampaio, PT'],
    ['Lucinildo Frota, PDT', 'Queiroz Filho, PDT'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Emilia Pessoa, PSDB', 'Marcos Sobreira, PSB'],
    ['Marta Gonçalves, PSB', 'Guilherme Bismarck, PSB'],
    ['Luana Régia, Cidadania', 'Salmito, PSB'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Missias Dias, PT', 'Guilherme Sampaio, PT'],
    ['Luana Régia, Cidadania', 'Marta Gonçalves, PSB'],
    ['Sargento Reginauro, União', 'Heitor Férrer, União'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Bruno Pedrosa, PT', 'Guilherme Sampaio, PT'],
    ['Leonardo Pinheiro, Progressistas', 'Almir Bié, Progressistas'],
    ['Antônio Henrique, PDT', 'Queiroz Filho, PDT'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Guilherme Sampaio, PT', 'Júlio César Filho, PT'],
    ['Marcos Sobreira, PSB', 'Marta Gonçalves, PSB'],
    ['Claúdio Pinho, PDT', 'Queiroz Filho, PDT'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Guilherme Sampaio, PT', 'Alysson Aguiar, PCdoB'],
    ['Queiroz Filho, PDT', 'Antônio Henrique, PDT'],
    ['David Durand, Republicanos', 'Missias Dias, PT'],
    ['Juliana Lucena, PT', 'Nizo Costa, PT'],
    ['Salmito, PSB', 'Emilia Pessoa, PSDB'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Nizo Costa, PT', 'Júlio César Filho, PT'],
    ['Stuart Castro, Avante', 'Jô Farias, PT'],
    ['Guilherme Sampaio, PT', 'Alysson Aguiar, PCdoB'],
    ['Missias Dias, PT', 'Juliana Lucena, PT'],
    ['Guilherme Bismarck, PSB', 'Marcos Sobreira, PSB'],
    ['Sérgio Aguiar, PSB', 'Salmito, PSB'],
    ['Cláudio Pinho, PDT', 'Queiroz Filho, PDT'],
  ],
  [
    ['Salmito, PSB', 'Marcos Sobreira, PSB'],
    ['Bruno Pedrosa, PT', 'Nizo Costa, PT'],
    ['Almir Bié, Progressistas', 'Leonardo Pinheiro, Progressistas'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Juliana Lucena, PT', 'Júlio César Filho, PT'],
    ['Alysson Aguiar, PCdoB', 'Nizo Costa, PT'],
    ['Queiroz Filho, PDT', 'Antônio Henrique, PDT'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Juliana Lucena, PT', 'Jô Farias, PT'],
    ['Guilherme Bismarck, PSB', 'Emilia Pessoa, PSDB'],
    ['Bruno Pedrosa, PT', 'Júlio César Filho, PT'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
    ['Renato Roseno, Psol', 'Simão Pedro, PSD'],
    ['Guilherme Bismarck, PSB', 'Sérgio Aguiar, PSB'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Guilherme Sampaio, PT', 'Alysson Aguiar, PCdoB'],
    ['Júlio César Filho, PT', 'Nizo Costa, PT'],
    ['Lucinildo Frota, PDT', 'Cláudio Pinho, PDT'],
    ['Tin Gomes, PSB', 'Marcos Sobreira, PSB'],
    ['Antônio Henrique, PDT', 'Queiroz Filho, PDT'],
    ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
    ['Dra. Silvana, PL', 'Alcides Fernandes, PL'],
  ],
  [
    ['Heitor Férrer, União', 'Firmo Camurça, União'],
    ['Dra. Silvana, PL', 'Alcides Fernandes, PL'],
    ['Guilherme Sampaio, PT', 'Nizo Costa, PT'],
    ['Lucílvio Girão, PSD', 'Fernando Hugo, PSD'],
    ['Leonardo Pinheiro, Progressistas', 'Jô Farias, PT'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Jô Farias, PT', 'Guilherme Sampaio, PT'],
    ['Simão Pedro, PSD', 'Alysson Aguiar, PCdoB'],
    ['Renato Roseno, Psol', 'Luana Régia, Cidadania'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Guilherme Sampaio, PT', 'Alysson Aguiar, PCdoB'],
    ['Missias Dias, PT', 'Stuart Castro, Avante'],
    ['Tin Gomes, PSB', 'Marcos Sobreira, PSB'],
    ['Agenor Neto, MDB', 'Davi de Raimundão, MDB'],
    ['Leonardo Pinheiro, Progressistas', 'Almir Bié, Progressistas'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Guilherme Bismarck, PSB', 'Marcos Sobreira, PSB'],
    ['Lucinildo Frota, PDT', 'Antônio Henrique, PDT'],
    ['Sérgio Aguiar, PSB', 'Emilia Pessoa, PSDB'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
  [
    ['Nizo Costa, PT', 'Guilherme Sampaio, PT'],
    ['Júlio César Filho, PT', 'Stuart Castro, Avante'],
    ['Marta Gonçalves, PSB', 'Guilherme Bismarck, PSB'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
    ['x', 'x'],
  ],
];

interface Card {
  id: number;
  sigla: string;
  comissao: string;
  presidente: string[];
  vice_presidente: string[];
  membro: string[][];
}

const cards: Card[] = Array.from({ length: 21 }, (_, i) => {
  const cardNumber = i + 1;
  return {
    id: cardNumber,
    sigla: siglas[i],
    comissao: comissoes[i],
    presidente: presidentes[i],
    vice_presidente: vice_presidentes[i],
    membro: membros[i],
  };
});

function App() {
  const swiperRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // useEffect para esconder o 'x'
  useEffect(() => {
    const elementos = document.querySelectorAll('*');
    elementos.forEach((el) => {
      if (el.textContent === 'x' || el.innerHTML === 'x') {
        el.classList.add('invisivel');
      }
    });
  }, [currentSlideIndex]);

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
    if (swiperRef.current) {
      if (isAutoPlay) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
    }
  };

  const resetToFirst = () => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
      setIsAutoPlay(false);
      swiperRef.current.autoplay.stop();
    }
  };

  // Navegação por teclado agora interage com a instância do Swiper
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!swiperRef.current) return;
      if (event.key === 'ArrowRight') {
        swiperRef.current.slideNext();
      } else if (event.key === 'ArrowLeft') {
        swiperRef.current.slidePrev();
      } else if (event.key === ' ') {
        event.preventDefault();
        toggleAutoPlay();
      } else if (event.key === 'Home') {
        resetToFirst();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleAutoPlay]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-3">
      {/* Header */}
      <div className="w-full max-w-4xl mb-1">
        <h2 className="text-3xl md:text-2xl font-bold text-white text-center mb-2">
          Comissões Técnicas
        </h2>
      </div>

      {/* Card Display com Swiper */}
      <div className="relative w-full max-w-2xl h-96 mb-8">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          grabCursor={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          // O Swiper já lida com a paginação e navegação se você adicionar os elementos HTML
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ clickable: true, el: '.swiper-pagination' }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={card.id}>
              {/* Conteúdo do seu cartão aqui */}
              <div
                className={`w-full h-full bg-gradient-to-br rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center text-center transform transition-all duration-500 ease-in-out`}
              >
                <div
                  id="m"
                  className="bg-white/95 backdrop-blur-sm rounded-xl p-1 w-full h-full flex flex-col justify-center shadow-lg"
                >
                  <span className="">{card.comissao}</span>
                  <table border={1}>
                    <thead>
                      <tr>
                        <th className="ts">Titular</th>
                        <th className="ts">Suplente</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          colSpan={2}
                          className="tipo px-4 py-1 border-b border-gray-200 bg-gray-100"
                        >
                          Presidente
                        </td>
                      </tr>
                      <tr>
                        <td>{card.presidente[0]}</td>
                        <td>{card.presidente[1]}</td>
                      </tr>
                      <tr>
                        <td
                          colSpan={2}
                          className="tipo px-4 py-1 border-b border-gray-200 bg-gray-100"
                        >
                          Vice-Presidente
                        </td>
                      </tr>
                      <tr>
                        <td>{card.vice_presidente[0]}</td>
                        <td>{card.vice_presidente[1]}</td>
                      </tr>
                      <tr>
                        <td
                          colSpan={2}
                          className="tipo px-4 py-1 border-b border-gray-200 bg-gray-100"
                        >
                          Membros
                        </td>
                      </tr>
                      {card.membro.map((membro, i) => (
                        <tr key={i}>
                          <td>{membro[0]}</td>
                          <td>{membro[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botões de navegação customizados do Swiper */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>

      {/* Navigation Controls */}
      <div id="bt" className="flex items-center space-x-6 mb-3">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="flex items-center space-x-2 px-6 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline font-medium"></span>
        </button>

        <div className="text-white font-mono text-xl">
          {String(currentSlideIndex + 1).padStart(2, '0')}
        </div>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="flex items-center space-x-2 px-6 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
        >
          <span className="hidden sm:inline font-medium"></span>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Botões de controle de auto-play */}
      {/* <div className="flex items-center space-x-4 mt-4">
        <button onClick={toggleAutoPlay} className="text-white p-2 rounded-full bg-white/10">
          {isAutoPlay ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={resetToFirst} className="text-white p-2 rounded-full bg-white/10">
          <RotateCcw size={24} />
        </button>
      </div> */}
    </div>
  );
}

export default App;