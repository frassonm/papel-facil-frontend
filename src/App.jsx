import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { FormProcuracaoPF } from '@/components/FormProcuracaoPF.jsx';
import { FormProcuracaoPJ } from '@/components/FormProcuracaoPJ.jsx';
import { FormProcuracaoPFMultiplos } from '@/components/FormProcuracaoPFMultiplos.jsx';
import { FormProcuracaoPJMultiplos } from '@/components/FormProcuracaoPJMultiplos.jsx';
import { FormRepresentacaoPF } from '@/components/FormRepresentacaoPF.jsx';
import { FormRepresentacaoPJ } from '@/components/FormRepresentacaoPJ.jsx';
import { FormSubstabelecimentoPF } from '@/components/FormSubstabelecimentoPF.jsx';
import { FormSubstabelecimentoPJ } from '@/components/FormSubstabelecimentoPJ.jsx';
import './App.css';

function App() {
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Menu de seleção de documento
  if (!selectedDocument) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2">Gerador de Procurações com IA</h1>
        <p className="text-gray-600 mb-6">Selecione o tipo de documento que deseja gerar:</p>
        
        <div className="space-y-6">
          {/* Procurações Gerais */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Procurações Gerais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={() => setSelectedDocument('procuracao_pf_um')}>
                Procuração Pessoa Física (Um Outorgado)
              </Button>
              <Button onClick={() => setSelectedDocument('procuracao_pj_um')}>
                Procuração Pessoa Jurídica (Um Outorgado)
              </Button>
              <Button onClick={() => setSelectedDocument('procuracao_pf_multiplos')}>
                Procuração Pessoa Física (Múltiplos Outorgados)
              </Button>
              <Button onClick={() => setSelectedDocument('procuracao_pj_multiplos')}>
                Procuração Pessoa Jurídica (Múltiplos Outorgados)
              </Button>
            </div>
          </div>

          {/* Representação na Compra */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Representação na Compra</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={() => setSelectedDocument('representacao_pf')}>
                Representação na Compra - Pessoa Física
              </Button>
              <Button onClick={() => setSelectedDocument('representacao_pj')}>
                Representação na Compra - Pessoa Jurídica
              </Button>
            </div>
          </div>

          {/* Substabelecimento */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Substabelecimento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={() => setSelectedDocument('substabelecimento_pf')}>
                Substabelecimento - Pessoa Física
              </Button>
              <Button onClick={() => setSelectedDocument('substabelecimento_pj')}>
                Substabelecimento - Pessoa Jurídica
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar formulário baseado no tipo selecionado
  return (
    <div>
      <div className="bg-gray-100 p-4 mb-4">
        <Button variant="outline" onClick={() => setSelectedDocument(null)}>
          ← Voltar ao Menu
        </Button>
      </div>
      {selectedDocument === 'procuracao_pf_um' && <FormProcuracaoPF />}
      {selectedDocument === 'procuracao_pj_um' && <FormProcuracaoPJ />}
      {selectedDocument === 'procuracao_pf_multiplos' && <FormProcuracaoPFMultiplos />}
      {selectedDocument === 'procuracao_pj_multiplos' && <FormProcuracaoPJMultiplos />}
      {selectedDocument === 'representacao_pf' && <FormRepresentacaoPF />}
      {selectedDocument === 'representacao_pj' && <FormRepresentacaoPJ />}
      {selectedDocument === 'substabelecimento_pf' && <FormSubstabelecimentoPF />}
      {selectedDocument === 'substabelecimento_pj' && <FormSubstabelecimentoPJ />}
    </div>
  );
}

export default App;

