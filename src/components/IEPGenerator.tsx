
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Info, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StudentData } from './StudentForm';

interface IEPGeneratorProps {
  studentData: StudentData;
  onBack: () => void;
  onComplete: (iepData: IEPData) => void;
}

export interface IEPData {
  academicGoals: string;
  socialGoals: string;
  communicationGoals: string;
  adaptationStrategies: string;
  evaluationMethods: string;
}

const IEPGenerator: React.FC<IEPGeneratorProps> = ({ studentData, onBack, onComplete }) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentTab, setCurrentTab] = useState("academic");
  const [generatedData, setGeneratedData] = useState<IEPData>({
    academicGoals: '',
    socialGoals: '',
    communicationGoals: '',
    adaptationStrategies: '',
    evaluationMethods: ''
  });
  
  // Mock AI generation process
  const generateIEP = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        const newProgress = prev + 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          simulateAIResponse();
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };
  
  // Mock AI response data
  const simulateAIResponse = () => {
    // In a real app, this would be an API call to an AI service
    setTimeout(() => {
      const mockIEPData = {
        academicGoals: `1. Desenvolver habilidades de leitura funcional, reconhecendo palavras comuns do cotidiano.
2. Melhorar a capacidade de contar e reconhecer números de 1 a 20.
3. Desenvolver habilidade de escrever o próprio nome completo sem assistência.
4. Melhorar a capacidade de seguir instruções escritas simples com apoio visual.
5. Desenvolver habilidades básicas de organização do material escolar.`,
        
        socialGoals: `1. Iniciar interações sociais com colegas pelo menos uma vez por dia.
2. Participar de atividades em grupo pequeno (2-3 crianças) por 10 minutos.
3. Aprender a esperar sua vez durante jogos e atividades.
4. Reconhecer e nomear pelo menos 3 emoções básicas.
5. Praticar cumprimentos sociais adequados na entrada e saída da escola.`,
        
        communicationGoals: `1. Utilizar frases de 3-4 palavras para fazer pedidos.
2. Responder a perguntas simples relacionadas à rotina escolar.
3. Usar cartões de comunicação para expressar necessidades quando estressado.
4. Manter contato visual por 3-5 segundos durante interações.
5. Praticar o uso de "por favor" e "obrigado" nas interações diárias.`,
        
        adaptationStrategies: `1. Utilizar apoios visuais para rotinas e transições.
2. Oferecer tempo extra para processamento e resposta.
3. Proporcionar local tranquilo para momentos de regulação sensorial.
4. Adaptar materiais com alto contraste visual e menos elementos distratores.
5. Utilizar abordagem multissensorial para novos conceitos.
6. Implementar sistema de recompensas visual para comportamentos positivos.
7. Preparar o aluno para mudanças na rotina com antecedência.`,
        
        evaluationMethods: `1. Observação direta com registro em checklist semanal.
2. Avaliações orais adaptadas em vez de escritas quando apropriado.
3. Portfólio de trabalhos para mostrar progresso ao longo do tempo.
4. Reuniões mensais com equipe multidisciplinar para avaliar progresso.
5. Feedback regular dos pais sobre generalização de habilidades em casa.`
      };
      
      setGeneratedData(mockIEPData);
      setIsGenerating(false);
      
      toast({
        title: "PEI Gerado com Sucesso",
        description: "O Plano de Ensino Individualizado foi gerado com base nas informações fornecidas.",
      });
    }, 1500);
  };
  
  const handleEdit = (field: keyof IEPData, value: string) => {
    setGeneratedData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleComplete = () => {
    onComplete(generatedData);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Gerador de PEI para {studentData.name}</CardTitle>
          <CardDescription>
            Geração automatizada de metas e estratégias personalizadas.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {!isGenerating && generatedData.academicGoals === '' ? (
            <div className="space-y-4">
              <div className="bg-autism-lightGreen/20 p-4 rounded-md border border-autism-green/20">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-autism-green mt-0.5" />
                  <div>
                    <h4 className="font-medium text-autism-green">Como funciona</h4>
                    <p className="text-sm mt-1">
                      Nossa inteligência artificial analisará as informações do aluno para criar um 
                      PEI personalizado com metas adequadas ao perfil, nível de desenvolvimento e 
                      necessidades específicas.
                    </p>
                  </div>
                </div>
              </div>
              
              <Alert className="bg-autism-lightBlue/20 border-autism-blue/20">
                <Info className="h-4 w-4 text-autism-blue" />
                <AlertTitle className="text-autism-blue">Perfil do aluno</AlertTitle>
                <AlertDescription className="text-sm">
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li><span className="font-medium">Nome:</span> {studentData.name}</li>
                    <li><span className="font-medium">Idade:</span> {studentData.age} anos</li>
                    <li><span className="font-medium">Série:</span> {studentData.grade}</li>
                    <li><span className="font-medium">Comunicação:</span> {studentData.communicationStyle || "Não especificado"}</li>
                  </ul>
                </AlertDescription>
              </Alert>
              
              <Button 
                className="w-full bg-autism-blue hover:bg-autism-blue/90"
                onClick={generateIEP}
              >
                Gerar PEI com IA
              </Button>
            </div>
          ) : isGenerating ? (
            <div className="space-y-6 py-8">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Gerando PEI personalizado...</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Analisando perfil e criando recomendações específicas
                </p>
              </div>
              
              <Progress value={generationProgress} className="h-2" />
              
              <div className="grid grid-cols-2 gap-4 text-center text-sm mt-8">
                <div>
                  <p className="font-medium">Analisando perfil</p>
                  <p className="text-muted-foreground">{generationProgress > 30 ? "Completo" : "Em andamento"}</p>
                </div>
                <div>
                  <p className="font-medium">Gerando metas</p>
                  <p className="text-muted-foreground">{generationProgress > 60 ? "Completo" : generationProgress > 30 ? "Em andamento" : "Aguardando"}</p>
                </div>
                <div>
                  <p className="font-medium">Criando estratégias</p>
                  <p className="text-muted-foreground">{generationProgress > 80 ? "Completo" : generationProgress > 60 ? "Em andamento" : "Aguardando"}</p>
                </div>
                <div>
                  <p className="font-medium">Finalizando documento</p>
                  <p className="text-muted-foreground">{generationProgress === 100 ? "Completo" : generationProgress > 80 ? "Em andamento" : "Aguardando"}</p>
                </div>
              </div>
            </div>
          ) : (
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid grid-cols-3 lg:grid-cols-5 mb-4">
                <TabsTrigger value="academic">Acadêmico</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="communication">Comunicação</TabsTrigger>
                <TabsTrigger value="strategies">Adaptações</TabsTrigger>
                <TabsTrigger value="evaluation">Avaliação</TabsTrigger>
              </TabsList>
              
              <div className="border rounded-md p-4 min-h-[300px]">
                <TabsContent value="academic" className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Metas Acadêmicas</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Objetivos focados em aprendizagem e desenvolvimento de habilidades acadêmicas.
                    </p>
                    <Textarea 
                      value={generatedData.academicGoals} 
                      onChange={(e) => handleEdit('academicGoals', e.target.value)}
                      className="min-h-[200px]" 
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="social" className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Metas Sociais</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Objetivos relacionados à interação social e desenvolvimento emocional.
                    </p>
                    <Textarea 
                      value={generatedData.socialGoals} 
                      onChange={(e) => handleEdit('socialGoals', e.target.value)}
                      className="min-h-[200px]" 
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="communication" className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Metas de Comunicação</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Objetivos focados em desenvolvimento de habilidades comunicativas.
                    </p>
                    <Textarea 
                      value={generatedData.communicationGoals} 
                      onChange={(e) => handleEdit('communicationGoals', e.target.value)}
                      className="min-h-[200px]" 
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="strategies" className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Estratégias de Adaptação</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Recomendações de adaptações e suportes para o ambiente escolar.
                    </p>
                    <Textarea 
                      value={generatedData.adaptationStrategies} 
                      onChange={(e) => handleEdit('adaptationStrategies', e.target.value)}
                      className="min-h-[200px]" 
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="evaluation" className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Métodos de Avaliação</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Estratégias para monitorar e avaliar o progresso do aluno.
                    </p>
                    <Textarea 
                      value={generatedData.evaluationMethods} 
                      onChange={(e) => handleEdit('evaluationMethods', e.target.value)}
                      className="min-h-[200px]" 
                    />
                  </div>
                </TabsContent>
              </div>
              
              <div className="flex items-center mt-4 space-x-2 text-sm">
                <Check className="h-4 w-4 text-autism-green" />
                <span>Você pode editar todas as seções antes de finalizar</span>
              </div>
            </Tabs>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="w-full sm:w-auto"
            disabled={isGenerating}
          >
            Voltar
          </Button>
          {generatedData.academicGoals !== '' && !isGenerating && (
            <Button 
              onClick={handleComplete} 
              className="w-full sm:w-auto bg-autism-green hover:bg-autism-green/90"
            >
              Finalizar PEI
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default IEPGenerator;
