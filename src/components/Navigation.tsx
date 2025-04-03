
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Calendar, Edit, Search, Settings, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'Novo PEI', path: '/new', icon: <Edit className="h-5 w-5" /> },
    { name: 'Alunos', path: '/students', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-autism-blue flex items-center justify-center">
            <span className="text-white font-semibold">A</span>
          </div>
          <h1 className="font-bold text-xl text-autism-blue">AutismoPEI</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className="flex items-center gap-2"
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
