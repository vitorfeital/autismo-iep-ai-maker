
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Plus, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PEICardProps {
  name: string;
  age: number;
  lastUpdated: string;
  onClick: () => void;
}

const PEICard: React.FC<PEICardProps> = ({ name, age, lastUpdated, onClick }) => {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <User className="h-4 w-4" />
          {name}
        </CardTitle>
        <CardDescription>{age} anos</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">
          Última atualização: {lastUpdated}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onClick}>
          <Edit className="h-4 w-4 mr-2" />
          Visualizar PEI
        </Button>
      </CardFooter>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const recentPEIs = [
    { id: 1, name: "Lucas Silva", age: 8, lastUpdated: "24/03/2025" },
    { id: 2, name: "Ana Oliveira", age: 6, lastUpdated: "20/03/2025" },
    { id: 3, name: "Pedro Santos", age: 10, lastUpdated: "18/03/2025" },
  ];
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-autism-blue mb-2">Olá, Professor!</h2>
          <p className="text-muted-foreground">Gerencie os Planos de Ensino Individualizados aqui.</p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-autism-green hover:bg-autism-green/90"
          onClick={() => navigate('/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Criar Novo PEI
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-full md:col-span-1 lg:col-span-2 bg-gradient-to-br from-autism-lightBlue to-autism-blue text-white">
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 justify-around">
              <div className="text-center">
                <p className="text-3xl font-bold">{recentPEIs.length}</p>
                <p className="text-sm opacity-90">PEIs Ativos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm opacity-90">Objetivos Alcançados</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">2</p>
                <p className="text-sm opacity-90">Revisões Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Próxima revisão: 15 de Abril, 2025
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Ver Agenda</Button>
          </CardFooter>
        </Card>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">PEIs Recentes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentPEIs.map((pei) => (
          <PEICard
            key={pei.id}
            name={pei.name}
            age={pei.age}
            lastUpdated={pei.lastUpdated}
            onClick={() => navigate(`/pei/${pei.id}`)}
          />
        ))}
        <Card className="flex flex-col items-center justify-center p-6 border-dashed">
          <Plus className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground mb-4">Adicionar Novo PEI</p>
          <Button onClick={() => navigate('/new')}>Criar PEI</Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
