import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';

// Texto padrão de poderes para Substabelecimento
const PODERES_SUBSTABELECIMENTO = "O procurador fica substabelecido com todos os poderes anteriormente conferidos a mim na referida procuração veicular, podendo praticar todos os atos descritos na mesma\n\nEXEMPLOS DE CUSTOMIZAÇÃO:\n- PRAZO DE 30 DIAS\n- COM RETROAGIMENTO À DATA DE DD/MM/AAAA\n- VÁLIDA ATÉ DD/MM/AAAA";

export function FormSubstabelecimentoPJ() {
  const [outorganteRazaoSocial, setOutorganteRazaoSocial] = useState('');
  const [outorganteCnpj, setOutorganteCnpj] = useState('');
  const [outorganteEndereco, setOutorganteEndereco] = useState('');

  const [outorgadoNome, setOutorgadoNome] = useState('');
  const [outorgadoNacionalidade, setOutorgadoNacionalidade] = useState('');
  const [outorgadoCpf, setOutorgadoCpf] = useState('');
  const [outorgadoEndereco, setOutorgadoEndereco] = useState('');

  const [veiculoNome, setVeiculoNome] = useState('');
  const [veiculoPlaca, setVeiculoPlaca] = useState('');
  const [veiculoRenavam, setVeiculoRenavam] = useState('');
  const [veiculoChassi, setVeiculoChassi] = useState('');
  const [veiculoAnoModelo, setVeiculoAnoModelo] = useState('');
  const [veiculoCor, setVeiculoCor] = useState('');

  const [localEmissao, setLocalEmissao] = useState('');
  const [dataEmissao, setDataEmissao] = useState('');

  const [procuracaoPreview, setProcuracaoPreview] = useState('');
  const [poderes, setPoderes] = useState('');

  const handleGeneratePreview = () => {
    // Inicializar poderes com texto padrão se estiver vazio
    if (!poderes) {
      setPoderes(PODERES_SUBSTABELECIMENTO);
    }
    
    const previewText = `SUBSTABELECIMENTO\n\nOUTORGANTE (PJ): ${outorganteRazaoSocial}, CNPJ ${outorganteCnpj}, ${outorganteEndereco}.\n\nOUTORGADO: ${outorgadoNome}, ${outorgadoNacionalidade}, CPF ${outorgadoCpf}, ${outorgadoEndereco}.\n\nVEÍCULO: ${veiculoNome}, Placa ${veiculoPlaca}, RENAVAM ${veiculoRenavam}, Chassi ${veiculoChassi}, Ano/Modelo ${veiculoAnoModelo}, Cor ${veiculoCor}.\n\nLOCAL E DATA: ${localEmissao}, ${dataEmissao}.`;
    setProcuracaoPreview(previewText);
  };

  const handleGeneratePdf = async () => {
    const documentData = {
      outorganteRazaoSocial,
      outorganteCnpj,
      outorganteEndereco,
      outorgadoNome,
      outorgadoNacionalidade,
      outorgadoCpf,
      outorgadoEndereco,
      veiculoNome,
      veiculoPlaca,
      veiculoRenavam,
      veiculoChassi,
      veiculoAnoModelo,
      veiculoCor,
      localEmissao,
      dataEmissao,
      poderes, // Enviar poderes customizados
    };

    try {
      const response = await fetch('https://5000-ixyxn6cw882c62cg2wx1q-7e1c4ba2.manusvm.computer/api/generate_substabelecimento_pj', {
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
        a.download = 'substabelecimento_pj.pdf';
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
      <h1 className="text-2xl font-bold mb-4">Gerar Substabelecimento - Pessoa Jurídica</h1>
      
      {/* Outorgante PJ */}
      <div className="space-y-4 mb-6">
        <h2 className="text-xl font-semibold">Dados do Outorgante (Empresa)</h2>
        <div>
          <Label htmlFor="outorganteRazaoSocial">Razão Social</Label>
          <Input id="outorganteRazaoSocial" value={outorganteRazaoSocial} onChange={(e) => setOutorganteRazaoSocial(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="outorganteCnpj">CNPJ</Label>
          <Input id="outorganteCnpj" value={outorganteCnpj} onChange={(e) => setOutorganteCnpj(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="outorganteEndereco">Endereço</Label>
          <Input id="outorganteEndereco" value={outorganteEndereco} onChange={(e) => setOutorganteEndereco(e.target.value)} />
        </div>
      </div>

      {/* Outorgado */}
      <div className="space-y-4 mb-6">
        <h2 className="text-xl font-semibold">Dados do Outorgado</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="veiculoNome">Nome do Veículo</Label>
            <Input id="veiculoNome" value={veiculoNome} onChange={(e) => setVeiculoNome(e.target.value)} />
          </div>
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
            <Label htmlFor="veiculoAnoModelo">Ano/Modelo</Label>
            <Input id="veiculoAnoModelo" value={veiculoAnoModelo} onChange={(e) => setVeiculoAnoModelo(e.target.value)} />
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
            <h2 className="text-xl font-semibold mb-2">Pré-visualização do Substabelecimento</h2>
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

