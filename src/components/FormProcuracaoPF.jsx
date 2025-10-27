import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';

// Texto padrão de poderes para Procuração Geral
const PODERES_PADRAO = "Podendo, para tanto, o dito procurador representar o outorgante perante o CRVA/DETRAN, para fins de transferência de propriedade podendo vender para si e/ou para terceiros, fazer comunicação de venda, conferindo-lhe poderes específicos para, em seu nome, receber o valor decorrente da venda, assinar o campo de acordo no CRV, solicitar a ativação ou baixa do veículo, assinar requerimentos de alteração de características e informações do veículo, inclusive troca de motor ou restrições fiduciárias, reclassificar o veículo para média monta, recuperar de sinistro, requerer processo de desbloqueio de veículo acidentado, realizar troca de município, incluir alienação em favor do outorgante, endossar documentação, alienar fiduciariamente ou firmar contrato de reserva de domínio, seja para si ou para terceiros, emitir ou cancelar ATPV-e, assinar tanto no campo de comprador quanto no de vendedor da ATPV-e, inclusive solicitar segunda via da ATPV-e, bem como emitir o CRLV-e, alterar endereço de postagem, assinar declaração de endereço, solicitar liberação para laudo no INMETRO (CSV), usar o veículo em qualquer parte do território nacional ou estrangeiro, remover o veículo de depósito (CRD), solicitar e retirar D.C.P.P.O., solicitar placas e vistorias, retirar documentos nos Correios, praticar todos os atos necessários para uso e gozo do veículo como coisa própria, sem interferência de terceiros, requerendo, promovendo e assinando o que se fizer necessário, inclusive assinando declarações de responsabilidade pela procedência de motor, carroceria e chassi, declarações de difícil acesso à coleta do número do motor e declarações de perda de plaquetas.\n\nEXEMPLOS DE CUSTOMIZAÇÃO:\n- PRAZO DE 30 DIAS\n- COM RETROAGIMENTO À DATA DE DD/MM/AAAA\n- VÁLIDA ATÉ DD/MM/AAAA";

