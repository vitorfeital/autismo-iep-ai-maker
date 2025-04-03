
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import StudentForm, { StudentData } from "@/components/StudentForm";
import IEPGenerator, { IEPData } from "@/components/IEPGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<"dashboard" | "form" | "generator" | "complete">("dashboard");
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [iepData, setIepData] = useState<IEPData | null>(null);
  
  const handleFormSubmit = (data: StudentData) => {
    setStudentData(data);
    setCurrentStep("generator");
  };
  
  const handleGeneratorComplete = (data: IEPData) => {
    setIepData(data);
    setCurrentStep("complete");
    toast({
      title: "PEI Finalizado",
      description: "Seu Plano de Ensino Individualizado foi criado com sucesso!",
    });
  };
  
  const handleNewPEI = () => {
    setCurrentStep("form");
  };
  
  const handleBack = () => {
    if (currentStep === "generator") {
      setCurrentStep("form");
    } else {
      setCurrentStep("dashboard");
    }
  };

  const handleViewDashboard = () => {
    setCurrentStep("dashboard");
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case "dashboard":
        return <Dashboard />;
      case "form":
        return <StudentForm onSubmit={handleFormSubmit} />;
      case "generator":
        return studentData ? (
          <IEPGenerator 
            studentData={studentData} 
            onBack={handleBack}
            onComplete={handleGeneratorComplete} 
          />
        ) : null;
      case "complete":
        return (
          <div className="max-w-2xl mx-auto">
            <Card className="border-autism-green/20 bg-autism-lightGreen/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-autism-green/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-autism-green"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  PEI Criado com Sucesso
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">
                  O Plano de Ensino Individualizado para <span className="font-semibold">{studentData?.name}</span> foi criado com sucesso!
                </p>
                <div className="rounded-md bg-autism-green/10 p-4 text-left">
                  <h3 className="font-medium mb-1">Resumo do PEI:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• {iepData?.academicGoals.split('\n')[0]}</li>
                    <li>• {iepData?.socialGoals.split('\n')[0]}</li>
                    <li>• {iepData?.communicationGoals.split('\n')[0]}</li>
                    <li>• Total de metas: {
                      (iepData?.academicGoals.split('\n').length || 0) + 
                      (iepData?.socialGoals.split('\n').length || 0) + 
                      (iepData?.communicationGoals.split('\n').length || 0)
                    }</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  onClick={handleViewDashboard}
                  className="w-full bg-autism-green hover:bg-autism-green/90"
                >
                  Voltar ao Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleNewPEI}
                  className="w-full"
                >
                  Criar Novo PEI
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-autism-pattern-bg">
      <Navigation />
      <div className="container py-8">
        {renderStep()}
      </div>
    </div>
  );
};

export default Index;
