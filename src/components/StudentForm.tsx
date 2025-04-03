
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface StudentFormProps {
  onSubmit: (data: StudentData) => void;
}

export interface StudentData {
  name: string;
  age: string;
  grade: string;
  birthDate: string;
  diagnosis: string[];
  strengths: string;
  challenges: string;
  communicationStyle: string;
  interests: string;
  guardianName: string;
  guardianContact: string;
  additionalNotes: string;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<StudentData>({
    name: '',
    age: '',
    grade: '',
    birthDate: '',
    diagnosis: [],
    strengths: '',
    challenges: '',
    communicationStyle: '',
    interests: '',
    guardianName: '',
    guardianContact: '',
    additionalNotes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      diagnosis: checked 
        ? [...prev.diagnosis, value]
        : prev.diagnosis.filter(item => item !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.age || !formData.grade) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Informações do Aluno</CardTitle>
          <CardDescription>
            Preencha os dados do aluno para gerar um PEI personalizado.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo*</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome do aluno"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Idade*</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="1"
                max="18"
                value={formData.age}
                onChange={handleChange}
                placeholder="Idade"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Série/Ano Escolar*</Label>
              <Select onValueChange={(value) => handleSelectChange('grade', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="infantil1">Educação Infantil 1</SelectItem>
                  <SelectItem value="infantil2">Educação Infantil 2</SelectItem>
                  <SelectItem value="1ano">1º Ano Fundamental</SelectItem>
                  <SelectItem value="2ano">2º Ano Fundamental</SelectItem>
                  <SelectItem value="3ano">3º Ano Fundamental</SelectItem>
                  <SelectItem value="4ano">4º Ano Fundamental</SelectItem>
                  <SelectItem value="5ano">5º Ano Fundamental</SelectItem>
                  <SelectItem value="6ano">6º Ano Fundamental</SelectItem>
                  <SelectItem value="7ano">7º Ano Fundamental</SelectItem>
                  <SelectItem value="8ano">8º Ano Fundamental</SelectItem>
                  <SelectItem value="9ano">9º Ano Fundamental</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <div className="relative">
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Diagnóstico (selecione todas as opções aplicáveis)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'asd', label: 'Transtorno do Espectro Autista (TEA)' },
                { id: 'adhd', label: 'TDAH' },
                { id: 'communication', label: 'Transtorno de Comunicação' },
                { id: 'intellectual', label: 'Deficiência Intelectual' },
                { id: 'sensory', label: 'Transtorno do Processamento Sensorial' },
                { id: 'anxiety', label: 'Ansiedade' }
              ].map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={item.id} 
                    checked={formData.diagnosis.includes(item.id)}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(item.id, checked as boolean)
                    } 
                  />
                  <label 
                    htmlFor={item.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="strengths">Pontos Fortes</Label>
            <Textarea
              id="strengths"
              name="strengths"
              value={formData.strengths}
              onChange={handleChange}
              placeholder="Descreva os pontos fortes, habilidades e talentos do aluno"
              className="min-h-24"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="challenges">Desafios</Label>
            <Textarea
              id="challenges"
              name="challenges"
              value={formData.challenges}
              onChange={handleChange}
              placeholder="Descreva os principais desafios enfrentados pelo aluno"
              className="min-h-24"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="communicationStyle">Estilo de Comunicação</Label>
            <Select onValueChange={(value) => handleSelectChange('communicationStyle', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estilo de comunicação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="verbal">Verbal fluente</SelectItem>
                <SelectItem value="limited">Comunicação verbal limitada</SelectItem>
                <SelectItem value="nonverbal">Não-verbal</SelectItem>
                <SelectItem value="aac">Utiliza comunicação alternativa (CAA)</SelectItem>
                <SelectItem value="mixed">Comunicação mista</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="interests">Interesses Específicos</Label>
            <Textarea
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="Descreva os interesses específicos e assuntos preferidos do aluno"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guardianName">Nome do Responsável</Label>
              <Input
                id="guardianName"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Nome do responsável"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="guardianContact">Contato do Responsável</Label>
              <Input
                id="guardianContact"
                name="guardianContact"
                value={formData.guardianContact}
                onChange={handleChange}
                placeholder="Email ou telefone"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Observações Adicionais</Label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Informações adicionais relevantes para o PEI"
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full bg-autism-blue hover:bg-autism-blue/90">
            Próximo Passo
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default StudentForm;