export function FormProcuracaoPF() {
  const [outorganteNome, setOutorganteNome] = useState('');
  const [outorganteNacionalidade, setOutorganteNacionalidade] = useState('');
  const [outorganteCpf, setOutorganteCpf] = useState('');
  const [outorganteEndereco, setOutorganteEndereco] = useState('');

  const [outorgadoNome, setOutorgadoNome] = useState('');
  const [outorgadoNacionalidade, setOutorgadoNacionalidade] = useState('');
  const [outorgadoCpf, setOutorgadoCpf] = useState('');
  const [outorgadoEndereco, setOutorgadoEndereco] = useState('');

  const [veiculoPlaca, setVeiculoPlaca] = useState('');
  const [veiculoRenavam, setVeiculoRenavam] = useState('');
  const [veiculoChassi, setVeiculoChassi] = useState('');
  const [veiculoMarcaModelo, setVeiculoMarcaModelo] = useState('');
  const [veiculoCor, setVeiculoCor] = useState('');

  const [localEmissao, setLocalEmissao] = useState('');
  const [dataEmissao, setDataEmissao] = useState('');

  const [procuracaoPreview, setProcuracaoPreview] = useState('');
  const [poderes, setPoderes] = useState('');

  const handleGeneratePreview = () => {
    // Inicializar poderes com texto padrão se estiver vazio
    if (!poderes) {
      setPoderes(PODERES_PADRAO);
    }
    
    const previewText = `PROCURAÇÃO\n\nOUTORGANTE: ${outorganteNome}, nacionalidade ${outorganteNacionalidade}, CPF ${outorganteCpf}, residente e domiciliado em ${outorganteEndereco}.\n\nOUTORGADO: ${outorgadoNome}, nacionalidade ${outorgadoNacionalidade}, CPF ${outorgadoCpf}, residente e domiciliado em ${outorgadoEndereco}.\n\n${veiculoPlaca || veiculoRenavam || veiculoChassi || veiculoMarcaModelo || veiculoCor ? `VEÍCULO: Placa ${veiculoPlaca}, RENAVAM ${veiculoRenavam}, Chassi ${veiculoChassi}, Marca/Modelo ${veiculoMarcaModelo}, Cor ${veiculoCor}.\n\n` : ''}LOCAL E DATA: ${localEmissao}, ${dataEmissao}.`;
    setProcuracaoPreview(previewText);
  };

  const handleGeneratePdf = async () => {
    const documentData = {
      outorganteNome,
      outorganteNacionalidade,
      outorganteCpf,
      outorganteEndereco,
      outorgadoNome,
      outorgadoNacionalidade,
      outorgadoCpf,
      outorgadoEndereco,
      veiculoPlaca,
      veiculoRenavam,
      veiculoChassi,
      veiculoMarcaModelo,
      veiculoCor,
      localEmissao,
      dataEmissao,
      poderes, // Enviar poderes customizados
    };

    try {
      const response = await fetch('https://5000-ixyxn6cw882c62cg2wx1q-7e1c4ba2.manusvm.computer/api/generate_procuracao_pf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'procuracao_pf.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Erro ao gerar o PDF. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
      alert('Erro de conexão ao gerar o PDF.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerar Procuração Pessoa Física</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Outorgante */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Dados do Outorgante</h2>
          <div>
            <Label htmlFor="outorganteNome">Nome Completo</Label>
            <Input id="outorganteNome" value={outorganteNome} onChange={(e) => setOutorganteNome(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="outorganteNacionalidade">Nacionalidade</Label>
            <Input id="outorganteNacionalidade" value={outorganteNacionalidade} onChange={(e) => setOutorganteNacionalidade(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="outorganteCpf">CPF</Label>
            <Input id="outorganteCpf" value={outorganteCpf} onChange={(e) => setOutorganteCpf(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="outorganteEndereco">Endereço</Label>
            <Input id="outorganteEndereco" value={outorganteEndereco} onChange={(e) => setOutorganteEndereco(e.target.value)} />
          </div>
        </div>

        {/* Outorgado */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Dados do Outorgado</h2>
          <div>
            <Label htmlFor="outorgadoNome">Nome Completo</Label>
            <Input id="outorgadoNome" value={outorgadoNome} onChange={(e) => setOutorgadoNome(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="outorgadoNacionalidade">Nacionalidade</Label>
            <Input id="outorgadoNacionalidade" value={outorgadoNacionalidade} onChange={(e) => setOutorgadoNacionalidade(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="outorgadoCpf">CPF</Label>
            <Input id="outorgadoCpf" value={outorgadoCpf} onChange={(e) => setOutorgadoCpf(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="outorgadoEndereco">Endereço</Label>
            <Input id="outorgadoEndereco" value={outorgadoEndereco} onChange={(e) => setOutorgadoEndereco(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Dados do Veículo */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold">Dados do Veículo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="veiculoPlaca">Placa</Label>
            <Input id="veiculoPlaca" value={veiculoPlaca} onChange={(e) => setVeiculoPlaca(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="veiculoRenavam">RENAVAM</Label>
            <Input id="veiculoRenavam" value={veiculoRenavam} onChange={(e) => setVeiculoRenavam(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="veiculoChassi">Chassi</Label>
            <Input id="veiculoChassi" value={veiculoChassi} onChange={(e) => setVeiculoChassi(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="veiculoMarcaModelo">Marca/Modelo</Label>
            <Input id="veiculoMarcaModelo" value={veiculoMarcaModelo} onChange={(e) => setVeiculoMarcaModelo(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="veiculoCor">Cor</Label>
            <Input id="veiculoCor" value={veiculoCor} onChange={(e) => setVeiculoCor(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Local e Data */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold">Local e Data de Emissão</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="localEmissao">Local</Label>
            <Input id="localEmissao" value={localEmissao} onChange={(e) => setLocalEmissao(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="dataEmissao">Data</Label>
            <Input id="dataEmissao" type="date" value={dataEmissao} onChange={(e) => setDataEmissao(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex space-x-4 mt-6">
        <Button onClick={handleGeneratePreview}>Pré-visualizar</Button>
        <Button onClick={handleGeneratePdf} disabled={!procuracaoPreview}>Gerar Documento em PDF</Button>
      </div>

      {/* Pré-visualização */}
      {procuracaoPreview && (
        <div className="mt-6 space-y-4">
          <div className="p-4 border rounded-md bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">Pré-visualização da Procuração</h2>
            <Textarea
              className="w-full h-64 font-mono text-sm"
              value={procuracaoPreview}
              onChange={(e) => setProcuracaoPreview(e.target.value)}
            />
          </div>
          
          <div className="p-4 border rounded-md bg-blue-50">
            <h2 className="text-xl font-semibold mb-2">PODERES (Editável)</h2>
            <p className="text-sm text-gray-600 mb-2">
              Você pode editar os poderes abaixo para adicionar observações como "PRAZO DE 30 DIAS" ou "COM RETROAGIMENTO À DATA DE..."
            </p>
            <Textarea
              className="w-full h-48 font-mono text-sm"
              value={poderes}
              onChange={(e) => setPoderes(e.target.value)}
              placeholder="Digite ou edite os poderes aqui..."
            />
          </div>
        </div>
      )}
    </div>
  );
}

